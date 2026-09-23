# Rahul Swain — Personal Brand Website

Premium animated personal brand website built with React + TypeScript + Vite + Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Add your real photos

Place these files in `public/images/`:

- `rahul-hero.jpg` — your real color portrait
- `family.jpg` — family photo
- `journey-01.jpg` — journey/inspiration image

The app has fallback styling if an image is missing.

## YouTube Shorts

Edit `src/data.ts`.

Each Short uses the YouTube video ID:

```text
https://youtube.com/shorts/ABC123
```

becomes:

```text
https://www.youtube.com/embed/ABC123
```

The site uses 9:16 cards and loads the iframe only after clicking the thumbnail.

## Social links

Edit the `profile` object in `src/data.ts`.

## Main sections

Home
About
Where It Begins
Explore
My Vision
Entrepreneurial Process
Build in Public
Why I Create
Short Videos
Connect
Community teaser

There is intentionally no Resources page and no separate Journey page.

## Deploy

The project is Vite-compatible and can be deployed to Vercel, Netlify, Cloudflare Pages, or any static hosting service.
