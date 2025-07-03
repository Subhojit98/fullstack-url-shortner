import { cn } from "@/lib/utils"
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

export default function ResetPassword({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (

        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="py-10">
                        <CardHeader>
                            <CardTitle className="text-xl">Reset your password</CardTitle>
                            <CardDescription>
                                Enter your new password below
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6 mt-5">
                                    <div className="grid gap-3">
                                        <Label htmlFor="new-password">New password <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="new-password"
                                            type="password"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="confirm-password">Confirm password <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full mt-2 cursor-pointer">
                                        Reset Password
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
