# Guide Maître : Création de la Homepage - NJB Agency (Version Française)

Ce guide documente en détail l'architecture, le design et l'exécution technique de la page d'accueil de NJB Agency, reproduisant l'expérience haute fidélité de la plateforme Lovable.

---

## 1. Architecture Technique et Stack
Le site est conçu pour maximiser la performance visuelle et la fluidité des interactions.
- **Framework**: React 18 avec Vite (TypeScript).
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) pour un défilement doux et contrôlé.
- **Moteur d'Animation**: GSAP (GreenSock Animation Platform) avec le plugin `ScrollTrigger`.
- **Effets de Texte**: `SplitType` pour la manipulation de caractères et de mots.
- **Micro-interactions**: Framer Motion pour les états de survol (hover) et les transitions d'entrée rapides.
- **Styles**: Tailwind CSS avec une configuration personnalisée de jetons de design.

---

## 2. Logique Globale de l'Interface

### A. AccordionNavbar (Navigation Liquide)
La barre de navigation est réactive au défilement de l'utilisateur :
- **État Initial**: Largeur 100%, pas de bords arrondis, fond transparent.
- **État au Scroll (>100px)**: 
  - La largeur est réduite à **50%** (Desktop) ou **96%** (Mobile).
  - Un `border-radius: 50px` est appliqué.
  - Un `backdrop-filter: blur(20px)` et une bordure subtile apparaissent.
  - La position `top` descend à `20px` pour donner une sensation de "capsule flottante".

### B. Système Dynamique de Couleurs (Background Transitions)
Le site utilise un système de "Zones de Couleur" défini dans `Index.tsx`.
- **Zones Claires**: `--background` est blanc, `.dynamic-text` est noir.
- **Zones Sombres**: `--background` est noir, `.dynamic-text` est blanc.
- **Trigger**: Activé par des IDs spécifiques dans le DOM (`#vision-trigger`, `#magazine-trigger`). GSAP anime ces variables CSS en douceur pendant 1 seconde.

---

## 3. Détail des Sections et Contenu (Français)

### SECTION 1 : Hero Étape par Étape
#### Stage 1 : Entrée du Logo (Desktop uniquement)
- **Visuel** : Logo NJB centré sur un écran blanc propre.
- **Animation** : GSAP `opacity: 0` -> `1` avec un fondu de 2 secondes.

#### Stage 2 : Content Hero
- **Titre (Tagline)** : "On ne fait pas du marketing. On génère du chiffre d’affaires."
- **Animation** : Les mots émergent de `y: 20` avec une opacité échelonnée (`stagger`).
- **Vidéo** : Vidéo portrait verticale (9:16).
  - **Optimisation** : Iframe YouTube sans contrôles ni marquage, à 130% d'échelle pour un look natif.

### SECTION 2 : Intro / Valeur de l'Entreprise
- **Texte** : "Nous aidons les entreprises à augmenter leurs revenus grâce à du contenu, de la publicité et des stratégies qui convertissent vraiment."
- **CTA** : "Obtiens ton audit + séance de contenu gratuite"
- **Effet** : Révélation des mots un par un lors de l'entrée dans le viewport.

### SECTION 3 : Notre Vision (Révélation par Scroll)
- **Texte** : "La majorité des entreprises publient du contenu… mais ne génèrent pas de résultats."
- **Logique** : Le texte commence avec une opacité de 15% et s'illumine à 100% (blanc) au fur et à mesure que l'utilisateur défile.

### SECTION 4 : Problématiques
- **Contenu** : 
  1. Pas de leads constants.
  2. Peu ou pas de retour sur investissement.
  3. Aucune stratégie claire.
- **Conclusion** : "Parce qu’elles se concentrent sur la visibilité au lieu de la conversion."

### SECTION 5 : Solution (Grille de Valeur)
- **Description** : "On combine contenu + publicité + stratégie pour transformer l’attention en revenus."
- **Éléments** :
  - Contenu qui convertit (vidéo, reels, UGC).
  - Publicité (Meta & Google Ads).
  - Suivi des conversions (Le plus vendu - avec animation de pulsation).
  - Positionnement stratégique.
  - Email marketing.

### SECTION 6 : Nos Projets (Éventail 3D)
- **Titre** : "Nos Projets"
- **CTA** : "Voir tout notre travail"
- **Logique** : Les cartes se déploient en éventail avec des rotations sur les axes Y et Z via GSAP ScrollTrigger.

### SECTION 7 : StackedValue (Panneaux Sticky)
Quatre panneaux qui s'empilent verticalement :
1. **Clients** : Canada, États-Unis, Mexique.
2. **Résultats** : Chiffres réels (fond noir). ex: "+18 conversions = 570$ générés".
3. **Contenu** : Vidéo cinématographique, Drone, Storytelling.
4. **Processus** : 1. Analyse & stratégie, 2. Création de contenu, etc.

### SECTION 8 : Offre (Cartes avec Illustrations)
- **Illustration 1 (Stratégie)** : Graphique à barres animé.
- **Illustration 2 (Échelle)** : Simulation de l'interface Figma avec curseurs NJB Dev.

### SECTION 9 : Connecting Footer
- **Headline** : "FAISONS-LE"
- **Interaction** : Chaque lettre répond au survol avec un effet de ressort (Spring).

---

## 4. Configuration des Styles Globaux
```css
/* Neue Montreal - L'âme du design */
@font-face {
  font-family: 'Neue Montreal';
  src: url('/fonts/NeueMontreal-Regular.otf') format('opentype');
}
```

---

## 5. Localisation Maître (Français)
- **Nav** : Projets, Contact, À propos, Menu.
- **Hero Tagline** : "On ne fait pas du marketing. On génère du chiffre d’affaires."
- **Bestseller Badge** : "Le plus vendu"
- **Copyright** : "© 2026 NJB"

---
*Ce document est la source de vérité pour la recréation de l'interface de NJB Agency en français.*
