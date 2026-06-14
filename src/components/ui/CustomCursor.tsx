"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Fast precise dot
  const dotX = useSpring(mx, { stiffness: 700, damping: 40 });
  const dotY = useSpring(my, { stiffness: 700, damping: 40 });

  // Slow glowing ring with lag
  const ringX = useSpring(mx, { stiffness: 90, damping: 28 });
  const ringY = useSpring(my, { stiffness: 90, damping: 28 });

  // Huge ambient glow — very slow
  const glowX = useSpring(mx, { stiffness: 40, damping: 25 });
  const glowY = useSpring(my, { stiffness: 40, damping: 25 });

  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(isCoarse);
    if (isCoarse) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const attachHover = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };
    attachHover();

    // Re-attach when DOM changes (dynamic content)
    observerRef.current = new MutationObserver(attachHover);
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observerRef.current?.disconnect();
    };
  }, [mx, my, visible]);

  if (isTouch) return null;

  return (
    <>
      {/* Ambient glow — very slow, very large */}
      <motion.div
        animate={{ opacity: visible ? (hovering ? 0.8 : 0.5) : 0 }}
        transition={{ opacity: { duration: 0.4 } }}
        className="fixed pointer-events-none z-[9990] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          left: glowX,
          top: glowY,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Ring — medium speed */}
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 2.2 : 1,
          borderColor: hovering
            ? "rgba(59,130,246,0.7)"
            : "rgba(59,130,246,0.25)",
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          borderColor: { duration: 0.2 },
        }}
        className="fixed pointer-events-none z-[9995] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border"
      />

      {/* Dot — snappy */}
      <motion.div
        style={{ left: dotX, top: dotY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 0 : 1,
        }}
        transition={{ scale: { duration: 0.15 }, opacity: { duration: 0.15 } }}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"
      />
    </>
  );
}
