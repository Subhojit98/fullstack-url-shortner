import logo from "@/app/assets/images/logo.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { LogOut } from "lucide-react"
import Image from "next/image"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between w-full px-6 md:px-20 mt-5">
            <Image src={logo} alt="logo" className="w-20 h-20 object-contain" />


            <Popover>
                <PopoverTrigger className="cursor-pointer">
                    <Avatar className="size-12">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="p-2" >
                    <Button variant={"ghost"} className="flex items-center gap-4 text-red-500 hover:bg-white hover:text-red-300 cursor-pointer">
                        <LogOut />
                        Log out
                    </Button>
                </PopoverContent>
            </Popover>
        </nav>
    )
}

export default Navbar
