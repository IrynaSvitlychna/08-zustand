import Link from 'next/link';
import css from './SidebarNotes.module.css';
import {tags} from '@/types/note';





const NotesSidebar = async () => {
 

  return (
            <ul className={css.menuList}>
         <li className={css.menuItem}>
          <Link href={`/notes/filter/All`} className={css.menuLink}> All </Link>
          </li>
            {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}> {tag} </Link>
        </li>
      ))}    
    </ul>
  );
}

export default NotesSidebar