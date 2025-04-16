import { Button } from "@/components/ui/button"

export default function WelcomeCard() {
  return (
    <div className="bg-card rounded-xl shadow-md p-6 mb-6 text-center animate-float">
      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&crop=faces&w=100&h=100"
        alt="User"
        className="w-24 h-24 rounded-full border-3 border-primary mx-auto mb-4"
        loading="lazy"
      />
      <p className="text-lg font-semibold">Welcome back, Kavin!</p>
      <p className="text-sm text-muted-foreground mb-4">April 12, 2025</p>
      <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
        View Profile
      </Button>
    </div>
  )
}
