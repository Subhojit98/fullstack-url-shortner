"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, Eye, EyeOff, Info, Megaphone } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/data/allQueryRequest"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Spinner from "./ui/spinner"


const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
})

const handleCopyEmail = () => {
  navigator.clipboard.writeText("test@gmail.com");
  toast.success("Email copied to clipboard", {
    position: "top-right",
    duration: 900

  });
}
const handleCopyPassword = () => {
  navigator.clipboard.writeText("test@12345");
  toast.success("Password copied to clipboard", {
    position: "top-right",
    duration: 900
  })
}
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema)
  })

  const mutation = useMutation({
    mutationFn: loginUser,
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {

    const loadingToast = toast.loading("Logging in...")
    mutation.mutate(data, {
      onSuccess: () => {
        toast.dismiss(loadingToast)
        toast.success("User Logged in successfully!")
        router.push("/dashboard")
      },
      onError: (error) => {
        console.log("Error logging in:", error)
        toast.dismiss(loadingToast)
        toast.error("Error while logging in: " + (error as Error).message, {
          position: "top-right"
        })
      },
      onSettled: () => {
        reset()
        setShowPassword(false)
      }
    })
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-3">
            <Megaphone />
            Test Account Details</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <p className="text-xs inline-flex items-center gap-5"><span>Test Email:</span> <span className="p-1.5 px-2  border-2 border-slate-600 bg-slate-300 rounded-md font-semibold">test@gmail.com</span></p>
          <Button onClick={handleCopyEmail} variant="outline" size={"sm"} className="cursor-pointer bg-white">
            <Copy />
          </Button>
        </CardContent>
        <CardFooter className="flex items-center gap-2">
          <p className="text-xs inline-flex items-center gap-5"><span>Test Password:</span> <span className="p-1.5 px-2 border-2 border-slate-600 bg-slate-300 rounded-md font-semibold">test@12345</span></p>
          <Button onClick={handleCopyPassword} variant="outline" size={"sm"} className="cursor-pointer bg-white">
            <Copy />
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
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
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
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
                  <Link
                    href="/reset-password-form"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Button type="submit" className="w-full cursor-pointer" disabled={mutation.isPending}>
                  {mutation.isPending ? <Spinner /> : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  )
}
