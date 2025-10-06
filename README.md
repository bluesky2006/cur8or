# cur8or 🎨

Curate your own virtual exhibition from real museum collections.

**cur8or** is a virtual exhibition builder that lets users search, browse and curate artworks from major public collections. Designed for art lovers, students and curators-in-training, the app allows anyone to create a themed exhibition using open-access artworks from leading museums.

## ✨ Features

- 🔍 Unified search across two museum APIs (Cleveland Museum of Art & Art Institute of Chicago)
- 🖼️ Filter by image availability for cleaner browsing
- ➕ Add or remove artworks to a personal exhibition collection
- 🔗 Visit artwork entries directly on each museum’s website for more information
- 🎨 Responsive grid layout for search results
- 🧠 Normalised data model for consistent cross-museum data
- 💡 Accessibility-friendly UI with proper ARIA roles, keyboard navigation and focus states
- 🌙 Background slideshow for empty state screens — a curated visual atmosphere
- 🪶 Lightweight, server-side rendered pages for fast initial load and SEO-ready metadata
- 🧩 Modular React components and a clear type-safe architecture (TypeScript throughout)
- ⚡ Session-based persistence (via Context API)

## 🧑‍💻 Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript
- Fetching from public APIs (e.g. [Art Institute of Chicago](https://api.artic.edu/docs/), [Cleveland Museum of Art](https://openaccess-api.clevelandart.org/))

## 📦 Getting Started

Clone the repo:

```bash
git clone https://github.com/bluesky2006/cur8or.git
cd cur8or
```

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 🖼️ Example Screenshot

![cur8or search results](public/example-screenshot.png)

## 📚 Folder Structure

```
/
├── components/                     # Reusable UI components
│   ├── ArtworkDetailModal.tsx
│   ├── ArtworkItem.tsx
│   ├── ArtworkList.tsx
│   ├── BackgroundSlideshow.tsx
│   ├── ExhibitionDrawer.tsx
│   ├── Header.tsx
│   ├── ImageToggle.tsx
│   ├── Logo.tsx
│   ├── MyExhibitionButton.tsx
│   └── SearchBar.tsx
├── context/                        # Global context
│   └── ExhibitionContext.tsx
├── lib/
│   └── adapters/
│       ├── aicAdapter.ts           # Adapter for normalising Art Institute of Chicago search results into desired shape
│       └── cmaAdapter.ts           # Adapter for normalising Cleveland Museum search results into desired shape
│   └── api/
│       ├── aic.ts                  # Art Institute of Chicago API search
│       ├── cma.ts                  # Cleveland Museum API search
│       └── searchAllMuseums.ts     # Combined museum search results
│   └── hooks/
│       └── useSearchState.ts       # Hook containing all state used in main landing page search
├── public/                         # Static assets
│   └── art-backgrounds/
├── src/
│   └── app/                        # Next.js App Router
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx                # Main landing page
├── types/
│   └── artTypes.ts                 # Normalised artwork type
```

## 🚧 In Progress

- 🧮 More sorting and filtering options
- 🔐 User login

## 📄 Licence

MIT — free to use, remix and extend.

---

## 💡 About

Built as a final project for a JavaScript Skills Bootcamp by [Simon Busby](https://simonbusby.netlify.app). Inspired by a love of design, archives and accessible technology.
