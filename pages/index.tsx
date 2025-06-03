// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>AgentFlow – The AI Future of Marketing</title>
        <meta name="description" content="Your voice. Our AI. Infinite leverage." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full bg-gradient-to-br from-[#1a1a40] via-[#3f0d7e] to-[#0f172a] text-white flex items-center justify-center`}
      >
        <main className="w-full max-w-3xl px-6 text-center flex flex-col items-center justify-center space-y-8">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-cyan-400">AgentFlow</span> is your<br />
            <span className="text-pink-400">AI-powered</span> marketing assistant.
          </h1>

          <p className="text-xl sm:text-2xl text-purple-200 leading-relaxed">
            Write high-converting emails, landing pages, and ad scripts — in seconds. Trained on your voice. Fueled by GPT. Built for marketers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition"
            >
              🚀 Start Free Trial
            </Link>
            <Link
              href="/login"
              className="text-purple-300 hover:text-white text-lg underline transition"
            >
              I already have an account
            </Link>
          </div>

          <p className="text-sm text-purple-400 mt-10 italic">
            Join the future of automated content. It&rsquo;s weirdly human.
          </p>
        </main>
      </div>
    </>
  );
}