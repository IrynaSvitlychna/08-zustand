'use client';

import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { type PaginatedNotesResponse } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import { type Tag } from '@/types/note';
  import {
    useQuery,
    keepPreviousData,
} from "@tanstack/react-query";
import Link from "next/link";

  
type NotesClientProps = {
    initialData: PaginatedNotesResponse;
  tag: string | undefined;
  };
  

const NotesClient = ({ initialData, tag }:NotesClientProps ) => {
    const [currentQuery, setCurrentQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearchQuery] = useDebounce(currentQuery, 500);
 
 
   
  
    const { data,  isLoading, isError, } = useQuery<
      PaginatedNotesResponse>({
        queryKey: ["notes", debouncedSearchQuery, currentPage, tag],
        queryFn: () =>
          fetchNotes(
            debouncedSearchQuery,
            currentPage,
            tag !== "All" ? (tag as Tag) : undefined
          ),
          placeholderData: keepPreviousData,
          initialData: initialData,
      });
  
        
    const handleSearch = (value: string) => {
      setCurrentQuery(value);
      setCurrentPage(1); 
    };
  
    return (
  
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={currentQuery} onSearch={handleSearch} />
          
          {data && data.totalPages > 1 && (
            <Pagination
            totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
  
          <Link  href={"/notes/action/create"} className={css.button}>
            Create note +
          </Link>
        </header>
        
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong</p>}
              
        {data && data.notes.length > 0 ? (
       <NoteList notes={data.notes} />
        ) : (
       <p>No notes found.</p>
        )}
      </div>
    );
  }
  
  export default NotesClient;