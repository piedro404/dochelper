import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";

export function Layout() {
    return (
        <main className="flex flex-col w-full min-h-screen items-center justify-center overflow-x-hidden">
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
}
