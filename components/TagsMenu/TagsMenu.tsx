'use client';

import css from "./TagsMenu.module.css";
import { useState } from 'react';
import Link from 'next/link';
import {tags} from "../../types/note"



const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleCloseMenu = () => {
        setIsOpen(false);
      };

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}>
                Notes
            </button>
        {isOpen && (
          <ul className={css.menuList}>
            <li className={css.menuItem}>
              <Link href={`/notes/filter/All`} onClick={handleCloseMenu}>
              All notes
            </Link>
             </li>
                {tags.map((tag) => (
                  <li key={tag} className={css.menuItem}>
                    <Link
                      href={`/notes/filter/${tag}`}
                      className={css.menuLink}
                      onClick={handleCloseMenu}
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
        </div>
    );
};
export default TagsMenu;