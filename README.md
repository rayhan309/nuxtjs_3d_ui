# AuraMart — 3D E-Commerce (Nuxt + Three.js)

A modern 3D e-commerce demo built with **Nuxt 4**, **Vue 3**, and **Three.js**.  
Home and About pages use interactive WebGL scenes rendered directly with Three.js (no TresJS).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Nuxt 4 |
| UI | Vue 3 |
| 3D | Three.js + OrbitControls |
| Language | TypeScript |
| Styling | Plain CSS |

## Project Structure

```
3d_nuxt/
├── app/                          # Nuxt application source
│   ├── app.vue                   # Root Vue component (renders NuxtPage)
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # Global styles (layout, hero, products, about)
│   ├── components/
│   │   ├── home/
│   │   │   └── HomePageContent.vue   # Home page sections (hero, categories, products)
│   │   ├── layout/
│   │   │   ├── AppHeader.vue         # Sticky navbar (logo, nav, cart)
│   │   │   └── AppFooter.vue         # Footer links + newsletter
│   │   ├── scene/
│   │   │   ├── HomeHeroCanvas.vue    # Mounts Three.js canvas for home hero
│   │   │   └── AboutCanvas.vue       # Mounts Three.js canvas for about page
│   │   └── ui/
│   │       ├── ProductCard.vue       # Single product card component
│   │       └── SectionHeading.vue    # Reusable section title block
│   ├── composables/
│   │   └── useThreeScene.ts          # Three.js setup: renderer, camera, loop, cleanup
│   ├── data/
│   │   ├── products.ts               # Products, categories, featured items
│   │   └── site.ts                   # Site name, nav links, stats, team, values
│   ├── layouts/
│   │   └── default.vue               # Shared layout (header + footer + slot)
│   ├── pages/
│   │   ├── index.vue                 # Home page (/)
│   │   └── about.vue                 # About page (/about)
│   └── utils/
│       └── three/
│           ├── homeHeroScene.ts      # Home 3D scene logic (boxes, stars, floor)
│           └── aboutScene.ts         # About 3D scene logic (icosahedron, ring, orbs)
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── nuxt.config.ts                # Nuxt config (CSS, Vite Three.js optimize)
├── package.json
├── tsconfig.json
└── README.md
```

## Folder Guide

### `app/pages/`
Nuxt file-based routing.

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.vue` | Home — 3D hero, categories, featured products, promo |
| `/about` | `about.vue` | About — mission, stats, values, team, 3D scene |

### `app/components/scene/`
Thin Vue wrappers that attach a `<div>` ref and call `useThreeScene()`.

### `app/utils/three/`
Pure Three.js scene builders. Each file exports a `create*Scene()` function that:
- Adds meshes, lights, and materials to the scene
- Returns `update()` for animation and `dispose()` for memory cleanup

### `app/composables/useThreeScene.ts`
Shared lifecycle for all 3D canvases:
- Creates `WebGLRenderer`, `PerspectiveCamera`, `OrbitControls`
- Runs `requestAnimationFrame` loop
- Handles resize via `ResizeObserver`
- Cleans up on component unmount

### `app/data/`
Static content (products, categories, site copy). Edit these files to change store data without touching UI code.

## 3D Scenes

**Home (`homeHeroScene.ts`)**
- Rotating central product box (`MeshPhysicalMaterial`)
- Four floating product boxes with sine animation
- Star particle field (`Points` + `BufferGeometry`)
- Metallic floor circle + shadow mapping
- Auto-rotate OrbitControls

**About (`aboutScene.ts`)**
- Wireframe icosahedron
- Rotating torus ring
- Two floating octahedron orbs

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production

```bash
npm run build
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run generate` | Static site generation |

## Dependencies

- `nuxt` — App framework
- `three` — WebGL 3D engine
- `vue` / `vue-router` — UI and routing
