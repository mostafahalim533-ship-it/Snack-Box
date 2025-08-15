import React, { useEffect, useRef } from "react";

interface TikTokEmbedProps {
  embedCode: string;
}

export default function TikTokEmbed({ embedCode }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // TikTok script is loaded globally, try to render embeds
      if ((window as any).tiktokEmbed?.lib?.render) {
        (window as any).tiktokEmbed.lib.render();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="tiktok-embed-container w-full max-w-[605px] min-w-[325px] mx-auto"
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
}
