"use client"
import { useParams, useRouter } from "next/navigation"
import { ChartLineInteractive } from "../components/LineChart"
import { ChartPieDonutText } from "../components/PieChart"
import { useQuery } from "@tanstack/react-query"
import { getLinkDetails } from "@/data/allQueryRequest"
import { Button } from "@/components/ui/button"
import QRCodeStyling from "qr-code-styling"
import { useEffect, useRef } from "react"
import Error from "next/error"
import { CalendarClock, ChevronLeft, Download, Eye, ScanLine, TriangleAlert } from "lucide-react"
import { formatDate } from "@/helper/dateFormater"
import Loader from "@/app/components/Loading"
import { nanoid } from "nanoid"
import { toast } from "sonner"

export function formatTimeFromISOString(isoString: string): string {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    return `${hours < 10 ? `0${hours}` : hours} : ${paddedMinutes} : ${paddedSeconds} ${amPm}`;
}

const Page = () => {

    const params = useParams()
    const router = useRouter()
    const { linkId } = params
    const { data, isLoading, isError, isSuccess, isFetched } = useQuery({
        queryKey: ["linkAnalytics", linkId],
        queryFn: () => getLinkDetails(linkId as string),
    })

    const lastAccessedFrom = data?.data?.locations[data?.data?.locations.length - 1] || "Unknown";
    const qrRef = useRef<HTMLDivElement>(null);
    const qrInstance = useRef<QRCodeStyling | null>(null);


    useEffect(() => {
        if (data?.data?.shortId) {
            qrInstance.current = new QRCodeStyling({
                width: 250,
                height: 250,
                type: "svg",
                data: `${process.env.NEXT_PUBLIC_DOMAIN}/api/links/redirect-link/${data?.data.shortId}`,
                dotsOptions: {
                    type: "rounded",
                    gradient: {
                        type: "linear",
                        rotation: 120,
                        colorStops: [
                            { offset: 0.29, color: "#3b47e0" },
                            { offset: 0.52, color: "#9c9ef0" },
                            { offset: 0.9, color: "#3b47e0" },
                        ],
                    },
                },
                backgroundOptions: {
                    color: "transparent",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 10,
                },
                cornersDotOptions: {
                    type: "classy",
                    color: "#3b47e0",
                },
                cornersSquareOptions: {
                    type: "extra-rounded",
                    color: "#3b47e0",
                },
            });

            if (qrRef.current) {
                qrRef.current.innerHTML = "";
                qrInstance.current.append(qrRef.current);
            }
        }
    }, [data]);



    const handleDownload = () => {
        qrInstance.current?.download({ name: `${data?.data.title}-${nanoid(10)}-qr-code`, extension: "png" })
        setTimeout(() => {
            toast.success("QR Code downloaded successfully!", {
                position: "top-right",
                duration: 800,
            })
        }, 3000);
    };


    return (
        <div className="w-full h-full">

            {
                !isSuccess && isFetched && <Error statusCode={500} title={"Error loading link analytics"} />
            }
            {
                isError && <Error statusCode={500} title={"Error loading link analytics"} />
            }
            {
                isLoading ? <Loader /> :
                    <div className="xl:px-20">
                        <button className="ml-5 cursor-pointer flex items-center gap-1  text-slate-200 hover:text-slate-100" onClick={() => router.back()}>
                            <ChevronLeft size={30} />
                            <span className="text-lg">Back</span>
                        </button>
                        <h1 className="text-3xl md:text-4xl font-bold gradient-2 hollow_text ml-5 mt-5 lg:mt-0 text-center py-5">Analytics of {data?.data.title}</h1>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-full p-5">

                            <div className="p-5 py-6 lg:p-8 xl:p-10 rounded-lg h-full backdrop-blur-md bg-white/5 border border-white/20 shadow-lg text-white flex flex-col justify-between ">

                                <h2 className="text-xl inline-flex items-center gap-3 text-slate-100">
                                    <Eye className="text-indigo-500" />
                                    Total Clicks
                                </h2>
                                <p className="text-2xl md:text-4xl ml-20 font-bold mt-2">{data?.data.totalClicks}</p>
                                <h2 className="text-xl inline-flex items-center gap-3 text-slate-100 mt-5">
                                    <CalendarClock size={22} className="text-amber-300" />
                                    Last Visited Info
                                </h2>
                                <ul className="text-muted-foreground grid grid-cols-2 2xl:grid-cols-3 mt-5">
                                    <li className="flex-col flex gap-3">
                                        <span className="text-xs md:text-sm">Date</span>
                                        <span className="text-white font-semibold text-sm md:text-base"> {data.data.lastVisited ? formatDate(data?.data.lastVisited) : <span className="text-amber-500 inline-flex items-center gap-2 font-normal"> <TriangleAlert size={15} /> Not visited yet</span>}</span>
                                    </li>
                                    <li className="flex-col flex gap-3">
                                        <span className="text-xs md:text-sm">Time</span>
                                        <span className="text-white font-semibold text-sm md:text-base"> {data.data.lastVisited ? formatTimeFromISOString(data?.data.lastVisited) : <span className="text-amber-500 inline-flex items-center gap-2 font-normal"> <TriangleAlert size={15} /> Not visited yet</span>}</span>
                                    </li>
                                    <li className="flex-col flex gap-3 mt-5 2xl:mt-0">
                                        <span className="text-xs md:text-sm">From</span>
                                        <span className="text-white font-semibold text-sm md:text-base"> {data.data.lastVisited ? `${lastAccessedFrom?.info.city} (${lastAccessedFrom?.info.country})` : <span className="text-amber-500 inline-flex items-center gap-2 font-normal"> <TriangleAlert size={15} /> Not visited yet</span>}</span>
                                    </li>
                                </ul>


                            </div>
                            {data?.data?.shortId && (
                                <div className="pb-6 lg:pb-3 pt-5 rounded-lg flex flex-col items-center backdrop-blur-md bg-white/5 border border-white/20 shadow-lg text-white">
                                    <h2 className="text-lg md:text-xl font-semibold inline-flex items-center gap-2">
                                        <ScanLine size={18} />
                                        Scan the QR Code</h2>
                                    <div className=" p-2 mt-2">
                                        <div ref={qrRef} />
                                    </div>
                                    <Button variant={"secondary"} className="mt-2 cursor-pointer" onClick={handleDownload}>
                                        <Download />
                                        Download
                                    </Button>
                                </div>
                            )}

                            <div className=" rounded-lg sm:col-span-2 lg:col-span-1">
                                <ChartPieDonutText data={data} />
                            </div>

                            <div className="h-full rounded-lg sm:col-span-2 lg:col-span-3">
                                <ChartLineInteractive data={data} />
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}

export default Page

// 