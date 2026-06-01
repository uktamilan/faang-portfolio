import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Udayakumar S | Java Full Stack Developer | Spring Boot & React Specialist",
  description:
    "Explore the premium engineering portfolio of Udayakumar S. Java Full Stack Developer specializing in Spring Boot, React, high-performance microservices, PostgreSQL, and scalable systems.",
  keywords: [
    "Udayakumar S",
    "Java Developer",
    "Java Full Stack Developer",
    "Spring Boot Developer",
    "Microservices Engineer",
    "React Developer",
    "FAANG Portfolio",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Udayakumar S" }],
  openGraph: {
    title: "Udayakumar S | Java Full Stack Developer Portfolio",
    description:
      "Enterprise-grade Java backend microservices and premium React frontend experiences built by Udayakumar S.",
    url: "https://udayakumar-portfolio-pearl.vercel.app/",
    siteName: "Udayakumar S Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udayakumar S | Java Full Stack Developer Portfolio",
    description:
      "Enterprise-grade Java backend microservices and premium React frontend experiences built by Udayakumar S.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
