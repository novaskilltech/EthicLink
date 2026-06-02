"use client";

import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  profile: Profile;
  isLightTheme?: boolean;
}

export function SocialLinks({ profile, isLightTheme }: SocialLinksProps) {
  const socialPlatforms = [
    {
      key: "instagramUrl",
      url: profile.instagramUrl || (profile as any).instagram,
      label: "Instagram",
      color: "hover:text-[#E1306C] hover:shadow-[#E1306C]/20",
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      key: "tiktokUrl",
      url: profile.tiktokUrl || (profile as any).tiktok,
      label: "TikTok",
      color: "hover:text-[#00f2fe] hover:shadow-[#00f2fe]/20",
      svg: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.4-.43-.59-.67-.02 3.12 0 6.24-.01 9.36-.06 2.01-.76 4.09-2.28 5.4-1.63 1.5-3.99 2.1-6.17 1.83-2.58-.29-4.94-2.12-5.69-4.63-.98-3.08.41-6.61 3.29-7.98.71-.34 1.48-.51 2.27-.55.01 1.39-.02 2.77-.01 4.16-.62.06-1.27.26-1.75.68-.96.82-1.12 2.3-.39 3.32.61.92 1.8 1.34 2.86 1.09 1.19-.24 2.08-1.34 2.11-2.55.02-3.85.01-7.7.01-11.55z"/>
        </svg>
      )
    },
    {
      key: "youtubeUrl",
      url: profile.youtubeUrl || (profile as any).youtube,
      label: "YouTube",
      color: "hover:text-[#FF0000] hover:shadow-[#FF0000]/20",
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      )
    },
    {
      key: "linkedinUrl",
      url: profile.linkedinUrl || (profile as any).linkedin,
      label: "LinkedIn",
      color: "hover:text-[#0077B5] hover:shadow-[#0077B5]/20",
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      key: "facebookUrl",
      url: profile.facebookUrl || (profile as any).facebook,
      label: "Facebook",
      color: "hover:text-[#1877F2] hover:shadow-[#1877F2]/20",
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      )
    },
    {
      key: "whatsappUrl",
      url: profile.whatsappUrl || (profile as any).whatsapp,
      label: "WhatsApp",
      color: "hover:text-[#25D366] hover:shadow-[#25D366]/20",
      svg: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
        </svg>
      )
    }
  ];

  const activeSocials = socialPlatforms.filter(p => p.url);

  if (activeSocials.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-5 pt-3 pb-1 z-30">
      {activeSocials.map((platform) => {
        // Handle simple username input instead of full URL for WhatsApp or social links
        let href = platform.url;
        if (platform.key === "whatsappUrl" && href && !href.startsWith("http") && !href.startsWith("https")) {
          // Clean phone number from spaces/special chars
          const cleaned = href.replace(/\D/g, "");
          href = `https://wa.me/${cleaned}`;
        } else if (href && !href.startsWith("http") && !href.startsWith("https")) {
          // Fallback guess if user put just their username
          if (platform.key === "instagramUrl") href = `https://instagram.com/${href}`;
          else if (platform.key === "tiktokUrl") href = `https://tiktok.com/@${href}`;
          else if (platform.key === "youtubeUrl") href = `https://youtube.com/@${href}`;
          else if (platform.key === "facebookUrl") href = `https://facebook.com/${href}`;
          else if (platform.key === "linkedinUrl") href = `https://linkedin.com/in/${href}`;
        }

        return (
          <a
            key={platform.key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.label}
            className={cn(
              "p-2.5 rounded-full border transition-all duration-300 transform hover:scale-115 hover:shadow-lg",
              isLightTheme 
                ? "bg-slate-100/80 border-slate-900/10 text-slate-700 hover:bg-slate-200" 
                : "bg-white/5 border-white/5 text-on-surface-variant hover:bg-white/10 hover:border-white/20",
              platform.color
            )}
          >
            {platform.svg}
            <span className="sr-only">{platform.label}</span>
          </a>
        );
      })}
    </div>
  );
}
