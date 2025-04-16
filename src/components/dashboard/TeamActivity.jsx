import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TeamActivity() {
  const activities = [
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&crop=faces&w=40&h=40",
      name: "Emily Davis",
      action: "Added new candidate profile",
      time: "2h ago",
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&crop=faces&w=40&h=40",
      name: "Mark Wilson",
      action: "Updated project milestones",
      time: "5h ago",
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&crop=faces&w=40&h=40",
      name: "Nina Robinson",
      action: "Approved 3 leave requests",
      time: "8h ago",
    },
  ]

  return (
    <Card className="transform perspective-1000 hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-base font-medium">Team Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-border last:border-0 hover:bg-muted/30 hover:pl-2 rounded-md transition-all"
          >
            <div className="flex items-center">
              <img
                src={activity.image || "/placeholder.svg"}
                alt={activity.name}
                className="w-10 h-10 rounded-full border-2 border-primary mr-3"
                loading="lazy"
              />
              <div>
                <p className="font-medium">{activity.name}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
              </div>
            </div>
            <Badge variant="primary">{activity.time}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
