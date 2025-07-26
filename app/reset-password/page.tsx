"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { resetPassword } from "@/data/allQueryRequest"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Info } from "lucide-react"
import { toast } from "sonner"
import Spinner from "@/components/ui/spinner"
import { useState, Suspense } from "react"
import Loader from "../components/Loading"


const ResetPasswordSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match with new password",
    path: ["confirmPassword"],
})

function ResetPasswordForm() {
    const params = useSearchParams()
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false)
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: zodResolver(ResetPasswordSchema)
    })

    const mutation = useMutation({
        mutationFn: resetPassword
    })

    const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
        const { confirmPassword } = data
        const loadingToast = toast.loading("Resetting password...")

        const payLoad = {
            token: params.get("token") || "",
            newPassword: confirmPassword
        }
        mutation.mutate(payLoad, {
            onSuccess: (data) => {
                toast.dismiss(loadingToast)
                toast.success("Password reset successfully!")

                if (data.redirect) {
                    router.push("/login")
                }
            },
            onError: (error) => {
                console.log("Error resetting password:", error);
                toast.dismiss(loadingToast)
                toast.error("Error resetting password: " + (error as Error).message, {
                    position: "top-right"
                })
            },
            onSettled: () => {
                reset()
                toast.dismiss(loadingToast)
            }
        })

    }
    return (

        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card className="py-10">
                        <CardHeader>
                            <CardTitle className="text-xl">Reset your password</CardTitle>
                            <CardDescription>
                                Enter your new password below
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6 mt-5">
                                    <div className="grid gap-3">
                                        <Label htmlFor="new-password">New password <span className="text-red-500">*</span></Label>
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
                                            <Input disabled={mutation.isPending} {...register("newPassword")} id="new-password" name="newPassword" type={showPassword ? "text" : "password"} className="pr-10" placeholder="Enter new password" />

                                        </div>
                                        {errors?.newPassword && (
                                            <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                                                <Info className="" size={13} />
                                                {errors.newPassword.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="confirm-password">Confirm password <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="confirm-password"
                                            disabled={mutation.isPending}
                                            type="password"
                                            placeholder="Confirm new password"
                                            {...register("confirmPassword")}
                                        />
                                    </div>
                                    <div>
                                        {errors?.confirmPassword && (
                                            <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                                                <Info className="" size={13} />
                                                {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button type="submit" className="w-full mt-2 cursor-pointer" disabled={mutation.isPending}>
                                        {mutation.isPending ? <Spinner /> : "Reset Password"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default function ResetPassword() {
    return (
        <Suspense fallback={<Loader />}>
            <ResetPasswordForm />
        </Suspense>
    )
}
