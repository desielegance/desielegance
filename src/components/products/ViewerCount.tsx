"use client";

import { useEffect, useState } from "react";

export default function ViewerCount() {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const generate = () =>
      setViewCount(Math.floor(Math.random() * 100) + 1);


    generate(); // initial client-only value

    const interval = setInterval(generate, 4000);
    return () => clearInterval(interval);
  }, []);

  if (viewCount === null) return null; // or a placeholder

  return (
    <span className="text-xs font-medium uppercase tracking-wider">
      {viewCount} People viewing now
    </span>
  );
}
