"use client";

import { trackLinkClick } from "@/lib/analytics";

interface TrackedLinkProps {
  slug: string;
  linkId: string;
  url: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackedLink({ slug, linkId, url, children, className }: TrackedLinkProps) {
  const handleClick = async () => {
    // We use slug as page identifier in Firestore paths
    try {
      await trackLinkClick(slug, linkId);
    } catch (e) {
      console.error("Tracking Error:", e);
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
