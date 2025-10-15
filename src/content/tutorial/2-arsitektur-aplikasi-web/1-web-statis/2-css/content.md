---
type: lesson
title: CSS - Styling dan Presentasi Web
focus: /style.css
---

# CSS: Membuat Web Menjadi Indah 🎨

CSS (Cascading Style Sheets) adalah bahasa stylesheet yang digunakan untuk mengatur tampilan dan layout elemen HTML. CSS memisahkan konten (HTML) dari presentasi (styling), memungkinkan desain yang fleksibel dan maintainable.

## Apa itu CSS?

CSS menggunakan sistem **selector** dan **property** untuk mengatur styling:

- **Separation of Concerns**: Memisahkan struktur dari presentasi
- **Reusable**: Style dapat digunakan kembali
- **Responsive**: Mendukung berbagai ukuran layar
- **Cascading**: Sistem prioritas dalam penerapan style

## Cara Menerapkan CSS

### 1. Inline CSS

```html
<p style="color: blue; font-size: 16px;">Teks biru</p>
```

### 2. Internal CSS

```html
<head>
  <style>
    p {
      color: blue;
      font-size: 16px;
    }
  </style>
</head>
```

### 3. External CSS (Recommended)

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

```css
/* styles.css */
p {
  color: blue;
  font-size: 16px;
}
```

## Sintaks CSS Dasar

### Struktur Rule

```css
selector {
  property: value;
  property: value;
}
```

### Contoh

```css
h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
```

## Jenis Selector

### 1. Element Selector

```css
p {
  color: black;
}
h1 {
  font-size: 2rem;
}
```

### 2. Class Selector

```css
.highlight {
  background-color: yellow;
}
.button {
  padding: 10px 20px;
}
```

### 3. ID Selector

```css
#header {
  background-color: #f5f5f5;
}
#main-content {
  margin: 20px 0;
}
```

### 4. Attribute Selector

```css
input[type="email"] {
  border: 1px solid #ccc;
}
a[target="_blank"] {
  color: red;
}
```

### 5. Pseudo Selector

```css
a:hover {
  color: blue;
}
li:first-child {
  font-weight: bold;
}
input:focus {
  outline: 2px solid blue;
}
```

## CSS Box Model

Setiap elemen HTML adalah sebuah "box" yang terdiri dari:

```css
.box {
  /* Content */
  width: 200px;
  height: 100px;

  /* Padding - ruang dalam */
  padding: 20px;

  /* Border - garis tepi */
  border: 2px solid #333;

  /* Margin - ruang luar */
  margin: 10px;
}
```

## Layout Techniques

### 1. Flexbox

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.flex-item {
  flex: 1;
}
```

### 2. CSS Grid

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 20px;
}

.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
}
```

### 3. Positioning

```css
.relative {
  position: relative;
  top: 10px;
  left: 20px;
}

.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
```

## Responsive Design

### Media Queries

```css
/* Mobile First */
.container {
  width: 100%;
  padding: 0 15px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
```

### Flexible Units

```css
.responsive-text {
  font-size: clamp(16px, 4vw, 24px);
  line-height: 1.5;
}

.responsive-spacing {
  margin: 2rem 0;
  padding: 1rem;
}
```

## CSS Custom Properties (Variables)

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-unit);
}

.card {
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-unit);
}
```

## Modern CSS Features

### 1. CSS Transitions

```css
.button {
  background-color: blue;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: darkblue;
  transform: scale(1.05);
}
```

### 2. CSS Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}
```

### 3. CSS Functions

```css
.calculated {
  width: calc(100% - 40px);
  height: min(300px, 50vh);
  margin: max(20px, 2rem);
}
```

## Peran CSS dalam Web Statis

Dalam arsitektur web statis, CSS berperan untuk:

1. **Visual Design**: Mengatur warna, typography, spacing
2. **Layout**: Mengorganisir elemen di halaman
3. **Responsive**: Menyesuaikan dengan berbagai device
4. **User Experience**: Meningkatkan interaksi visual
5. **Branding**: Konsistensi identitas visual

## CSS Methodologies

### 1. BEM (Block Element Modifier)

```css
/* Block */
.card {
}

/* Element */
.card__header {
}
.card__body {
}
.card__footer {
}

/* Modifier */
.card--featured {
}
.card__header--large {
}
```

### 2. Atomic CSS

```css
.m-0 {
  margin: 0;
}
.p-4 {
  padding: 1rem;
}
.text-center {
  text-align: center;
}
.bg-primary {
  background-color: #007bff;
}
```

## Performance Considerations

### 1. CSS Optimization

```css
/* ❌ Inefficient */
div p span a {
  color: red;
}

/* ✅ Efficient */
.link {
  color: red;
}
```

### 2. Critical CSS

```html
<head>
  <!-- Critical CSS inline -->
  <style>
    body {
      font-family: sans-serif;
    }
    .header {
      background: #fff;
    }
  </style>

  <!-- Non-critical CSS async -->
  <link
    rel="preload"
    href="styles.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
</head>
```

## Contoh Complete Styling

```css
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Components */
.header {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav a:hover {
  color: #007bff;
}

/* Responsive */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
  }

  .nav ul {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
```

## Limitasi CSS dalam Web Statis

- **Tidak ada logic**: Tidak bisa melakukan conditional styling dinamis
- **State management**: Terbatas pada pseudo-classes
- **Data binding**: Tidak bisa bind dengan data dinamis
- **Component reusability**: Terbatas tanpa framework

## Next Steps

Setelah memahami CSS:

1. **CSS Preprocessing**: Sass, Less, Stylus
2. **CSS Frameworks**: Bootstrap, Tailwind CSS
3. **CSS-in-JS**: Untuk aplikasi dynamic
4. **Design Systems**: Konsistensi UI/UX

CSS adalah seni dan sains - kombinasi kreativitas dan logika teknis! 🎨✨
