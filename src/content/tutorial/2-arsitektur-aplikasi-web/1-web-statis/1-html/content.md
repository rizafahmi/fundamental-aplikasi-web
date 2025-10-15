---
type: lesson
title: HTML - Struktur Dasar Web
focus: /index.html
---

# HTML: Fondasi Struktur Web 🏗️

HTML (HyperText Markup Language) adalah bahasa markup yang digunakan untuk membuat struktur dan konten halaman web. HTML memberikan kerangka semantik yang akan diisi dengan konten dan diberi style dengan CSS.

## Apa itu HTML?

HTML menggunakan sistem **tag** untuk mendefinisikan elemen-elemen dalam halaman web:

- **Semantic Structure**: Memberikan makna pada konten
- **Cross-Platform**: Berjalan di semua browser dan device
- **Foundation**: Basis dari semua aplikasi web

## Struktur Dasar HTML

Setiap dokumen HTML memiliki struktur dasar:

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Halaman</title>
</head>
<body>
    <h1>Selamat Datang</h1>
    <p>Ini adalah paragraf pertama.</p>
</body>
</html>
```

## Elemen-Elemen Penting

### 1. Document Structure
- `<!DOCTYPE html>`: Deklarasi tipe dokumen
- `<html>`: Root element
- `<head>`: Metadata dan informasi dokumen
- `<body>`: Konten yang terlihat

### 2. Content Elements
- `<h1>` hingga `<h6>`: Heading/judul
- `<p>`: Paragraf
- `<div>`: Container generik
- `<span>`: Inline container

### 3. Semantic Elements (HTML5)
- `<header>`: Bagian header
- `<nav>`: Navigasi
- `<main>`: Konten utama
- `<section>`: Bagian konten
- `<article>`: Artikel
- `<aside>`: Sidebar
- `<footer>`: Footer

### 4. Interactive Elements
- `<a>`: Link/tautan
- `<button>`: Tombol
- `<form>`: Formulir
- `<input>`: Input field

## Atribut HTML

Elemen HTML dapat memiliki atribut untuk konfigurasi tambahan:

```html
<a href="https://example.com" target="_blank" class="link">
    Klik di sini
</a>

<img src="image.jpg" alt="Deskripsi gambar" width="300">

<div id="container" class="wrapper main-content">
    Konten
</div>
```

## Best Practices

### 1. Semantic HTML
Gunakan elemen sesuai dengan makna semantiknya:

```html
<!-- ❌ Tidak semantic -->
<div class="header">
    <div class="title">Judul</div>
</div>

<!-- ✅ Semantic -->
<header>
    <h1>Judul</h1>
</header>
```

### 2. Accessibility
Pastikan HTML dapat diakses semua pengguna:

```html
<img src="chart.png" alt="Grafik penjualan bulan ini naik 25%">
<button aria-label="Tutup dialog">×</button>
<label for="email">Email:</label>
<input type="email" id="email" required>
```

### 3. SEO Friendly
Struktur yang baik untuk mesin pencari:

```html
<head>
    <title>Judul Halaman yang Descriptive</title>
    <meta name="description" content="Deskripsi singkat halaman">
    <meta name="keywords" content="kata, kunci, relevan">
</head>
```

## Peran HTML dalam Web Statis

Dalam arsitektur web statis, HTML berperan sebagai:

1. **Content Structure**: Mengorganisir informasi secara hierarkis
2. **Navigation**: Menyediakan sistem navigasi antar halaman
3. **SEO Foundation**: Memberikan struktur untuk mesin pencari
4. **Accessibility Base**: Fondasi untuk aksesibilitas web

## Contoh Struktur Website Sederhana

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - John Doe</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home">
            <h1>John Doe</h1>
            <p>Web Developer & Designer</p>
        </section>

        <section id="about">
            <h2>About Me</h2>
            <p>Saya adalah seorang web developer...</p>
        </section>

        <section id="projects">
            <h2>My Projects</h2>
            <article>
                <h3>Project 1</h3>
                <p>Deskripsi project...</p>
            </article>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 John Doe. All rights reserved.</p>
    </footer>
</body>
</html>
```

## Limitasi HTML Standalone

HTML sendiri memiliki keterbatasan:

- **Tidak ada styling**: Tampilan default browser sangat basic
- **Tidak ada interaktivitas**: Hanya link dan form basic
- **Tidak ada dynamic content**: Konten bersifat statis
- **Tidak ada logic**: Tidak bisa melakukan processing

Itulah mengapa HTML perlu dikombinasikan dengan CSS untuk styling dan JavaScript untuk interaktivitas.

## Next Steps

Setelah memahami HTML, langkah selanjutnya adalah:
1. **CSS**: Untuk styling dan layout
2. **JavaScript**: Untuk interaktivitas
3. **Responsive Design**: Untuk berbagai ukuran layar
4. **Web Standards**: Best practices modern

HTML adalah fondasi yang kokoh - kuasai dengan baik sebelum melanjutkan ke teknologi lainnya! 🚀
