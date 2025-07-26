
"use client";
import { useEffect } from "react";

const Loader = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);
    return (
        <div className="fixed top-0 z-50 h-screen w-full bg-slate-950">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="relative">
                    <div className="relative w-32 h-32">
                        <div
                            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#6f00ff] border-b-[#0ff] animate-spin"
                            style={{ animationDuration: "3s" }}
                        ></div>

                        <div
                            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
                            style={{ animationDuration: "2s", animationDirection: "reverse" }}
                        ></div>
                    </div>

                    <div
                        className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"
                    ></div>
                </div>
                <h1 className="text-xl text-white font-semibold mt-8">Getting Ready ..</h1>
            </div >
        </div >
    )
}

export default Loader
