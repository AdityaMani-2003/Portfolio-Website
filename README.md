# Aditya Mani Tripathi — Developer Portfolio

A responsive personal portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed with dark aesthetics, interactive Three.js 3D particles, internationalization (i18n), and modular project showcases.

**Repository:** [github.com/AdityaMani-2003/Portfolio-Website](https://github.com/AdityaMani-2003/Portfolio-Website)

---

## Features

- **Next.js App Router Architecture:** Optimized server-side rendering (SSR) and client components for responsive page loads.
- **Interactive 3D Visuals:** Integrated Three.js canvas featuring real-time interactive particle simulations responding to cursor movement.
- **Multilingual Support (i18n):** Locale management system supporting dynamic switching between English (`en.json`) and Turkish (`tr.json`).
- **Interactive Modals & Project Showcase:** Deep-dive cards for flagship projects (**Navjivan** and **Prepzo**) with live demo and repository links.
- **Micro-Interactions & Animation:** Smooth page transitions, scroll progress indicators, custom reactive cursor, and Framer Motion spring physics.
- **Contact & Social Integrations:** Direct contact modal with verified links to LinkedIn, GitHub, and email dispatch.

---

## Tech Stack

- **Framework:** Next.js (App Router), React
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Animations & 3D:** Framer Motion, Three.js / Canvas
- **Icons:** Lucide React, Simple Icons
- **Deployment:** Vercel

---

## Project Structure

```
Portfolio-Website/
├── app/
│   ├── globals.css            # Tailwind CSS tokens & custom animation keyframes
│   ├── layout.tsx             # Root layout with font optimization & metadata
│   └── page.tsx               # Main portfolio page composing all sections
├── components/
│   ├── 3d/                    # Interactive Three.js particle canvas
│   ├── sections/              # Hero, About, Projects, Roadmap, Stack, Contact
│   ├── settings/              # Language and theme switcher toggles
│   ├── ui/                    # Reusable atomic UI elements (Dialog, Buttons, HoverCard)
│   ├── custom-cursor.tsx      # Reactive cursor follower
│   ├── preloader.tsx          # Initial loading animation
│   └── smooth-scroll.tsx      # Smooth scroll container
├── content/
│   ├── en.json                # English copy, project details, achievements
│   └── tr.json                # Turkish translation copy
└── public/                    # Static assets, project thumbnails, icons
```

---

## Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/AdityaMani-2003/Portfolio-Website.git
cd Portfolio-Website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## License
MIT
