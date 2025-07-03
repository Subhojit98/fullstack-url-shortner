"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import testQrImage from "@/app/assets/images/qr_image.png"
import Image from "next/image"
export type Payment = {
    id: string
    qrCode: string
    title: string
    url: string
    createdAt: string,
    actions?: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "qrCode",
        header: "QR Code",
        cell: ({ row }) => {
            return (
                <div className="flex items-center ml-6">
                    <Image src={testQrImage} alt="QR Code" className="w-10 h-10" />
                </div>
            );
        },
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return (
                <Link href={""} className="hover:underline">
                    {row.getValue("title")}
                </Link>
            );
        },
    },
    {
        accessorKey: "url",
        header: () => {
            return (
                <div className="">
                    URL
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    {row.getValue("url")}
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
                    {new Date(row.getValue("createdAt")).toLocaleDateString()}
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

            return (
                <div className="flex gap-3 justify-end mr-10">
                    <Button variant="outline" size="sm" className="cursor-pointer bg-green-500">
                        <Copy />
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer bg-gray-600">
                        <Download />
                    </Button>

                    <Link href={`/payments/${row.id}`} className="">
                        <Button variant="outline" size="sm" className="cursor-pointer bg-blue-600">
                            <Eye />
                        </Button>
                    </Link>
                </div>
            );
        },
    },


]