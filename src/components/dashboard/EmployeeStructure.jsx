import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmployeeStructure() {
  return (
    <Card className="transform perspective-1000 hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-base font-medium">Employee Structure</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center pb-16">
        <div className="flex justify-evenly w-full">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
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
                  className="text-blue-500 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 70) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-base font-medium">70%</div>
            </div>
            <div className="mt-3 text-muted-foreground">Male</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
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
                  className="text-red-500 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 30) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-base font-medium">30%</div>
            </div>
            <div className="mt-3 text-muted-foreground">Female</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
