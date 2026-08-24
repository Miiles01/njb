# Guide Maître 2.0 : Architecture & Design de la Homepage - NJB Agency

Ce document est la source de vérité technique et créative pour la création de la page d'accueil de NJB Agency. Il détaille chaque bloc, animation, espacement et asset utilisé pour atteindre une esthétique premium.

---

## 1. Identité Visuelle & Fondations
- **Typographie** : 
  - `Neue Montreal` (Titres & Corps) : Look éditorial, moderne et épuré.
  - `Plus Jakarta Sans` : Utilisée pour les labels et petits éléments de UI.
- **Grille & Espacements (Paddings)** :
  - **Marges Latérales** : `px-6` (Mobile), `px-12` (Tablette), `px-40` (Desktop - `max-w-[1300px]`).
  - **Paddings Verticaux** : Sections espacées par `py-32` à `py-64` pour laisser le design "respirer".

---

## 2. Structure Détaillée par Section

### A. AccordionNavbar (Navigation Fluide)
- **Design** : Conteneur flexible qui se transforme en capsule.
- **Animation de Scroll** :
  - `Width` : 100% → 50%.
  - `Radius` : 0px → 50px.
  - `Blur` : 0px → 20px.
- **Items** : Projets, Contact, À propos, Langue (Sélecteur avec AnimatePresence).

### B. Hero Stage 1 : Impact de Marque
- **Structure** : `h-screen flex items-center justify-center`.
- **Asset** : `/lovabol/logotipo.svg` (Largeur : `45vw` sur Desktop).
- **Animation** : Entrée en fondu (`duration: 2`) et indicateur de scroll vertical animé en bas.

### C. Hero Stage 2 : Proposition de Valeur
- **Titre** : "On ne fait pas du marketing. On génère du chiffre d’affaires."
- **Technique de Titre** :
  - Utilisation de `SplitType` pour diviser les mots.
  - Chaque mot a une animation de survol (`whileHover: { y: -8, color: "#154FD1" }`).
- **Asset Vidéo** : Iframe portrait (9:16).
  - **Source** : YouTube Shorts.
  - **Style** : `rounded-[40px]`, `shadow-2xl`. Masquage des contrôles via overflow du parent.

### D. Notre Vision (Section Scrub)
- **Titre** : "La majorité des entreprises publient du contenu… mais ne génèrent pas de résultats."
- **Animation GSAP** : Le texte passe de `opacity: 0.15` à `opacity: 1` au fur et à mesure du scroll.
- **Padding** : `pt-32 md:pt-64 pb-16`.

### E. Solution (Grille de Services)
- **Grid** : `grid-cols-1 md:grid-cols-3` avec un gap de `6`.
- **Cartes** : `rounded-[40px]`, `border-white/10`.
- **Bestseller Card** : Fond blanc, texte noir, badge pulsé avec icône `Flame`.

### F. Nos Projets (ProjectMagazine)
- **Asset Images** :
  - `/proyectos/Tularosa/portada-1.webp`
  - `/proyectos/Real-Estate/item-1.png`
  - `/proyectos/Sportswear/portada.jpg`
- **Animation 3D** :
  - Perspective : `1000`.
  - Angle d'éventail : ±15° sur Desktop, ±8° sur Mobile.
  - Les cartes s'écartent avec un `z-offset` pour créer de la profondeur.

### G. StackedValue (Panneaux Sticky)
- **Lógica** : Sections fixées (`pin: true`) avec GSAP ScrollTrigger.
- **Panneaux** :
  1. **Clients** : Utilise l'icône `Globe`. Focus sur Canada, USA, Mexique.
  2. **Résultats** : Cifras clés avec bordure gauche `border-l-2`.
  3. **Contenu** : Grille d'items (`Video cinématographique`, `Drone`).
  4. **Processus** : Liste numérotée avec grands chiffres en `opacity-5`.

### H. Offre & Illustrations SVG
- **Card Strategy** : Illustration de graphique montant (`StrategyIllustration`).
- **Card Scale** : Clone de l'UI Figma (`ScaleIllustration`).
  - **Détails** : Calques (Layers), Curseurs animés "NJB Dev", Bouton "Share" bleu.
- **Checklist** : Icone `Check` blanche sur fond noir circulaire.

### I. Testimonials (Marquee)
- **Vitesse** : 40s (Ligne 1) et 50s (Ligne 2 - Inversée).
- **Style** : `backdrop-blur-md`, `rounded-[32px]`.
- **Effet** : Pause de l'animation au survol de la souris.

### J. Footer : Faisons-le
- **Headline** : "FAISONS-LE" en taille `15vw`.
- **Interaction** : Effet de ressort sur chaque lettre au passage de la souris.
- **Bouton Contact** : Style premium avec expansion au survol.

---

## 3. Assets de Référence
- **Logos** : `/lovabol/logotipo.svg`.
- **Images Projets** : `/proyectos/[Nombre]/...`
- **Vidéos** : YouTube Embeds (IDs: `OO8JHYuPTLY`, `0LjbP3K56mI`).

---

## 4. Configuration Tailwind (Extrait)
```typescript
fontFamily: {
  heading: ['"Neue Montreal"', 'sans-serif'],
},
borderRadius: {
  '40px': '40px',
}
```

---
*Ce guide 2.0 est optimisé pour une implémentation fidèle et exhaustive en français.*
