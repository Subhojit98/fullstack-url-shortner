"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Info, Plus, Search, TriangleAlert } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppContext } from "../provider/ContextProvider"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCustomLink } from "@/data/allQueryRequest"
import { toast } from "sonner"
import CustomPagination from "./Pagination"
import Spinner from "@/components/ui/spinner"



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


const LinkSchema = z.object({
    title: z.string().min(3, "Title is required"),
    url: z.string().url("Invalid URL").min(1, "URL is required"),
    customUrlName: z.string().min(3, "Custom URL Name is required"),
})

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters
        }


    })
    const { user } = useAppContext()
    const queryClient = useQueryClient()
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LinkSchema)
    })
    const mutation = useMutation({
        mutationFn: createCustomLink
    })
    const [showDialog, setShowDialog] = useState(false);

    const onSubmit = async (data: z.infer<typeof LinkSchema>) => {

        const linkData = { ...data, userId: user?._id }


        mutation.mutate(linkData, {
            onSuccess: (res) => {
                if (res.success) {
                    setShowDialog(false)
                }

                queryClient.invalidateQueries({
                    queryKey: ["me"]
                })

                toast.success("link created successfully.")
            },
            onError: (error) => {
                console.error("Error creating link:", error)
                toast.error("error while created link!")
            },
            onSettled: () => {
                reset()
            }
        })
    }

    return (


        <>

            <div className="relative w-11/12 lg:w-2/3 xl:w-1/2 mx-auto my-5">
                <Input type="text" className="p-6 md:p-7 pl-14 md:pl-14 gradient-1 mt-8 text-white rounded-full placeholder:text-white" placeholder="Search for any Links..." value={(table.getColumn("title")?.getFilterValue() as string) ?? ""} onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)} />
                <Search className="absolute top-1/2 left-4 transform -translate-y-1/2" />

            </div>

            <div className="flex justify-end">
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger className="inline-flex items-center text-black bg-slate-50 mb-5 p-2.5 md:p-3 rounded-md mr-0.5 cursor-pointer">
                        <Plus size={20} strokeWidth={3} />
                        <span className="ml-2 text-sm sm:text-base font-semibold">New Link</span>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-50">
                        <DialogHeader>
                            <DialogTitle className="text-lg sm:text-xl">Create Custom URL</DialogTitle>
                            <DialogDescription className="text-xs sm:text-sm">Please provide the email associated with the link.</DialogDescription>

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 mt-5 ">
                                <div className="grid gap-4">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        {...register("title")}
                                        id="title"
                                        placeholder="My Link"
                                        className="py-6"
                                    />
                                    {errors?.title && (
                                        <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                                            <Info className="" size={13} />
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-4">
                                    <Label htmlFor="url">Original URL</Label>
                                    <Input
                                        {...register("url")}
                                        id="url"
                                        placeholder="https://example.com"
                                        className="py-6"
                                    />
                                    {errors?.url && (
                                        <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                                            <Info className="" size={13} />
                                            {errors.url.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-4">
                                    <Label htmlFor="url-name">Custom URL Identifier</Label>
                                    <Input
                                        id="url-name"
                                        {...register("customUrlName")}
                                        placeholder="my-portfolio"
                                        className="py-6"
                                    />
                                    {errors?.customUrlName && (
                                        <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                                            <Info className="" size={13} />
                                            {errors.customUrlName.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-center gap-5">
                                    <Button onClick={() => setShowDialog(false)} type="button" variant={"destructive"} className="py-6 px-10 md:px-20 cursor-pointer font-semibold">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="py-6 px-10 md:px-20 cursor-pointer font-semibold bg-background text-white flex">
                                        {
                                            mutation.isPending ? <Spinner /> : "Create"
                                        }
                                    </Button>

                                </div>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <Table className="border">
                    <TableHeader className="bg-slate-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-black py-5 pl-8 font-semibold uppercase">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="bg-[#08051c] hover:bg-zinc-900"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-6">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <div className="inline-flex items-center gap-3 text-yellow-400">
                                        <TriangleAlert size={18} className="" />
                                        No Links Found.
                                    </div>

                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="w-full  mt-10 text-white items-center px-2">
                <span className="text-xs hidden md:block text-nowrap">Total Links: {user?.createdLinks.length || 0}</span>
                <CustomPagination
                    className={"text-white"}
                    nextPage={table.nextPage}
                    previousPage={table.previousPage}
                    isPreviousPageAvailable={table.getCanPreviousPage()}
                    isNextPageAvailable={table.getCanNextPage()}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    totalPages={table.getPageCount()}
                />
            </div>
        </>
    )
}