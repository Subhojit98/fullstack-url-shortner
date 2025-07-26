"use client";
import { Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/data/allQueryRequest';
import { toast } from 'sonner';
import Spinner from '@/components/ui/spinner';
import { Suspense } from 'react';
import Loader from '../components/Loading';

function EmailVerificationForm() {
    const searchParams = useSearchParams()
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: verifyEmail
    })

    const handleVerifyEmail = () => {

        const loadingToast = toast.loading("Verifying email...");
        const token = searchParams.get("token") || ""
        if (!token) {
            console.error("No token provided for email verification.");
            toast.error("No token provided for email verification.", {
                position: "top-right"
            })
            return;
        }
        mutation.mutate(token, {
            onSuccess: () => {
                if (mutation.isSuccess || !mutation.isPending) {
                    toast.dismiss(loadingToast);
                }
                toast.success("Email verified successfully!");
                router.push("/dashboard");
            },
            onError: (error) => {
                console.error("Error verifying email:", error);
                toast.dismiss(loadingToast);

                toast.error("Error verifying email: " + (error as Error).message, {
                    position: "top-right"
                });
            }
        });
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    {/* Icon */}
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-8">
                        <Mail className="h-8 w-8 text-white" />
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent my-8">
                            Verify Your Email
                        </h1>
                        <p className="text-gray-400">
                            Click here to verify your email address and start using our service.
                        </p>
                    </div>

                    {/* Verification Button */}
                    <button disabled={mutation.isPending} onClick={handleVerifyEmail} className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                        <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                        <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                        <span className="relative z-20 flex items-center text-sm">
                            <svg className="relative w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            {mutation.isPending ? <Spinner /> : "Verify Email"}
                        </span>
                    </button>


                </div>


            </div>
        </div>
    );
}

export default function EmailVerification() {
    return (
        <Suspense fallback={
            <Loader />
        }>
            <EmailVerificationForm />
        </Suspense>
    );
}
