import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function TodoCard() {
  const todoItems = [
    {
      title: "Review job applications",
      schedule: "Today, 11:00 AM",
      assignees: ["You"],
    },
    {
      title: "Conduct performance reviews",
      schedule: "Today, 2:00 PM",
      assignees: ["You", "Sarah"],
    },
    {
      title: "Update employee handbook",
      schedule: "Tomorrow, 10:00 AM",
      assignees: ["You", "Legal"],
    },
  ]

  return (
    <Card className="transform perspective-1000 hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-base font-medium">Todo List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {todoItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start py-2 border-b border-border last:border-0 hover:bg-muted/30 hover:pl-2 rounded-md transition-all"
          >
            <Checkbox id={`todo-${index}`} className="mt-1 mr-3" />
            <div>
              <label htmlFor={`todo-${index}`} className="font-medium cursor-pointer">
                {item.title}
              </label>
              <p className="text-xs text-muted-foreground mt-1">{item.schedule}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Assigned to:{" "}
                {item.assignees.map((assignee, i) => (
                  <span key={i}>
                    <a href="#" className="text-primary hover:underline">
                      {assignee}
                    </a>
                    {i < item.assignees.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
