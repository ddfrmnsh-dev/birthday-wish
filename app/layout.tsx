import type { Metadata } from "next";
import { Geist, Geist_Mono, Edu_SA_Beginner } from "next/font/google";
import "./globals.css";

const edu = Edu_SA_Beginner({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-edu",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ayun's Birthday 25th 💐🎉🥳",
  description: "Isi webnya adalah pokoknya surprise buat Ayuns.",
  icons: {
    icon: "/icon.png",      // favicon yang kamu taruh di public/
    shortcut: "/icon.png",  // kadang dibutuhkan supaya konsisten
    apple: "/icon.png"
  },
  openGraph: {
    title: "Ayun's Birthday 25th 💐🎉🥳",
    description: "Isi webnya adalah pokoknya surprise buat Ayuns.",
    images: [
      {
        url: "https://ayuns-birthday.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      }
    ],
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${edu.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
