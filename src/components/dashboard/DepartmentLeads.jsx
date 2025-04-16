import { Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DepartmentLeads() {
  const leads = [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&crop=faces&w=40&h=40",
      name: "David Miller",
      role: "Marketing Director",
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&crop=faces&w=40&h=40",
      name: "Jennifer Lee",
      role: "Development Lead",
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&crop=faces&w=40&h=40",
      name: "Robert Johnson",
      role: "Sales Manager",
    },
  ]

  return (
    <Card className="transform perspective-1000 hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-base font-medium">Department Leads</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {leads.map((lead, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-border last:border-0 hover:bg-muted/30 hover:pl-2 rounded-md transition-all"
          >
            <div className="flex items-center">
              <img
                src={lead.image || "/placeholder.svg"}
                alt={lead.name}
                className="w-10 h-10 rounded-full border-2 border-primary mr-3"
                loading="lazy"
              />
              <div>
                <p className="font-medium">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{lead.role}</p>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
