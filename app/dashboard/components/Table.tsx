"use client"
import { useAppContext } from "@/app/provider/ContextProvider"
import { columns } from "../columns"
import { DataTable } from "../data-table"

const Table = () => {

    const { user } = useAppContext()

    return (

        <DataTable columns={columns} data={user?.createdLinks || []} />

    )
}

export default Table
