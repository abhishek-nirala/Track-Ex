"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, BarChart3, PieChart, TrendingUp, CreditCard, Clock, Shield } from "lucide-react"
import { signIn} from 'next-auth/react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">ExpenseTracker</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* <Link href="/signin"> */}
            <Button variant="outline" className="hidden sm:flex" onClick={(() => signIn())}>
              Sign In
            </Button>
            {/* </Link> */}
            {/* <Link href="/signup"> */}
            <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => signIn()}>
              Sign Up Free
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Take Control of Your Finances
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Track expenses, manage budgets, and achieve your financial goals with our intuitive expense tracker
                    app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button className="bg-emerald-500 hover:bg-emerald-600"
                      onClick={()=>signIn()} 
                    >
                      Get Started Free
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  <Link href="#how-it-works">
                    <Button variant="outline">See How It Works</Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-emerald-500" />
                    <span>Setup in Minutes</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[300px] sm:h-[400px] sm:w-[350px] lg:h-[500px] lg:w-[450px] overflow-hidden rounded-lg border bg-background shadow-xl">
                  <Image
                    src="/expense.png"
                    alt="ExpenseTracker App Dashboard"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full bg-gray-50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything You Need to Manage Expenses
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Our expense tracker provides powerful tools to help you understand and optimize your spending habits.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <BarChart3 className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="text-center text-gray-500">
                  Easily log and categorize your expenses to keep track of where your money is going.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <PieChart className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold">Budget Planning</h3>
                <p className="text-center text-gray-500">
                  Create custom budgets for different categories and track your progress in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <TrendingUp className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold">Financial Insights</h3>
                <p className="text-center text-gray-500">
                  Get detailed reports and visualizations to understand your spending patterns.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <CreditCard className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold">Bank Sync</h3>
                <p className="text-center text-gray-500">
                  Connect your bank accounts for automatic expense tracking and categorization.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Clock className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold">Bill Reminders</h3>
                <p className="text-center text-gray-500">
                  Never miss a payment with customizable bill reminders and notifications.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Shield className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-center text-gray-500">
                  Your financial data is encrypted and protected with bank-level security measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Steps to Financial Freedom</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Getting started with ExpenseTracker is quick and easy. Follow these simple steps:
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-center text-gray-500">
                  Create your free account in less than a minute. No credit card required.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold">Connect Accounts</h3>
                <p className="text-center text-gray-500">
                  Link your bank accounts or manually add your expenses and income.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold">Track & Save</h3>
                <p className="text-center text-gray-500">
                  Start tracking your expenses, set budgets, and watch your savings grow.
                </p>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <Link href="/signup">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  Start Your Financial Journey
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full bg-gray-50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Loved by Thousands</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  See what our users have to say about how ExpenseTracker has transformed their financial lives.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Freelancer</p>
                  </div>
                </div>
                <p className="text-gray-500">
                  &quot;ExpenseTracker has completely changed how I manage my finances. As a freelancer with irregular
                  income, I can now easily track my expenses and plan for taxes.&quot;
                </p>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-500">Small Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-500">
                  &quot;The insights from ExpenseTracker helped me identify unnecessary business expenses and save over
                  $5,000 in the first year. Highly recommended!&quot;
                </p>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-medium">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500">Student</p>
                  </div>
                </div>
                <p className="text-gray-500">
                  &quot;As a student on a tight budget, ExpenseTracker has been a game-changer. The budget features help me
                  stay on track with my spending and save for the future.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Take Control of Your Finances?
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Join thousands of users who have transformed their financial lives with ExpenseTracker.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
               
                  <Button className="bg-emerald-500 hover:bg-emerald-600 px-8" onClick={(() => signIn())}>Sign Up Free</Button>
              
                  <Button variant="outline" className="px-8" onClick={()=>signIn()}>
                    Sign In
                  </Button>
              </div>
              <p className="text-sm text-gray-500">No credit card required. Free plan available.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-500" />
                <span className="text-lg font-bold">ExpenseTracker</span>
              </div>
              <p className="text-sm text-gray-500">
                Take control of your finances with our intuitive expense tracking app.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-emerald-500 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            <p>© 2025 ExpenseTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
