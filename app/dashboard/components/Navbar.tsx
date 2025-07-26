"use client"
// import logo from "@/app/assets/images/logo.png"
import logo from "@/app/assets/images/logo-1.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/data/allQueryRequest"
import { useMutation } from "@tanstack/react-query"

import { LogOut } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useAppContext } from "@/app/provider/ContextProvider"

const getShortName = (name: string) => {
    if (!name) return "";
    const firstChar = name.charAt(0).toUpperCase();
    const lastChar = name.split(' ')[1].charAt(0).toUpperCase();
    if (!lastChar) return firstChar; // In case there's no last name
    return `${firstChar}${lastChar}`;
}
const Navbar = () => {

    const router = useRouter()
    const { user } = useAppContext()
    const mutation = useMutation({
        mutationFn: logoutUser,
    })

    const handleLogout = () => {
        mutation.mutate(undefined, {
            onSuccess: (data) => {
                if (data.success) {
                    router.push("/login")
                    router.refresh()
                }
            },
            onError: (error: unknown) => {
                console.log(error instanceof Error ? error.message : error);
                toast.error("Logout failed. Please try again.")
            }
        })
    }

    return (
        <nav className="flex items-center justify-between w-full px-6 md:px-20 mt-5">
            <button className="w-28 h-28 cursor-pointer" onClick={() => window.location.reload()}>
                <Image src={logo} alt="logo" className="object-cover" />
            </button>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Avatar className="size-14 cursor-pointer">
                            <AvatarImage src={`${user?.avatar || ""}`} />

                            {
                                !user?.avatar && <AvatarFallback className="text-lg hover:bg-slate-200 duration-300 ease-in-out">{getShortName(user?.username || "")}</AvatarFallback>
                            }
                        </Avatar>
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem className="uppercase font-semibold ">
                            {user?.username}
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            {user?.email}
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem className="p-0">
                            <Button onClick={handleLogout} variant={"ghost"} className=" flex items-center gap-4 text-red-500 hover:bg-white hover:text-red-300 cursor-pointer">
                                <LogOut />
                                Log out
                            </Button>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </nav>
    )
}

export default Navbar
