# WitnessExperts.com

A professional expert witness directory for attorneys. Find qualified expert witnesses across 15+ practice areas including medical, business, construction, engineering, and more.

## Features

- **Browse by Category** – 15 main categories with hundreds of subcategories
- **Search** – Find experts by specialty, keyword, or category
- **Request an Expert** – Submit a request when you can't find the right match
- **Get Listed** – Experts can create searchable profiles

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) – Full-stack framework
- [Svelte 5](https://svelte.dev/) – UI framework with runes
- [Tailwind CSS v4](https://tailwindcss.com/) – Styling (`@tailwindcss/vite`)
- TypeScript

## Development

```bash
# Install dependencies (already done)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── app.css             # Tailwind entry + theme tokens
├── lib/
│   ├── components/     # Header, Footer
│   └── data/           # Category data
├── routes/
│   ├── +layout.svelte  # App shell (imports app.css)
│   ├── +page.svelte    # Homepage
│   ├── categories/     # Category listing & detail
│   ├── search/         # Search results
│   ├── request/        # Request an expert form
│   ├── list/           # Get listed (experts)
│   └── login/          # Member login
```

## Design

- **Typography**: Cormorant Garamond (display) + Source Sans 3 (body)
- **Colors**: Deep navy (#0d1321), warm parchment (#f8f6f1), seal gold (#c9a227)
- **Aesthetic**: Professional, trustworthy, suitable for legal audience

## Similar To

Inspired by [ExpertPages.com](https://www.expertpages.com/categories) – America's leading expert witness directory.
