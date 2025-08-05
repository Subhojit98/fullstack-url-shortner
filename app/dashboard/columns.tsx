"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDate } from "@/helper/dateFormater"
import ActionCalls from "./components/ActionCalls"

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
                <Link href={`/dashboard/analytics/${row.original._id}`} className="hover:underline font-semibold">
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
                <div>
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
            return <ActionCalls id={row.original._id} shortId={row.original.shortId} />;

        },
    },


]