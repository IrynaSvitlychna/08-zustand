import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";


type Props = {
    params: Promise<{ slug: string[] }>;
  };
 

  
  export default async function Notes({ params }: Props) {
    const { slug } = await params;
    const category = slug[0] === 'All' ? undefined : slug[0] as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

    
    
    const initialData = await fetchNotes( ``, 1, category);
  
    return <NotesClient initialData={initialData} tag={category} />;
  }