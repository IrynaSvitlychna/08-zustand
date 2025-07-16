'use client';

import { useParams, useRouter } from 'next/navigation';
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import css from "./NotePreview.module.css";


const NotePreview = () => {

  const { id } = useParams();
  const router = useRouter();
  
  const closeModal = () => router.back();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote (Number(id)),
    refetchOnMount: false,
  });


  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        {isLoading && <p className={css.loading}>Loading note...</p>}

        {isError && (
          <div className={css.error}>
            <p>Failed to load note. Please try again later.</p>
            <button className={css.backBtn} onClick={closeModal}>
              Go back
            </button>
          </div>
        )}
        
        {note && (
        
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
              <button className={css.backBtn} onClick={closeModal}>
                Go back
              </button>
            </div>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{note?.createdAt}</p>
          </div>
        
      )}
    </div>
    </Modal>
  );
};

export default NotePreview;