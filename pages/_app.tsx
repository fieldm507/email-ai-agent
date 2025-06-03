// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/NavBar';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <>
      <Navbar />
      {isHome ? (
        // Home page has full-screen freedom
        <Component {...pageProps} />
      ) : (
        // Other pages get the padded layout
        <main className="min-h-screen bg-gray-100 p-4">
          <Component {...pageProps} />
        </main>
      )}
    </>
  );
}
