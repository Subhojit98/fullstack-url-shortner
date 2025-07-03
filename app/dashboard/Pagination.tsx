import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationLink,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

const CustomPagination = ({ className }: { className: string }) => {
    return (

        <Pagination className={cn("", className)}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" className="bg-white text-black mr-5" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" className="bg-white text-black ml-5" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CustomPagination
