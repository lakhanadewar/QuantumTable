'use client';

import type { ElementData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import ElementDetails from "@/components/ElementDetails";
import { categoryColors } from "@/lib/category-colors";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ElementModelViewer = dynamic(() => import("@/components/ElementModelViewer"), {
  ssr: false,
  loading: () => (
    <Card className="bg-card/50 backdrop-blur-sm overflow-hidden group">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Atomic Model</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-square w-full rounded-lg" />
      </CardContent>
    </Card>
  ),
});


interface ElementPageContentProps {
  element: ElementData;
  prevElement: ElementData | null;
  nextElement: ElementData | null;
}

export default function ElementPageContent({ element, prevElement, nextElement }: ElementPageContentProps) {
  const colorInfo = categoryColors[element.category] || categoryColors['unknown'];

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Table
      </Link>
      <motion.header 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <h1 className="font-headline text-5xl md:text-7xl font-bold" style={{ color: colorInfo.hex }}>
            {element.name}
          </h1>
          <span className="font-headline text-5xl md:text-7xl text-muted-foreground">{element.symbol}</span>
        </div>
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
      </motion.header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ElementModelViewer 
            name={element.name}
            modelUrl={element.bohr_model_3d}
          />
        </div>
        <div className="lg:col-span-2">
          <ElementDetails element={element} />
        </div>
      </div>
      
      <nav className="mt-12 flex justify-between items-center border-t border-border/20 pt-6">
        {prevElement ? (
          <Link
            href={`/element/${prevElement.name}`}
            className="group flex items-center gap-3 text-left transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Previous Element</p>
              <p className="text-lg font-bold text-foreground group-hover:text-primary">{prevElement.name}</p>
            </div>
          </Link>
        ) : (
          <div /> // Placeholder to keep the 'Next' button to the right
        )}
        {nextElement ? (
          <Link
            href={`/element/${nextElement.name}`}
            className="group flex items-center gap-3 text-right transition-colors"
          >
            <div>
              <p className="text-sm text-muted-foreground">Next Element</p>
              <p className="text-lg font-bold text-foreground group-hover:text-primary">{nextElement.name}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
          </Link>
        ) : (
          <div /> // Placeholder
        )}
      </nav>
    </motion.div>
  );
}
