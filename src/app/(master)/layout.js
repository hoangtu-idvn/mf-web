'use client'
import {AppProvider} from "@/context/AppContext";
import {Topbar} from "@/components/UI/Topbar/Topbar";
import "@/styles/dashboard.scss"
export default function RootLayout({ children }) {
    return (
        <AppProvider>
            <Topbar app="Master" module="Dashboard"/>
            {children}
        </AppProvider>
    );

}