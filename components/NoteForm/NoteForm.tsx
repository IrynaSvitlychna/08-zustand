'use client'

import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import * as Yup from "yup";
import toast from 'react-hot-toast';
import { createNote } from "../../lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";



// Схема валідації за допомогою Yup
// const validationSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title must be at most 50 characters")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Content must be at most 500 characters"),
//   tag: Yup.string()
//     .oneOf(
//       ["Todo", "Work", "Personal", "Meeting", "Shopping"],
//       "Invalid tag selected"
//     )
//     .required("Tag is required"),
// });

export default function NoteForm( ){
   
  const queryClient = useQueryClient(); // Ініціалізуємо queryClient
  const router = useRouter();
  
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
 
  const {mutate, isPending} = useMutation({
    mutationFn: createNote, // Функція з noteService, яка виконує POST-запит
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Інвалідуємо кеш запитів "notes"
      clearDraft(); // очищаємо чернетку
      router.back(); // повертаємося на попередню сторінку
      toast.success("Note created"); 
    },
    onError: (error) => {
      console.error("Error creating note:", error); // Повідомлення про помилку
     
      toast.error("Failed to create note. Please try again.")
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(draft); // використовуємо draft напряму
  };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleCancel = () => {
    router.back(); // повернення без очищення draft
  };

    return (
    <form
    onSubmit={handleSubmit}
   className={css.form}
    >
  <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input} 
       value={draft.title}
          required
          onChange={handleChange}
        />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea 
      id="content"
      name="content"
      rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        /> 
     </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
      </div>

  <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={handleCancel}>
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