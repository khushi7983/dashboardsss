import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ApplicationCard({ title, value, percent, isUp, circlePercent, color }) {
  return (
    <div className="card bg-card rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 h-[200px]">
      <div className="flex flex-col items-center justify-between p-4 h-full text-center">
        <h5 className="text-base font-medium">{title}</h5>

        <div
          className={cn("text-2xl font-bold", {
            "text-blue-500": color === "blue",
            "text-yellow-500": color === "yellow",
            "text-red-500": color === "red",
          })}
        >
          {value}
        </div>

        <div className={cn("flex items-center text-sm", isUp ? "text-green-500" : "text-red-500")}>
          {isUp ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          {isUp ? "+" : "-"}
          {percent}%
        </div>

        <div className="relative w-14 h-14 mt-2">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-muted-foreground/10"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className={cn("transition-all duration-1000 ease-out", {
                "text-blue-500": color === "blue",
                "text-yellow-500": color === "yellow",
                "text-red-500": color === "red",
              })}
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * circlePercent) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">{circlePercent}%</div>
        </div>
      </div>
    </div>
  )
}
