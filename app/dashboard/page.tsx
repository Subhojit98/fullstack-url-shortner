
import { Input } from "@/components/ui/input"
import { Cable, Plus, Search } from "lucide-react"
import Table from "./components/Table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CustomPagination from "./Pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const page = () => {
    return (
        <>

            <div className="w-full h-screen xl:px-20 mt-10">
                <div className="text-white text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 inline-flex items-center gap-3">
                        <Cable />
                        My Links</h1>
                    <p className="text-xs sm:text-sm">This is where your links will be displayed.</p>
                </div>

                <div className="relative w-11/12 lg:w-2/3 xl:w-1/2 mx-auto">
                    <Input type="text" className="p-6 md:p-7 pl-14 md:pl-14 border bg-slate-100 mt-8" placeholder="Search for any Links..." />
                    <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
                </div>

                <div className="w-11/12 2xl:w-4/5 mx-auto mt-5 text-white">
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger className="inline-flex items-center text-black mb-5 bg-slate-50 p-2.5 md:p-3 rounded-lg mr-1">
                                <Plus size={20} />
                                <span className="ml-2 text-sm sm:text-base font-semibold">New Link</span>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Table />

                </div>
                <div className="w-11/12 2xl:w-4/5 m-auto flex justify-between mt-10 text-white items-center px-2">
                    <span className="text-xs hidden md:block text-nowrap">Total Links: 10</span>
                    <CustomPagination className={"text-white"} />

                    {/* <div className="flex items-center gap-3 text-sm">
                        <span className="text-xs hidden md:block text-nowrap">Items per page:</span>

                        <Select>
                            <SelectTrigger className="hidden md:flex text-xs">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}
                </div>


            </div>

        </>
    )
}

export default page
