import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import ContextProvider from "../provider/ContextProvider";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <main>
                <ContextProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </ContextProvider>
            </main>
        </>
    )
}