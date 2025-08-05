"use client";
import { deleteCustomLink } from "@/data/allQueryRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Copy, Eye, Trash2 } from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ActionsCellProps {
    id: string;
    shortId: string;
}



const ActionCalls = ({ id, shortId }: ActionsCellProps) => {


    const handleCopy = async () => {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}/${shortId}`);
        toast.success("URL copied to clipboard!", {
            position: "top-right",
            duration: 800
        });
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteCustomLink
    })
    const handleDelete = (id: string) => {

        mutation.mutate(id, {
            onSuccess: () => {
                toast.success("Link deleted successfully", {
                    position: "top-right",
                    duration: 800
                });

                queryClient.invalidateQueries({
                    queryKey: ["me"]
                })

            },
            onError: () => {
                toast.error("Error deleting link", {
                    position: "top-right",
                    duration: 800
                });
            }
        })
    }
    return (
        <div className="flex gap-5 justify-end mr-16">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleCopy} variant="outline" size="sm" className="cursor-pointer bg-green-100 hover:bg-green-200">
                        <Copy className="text-green-700 hover:text-green-800" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Copy Url</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={`/dashboard/analytics/${id}`}>
                        <Button variant="outline" size="sm" className="cursor-pointer bg-indigo-100 hover:bg-indigo-200">
                            <Eye className="text-indigo-700 hover:text-indigo-800" />
                        </Button>
                    </Link>

                </TooltipTrigger>
                <TooltipContent>
                    <p>Preview</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="cursor-pointer bg-red-100 hover:bg-red-200" onClick={() => handleDelete(id)}>
                        <Trash2 className="text-red-700 hover:text-red-800" />
                    </Button>

                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>

        </div>
    );
}

export default ActionCalls
