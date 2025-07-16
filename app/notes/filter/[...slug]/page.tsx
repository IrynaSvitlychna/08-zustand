import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";



type Props = {
    params: Promise<{ slug: string[] }>;
  };
 
export const generateMetaData = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const category = slug[0] === 'All' ? undefined : slug[0] as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  const data = await fetchNotes(``, 1, category);
  
  return {
    title: category ? `${category} notes` : 'All notes',
    description: `Filter notes by category ${category ?? 'All'}`,
    openGraph: {
      title: category ? `${category} notes` : 'All notes',
      description: `Filter notes by category ${category ?? 'All'}`,
      url: `https://notehub.com/notes/filter/123`,
      images: [
         {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: ``,
        },
      ],
    }
  }
}
  
  export default async function Notes({ params }: Props) {
    const { slug } = await params;
    const category = slug[0] === 'All' ? undefined : slug[0] as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

    
    
    const initialData = await fetchNotes( ``, 1, category);
  
    return <NotesClient initialData={initialData} tag={category} />;
  }