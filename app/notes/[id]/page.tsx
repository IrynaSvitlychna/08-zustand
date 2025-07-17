import { getSingleNote } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetaData = async ({ params }: Props): Promise<Metadata> => {
const { id } = await params;
  const idNum = Number(id);

  const note = await getSingleNote(idNum);

    return {
     title: `Note: ${note.title}`, 
      description: note.content.slice(0, 30), 
      openGraph: {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 100),
        url: `https://notehub.com/notes/${idNum}`,
        images: [
           {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
        ],
    }
  }
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const idNum = Number(id);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getSingleNote(idNum),
      });
  

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
      );
};

export default NoteDetails;