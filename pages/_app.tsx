// pages/_app.tsx
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <Component {...pageProps} />
        </div>
      </main>
      <footer className="bg-gray-900 border-t border-gray-700 text-center text-sm text-gray-400 py-6">
        Built with 💡 by <span className="text-blue-400 font-semibold">AgentFlow</span> – Your AI Marketing Team
      </footer>
    </>
  );
}
