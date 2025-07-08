import { notFound } from "next/navigation";
import { getElementByName, getElements } from "@/lib/elements";
import ElementPageContent from "@/components/ElementPageContent";

export async function generateStaticParams() {
  const elements = getElements();
  return elements.map((element) => ({
    name: element.name,
  }));
}

export default async function ElementPage({ params }: { params: { name: string } }) {
  const { name } = params;
  const element = getElementByName(name);

  if (!element) {
    notFound();
  }

  const elements = getElements();
  const currentIndex = elements.findIndex(el => el.number === element.number);
  
  const prevElement = currentIndex > 0 ? elements[currentIndex - 1] : null;
  const nextElement = currentIndex < elements.length - 1 ? elements[currentIndex + 1] : null;

  return <ElementPageContent element={element} prevElement={prevElement} nextElement={nextElement} />;
}
