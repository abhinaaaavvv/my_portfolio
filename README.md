# my_portfolio

Personal portfolio site built with [Next.js](https://nextjs.org) (App Router), [Tailwind CSS v4](https://tailwindcss.com) and [EB Garamond](https://fonts.google.com/specimen/EB+Garamond) via `next/font`.

## Develop

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
bun run lint        # eslint
bun run typecheck   # tsc --noEmit
bun run build       # production build
```

## Structure

```
src/
  app/
    layout.tsx      # root layout, font + metadata, no-flash theme bootstrap
    page.tsx        # the portfolio copy
    globals.css     # theme tokens (--light / --dark / link colours)
  components/
    theme-provider.tsx  # light/dark store (localStorage + prefers-color-scheme)
    local-time.tsx      # live Asia/Kolkata clock
    links.tsx           # social / contact links
```

## Deploy

Deploys to [Vercel](https://vercel.com/new). `@vercel/analytics` and `@vercel/speed-insights` are wired up in `src/app/page.tsx`.
