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
        <title>AgentFlow – The Future of AI Marketing</title>
        <meta name="description" content="AI-generated marketing that feels human and converts like crazy." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-black text-white flex flex-col items-center justify-center px-6`}>
        <main className="text-center space-y-6 max-w-2xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            The Future of AI Marketing is <span className="text-purple-400">Here</span>.
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 font-medium leading-relaxed">
            Imagine having an AI that writes <em>just like you</em>… but better. Emails, landing pages, hooks — done in seconds.
          </p>

          <div className="mt-6 space-x-4">
            <Link
              href="/signup"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded text-lg transition-all shadow-lg"
            >
              🚀 Start Free Trial
            </Link>
            <Link
              href="/login"
              className="inline-block text-purple-200 underline text-lg hover:text-white transition"
            >
              I already have an account
            </Link>
          </div>
        </main>

        <footer className="mt-20 text-xs text-purple-300">
          &copy; {new Date().getFullYear()} AgentFlow. Built for marketers. Powered by GPT.
        </footer>
      </div>
    </>
  );
}