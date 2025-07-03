import { columns, Payment } from "../columns"
import { DataTable } from "../data-table"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            qrCode: "https://example.com/qr/728ed52f",
            title: "Example Link",
            url: "https://example.com",
            createdAt: "2023-01-01",
        },
        {
            id: "b3f1c4a2",
            qrCode: "https://example.com/qr/b3f1c4a2",
            title: "Another Example Link",
            url: "https://another-example.com",
            createdAt: "2023-02-01",

        },
        {
            id: "c4d2e3f1",
            qrCode: "https://example.com/qr/c4d2e3f1",
            title: "Yet Another Example Link",
            url: "https://yet-another-example.com",
            createdAt: "2023-02-01",

        },
    ]
}
const Table = async () => {
    const data = await getData()
    return (

        <DataTable columns={columns} data={data} />
    )
}

export default Table
