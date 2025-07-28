"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { formatDate } from "@/helper/dateFormater"

export type Link = {
    _id: string
    title: string
    shortId: string
    originalUrl: string
    createdAt: string,
    actions?: string
}

export const columns: ColumnDef<Link>[] = [
    {
        accessorKey: "no",
        header: "NO.",
        cell: ({ row }) => {
            return (
                <div className="flex items-center ml-8">
                    <span className="text-sm font-semibold">
                        {row.index + 1}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return (
                <Link href={`/dashboard/analytics/${row.original._id}`} className="hover:underline">
                    {row.getValue("title")}
                </Link>
            );
        },
    },
    {
        accessorKey: "newUrl",
        header: () => {
            return (
                <div className="ml-9">
                    new url
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <Tooltip>
                        <TooltipTrigger>
                            {`${process.env.NEXT_PUBLIC_DOMAIN}/${row.original.shortId}`.split("").slice(0, 30).join("")}...
                        </TooltipTrigger>
                        <TooltipContent>
                            {`${process.env.NEXT_PUBLIC_DOMAIN}/${row.original.shortId}`}
                        </TooltipContent>
                    </Tooltip>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: () => {
            return (
                <div className=" text-center">
                    Created At
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className=" ml-7 text-center">
                    {formatDate(row.original.createdAt)}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <div className=" text-end mr-20">
                    Actions
                </div>
            )
        },
        cell: ({ row }) => {

            const handleCopy = async () => {
                await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}/${row.original.shortId}`);
                toast.success("URL copied to clipboard!", {
                    position: "top-right",
                    duration: 800
                });

            }
            return (
                <div className="flex gap-3 justify-end mr-16">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={handleCopy} variant="outline" size="sm" className="cursor-pointer bg-slate-100 hover:bg-slate-200">
                                <Copy className="text-black" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy Url</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/dashboard/analytics/${row.original._id}`} className="">
                                <Button variant="outline" size="sm" className="cursor-pointer bg-slate-100 hover:bg-slate-200">
                                    <Eye className="text-black" />
                                </Button>
                            </Link>

                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Preview</p>
                        </TooltipContent>
                    </Tooltip>


                </div>
            );
        },
    },


]