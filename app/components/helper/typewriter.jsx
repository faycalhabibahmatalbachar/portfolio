"use client";
import { useEffect, useState } from "react";

export default function TypewriterText({ lines, className = "" }) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;

    const currentLine = lines[lineIndex];

    if (!deleting) {
      if (charIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayed((prev) => {
            const next = [...prev];
            next[lineIndex] = currentLine.slice(0, charIndex + 1);
            return next;
          });
          setCharIndex((c) => c + 1);
        }, 38);
        return () => clearTimeout(timeout);
      } else {
        // Line complete — move to next
        if (lineIndex < lines.length - 1) {
          const timeout = setTimeout(() => {
            setLineIndex((l) => l + 1);
            setCharIndex(0);
          }, 120);
          return () => clearTimeout(timeout);
        } else {
          // All lines done — pause then restart
          const timeout = setTimeout(() => {
            setDeleting(true);
          }, 3200);
          return () => clearTimeout(timeout);
        }
      }
    } else {
      // Deleting phase — erase last line first
      const lastLine = lines[lines.length - 1];
      const currentLen = displayed[lines.length - 1]?.length ?? 0;
      if (currentLen > 0) {
        const timeout = setTimeout(() => {
          setDisplayed((prev) => {
            const next = [...prev];
            next[lines.length - 1] = lastLine.slice(0, currentLen - 1);
            return next;
          });
        }, 22);
        return () => clearTimeout(timeout);
      } else {
        // Reset everything
        setPause(true);
        setTimeout(() => {
          setDisplayed([]);
          setLineIndex(0);
          setCharIndex(0);
          setDeleting(false);
          setPause(false);
        }, 500);
      }
    }
  }, [charIndex, lineIndex, deleting, pause, displayed, lines]);

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {displayed[i] ?? ""}
          {i === lineIndex && !deleting && (
            <span className="inline-block w-[2px] h-[1.1em] bg-[#00d4ff] ml-[1px] align-middle animate-pulse" />
          )}
        </span>
      ))}
    </span>
  );
}
