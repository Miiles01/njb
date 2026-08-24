# Guía de Diseño y Ejecución UI: NJB Agency

Esta guía detalla la arquitectura visual, el stack tecnológico y la lógica de animación utilizada en el sitio web de **NJB Agency**.

## 1. Fundamentos del Diseño
El sitio sigue un estilo **Minimalista Premium / SaaS de alta gama**.
- **Tipografía**:
  - `Neue Montreal`: Fuente principal para títulos y cuerpo, proporcionando un aspecto editorial y moderno.
  - `Plus Jakarta Sans`: Fuente secundaria para elementos de UI y legibilidad.
- **Paleta de Colores**:
  - Predominio de blanco (`#FFFFFF`) y negro (`#000000`).
  - El sitio utiliza un sistema dinámico de cambio de color de fondo basado en el scroll.

## 2. Stack Tecnológico
- **React + Vite**: Entorno de desarrollo rápido y modular.
- **Tailwind CSS**: Para el diseño base y utilidades.
- **GSAP (GreenSock)**: Motor principal de animaciones.
  - `ScrollTrigger`: Orquestación de animaciones basadas en el scroll.
- **Framer Motion**: Utilizado para micro-interacciones (hovers, entradas suaves).
- **SplitType**: Para dividir textos en palabras o caracteres y animarlos individualmente.
- **Lenis**: Librería para "Smooth Scrolling" (scroll suave).

## 3. Estructura de la Homepage (Index.tsx)

### A. Navegación (AccordionNavbar)
El menú tiene una transición "líquida":
- Al hacer scroll, el ancho pasa de **100%** a **50%** (o 96% en móvil).
- El `border-radius` aumenta de 0 a `50px`.
- Se activa un `backdrop-filter: blur(20px)` y una opacidad de fondo suave.

### B. Hero de Doble Etapa
1.  **Stage 1 (Logo Center)**: Un logotipo gigante centrado que aparece con un fade-in lento. Solo visible en desktop para impacto inicial.
2.  **Stage 2 (Content/Video)**:
    - **Tagline**: Animado con GSAP + SplitType, donde las palabras emergen desde abajo con un efecto de hover que las desplaza verticalmente.
    - **Video**: Video vertical (9:16) incrustado de YouTube. Se ha eliminado toda la UI de YouTube (controles, marca) mediante parámetros de iframe y una capa de máscara superior.

### C. Animaciones de Contenido
- **Mission**: Revelación de color de texto. El texto comienza en gris claro y se vuelve blanco puro mientras el usuario hace scroll (`scrub: true`).
- **ProjectMagazine**: Un "abanico" de cartas 3D.
  - Usa `gsap.matchMedia` para ajustar el ángulo y desplazamiento según el tamaño de pantalla.
  - Las cartas se expanden desde el centro hacia los lados con rotación en el eje Y.
- **StackedValue**: Paneles pegajosos.
  - Cada sección se "bloquea" (pin) en la pantalla.
  - Mientras el usuario sigue scrolleando, el panel actual se escala (`scale: 0.7`) y se desvanece (`opacity: 0.5`) para dejar pasar al siguiente.

### D. Transiciones de Fondo Globales
En `Index.tsx`, se utiliza un `ScrollTrigger` global que detecta triggers específicos (`#vision-trigger`, `#magazine-trigger`) para cambiar variables CSS:
```javascript
// Ejemplo de lógica de transición
ScrollTrigger.create({
  trigger: "#vision-trigger",
  start: "top center",
  onEnter: () => {
    gsap.to(doc, { "--color": "#000000", duration: 1 });
    gsap.to(".dynamic-text", { color: "#ffffff", duration: 1 });
  },
  onLeaveBack: () => {
    gsap.to(doc, { "--color": "#ffffff", duration: 1 });
    gsap.to(".dynamic-text", { color: "#000000", duration: 1 });
  }
});
```

## 4. CSS Clave (index.css)
Se definen estilos para botones con expansión circular en hover:
```css
.btn-premium-expansion::before {
  content: "";
  position: absolute;
  width: 150%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: white;
  transform: translateY(-5%) scale(0.4);
  transition: transform 0.6s;
}

.btn-premium-expansion:hover::before {
  transform: translateY(0) scale(1.1);
}
```

---
*Guía generada para el equipo de desarrollo de NJB.*
