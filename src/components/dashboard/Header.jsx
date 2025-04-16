"use client"

import { Bell, Menu, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header({ toggleSidebar }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-background border-b">
      <div className="container-fluid h-full">
        <div className="flex justify-between items-center h-full px-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-3"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="text-2xl font-bold text-primary animate-pulse">HR</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px] rounded-full bg-background"
                aria-label="Search dashboard"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>

            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
            </div>

            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&crop=faces&w=40&h=40"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-primary hover:scale-110 transition-transform"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
