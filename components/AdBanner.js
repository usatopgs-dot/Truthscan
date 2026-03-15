// components/AdBanner.js
import { useEffect } from "react";

const CLIENT = "ca-pub-4804671543634216";
const SLOT   = "2742824469";

export default function AdBanner({ style = {} }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div style={{ textAlign:"center", margin:"16px 0",
      minHeight:90, borderRadius:12, overflow:"hidden",
      background:"#f8fafc", border:"1px solid #f1f5f9",
      ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display:"block" }}
        data-ad-client={CLIENT}
        data-ad-slot={SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
