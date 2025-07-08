"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkMode = resolvedTheme === "dark"

  return (
    <Switch
      checked={isDarkMode}
      onCheckedChange={() => setTheme(isDarkMode ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-3 w-3 rotate-0 scale-100 text-foreground transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-3 w-3 rotate-90 scale-0 text-foreground transition-all dark:rotate-0 dark:scale-100" />
    </Switch>
  )
}
