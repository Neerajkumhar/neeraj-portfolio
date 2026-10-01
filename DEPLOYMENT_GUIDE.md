# Deployment Instructions

The portfolio is a fully static site: a single Vite + React app with no backend, no database, and no server-side runtime. Blog posts live as typed data in `frontend/src/data/blog.ts`, and project cards are pulled from the public GitHub API at build/visit time.

## 1. Deploying

1. Push your changes to GitHub.
2. Go to Vercel Dashboard -> Add New -> Project.
3. Select your repository.
4. **Important**: In "Root Directory" settings, click "Edit" and select `frontend`.
5. Deploy.

No environment variables are required. `frontend/vercel.json` rewrites all paths to `index.html` so client-side routes like `/blog/1` resolve on refresh.

## 2. Running Locally

```bash
cd frontend
npm run dev
```

## 3. Editing Content

**Blog posts** live in `frontend/src/data/blog.ts` as a `BlogPost[]`. Add an object with `id`, `title`, `excerpt`, `content` (markdown), `date`, `readTime`, `tags`, and `image`. The `id` becomes the URL (`/blog/<id>`), so keep them unique and stable once published. Posts are sorted newest-first automatically, so file order does not matter.

**LeetCode stats** are hardcoded in `frontend/src/components/LeetCodeStats.tsx` under `STATS`. LeetCode's API sends no CORS headers, so the numbers cannot be fetched from the browser. Update them by hand if you want them current.

## Troubleshooting
- **404 on a nested route**: confirm the Root Directory is `frontend` and `frontend/vercel.json` is committed. Vite's dev server handles SPA fallback locally, so this only shows up in production.
- **LeetCode numbers look stale**: that is expected; they are hardcoded rather than fetched.