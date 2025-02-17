import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import Cookies from "js-cookie";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;
    const defaultOpen = Cookies.get("sidebar:state") === "true";

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar user={user} />
            <main className="w-full">
                <div className="shadow-sm p-2 fixed w-full bg-background">
                    <SidebarTrigger />
                </div>
                <div className="px-6 pt-16 pb-4">{children}</div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
}
