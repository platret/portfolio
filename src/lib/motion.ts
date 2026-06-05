// Shared motion curves. Every animation uses the identical token,
// so the count-up, expand, and self-draw read as one mechanical system.
export const ease = {
  outQuint: [0.22, 1, 0.36, 1] as [number, number, number, number],
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export const dur = {
  fast: 0.2,
  base: 0.32,
  slow: 0.6,
  draw: 0.48,
};

// Staggered reveal helper for sections.
export const reveal = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0 },
};
