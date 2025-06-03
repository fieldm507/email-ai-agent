import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>AgentFlow</title>
        <meta name="description" content="AI-powered email marketing for internet marketers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4`}>
        <main className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to AgentFlow</h1>
          <p className="text-gray-700 text-lg">Effortless AI marketing, personalized for your brand.</p>
          <div className="space-x-4">
            <Link href="/signup" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Sign Up</Link>
            <Link href="/login" className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">Log In</Link>
          </div>
        </main>

        <footer className="mt-12 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AgentFlow. All rights reserved.
        </footer>
      </div>
    </>
  );
}
