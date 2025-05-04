'use client'
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  CreditCard,
  Plane,
  CheckSquare,
  Settings,
  Phone,
  Clock,
  Receipt,
  FileText,
  Plus,
  Menu,
} from "lucide-react"
import Link from "next/link"
import { TeamSpendingChart } from "@/components/team-spending-chart"
import { DailyExpensesChart } from "@/components/daily-expenses-chart"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession,signOut } from "next-auth/react"

export default function Dashboard() {
  return (
    <div className="w-full bg-black min-h-screen flex flex-col md:flex-row">
      {/* Mobile Sidebar Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50 text-gray-300">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-zinc-900">
          <MobileSidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-zinc-900 p-6 flex-col h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-zinc-900 p-4 md:p-6 relative">
        {/* Pro Badge */}
        <div className="absolute top-4 right-4">
          <Button onClick={()=>{signOut()}} className="bg-black text-white font-bold py-2 px-6 md:py-3 md:px-8 border rounded-full text-xl md:text-xl">

            LogOut
          </Button>
        </div>

        <div className="mt-16 md:mt-12 grid grid-cols-1 gap-4 md:gap-6">
          {/* Pending Tasks */}
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-gray-300">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-300">Pending Approvals</span>
                </div>
                <span className="text-gray-300 font-medium">5</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-300">New Trips Registered</span>
                </div>
                <span className="text-gray-300 font-medium">1</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-300">Unreported Expenses</span>
                </div>
                <span className="text-gray-300 font-medium">4</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Receipt className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-300">Upcoming Expenses</span>
                </div>
                <span className="text-gray-300 font-medium">0</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-300">Unreported Advances</span>
                </div>
                <span className="text-gray-300 font-medium">€0.00</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-gray-300">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="text-sm text-gray-500">Subject</div>
                <div className="text-sm text-gray-500">Employee</div>
                <div className="text-sm text-gray-500">Team</div>
                <div className="text-sm text-gray-500">Amount</div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2 items-center">
                  <div className="text-gray-300 text-sm">Office Supplies</div>
                  <div className="text-gray-300 text-sm">John Smith</div>
                  <div>
                    <Badge className="bg-teal-600 hover:bg-teal-700 text-xs">Marketing</Badge>
                  </div>
                  <div className="text-gray-300 font-medium">€150.00</div>
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <div className="text-gray-300 text-sm">Business Lunch</div>
                  <div className="text-gray-300 text-sm">Sarah Jade</div>
                  <div>
                    <Badge className="bg-pink-600 hover:bg-pink-700 text-xs">Sales</Badge>
                  </div>
                  <div className="text-gray-300 font-medium">€75.50</div>
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <div className="text-gray-300 text-sm">Travel Expenses</div>
                  <div className="text-gray-300 text-sm">Mike Brown</div>
                  <div>
                    <Badge className="bg-orange-600 hover:bg-orange-700 text-xs">Operations</Badge>
                  </div>
                  <div className="text-gray-300 font-medium">€450.25</div>
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <div className="text-gray-300 text-sm">Client Dinner</div>
                  <div className="text-gray-300 text-sm">Jennifer Lee</div>
                  <div>
                    <Badge className="bg-teal-600 hover:bg-teal-700 text-xs">Marketing</Badge>
                  </div>
                  <div className="text-gray-300 font-medium">€120.00</div>
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <div className="text-gray-300 text-sm">Hotel</div>
                  <div className="text-gray-300 text-sm">David Wilson</div>
                  <div>
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-xs">Finance</Badge>
                  </div>
                  <div className="text-gray-300 font-medium">€275.75</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-gray-300">Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-pink-900/50 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-pink-500" />
                  </div>
                  <span className="text-gray-300 text-sm">+ New expense</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="bg-blue-900/50 p-3 rounded-full">
                    <Receipt className="h-6 w-6 text-blue-500" />
                  </div>
                  <span className="text-gray-300 text-sm">+ Add receipt</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="bg-teal-900/50 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-teal-500" />
                  </div>
                  <span className="text-gray-300 text-sm">+ Create report</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="bg-pink-900/50 p-3 rounded-full">
                    <Plus className="h-6 w-6 text-pink-500" />
                  </div>
                  <span className="text-gray-300 text-sm">+ Create trip</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Report */}
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-gray-300">Monthly Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-300 mb-4">Team Spending Trend</h3>
                  <TeamSpendingChart />
                </div>
                <div>
                  <h3 className="text-gray-300 mb-4">Day-to-Day Expenses</h3>
                  <DailyExpensesChart />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SidebarContent() {
  const { data: session } = useSession()
  const uname = session?.user?.name
  const image = session?.user?.image
  const getFirstCharOfNames = () => {
    let abc = ''
    const splitName = uname?.split(' ')
    for(const i in splitName){
      abc += splitName[Number(i)].split('')[0].toUpperCase() 
    }
    return abc
  }
  const abc = getFirstCharOfNames()
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-20 h-20 border-2 border-teal-400">
          <AvatarImage src={`${image}`} alt="User" />
          <AvatarFallback className="bg-teal-900 text-teal-400">{abc}</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-gray-200 font-medium text-lg">{uname}</h2>
      </div>

      <nav className="flex-1 space-y-2">
        <Link
          href="#"
          className="flex items-center gap-3 p-3 rounded-lg text-teal-400 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-zinc-800 transition-colors"
        >
          <CreditCard className="h-5 w-5" />
          <span>Expenses</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-zinc-800 transition-colors"
        >
          <Plane className="h-5 w-5" />
          <span>Trips</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-zinc-800 transition-colors"
        >
          <CheckSquare className="h-5 w-5" />
          <span>Approvals</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-zinc-800 transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-zinc-800 transition-colors"
        >
          <Phone className="h-5 w-5" />
          <span>Support</span>
        </Link>
      </nav>

      <div className="mt-auto pt-6">
        <div className="flex justify-center">
          <Image
            src="/placeholder.svg?height=40&width=120&text=EXPENSIO"
            alt="Expensio Logo"
            width={120}
            height={40}
            className="h-8"
          />
        </div>
      </div>
    </>
  )
}

function MobileSidebar() {
  return (
    <div className="h-full">
      <SidebarContent />
    </div>
  )
}
