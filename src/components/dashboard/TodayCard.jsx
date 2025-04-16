import { CakeIcon as BirthdayCake, Home, Thermometer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TodayCard() {
  const todayItems = [
    {
      title: "Sarah's Birthday",
      subtitle: "Marketing Department",
      type: "birthday",
      icon: BirthdayCake,
    },
    {
      title: "Mike on Sick Leave",
      subtitle: "Development Team",
      type: "sick",
      icon: Thermometer,
    },
    {
      title: "Design Team Working Remote",
      subtitle: "5 Members",
      type: "remote",
      icon: Home,
    },
  ]

  return (
    <Card className="transform perspective-1000 hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-base font-medium">Today</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-border last:border-0 hover:bg-muted/30 hover:pl-2 rounded-md transition-all"
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  item.type === "birthday"
                    ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
                    : item.type === "sick"
                      ? "bg-gradient-to-br from-red-500 to-red-700 text-white"
                      : "bg-gradient-to-br from-yellow-500 to-yellow-700 text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
            <Badge variant={item.type === "birthday" ? "info" : item.type === "sick" ? "destructive" : "secondary"}>
              {item.type === "birthday" ? "Birthday" : item.type === "sick" ? "Sick Leave" : "Remote"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
