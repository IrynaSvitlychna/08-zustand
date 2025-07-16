import { getSingleNote } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import PreviewDetailsClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetailsModal = async ({ params }: Props) => {
  const { id } = await params;
  const idNum = Number(id);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", idNum],
        queryFn: () => getSingleNote(idNum),
      });
  

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PreviewDetailsClient />
        </HydrationBoundary>
      );
};

export default NoteDetailsModal;