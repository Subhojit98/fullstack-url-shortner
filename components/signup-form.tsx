"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Info } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { signUpUser } from "@/data/allQueryRequest"
import { useState } from "react"
import Spinner from "./ui/spinner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const SignUpSchema = z.object({
    username: z.string().max(25, "Username must be less than 25 characters").min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    picture: z.any().optional()
})

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(SignUpSchema)
    })

    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);

    const mutation = useMutation({
        mutationFn: signUpUser,
    })

    const onSubmit = (data: z.infer<typeof SignUpSchema>) => {

        const userPicture = data?.picture[0] as File | undefined

        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (userPicture) {
            formData.append("avatar", userPicture);
        }

        const loadingToast = toast.loading("Signing up...");

        mutation.mutate(formData, {
            onSuccess: () => {
                console.log("User signed up successfully", mutation?.data);
                toast.dismiss(loadingToast);
                toast.success("User signed up successfully!", {
                    position: "top-right"
                });
                router.push("/dashboard")
                setTimeout(() => {
                    toast.info("Verification email sent! on registered email!", {
                        position: "top-right"
                    })
                }, 5000)

            },
            onError: (error) => {
                console.error("Error signing up:", error);
                toast.dismiss(loadingToast)
                toast.error("Error while signing up: " + (error as Error).message, {
                    position: "top-right"
                });
            },
            onSettled: (data) => {
                console.log("User signed up successfully", data); // ? remove when done testing
                reset();
                setShowPassword(false);
            },
        })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Sign up to create account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your details to create a new account.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
                    <Input {...register("username")} id="username" name="username" type="text" placeholder="john_doe" />
                    {errors?.username && (
                        <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                            <Info className="" size={13} />
                            {errors.username.message}
                        </p>
                    )}
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input {...register("email")} id="email" name="email" type="email" placeholder="m@example.com" />
                    {errors?.email && (
                        <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                            <Info className="" size={13} />
                            {errors.email.message}
                        </p>
                    )}
                </div>


                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>

                    </div>
                    <div className="relative">
                        {
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={mutation.isPending}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} className="opacity-50" />}
                            </Button>
                        }
                        <Input {...register("password")} id="password" name="password" type={showPassword ? "text" : "password"} className="pr-10" />

                    </div>
                    {errors?.password && (
                        <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                            <Info className="" size={13} />
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Avatar</Label>
                    <Input {...register("picture")} id="picture" type="file" accept="image/*" name="picture" className="cursor-pointer" />
                </div>
                <Button type="submit" className="w-full cursor-pointer" disabled={mutation.isPending}>
                    {mutation.isPending ? <Spinner /> : "Sign Up"}
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
