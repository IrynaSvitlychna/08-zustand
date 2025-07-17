export interface Note {
    id: number;
    title: string; // Заголовок нотатки
    content: string; // Текст нотатки
    createdAt: string; // Дата створення
    updatedAt: string; // Дата останнього оновлення 
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
 
export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
 
export const tags: Tag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

export type NewNote = {
  title: string;
  content: string;
  tag: string;
};