"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  // CameraIcon,
  // ClipboardListIcon,
  // DatabaseIcon,
  // FileCodeIcon,
  // FileIcon,
  // FileTextIcon,
  // FolderIcon,
  // HelpCircleIcon,
  Home,
  LayoutDashboardIcon,
  ListIcon,
  LogOut,
  // SearchIcon,
  // SettingsIcon,
  // UsersIcon,
} from "lucide-react"

// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Bills",
      url: "/bills",
      icon: ListIcon,
    },
    {
      title: "Log-Out",
      url: "#",
      icon: LogOut,
    },
    //   {
    //     title: "Team",
    //     url: "#",
    //     icon: UsersIcon,
    //   },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: session } = useSession()
  console.log("session: ", session)
  const user = {
    name: session?.user?.name || "username",
    email: session?.user?.email || "user@email.com",
    avatar: session?.user?.image || "profile image"
  }


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Track-Ex</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
