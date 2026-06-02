"use client";

import { trackLinkClick } from "@/lib/analytics";

interface TrackedLinkProps {
  slug: string;
  linkId: string;
  url: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function TrackedLink({ slug, linkId, url, children, className, style, onClick }: TrackedLinkProps) {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (!e.defaultPrevented) {
      // We use slug as page identifier in Firestore paths
      try {
        await trackLinkClick(slug, linkId);
      } catch (err) {
        console.error("Tracking Error:", err);
      }
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
