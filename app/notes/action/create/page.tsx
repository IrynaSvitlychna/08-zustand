import NoteForm from '@/components/NoteForm/NoteForm';
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Creating a new note in the app NoteHub",
  openGraph: {
    title: "Create note",
    description: "Creating a new note in the app NoteHub",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App",
      },
    ],
  }
};



export default function CreateNote () {
	
	
    return (
        <main className={css.main}>
             <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
  </div>
</main>

    );
}