'use client'

import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { createNote } from "../../lib/api";
import { useRef } from "react";
import { useRouter } from "next/navigation";

// interface NoteFormProps {
//   onClose: () => void; 
// }

// Схема валідації за допомогою Yup
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag selected"
    )
    .required("Tag is required"),
});

export default function NoteForm( ){
   
  const queryClient = useQueryClient(); // Ініціалізуємо queryClient
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  // const close = () => router.push("/notes");
  
  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as string;

    mutate({ title, content, tag });
  };
 
  const {mutate, isPending} = useMutation({
    mutationFn: createNote, // Функція з noteService, яка виконує POST-запит
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Інвалідуємо кеш запитів "notes"
      // close();
      router.push("/notes");
      toast.success("Note created"); 
    },
    onError: (error) => {
      console.error("Error creating note:", error); // Повідомлення про помилку
     
      toast.error("Failed to create note. Please try again.")
    },
  });



  return (
    <form
    ref={formRef}
    action={handleSubmit}
   className={css.form}
    >
  <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input} 
        // minLenght={3}
        // maxLenght={50}
          required
        />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea 
      id="content"
      name="content"
      rows={8}
          className={css.textarea}
        > </textarea>
     </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
      </div>

  <div className={css.actions}>
          <button type="button" className={css.cancelButton} >
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={isPending}
    >
      Create note
    </button>
        </div>
</form>

    );
}