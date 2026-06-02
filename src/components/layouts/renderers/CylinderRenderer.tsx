"use client";

import type { LinkItem, Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrackedLink } from "../../public/TrackedLink";
import { SocialLinks } from "../../public/SocialLinks";
import { Globe, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CylinderRenderer({ links, profile }: { links: LinkItem[], profile: Profile }) {
  const activeLinks = links.filter(l => l.active).sort((a, b) => (a.order || 0) - (b.order || 0));
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dragStart = useRef(0);
  const startRotationY = useRef(0);

  // Prevent SSR hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const total = activeLinks.length;
  const radius = total > 4 ? 280 : 200; // Adjust radius based on number of items

  // Animate rotation to target index
  useEffect(() => {
    if (!isMounted || isDragging || total === 0) return;
    const targetRot = - (activeIndex * 360) / total;
    
    // Simple smooth transition
    let frameId: number;
    const animate = () => {
      setRotationY(prev => {
        // Find shortest path for angle interpolation
        let diff = targetRot - prev;
        // Normalize diff to -180 to 180
        diff = (((diff + 180) % 360) + 360) % 360 - 180;
        if (Math.abs(diff) < 0.1) {
          return targetRot;
        }
        return prev + diff * 0.15;
      });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [activeIndex, isDragging, isMounted, total]);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    startRotationY.current = rotationY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || total === 0) return;
    const deltaX = e.clientX - dragStart.current;
    // Map mouse movement to degrees
    const speed = 0.5;
    const newRot = startRotationY.current + deltaX * speed;
    setRotationY(newRot);
  };

  const handleMouseUp = () => {
    if (!isDragging || total === 0) return;
    setIsDragging(false);
    
    // Find index closest to the front (angle = 0)
    // Current rotationY maps to index: index = -rotationY / (360 / total)
    const anglePerItem = 360 / total;
    const estimatedIndex = Math.round(-rotationY / anglePerItem);
    // Wrap to correct index range
    const normalizedIndex = ((estimatedIndex % total) + total) % total;
    setActiveIndex(normalizedIndex);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0] && total > 0) {
      setIsDragging(true);
      dragStart.current = e.touches[0].clientX;
      startRotationY.current = rotationY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0] || total === 0) return;
    const deltaX = e.touches[0].clientX - dragStart.current;
    const speed = 0.6;
    const newRot = startRotationY.current + deltaX * speed;
    setRotationY(newRot);
  };

  // Theme settings
  const isLightTheme = !!(profile.theme === "LIGHT_GLASS" || (profile.bgColor && ["#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#fdf2f8"].includes(profile.bgColor.toLowerCase())));
  const accentColor = profile.themeColor || (profile.theme === "MIDNIGHT_LIME" ? "#bfff00" : "#8083ff");

  // Handle card click (first click centers, second click navigates)
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (index !== activeIndex) {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    <div 
      className="min-h-screen text-on-surface selection:bg-primary/30 flex flex-col justify-between relative overflow-hidden select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      {/* Background (milky way or custom bg color) */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        style={profile.bgColor && profile.bgColor !== "SPACE_STARRED" ? { backgroundColor: profile.bgColor } : { backgroundColor: "black" }}
      >
        {(!profile.bgColor || profile.bgColor === "SPACE_STARRED") && (
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-screen"
            style={{
              backgroundImage: `url("/images/milky_way_bg.png")`
            }}
          />
        )}
        
        {(!profile.bgColor || profile.bgColor === "SPACE_STARRED") && (
          <>
            <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vh] rounded-full bg-indigo-500/10 blur-[130px] opacity-40" />
            <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vh] rounded-full bg-cyan-500/10 blur-[150px] opacity-30" />
          </>
        )}

        {/* Hexagonal grid pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='97' viewBox='0 0 56 97'%3E%3Cpath d='M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z M28 97 L56 80.84 L56 48.5 L28 64.66 L0 48.5 L0 80.84 Z' fill='none' stroke='%2338bdf8' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "56px 97px"
          }}
        />
      </div>

      <main 
        className="max-w-6xl mx-auto w-full px-6 pt-12 pb-24 flex-1 flex flex-col items-center justify-start"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Header Profile Info (Avatar + Details above) */}
        <div className="flex flex-col items-center text-center mt-6 mb-16 z-20">
          {/* Avatar with sci-fi rings */}
          <div className="relative w-24 h-24 flex items-center justify-center mb-4">
            <div 
              className="absolute w-24 h-24 rounded-full border opacity-80 animate-pulse"
              style={{ 
                borderColor: accentColor, 
                boxShadow: `0 0 15px ${accentColor}, inset 0 0 15px ${accentColor}` 
              }}
            />
            <div 
              className="w-20 h-20 rounded-full overflow-hidden border-2 bg-black relative"
              style={{ borderColor: accentColor }}
            >
              {profile.image ? (
                <img src={profile.image} alt={profile.displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-black text-white">
                  {profile.displayName?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </div>
          
          <h2 className={cn("text-xl font-bold tracking-tight", isLightTheme ? "text-slate-900" : "text-on-surface")}>
            {profile.displayName}
          </h2>
          <p className="text-xs opacity-60 mt-1 font-semibold">
            @{profile.slug}
          </p>
          <SocialLinks profile={profile} isLightTheme={isLightTheme} />
          {profile.bio && (
            <p className="text-xs max-w-sm mt-3 opacity-80 leading-relaxed font-medium">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Helper guide */}
        <div className="mb-6 pointer-events-none">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] opacity-40">
            Faites glisser pour tourner • Cliquez sur une carte pour la centrer
          </span>
        </div>

        {/* 3D Cylinder Container */}
        <div 
          ref={containerRef}
          className="relative w-[340px] h-[260px] md:w-[600px] md:h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ perspective: "1000px" }}
        >
          {/* 3D Rotating Stage */}
          <div 
            className="w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(-10deg) rotateY(${rotationY}deg)`,
              transition: isDragging ? "none" : "transform 0.1s linear"
            }}
          >
            {/* Cylinder Skeleton Cage Rings (Top and Bottom) */}
            {isMounted && (
              <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                {/* Top ring */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-20"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`, 
                    borderColor: accentColor,
                    transform: "translateY(-60px) rotateX(90deg)",
                    transformStyle: "preserve-3d"
                  }} 
                />
                {/* Bottom ring */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-20"
                  style={{ 
                    width: `${radius * 2}px`, 
                    height: `${radius * 2}px`, 
                    borderColor: accentColor,
                    transform: "translateY(60px) rotateX(90deg)",
                    transformStyle: "preserve-3d"
                  }} 
                />
              </div>
            )}

            {/* Links rendered in a circle to form the cylinder */}
            {isMounted && activeLinks.map((link, i) => {
              const angle = (i * 360) / total;
              
              // Define specific neon colors matching the UI
              const neonColors = [
                "#38bdf8", // Sky Blue
                "#a3e635", // Lime Green
                "#f87171", // Soft Red
                "#c084fc", // Purple
                "#fbbf24", // Yellow-Amber
                "#2dd4bf"  // Teal
              ];
              const cardColor = neonColors[i % neonColors.length];
              const isCentered = i === activeIndex;

              return (
                <div
                  key={link.id}
                  className="absolute left-1/2 top-1/2 -ml-24 -mt-12 w-48 h-24 transition-transform duration-300"
                  style={{
                    transformStyle: "preserve-3d",
                    // Rotate on Y, translate out to radius, then counter-rotate parent Y so it always faces forward (billboarding)
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) rotateY(${-angle - rotationY}deg) rotateX(10deg) ${isCentered ? "scale(1.15)" : "scale(0.9)"}`,
                    zIndex: Math.round(radius + radius * Math.cos(((angle + rotationY) * Math.PI) / 180))
                  }}
                >
                  <TrackedLink
                    slug={profile.slug || "user"}
                    linkId={link.id}
                    url={link.url}
                    onClick={(e) => handleCardClick(e, i)}
                    className={cn(
                      "w-full h-full flex flex-col justify-between p-3 border-2 relative overflow-hidden group shadow-lg text-left transition-all duration-300 bg-slate-950/85 backdrop-blur-md"
                    )}
                    style={{
                      borderRadius: "16px",
                      borderColor: cardColor,
                      boxShadow: isCentered 
                        ? `0 0 25px ${cardColor}, inset 0 0 12px ${cardColor}` 
                        : `0 0 10px ${cardColor}33`,
                      backfaceVisibility: "visible"
                    }}
                  >
                    {/* Thumbnail background with overlay */}
                    {link.thumbnailUrl && (
                      <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <img src={link.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="relative z-10 flex items-center gap-3 h-full w-full">
                      {/* Left icon circle/thumbnail */}
                      <div 
                        className="w-10 h-10 rounded-lg shrink-0 overflow-hidden flex items-center justify-center border"
                        style={{ borderColor: `${cardColor}66` }}
                      >
                        {link.thumbnailUrl ? (
                          <img src={link.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Globe className="w-5 h-5 text-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-[0.7rem] tracking-wider uppercase truncate text-white leading-tight">
                          {link.label}
                        </h4>
                        <p 
                          className="text-[0.6rem] font-bold truncate leading-snug mt-1"
                          style={{ color: cardColor }}
                        >
                          {link.description || "VISITER LE LIEN"}
                        </p>
                      </div>
                      
                      <ArrowUpRight 
                        className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                        style={{ color: cardColor }}
                      />
                    </div>
                  </TrackedLink>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className={cn("text-[0.6rem] uppercase tracking-widest font-black opacity-30", isLightTheme ? "text-slate-900" : "text-on-surface-variant")}>
          Cylinder Layout / EthicLink
        </p>
      </footer>
    </div>
  );
}
