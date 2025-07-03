import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Sign up to create account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your details to create a new account.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
                    <Input id="username" type="text" placeholder="john_doe" required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>


                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                        <Link
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Avatar</Label>
                    <Input id="picture" type="file" className="cursor-pointer" />
                </div>
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </form>
    )
}
