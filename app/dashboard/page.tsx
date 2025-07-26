import Table from "./components/Table"

const page = () => {

    return (
        <>

            <div className="w-full h-full xl:px-20">
                <div className="text-white text-center">
                    <h1 className="text-3xl sm:text-5xl pt-10 pb-2 font-bold inline-flex items-center gap-3 hollow_text gradient-2">
                        My Links</h1>
                    <p className="text-xs sm:text-sm mt-2">This is where your links can be created & displayed.</p>
                </div>

                <div className="w-11/12 2xl:w-4/5 mx-auto text-white">
                    <Table />
                </div>

            </div>

        </>
    )
}

export default page
