import { Button } from "@/components/ui/button"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CustomPagination = ({ className, currentPage, nextPage, previousPage, isNextPageAvailable, isPreviousPageAvailable }: { className: string, currentPage: number, totalPages: number, nextPage: () => void, previousPage: () => void, isNextPageAvailable: boolean, isPreviousPageAvailable: boolean }) => {
    return (

        <Pagination className={cn("", className)}>
            <PaginationContent>
                <PaginationItem className="mx-4">
                    <Button onClick={previousPage} variant={"secondary"} disabled={!isPreviousPageAvailable} className="cursor-pointer py-5">
                        <ChevronLeft />
                        Previous
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink className="border" isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem className="mx-4">
                    <Button onClick={nextPage} variant={"secondary"} disabled={!isNextPageAvailable} className="cursor-pointer py-5">
                        Next
                        <ChevronRight />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CustomPagination
