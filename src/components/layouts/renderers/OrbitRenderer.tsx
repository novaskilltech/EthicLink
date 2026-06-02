"use client";

import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
import { Globe, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SocialLinks } from "../../public/SocialLinks";

export function OrbitRenderer({ links, profile }: { links: LinkItem[], profile: Profile }) {
  const activeLinks = links.filter(l => l.active).sort((a,b) => (a.order || 0) - (b.order || 0));
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track rotation angles
  const [rotation, setRotation] = useState({ x: -15, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Prevent SSR hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto rotation speed when not dragging
  useEffect(() => {
    if (!isMounted || isDragging) return;
    const interval = setInterval(() => {
      setRotation(prev => ({ ...prev, y: prev.y + 0.15 }));
    }, 16);
    return () => clearInterval(interval);
  }, [isMounted, isDragging]);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.2)),
      y: prev.y + deltaX * 0.2
    }));
    
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;
    
    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.2)),
      y: prev.y + deltaX * 0.2
    }));
    
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Theme and shape settings
  const isLightTheme = !!(profile.theme === "LIGHT_GLASS" || (profile.bgColor && ["#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#fdf2f8"].includes(profile.bgColor.toLowerCase())));
  const accentColor = profile.themeColor || (profile.theme === "MIDNIGHT_LIME" ? "#bfff00" : "#8083ff");

  const getShapeClass = (style?: string) => {
    switch (style) {
      case "SOFT": return "rounded-xl";
      case "SHARP": return "rounded-none";
      default: return "rounded-2xl"; // ROUNDED
    }
  };

  // Spherical coordinates calculation
  const total = activeLinks.length;
  const radius = 260; // Sphere radius in pixels

  return (
    <div 
      className="min-h-screen text-on-surface selection:bg-primary/30 flex flex-col justify-between relative overflow-hidden select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      {/* Sci-fi Space Background with real Milky Way background image and Hexagonal grid overlay */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        style={profile.bgColor && profile.bgColor !== "SPACE_STARRED" ? { backgroundColor: profile.bgColor } : { backgroundColor: "black" }}
      >
        {/* Milky Way Background Image (only shown if no custom solid bgColor is set or if explicitly set to SPACE_STARRED) */}
        {(!profile.bgColor || profile.bgColor === "SPACE_STARRED") && (
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-screen"
            style={{
              backgroundImage: `url("/images/milky_way_bg.png")`
            }}
          />
        )}

        {/* Deep space nebula glowing colors overlay */}
        {(!profile.bgColor || profile.bgColor === "SPACE_STARRED") && (
          <>
            <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vh] rounded-full bg-teal-500/10 blur-[130px] opacity-40" />
            <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vh] rounded-full bg-sky-500/10 blur-[150px] opacity-30" />
          </>
        )}
        
        {/* Hexagonal grid pattern (matching the top-right and overall background grid of the image) */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='97' viewBox='0 0 56 97'%3E%3Cpath d='M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z M28 97 L56 80.84 L56 48.5 L28 64.66 L0 48.5 L0 80.84 Z' fill='none' stroke='%2338bdf8' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "56px 97px"
          }}
        />
      </div>

      <main 
        className="max-w-6xl mx-auto w-full px-6 pt-16 pb-24 flex-1 flex flex-col items-center justify-center"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Helper guide */}
        <div className="absolute top-24 text-center pointer-events-none">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] opacity-40">
            Faites tourner l'orbite 3D pour naviguer
          </span>
        </div>

        {/* 3D Sphere Container */}
        <div 
          ref={containerRef}
          className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ perspective: "1000px" }}
        >
          {/* Central Core (User Avatar) with sci-fi rings */}
          <div 
            className="absolute z-20 w-28 h-28 flex items-center justify-center pointer-events-none"
            style={{ 
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
              transition: isDragging ? "none" : "transform 0.1s linear"
            }}
          >
            {/* Outer glowing ring */}
            <div 
              className="absolute w-28 h-28 rounded-full border-2 opacity-80 animate-pulse"
              style={{ 
                borderColor: accentColor, 
                boxShadow: `0 0 20px ${accentColor}, inset 0 0 20px ${accentColor}`,
                transform: "translateZ(0px)" 
              }}
            />
            {/* Inner secondary ring */}
            <div 
              className="absolute w-24 h-24 rounded-full border opacity-50"
              style={{ 
                borderColor: accentColor,
                transform: "translateZ(5px)"
              }}
            />
            
            {/* Real Avatar */}
            <div 
              className="w-20 h-20 rounded-full overflow-hidden border-2 bg-black relative"
              style={{ 
                borderColor: accentColor,
                transform: "translateZ(10px)"
              }}
            >
              {profile.image ? (
                <img src={profile.image} alt={profile.displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-black text-white">
                  {profile.displayName?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            
            {/* Central name tag */}
            <div 
              className="absolute -bottom-8 bg-black/80 px-3 py-1 rounded-full border text-[0.65rem] font-bold tracking-wider uppercase text-white whitespace-nowrap"
              style={{ 
                borderColor: accentColor,
                transform: "translateZ(15px)"
              }}
            >
              {profile.displayName}
            </div>
          </div>

          {/* Spherical orbit grid */}
          <div 
            className="w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? "none" : "transform 0.1s linear"
            }}
          >
            {/* Holographic Sphere Skeleton Rings (solid continuous lines in the UI image) */}
            {isMounted && (
              <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                {/* Equator Ring */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-30"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`, 
                    borderColor: "#38bdf8", // Sky blue for sci-fi look
                    transform: "rotateX(90deg)",
                    transformStyle: "preserve-3d"
                  }} 
                />
                {/* Meridian Ring 0deg */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-20"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`, 
                    borderColor: "#38bdf8",
                    transform: "rotateY(0deg)",
                    transformStyle: "preserve-3d"
                  }} 
                />
                {/* Meridian Ring 45deg */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-15"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`, 
                    borderColor: "#38bdf8",
                    transform: "rotateY(45deg)",
                    transformStyle: "preserve-3d"
                  }} 
                />
                {/* Meridian Ring 90deg */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-20"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`, 
                    borderColor: "#38bdf8",
                    transform: "rotateY(90deg)",
                    transformStyle: "preserve-3d"
                  }} 
                />
                {/* Meridian Ring 135deg */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-15"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`, 
                    borderColor: "#38bdf8",
                    transform: "rotateY(135deg)",
                    transformStyle: "preserve-3d"
                  }} 
                />
                {/* Latitudinal Ring (Tropic Upper) */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-20"
                  style={{ 
                    width: `${radius * 2 * Math.sin(Math.PI / 4)}px`, 
                    height: `${radius * 2 * Math.sin(Math.PI / 4)}px`, 
                    borderColor: "#38bdf8",
                    transform: `translateZ(${radius * Math.cos(Math.PI / 4)}px) rotateX(90deg)`,
                    transformStyle: "preserve-3d"
                  }} 
                />
                {/* Latitudinal Ring (Tropic Lower) */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-20"
                  style={{ 
                    width: `${radius * 2 * Math.sin(Math.PI / 4)}px`, 
                    height: `${radius * 2 * Math.sin(Math.PI / 4)}px`, 
                    borderColor: "#38bdf8",
                    transform: `translateZ(${-radius * Math.cos(Math.PI / 4)}px) rotateX(90deg)`,
                    transformStyle: "preserve-3d"
                  }} 
                />
              </div>
            )}

            {isMounted && activeLinks.map((link, i) => {
              // Calculate spherical position
              const phi = Math.acos(-1 + (2 * i) / total); // polar angle
              const theta = Math.sqrt(total * Math.PI) * phi; // azimuthal angle

              const x = radius * Math.sin(phi) * Math.cos(theta);
              const y = radius * Math.sin(phi) * Math.sin(theta);
              const z = radius * Math.cos(phi);

              // Calculate faces normal rotation to align them flat to the sphere surface
              const rotY = (theta * 180) / Math.PI;
              const rotX = ((phi - Math.PI / 2) * 180) / Math.PI;

              // Define specific neon colors matching the UI image for links
              const neonColors = [
                "#38bdf8", // Sky Blue
                "#a3e635", // Lime Green
                "#f87171", // Soft Red
                "#c084fc", // Purple
                "#fbbf24", // Yellow-Amber
                "#2dd4bf"  // Teal
              ];
              const cardColor = neonColors[i % neonColors.length];
              const isHovered = hoveredIndex === i;

              return (
                <div
                  key={link.id}
                  className="absolute left-1/2 top-1/2 -ml-20 -mt-10 w-40 h-20 transition-transform duration-300"
                  style={{
                    transformStyle: "preserve-3d",
                    // Cancelling rotation.x and rotation.y dynamic values so the card always faces front (billboarding)
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg) ${isHovered ? "scale(1.15)" : "scale(1)"}`,
                    zIndex: Math.round(z + radius)
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <TrackedLink
                    slug={profile.slug || "user"}
                    linkId={link.id}
                    url={link.url}
                    className={cn(
                      "w-full h-full flex flex-col justify-between p-3 border-2 relative overflow-hidden group shadow-lg text-left transition-all duration-300 bg-slate-950/80 backdrop-blur-md"
                    )}
                    style={{
                      borderRadius: "16px",
                      borderColor: cardColor,
                      boxShadow: isHovered 
                        ? `0 0 20px ${cardColor}, inset 0 0 10px ${cardColor}` 
                        : `0 0 10px ${cardColor}44`,
                      backfaceVisibility: "visible"
                    }}
                  >
                    {/* Background image preview if exists with heavy overlay */}
                    {link.thumbnailUrl && (
                      <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <img src={link.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="relative z-10 flex items-center gap-2 h-full w-full">
                      {/* Left icon circle/thumbnail */}
                      <div 
                        className="w-8 h-8 rounded-lg shrink-0 overflow-hidden flex items-center justify-center border"
                        style={{ borderColor: `${cardColor}66` }}
                      >
                        {link.thumbnailUrl ? (
                          <img src={link.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Globe className="w-4 h-4 text-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-[0.65rem] tracking-wider uppercase truncate text-white leading-tight">
                          {link.label}
                        </h4>
                        <p 
                          className="text-[0.55rem] font-bold truncate leading-snug mt-0.5"
                          style={{ color: cardColor }}
                        >
                          {link.description || "VISITER LE LIEN"}
                        </p>
                      </div>
                      
                      <ArrowUpRight 
                        className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                        style={{ color: cardColor }}
                      />
                    </div>
                  </TrackedLink>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer profile details */}
        <div className="text-center mt-12 flex flex-col items-center">
          <h2 className={cn("text-xl font-bold tracking-tight", isLightTheme ? "text-slate-900" : "text-on-surface")}>
            {profile.displayName}
          </h2>
          <p className={cn("text-xs opacity-60 mt-1 font-medium mb-1")}>
            @{profile.slug}
          </p>
          <SocialLinks profile={profile} isLightTheme={isLightTheme} />
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className={cn("text-[0.6rem] uppercase tracking-widest font-black opacity-30", isLightTheme ? "text-slate-900" : "text-on-surface-variant")}>
          Orbit Layout / EthicLink
        </p>
      </footer>
    </div>
  );
}
