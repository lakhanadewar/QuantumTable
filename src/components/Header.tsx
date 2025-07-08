'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, LayoutGrid, TestTube2 } from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Explorer", icon: LayoutGrid },
  { href: "#", label: "Learn", icon: BookOpenText },
  { href: "#", label: "Quizzes", icon: TestTube2 },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center gap-2">
          <Logo />
          <span className="font-headline text-xl font-bold tracking-tighter">Quantum Table</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                (pathname === item.href) ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
          {/* Mobile Nav */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background/95 p-2">
            <nav className="flex justify-around">
            <TooltipProvider>
              {navItems.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-12 w-12 flex-col items-center justify-center rounded-md transition-colors",
                         (pathname === item.href) ? "bg-accent/50 text-accent" : "text-foreground/60 hover:bg-muted"
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              </TooltipProvider>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
