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
import Spinner from "@/components/ui/spinner"
import { sendRestPasswordLink } from "@/data/allQueryRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Info } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const RestPasswordSchema = z.object({
    email: z.string().email("Invalid email address")
})
export default function RestPasswordForm() {

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RestPasswordSchema),
    })

    const mutation = useMutation({
        mutationFn: sendRestPasswordLink
    })

    const onSubmit = (data: z.infer<typeof RestPasswordSchema>) => {

        const email = data?.email.trim()
        mutation.mutate(email, {
            onSuccess: (response) => {
                console.log(response)
                toast.success("Reset password link sent successfully!")
            },
            onError: (error) => {
                console.log("Error sending password reset link:", error);
                toast.error("Error sending reset password link: " + (error as Error).message, {
                    position: "top-right"
                })
            },
            onSettled: () => {
                reset()
            }
        })
    }
    return (
        <div className="flex items-center justify-center h-svh">
            <Card className="w-full max-w-md py-10 mx-5">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Forgot password form</CardTitle>
                    <CardDescription className="text-xs">
                        Enter your registered email to receive reset link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6 mt-2">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                />
                                {errors?.email && (
                                    <p className="text-red-500 text-xs ml-1.5 inline-flex items-center gap-1">
                                        <Info className="" size={13} />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <Button type="submit" className="w-full cursor-pointer" disabled={mutation.isPending}>
                                {mutation.isPending ? <Spinner /> : "Send Link"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
