'use client';
import { useState } from 'react';
import PeriodicTable from "@/components/PeriodicTable";
import { motion } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type { ElementData } from '@/lib/types';
import ElementSheet from '@/components/ElementSheet';
import { getElements } from '@/lib/elements';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  
  const elements = getElements();

  const handleElementClick = (element: ElementData) => {
    setSelectedElement(element);
  };

  const handleSheetClose = (open: boolean) => {
    if (!open) {
      setSelectedElement(null);
    }
  };

  const handleElementChange = (newElement: ElementData) => {
    setSelectedElement(newElement);
  };
  
  const currentIndex = selectedElement ? elements.findIndex(el => el.number === selectedElement.number) : -1;
  const prevElement = currentIndex > 0 ? elements[currentIndex - 1] : null;
  const nextElement = currentIndex > -1 && currentIndex < elements.length - 1 ? elements[currentIndex + 1] : null;


  return (
    <motion.div
      className="container mx-auto px-4 py-8 perspective"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2 text-glow">
          Quantum Table
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          An Interactive 3D Periodic Table of Elements
        </p>
      </div>

      <div className="relative mb-8 w-full max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search element by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
          aria-label="Search for an element"
        />
      </div>

      <PeriodicTable searchTerm={searchTerm} onElementClick={handleElementClick} />
      
      <ElementSheet
        element={selectedElement}
        prevElement={prevElement}
        nextElement={nextElement}
        onOpenChange={handleSheetClose}
        onElementChange={handleElementChange}
      />
    </motion.div>
  );
}
