"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { getSingleNote } from "@/lib/api";
import css from "./NoteDetails.module.css";
import { useRouter } from 'next/navigation';


const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const idNum = Number(id);
  const router = useRouter();


  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", idNum],
    queryFn: () => getSingleNote(idNum),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const handleGoBack = () => {
     const isSure = confirm('Are you sure?');
  if (isSure) {
    router.back();
  }
  };
 
  // const formattedDate = note.updatedAt
  //   ? `Updated at: ${note.updatedAt}`
  //   : `Created at: ${note.createdAt}`;


    return (
        <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <button onClick={handleGoBack}>Back</button>
            <h2>{note.title}</h2>
            <button className={css.editBtn}>Edit note</button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
    </div>
    )
};

export default NoteDetailsClient;