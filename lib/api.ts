import axios from "axios";
import { Note, Tag} from "../types/note";


  export interface PaginatedNotesResponse {
    notes: Note[];
    totalPages: number;
  }  

export interface DeletedNoteInfo {
  deletedNoteId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}  

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
// axios.defaults.baseURL = 'https://notehub-public.goit.study/api'

 
const request = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const getSingleNote = async (id: number): Promise<Note> => {
  const { data } = await request.get<Note>(`/notes/${id}`);
  return data;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: Tag,
): Promise<PaginatedNotesResponse> => {
  
  const params: {
    search?: string;
    page: number;
    perPage: number;
    tag?: string;
  } = {
    ...(search !== "" && { search: search }),
    page,
    perPage: 12,
    ...(tag && { tag }),
  }
 
  const response = await request.get("/notes", {
    params
  });

  return response.data
   
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {

  const response = await request.post<Note>("/notes", note);
  
  return response.data;
  
};

export const deleteNote = async (id: number): Promise<DeletedNoteInfo> => {
 
    const response = await request.delete<DeletedNoteInfo>(`/notes/${id}`);

    return response.data;
  
};

