"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  "computational science",
  "machine learning",
  "scientific discovery",
  "open research",
];

export function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setDeleting(true);
        } else {
          const next = current.slice(0, Math.max(0, text.length - 1));
          setText(next);
          if (next.length === 0) {
            setDeleting(false);
            setIndex((i) => (i + 1) % phrases.length);
          }
        }
      },
      deleting ? 45 : text === current ? 1400 : 70
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="gradient-text">
      {text}
      <motion.span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-0.5 bg-accent"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
}

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--gradient-start)]/30 blur-3xl animate-float" />
      <div className="absolute top-32 right-0 h-64 w-64 rounded-full bg-[var(--gradient-mid)]/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 left-8 h-56 w-56 rounded-full bg-[var(--gradient-end)]/20 blur-3xl animate-float" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent,var(--background)_70%)]" />
    </div>
  );
}
