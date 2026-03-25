# Niya Shroff - Portfolio

A lightweight, visually rich, frontend-only portfolio built with React, Vite, TypeScript, and Tailwind CSS. The portfolio showcases my experience, education, technical projects, and creative pursuits across photography, videography, and writing.

## ✨ Features

- **Frontend-Only Architecture:** Completely static, fast-loading, frontend-only build. No backend or database dependencies required!
- **Dynamic Photography Gallery:** Automatically detects and loads all images placed in the `src/assets/photography` directory.
  - Automatically reads sub-folder names (e.g. `src/assets/photography/cities`) to generate Categories and Locations dynamically! 
  - Uses CSS Masonry (`columns-1 md:columns-2 lg:columns-3`) to perfectly blend horizontal (landscape) and vertical (portrait) shots in a beautiful staggered grid.
- **Global Search:** A powerful floating command-palette search (hit `CMD+K` or click the search icon). It scans through all Static data (Experience, Education, Projects) and provides smooth-scrolling deep-links to exactly what you are looking for.
- **Micro-Animations:** Fluid transitions, hover effects, and modals powered by [Framer Motion](https://www.framer.com/motion/).
- **Responsive Design:** A tailored experience across all screen sizes leveraging modern Tailwind CSS concepts.

## 🚀 Technologies Used

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
