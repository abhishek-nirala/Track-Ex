import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useExpenseSummary } from "@/lib/useExpenseStore"
import { useMemo } from "react"

export function SectionCards() {
  // Get summaries from Zustand store
  const summaries = useExpenseSummary((state) => state.summaries)

  // Calculate total expense using useMemo for performance
  const totalExpense = useMemo(
    () => summaries.reduce((total, curr) => total + curr.totalSpent, 0),
    [summaries]
  )

  //get the highest expense amount and category
  const highestExpenseObj = useMemo(
    () =>
      summaries.reduce(
        (max, curr) => (curr.totalSpent > max.totalSpent ? curr : max),
        { _id: "", totalSpent: 0, count: 0 }
      ),
    [summaries]
  )
  console.log("inside section-cards")
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Expense</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalExpense}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            Total amount spent in this month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Highest Expense</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {highestExpenseObj.totalSpent}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            {
              `Spent in ${highestExpenseObj._id.toUpperCase()} only ${`${highestExpenseObj.count === 1 ? "once" : highestExpenseObj.count} times `} in this month`
            }
          </div>
        </CardFooter>
      </Card>
    </div>

  )
}
