'use client';

import { getElements } from '@/lib/elements';
import ElementBlock from '@/components/ElementBlock';
import type { ElementData } from '@/lib/types';

interface PeriodicTableProps {
  searchTerm: string;
  onElementClick: (element: ElementData) => void;
}

export default function PeriodicTable({ searchTerm, onElementClick }: PeriodicTableProps) {
  const elements = getElements();
  const normalizedSearch = searchTerm.toLowerCase().trim();

  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div 
        className="grid gap-1 transform-style-3d" 
        style={{ 
          gridTemplateColumns: 'repeat(18, minmax(72px, 1fr))',
          gridAutoFlow: 'dense',
        }}
      >
        {elements.map((element: ElementData) => {
          const isMatch = element.name.toLowerCase().startsWith(normalizedSearch);
          const isDimmed = normalizedSearch.length > 0 && !isMatch;

          return (
            <div
              key={element.symbol}
              style={{ 
                gridColumn: `${element.xpos} / span 1`, 
                gridRow: `${element.ypos} / span 1` 
              }}
            >
              <ElementBlock 
                element={element} 
                isDimmed={isDimmed}
                onClick={() => onElementClick(element)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
