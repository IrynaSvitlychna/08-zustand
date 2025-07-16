import css from './page.module.css';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Error 404 - Page Not Found",
  description: "Sorry, the page you are looking for does not exist",
  openGraph: {
    title: "Error 404 - Page Not Found",
    description: "Sorry, the page you are looking for does not exist",
    url: "https://notehub.com/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404",
      },
    ],
  }
};

const NotFound = () => {
  return (
      <div>
          <h1 className={css.title}>404 - Page not found</h1>
          <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
          <Link href="/">Go back home</Link>
          </div>
  );
};

export default NotFound;