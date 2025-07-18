
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer"
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is a simple and efficient application designed for managing personal notes",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub is a simple and efficient application designed for managing personal notes",
    url: "https://notehub.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
 
  return (
    
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html> 
  );
}
