

# Plan: Connect Admin Dashboard to Public Pages

## Problem
The admin dashboard reads from the **database** (2 projects), while the public pages (Trabajo, Proyecto) use **hardcoded static data** (4 projects). They are completely disconnected — editing in admin changes nothing on the site.

## Changes

### 1. Remove "Visitas" stat from AnalyticsSection
Remove the first stat card (Visitas / page views) from the stats array in `AnalyticsSection.tsx`.

### 2. Seed missing projects into the database
Insert the 2 missing projects (realestate, sportswear) into the `projects` table with their multilingual fields, plus insert their images into `project_images` using paths like `/proyectos/Real-Estate/item-1.png` (public folder URLs work with `getImageUrl`).

Also update the existing 2 projects (tularosa, original) to have correct multilingual content matching what's currently hardcoded.

### 3. Refactor Trabajo.tsx to use database
Replace the static `projectsData` import with `usePublishedProjects()` hook. Map DB fields (`subtitle_es`, `industry_es`, etc.) to the template using the current language. Use `project_images` with type `cover` and `preview_small` for the work page thumbnails.

### 4. Refactor Proyecto.tsx to use database
Replace the hardcoded `projectData` object with `useProject(slug)` hook. Map DB fields and `project_images` (sorted by `sort_order`) to render the detail page. Support both Supabase Storage paths and public folder paths via `getImageUrl`.

### 5. Keep static image files
The existing images in `public/proyectos/` stay as-is. The DB will store paths like `/proyectos/Tularosa/portada-1.webp` which resolve directly as public URLs.

## Result
- Admin shows all 4 projects
- Creating/editing a project in admin immediately reflects on public pages
- Image uploads from admin work and display on the site
- No more hardcoded project data

