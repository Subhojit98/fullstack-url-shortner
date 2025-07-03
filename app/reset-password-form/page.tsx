import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RestPasswordForm() {
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
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full  cursor-pointer">
                        Send Link
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
