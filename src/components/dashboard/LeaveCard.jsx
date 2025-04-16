import { Check, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LeaveCard() {
  const leaveItems = [
    {
      name: "John Doe",
      date: "April 15 - April 17",
      status: "pending",
    },
    {
      name: "Jane Smith",
      date: "April 20 - April 25",
      status: "approved",
    },
    {
      name: "Robert Johnson",
      date: "May 1 - May 5",
      status: "approved",
    },
  ]

  return (
    <Card className="transform perspective-1000 hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-base font-medium">Upcoming Leave</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaveItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-border last:border-0 hover:bg-muted/30 hover:pl-2 rounded-md transition-all"
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  item.status === "pending"
                    ? "bg-gradient-to-br from-red-500 to-red-700 text-white"
                    : "bg-gradient-to-br from-green-500 to-green-700 text-white"
                }`}
              >
                {item.status === "pending" ? <Clock className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
            <Badge variant={item.status === "pending" ? "destructive" : "success"}>
              {item.status === "pending" ? "Pending" : "Approved"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
