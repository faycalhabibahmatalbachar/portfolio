/**
 * Returns the correct image path for both local dev and GitHub Pages production.
 * In production, GitHub Pages serves from /portfolio/ so we prepend the basePath.
 */
export const img = (src) => {
  if (typeof window !== 'undefined') {
    // Client-side: check if running on github.io
    if (window.location.hostname.includes('github.io')) {
      return `/portfolio${src}`;
    }
  }
  // Build-time: use env
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${src}`;
};
