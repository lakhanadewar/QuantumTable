'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ElementData } from "@/lib/types";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface ElementDetailsProps {
  element: ElementData;
}

export default function ElementDetails({ element }: ElementDetailsProps) {
  const properties = [
    { label: "Atomic Mass", value: `${element.atomic_mass} u` },
    { label: "Density", value: element.density ? `${element.density} g/L` : null },
    { label: "Melting Point", value: element.melt ? `${element.melt} K` : null },
    { label: "Boiling Point", value: element.boil ? `${element.boil} K` : null },
    { label: "Molar Heat", value: element.molar_heat ? `${element.molar_heat} J/(mol·K)` : null },
    { label: "Phase", value: element.phase },
    { label: "Discovered by", value: element.discovered_by },
    { label: "Named by", value: element.named_by },
    { label: "Electron Config", value: element.electron_configuration },
    { label: "Electronegativity", value: element.electronegativity_pauling },
    { label: "Electron Affinity", value: element.electron_affinity ? `${element.electron_affinity} kJ/mol` : null },
    { label: "Ionization Energies", value: Array.isArray(element.ionization_energies) ? `${element.ionization_energies.slice(0, 3).join(', ')} kJ/mol` : (element.ionization_energies ? `${element.ionization_energies} kJ/mol` : null) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="bg-card/50 backdrop-blur-sm h-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Element Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="mt-4 space-y-4">
              <p className="text-muted-foreground leading-relaxed">{element.summary}</p>
              
              {element.fun_fact && (
                <div className="mt-4 pt-4 border-t border-border/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    <h4 className="font-headline text-lg font-semibold text-accent">Fun Fact</h4>
                  </div>
                  <blockquote className="border-l-2 border-accent pl-4 italic text-foreground/80">
                    {element.fun_fact}
                  </blockquote>
                </div>
              )}
            </TabsContent>
            <TabsContent value="properties" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {properties.map((prop) => (
                  prop.value ? (
                    <div key={prop.label}>
                      <p className="font-semibold text-foreground">{prop.label}</p>
                      <p className="text-muted-foreground text-sm">{prop.value}</p>
                    </div>
                  ) : null
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
