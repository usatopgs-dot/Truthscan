import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SEO from "../components/SEO";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_CLIENT = "ca-pub-4804671543634216";

function trackPageView(url) {
  if (!GA_ID || typeof window === "undefined") return;
  window.gtag?.("config", GA_ID, { page_path: url });
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // PWA Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    // Analytics page tracking
    const handleRouteChange = (url) => trackPageView(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>

    {/* ✅ Google Search Console Verify */}
  <meta 
    name="google-site-verification" 
    content="w0RbMm8zHWXytgHvZOnlQ23ctaLyLugXF0U2EDIL1_8" 
  />
        {/* ✅ Google AdSense */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />

        {/* ✅ Google Analytics */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `}} />
          </>
        )}
      </Head>

      <SEO />
      <Component {...pageProps} />
    </>
  );
}
