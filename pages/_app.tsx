import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartContextProvider } from "@/context/CartContextProvider";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Analytics />
      </>
    </CartContextProvider>
  );
}
