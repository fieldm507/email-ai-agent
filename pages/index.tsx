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
        <title>AgentFlow – AI Marketing Assistant</title>
        <meta name="description" content="Generate persuasive marketing emails effortlessly with AI trained on your brand voice." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} bg-gray-950 text-white min-h-screen flex flex-col`}>
        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center flex-1 px-4 py-24 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight">
            Your AI Marketing Assistant.
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mt-4 max-w-xl">
            AgentFlow learns your voice and writes high-converting marketing emails — so you can scale faster without burnout.
          </p>

          <div className="mt-8 space-x-4">
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg transition"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="text-gray-300 hover:underline text-lg"
            >
              Already have an account?
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-600 border-t border-gray-800">
          &copy; {new Date().getFullYear()} AgentFlow. Built for internet marketers, powered by AI.
        </footer>
      </div>
    </>
  );
}