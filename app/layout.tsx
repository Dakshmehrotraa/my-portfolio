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
  metadataBase: new URL("https://dakshmehrotra.vercel.app"),
  title: "Daksh Mehrotra — AI/ML & Full-Stack Engineer",
  description:
    "Computer science student building multimodal AI, agentic LLM tools and full-stack products. Winner of the Schneider Electric HMI Hackathon. Projects in emotion recognition, psychological screening, industrial AI and security.",
  keywords: [
    "Daksh Mehrotra", "AI Engineer", "Machine Learning", "Full-Stack Developer",
    "Multimodal AI", "LLM", "FastAPI", "Next.js", "PyTorch", "Portfolio",
  ],
  authors: [{ name: "Daksh Mehrotra", url: "https://github.com/Dakshmehrotraa" }],
  openGraph: {
    title: "Daksh Mehrotra — AI/ML & Full-Stack Engineer",
    description:
      "Multimodal AI, agentic LLM tools and full-stack products. Winner of the Schneider Electric HMI Hackathon.",
    url: "https://dakshmehrotra.vercel.app",
    siteName: "Daksh Mehrotra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daksh Mehrotra — AI/ML & Full-Stack Engineer",
    description:
      "Multimodal AI, agentic LLM tools and full-stack products. Winner of the Schneider Electric HMI Hackathon.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
