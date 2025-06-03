// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar'; // ✅ case matches file name
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <>
      <NavBar />
      {isHome ? (
        <Component {...pageProps} />
      ) : (
        <main className="min-h-screen bg-gray-100 p-4">
          <Component {...pageProps} />
        </main>
      )}
    </>
  );
}
