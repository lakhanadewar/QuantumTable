'use client';

import type { ElementData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import ElementDetails from "@/components/ElementDetails";
import { categoryColors } from "@/lib/category-colors";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

const ElementModelViewer = dynamic(() => import("@/components/ElementModelViewer"), {
  ssr: false,
  loading: () => (
    <Card className="bg-card/50 backdrop-blur-sm overflow-hidden group">
            <CardContent>
        <Skeleton className="aspect-square w-full rounded-lg" />
      </CardContent>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Atomic Model</CardTitle>
      </CardHeader>
    </Card>
  ),
});


interface ElementSheetProps {
  element: ElementData | null;
  prevElement: ElementData | null;
  nextElement: ElementData | null;
  onOpenChange: (open: boolean) => void;
  onElementChange: (newElement: ElementData) => void;
}

export default function ElementSheet({ element, prevElement, nextElement, onOpenChange, onElementChange }: ElementSheetProps) {
  if (!element) return null;

  const colorInfo = categoryColors[element.category] || categoryColors['unknown'];

  return (
    <Sheet open={!!element} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-0 overflow-y-auto">
        <div className="p-6 relative">
          <SheetHeader className="pr-12">
            <SheetTitle asChild>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="font-headline text-4xl md:text-6xl font-bold" style={{ color: colorInfo.hex }}>
                  {element.name}
                </h1>
                <span className="font-headline text-4xl md:text-6xl text-muted-foreground">{element.symbol}</span>
              </div>
            </SheetTitle>
            <div className="flex items-center gap-2">
              <Badge
                className="text-sm"
                style={{
                  backgroundColor: `${colorInfo.hex}20`,
                  color: colorInfo.hex,
                  borderColor: `${colorInfo.hex}80`
                }}
              >
                {element.category}
              </Badge>
              <p className="text-muted-foreground">Atomic Number: {element.number}</p>
            </div>
          </SheetHeader>
          <SheetClose className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>

        <div className="p-6 pt-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ElementDetails element={element} />
          </div>
          <div className="lg:col-span-1">
            <ElementModelViewer
              name={element.name}
              modelUrl={element.bohr_model_3d}
            />
          </div>
        </div>

        <nav className="mt-8 p-6 flex justify-between items-center border-t border-border/20">
          {prevElement ? (
            <button
              type="button"
              onClick={() => onElementChange(prevElement)}
              className="group flex items-center gap-3 text-left transition-colors p-2 -ml-2 rounded-md"
            >
              <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Previous Element</p>
                <p className="text-lg font-bold text-foreground group-hover:text-primary">{prevElement.name}</p>
              </div>
            </button>
          ) : (
            <div /> // Placeholder to keep the 'Next' button to the right
          )}
          {nextElement ? (
            <button
              type="button"
              onClick={() => onElementChange(nextElement)}
              className="group flex items-center gap-3 text-right transition-colors p-2 -mr-2 rounded-md"
            >
              <div>
                <p className="text-sm text-muted-foreground">Next Element</p>
                <p className="text-lg font-bold text-foreground group-hover:text-primary">{nextElement.name}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
            </button>
          ) : (
            <div /> // Placeholder
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
