---
type: lesson
title: CSS - Styling dan Presentasi Web
focus: /index.html
---

# CSS: Membuat Web Menjadi Indah

Jika membangun halaman web kita ibaratkan sebagai membangun rumah, HTML adalah fondasi, rangka, dinding, lantai dan atap. Maka CSS adalah cat, interior dan eksterior yang membuat rumah kita menjadi lebih menarik.

CSS adalah singkatan dari Cascading Style Sheet. Cascading secara harfiah artinya mengalir dari atas kebawah, style sheet kurang lebih maksudnya daftar atau catatan untuk perubahan tampilan yang akan dilakukan.

CSS menggunakan sistem **selector** dan **property** untuk mengatur _styling_:

- **Separation of Concerns**: Memisahkan struktur dari presentasi
- **Reusable**: Style dapat digunakan berulang-kali
- **Responsive**: Membangun layout yang mendukung berbagai ukuran layar
- **Cascading**: Sistem prioritas dalam penerapan style

## Cara Menerapkan CSS

### 1. Inline CSS

```html
<h1 style="color: tomato; font-size: 36px">Catatan</h1>
```

### 2. Internal CSS

```html
<head>
  <title>Aplikasi Catatan</title>
  <style>
    h1 {
      color: tomato;
      font-size: 36px;
    }
  </style>
</head>
```

### 3. External CSS (Recommended)

```html
<head>
  <title>Aplikasi Catatan</title>
  <link rel="stylesheet" href="style.css" />
</head>
```

```css
/* style.css */
h1 {
  color: tomato;
  font-size: 36px;
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
  font-size: 3rem;
  text-align: center;
}

#subtitle {
  color: #4f46e5;
  text-align: center;
}

.container {
  max-width: 1000px;
  margin: 1rem auto;
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
[type="submit"]:hover {
  background-color: #1f2937;
}

[type="submit"]:disabled {
  background-color: #1f2937;
  cursor: not-allowed;
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
.note {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 3px solid var(--light);
  padding: 1.5rem;
  transition: var(--transition);
}
```

### 2. CSS Grid

```css
form {
  display: grid;
  grid-gap: 1rem;
  margin: 1rem 0;
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

## CSS Custom Properties (Variables)

```css
:root {
  --color-primary: #4f46e5;
  --color-secondary: #ec4899;
  --dark: #1f2937;
  --light: #f3f4f6;
  --transition: all 250ms ease-in-out;
}

h3 {
  color: var(--color-primary);
  text-align: center;
}

.note__btn {
  color: var(--light);
  transition: var(--transition);
}

.note__view {
  background-color: var(--color-primary);
}

.note__delete {
  background-color: var(--color-secondary);
}
```

## Peran CSS dalam halaman Web

Dalam arsitektur web statis, CSS berperan untuk:

1. **Visual Design**: Mengatur warna, typography, dan spacing
2. **Layout**: Mengorganisir elemen di halaman
3. **Responsive**: Menyesuaikan dengan berbagai ukuran layar
4. **User Experience**: Meningkatkan interaksi visual
5. **Branding**: Konsistensi identitas visual

## CSS untuk aplikasi Catatan

### Reset dan Basis Styling

```css
*,
*::after,
*::before {
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-primary: #4f46e5;
  --color-secondary: #ec4899;
  --dark: #1f2937;
  --light: #f3f4f6;
  --transition: all 250ms ease-in-out;
}

body {
  display: grid;
  place-content: center;
  padding: 2rem;
  color: var(--dark);
}

.container {
  max-width: 1000px;
  margin: 1rem auto;
}
```

### Styling Heading

```css
h1 {
  font-size: 3rem;
  text-align: center;
}
h3 {
  color: var(--color-primary);
  text-align: center;
}
```

### Styling Form

```css
form {
  display: grid;
  grid-gap: 1rem;
  margin: 1rem 0;

  label,
  input,
  textarea {
    font-size: inherit;
    font-size: inherit;
  }
  [for="title"],
  [for="note"],
  [for="category"] {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
    grid-gap: 1rem;
    background-color: var(--light);
    font-weight: bold;

    input,
    textarea,
    select {
      flex: 1 1 80%;
      border: 2px solid var(--dark);
      padding: 0.5rem;
      color: var(--dark);
      width: 100%;

      &:focus {
        outline: 3px solid var(--dark);
      }
    }
  }
  [type="submit"] {
    background-color: var(--color-primary);
    color: var(--light);
    padding: 1.25rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus {
      background-color: var(--dark);
    }
    &:disabled {
      background-color: var(--dark);
      cursor: not-allowed;
    }
  }
}
```

### Styling Notes

```css
.notes {
  max-width: 1000px;
  margin: 2rem auto 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 1.5rem;
}

.note {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 3px solid var(--light);
  padding: 1.5rem;
  transition: var(--transition);
}

.note__title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.note__body {
  overflow: hidden;
  max-height: 8rem;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}

.note__actions {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5rem;

  .note__btn {
    font-family: inherit;
    font-size: inherit;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    color: var(--light);
    cursor: pointer;
    transition: var(--transition);
  }

  .note__view {
    background-color: var(--color-primary);
  }

  .note__delete {
    background-color: var(--color-secondary);
  }
}
```
