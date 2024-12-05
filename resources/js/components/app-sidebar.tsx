import {
    Box,
    Boxes,
    Home,
    LayoutDashboard,
    Notebook,
    Users,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Link } from "@inertiajs/react";
import { User } from "@/types";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { NavUser } from "./nav-user";
import ApplicationLogo from "./application-logo";

type MenuItem = {
    title: string;
    icon: React.FC;
    name: string;
    children?: MenuItem[];
};
// Menu items.
const items: MenuItem[] = [
    {
        title: "Dashboard",
        icon: Home,
        name: "dashboard",
    },
];

type AppSidebarProps = {
    user: User;
};

export function AppSidebar({ user }: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link href="/">
                    <SidebarMenuButton className="flex">
                        <ApplicationLogo className="w-20 fill-sidebar-primary-foreground group-hover/menu-button:fill-sidebar-accent-foreground" />
                        <h1 className="text-xl font-bold truncate">
                            Home Services
                        </h1>
                    </SidebarMenuButton>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.children ? (
                                        <Collapsible
                                            defaultOpen
                                            className="group/collapsible"
                                        >
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.children.map(
                                                        (subItem) => (
                                                            <SidebarMenuSubItem
                                                                key={
                                                                    subItem.title
                                                                }
                                                            >
                                                                <SidebarMenuButton
                                                                    asChild
                                                                    isActive={route().current(
                                                                        subItem.name
                                                                    )}
                                                                >
                                                                    <Link
                                                                        href={route(
                                                                            subItem.name
                                                                        )}
                                                                    >
                                                                        <span>
                                                                            {
                                                                                subItem.title
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </SidebarMenuButton>
                                                            </SidebarMenuSubItem>
                                                        )
                                                    )}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton
                                            asChild
                                            isActive={route().current(
                                                item.name
                                            )}
                                        >
                                            <Link href={route(item.name)}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
