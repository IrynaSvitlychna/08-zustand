import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";
import { Tag } from "@/types/note";



type Props = {
    params: Promise<{ slug: string[] }>;
  };
 

  
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag: Tag | string = slug[0];

  return {
    title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
    description: `Browse notes tagged with ${
      tag === 'All' ? 'all tags' : tag
    }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
    openGraph: {
      title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
      description: `Browse notes tagged with ${
        tag === 'All' ? 'all tags' : tag
      }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes - ${tag === 'All' ? 'All Tags' : tag} | NoteHub`,
        },
      ],
    },
  };
}

  export default async function Notes({ params }: Props) {
    const { slug } = await params;
    const category = slug[0] === 'All' ? undefined : slug[0] as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

    
    
    const initialData = await fetchNotes( ``, 1, category);
  
    return <NotesClient initialData={initialData} tag={category} />;
  }