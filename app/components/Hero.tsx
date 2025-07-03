import Image from "next/image"
import logo from "@/app/assets/images/logo.png"
import { MoveRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
const Hero = () => {
    return (
        <div className="w-full h-screen relative">
            {/* grid background */}
            <div className="absolute grid_background m-auto -z-20 w-full left-0 right-0 h-full"></div>

            {/* Navbar */}

            <nav className="flex items-center justify-between w-full px-6 md:px-20 mt-5">
                <Image src={logo} alt="logo" className="w-20 h-20 object-contain" />

                <div className="flex items-center sm:gap-5">
                    <Button className="px-4 py-4 sm:px-6 sm:py-6 text-xs sm:text-sm border border-gray-600 text-white gradient-1 rounded-lg cursor-pointer hover:opacity-90 hover:border-white duration-200 ease-in-out">Login</Button>
                    <Button className="hidden sm:inline-flex px-4 py-4 sm:px-6 sm:py-6 text-xs sm:text-sm  text-white gradient-2 rounded-lg items-center gap-2 cursor-pointer hover:opacity-90 group">
                        <span>Get started</span>
                        <MoveRight className="group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
                    </Button>
                </div>
            </nav>

            <h1 className="text-[#CCCFDE] text-4xl sm:text-5xl md:text-6xl font-semibold text-center mt-24 leading-12 sm:leading-16 md:leading-20">
                <span>The Only URL Shortener</span>
                <br />
                <span>You’ll Ever Need!</span>
            </h1>
            <p className="text-[#CCCFDE] w-3/4 md:w-[30%] text-center mx-auto mt-10 text-xs sm:text-sm">Create short, memorable links, gain valuable insights, and maximize your online impact with our comprehensive, user-friendly solution</p>

            <div className="flex flex-col items-center mt-20 mx-auto">
                <Input type="text" className="w-3/4 md:w-[40%] p-7 text-[#CCCFDE] gradient-1" placeholder="Eg:  https://myexampledomainname.com" />
                {/* <Button variant="secondary" className="mt-5 py-6 px-6 cursor-pointer font-semibold">Short It</Button> */}

                <button className="relative cursor-pointer mt-10 inline-flex bg-background items-center px-12 py-3 overflow-hidden text-sm sm:text-lg font-medium border-2 border-indigo-600 rounded-lg text-white group">
                    <span className="absolute left-0 block w-full h-0 transition-all bg-[#3b47e0] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span className="relative">Get Now</span>
                </button>
            </div>


        </div>
    )
}

export default Hero
