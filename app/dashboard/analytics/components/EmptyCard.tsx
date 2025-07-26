import { TriangleAlert } from "lucide-react"

const EmptyCard = () => {
    return (
        <div className={`w-full h-[26vh] border border-dashed border-gray-300 rounded-lg flex items-center justify-center `}>
            <span className="text-amber-500 text-center flex flex-col items-center gap-2">
                <TriangleAlert />
                No data available yet</span>
        </div>
    )
}

export default EmptyCard
