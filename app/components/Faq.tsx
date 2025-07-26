import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import accordionData from "@/constants/accordionData"
const Faq = () => {
    return (
        <div className="w-full h-full mb-40 flex flex-col items-center gap-10 justify-center mt-20 text-white">

            <div className="text-center">
                <h2 className="uppercase text-5xl">faq</h2>
                <p className="text-sm mt-5"> Your Question Answers Here</p>
            </div>

            <Accordion
                type="single"
                collapsible
                className="max-w-3xl w-2/3 md:w-1/2 mt-10"
                defaultValue="item-1"
            >
                {
                    accordionData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger className="py-8 text-indigo-500 text-base">{item.question}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 tracking-wide text-slate-300">
                                <p>{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>

        </div>
    )
}

export default Faq
