// Resolve a public asset against the deploy base path (/ on Vercel/root,
// /portfolio/ on GitHub Pages project site). Keeps screenshots from 404ing.
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");
