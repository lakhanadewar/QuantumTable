import elements from './data/elements.json';
import type { ElementData } from '@/lib/types';

const elementsData: ElementData[] = elements as ElementData[];

export function getElements(): ElementData[] {
  return elementsData;
}

export function getElementByName(name: string): ElementData | undefined {
  return elementsData.find((el) => el.name.toLowerCase() === name.toLowerCase());
}
