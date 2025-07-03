import { ReactNode } from "react";
import Navbar from "./components/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <main>
                <Navbar />
                {children}
            </main>
        </>
    )
}