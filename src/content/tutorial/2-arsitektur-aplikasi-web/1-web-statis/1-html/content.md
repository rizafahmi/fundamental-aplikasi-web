---
type: lesson
title: HTML - Struktur Dasar Web
focus: /index.html
---

![](/public/statis.gif)

# HTML: Fondasi Struktur Web

HTML (HyperText Markup Language) adalah bahasa markup yang digunakan untuk membuat struktur dan konten halaman web. HTML memberikan kerangka semantik yang akan diisi dengan konten dan diberi style dengan CSS.

## Apa itu HTML?

HTML menggunakan sistem **tag** untuk mendefinisikan elemen-elemen dalam halaman web:

- **Semantic Structure**: Memberikan makna pada konten
- **Cross-Platform**: Berjalan di semua browser dan device
- **Foundation**: Basis dari semua aplikasi web

HTML, bersama CSS dan juga JavaScript berevolusi dari [dokumen bertaut](https://home.cern/science/computing/birth-web) → [website](https://www.howtogeek.com/692445/remembering-geocities-the-1990s-precursor-to-social-media/) → [platform aplikasi](https://www.youtube.com/playlist?list=PLTY2nW4jwtG8Sx2Bw6QShC271PzX31CtT). Saat ini html sudah mencapai versi 5 dengan banyak fitur-fitur menarik. Sedangkan CSS saat ini sudah mencapai versi ketiga.

![Halaman web perdana](/public/dokumen.png)

![Website geocities](/public/geocities.png)

![contoh aplikasi web](/public/youtube.png)

## Struktur Dasar HTML

Setiap dokumen HTML memiliki struktur dasar:

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Judul Halaman</title>
  </head>
  <body>
    <h1>Selamat Datang</h1>
    <p>Ini adalah paragraf pertama.</p>
  </body>
</html>
```

Untuk melihat hasilnya, kita harus menulis file dengan ekstensi html dan membukanya via web browser.

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
<a href="https://example.com" target="_blank" class="link"> Klik di sini </a>

<img src="image.jpg" alt="Deskripsi gambar" width="300" />

<div id="container" class="wrapper main-content">Konten</div>
```

HTML adalah fondasi yang kokoh - kuasai dengan baik sebelum melanjutkan ke teknologi lainnya!

## Aplikasi Catatan Sederhana

Berikut beberapa elemen HTML yang kita gunakan untuk mulai membangun struktur aplikasi catatan sederhana yang akan kita kembangkan sepanjang webinar ini.

![Aplikasi Catatan Sederhana](/public/localhost_3000_.png)

### Struktur dasar
```html
<!doctype html>
<html>
  <head>
    <title>Aplikasi Catatan</title>
  </head>
  <body>
    <main class="container">
      
    </main>
    <footer>&copy; 2025 Made with love for Domainesia</footer>
  </body>
</html>

```

### Content Elements

Tambahkan paragraf, teks atau beberapa judul.

```diff
<!doctype html>
<html>
  <head>
    <title>Aplikasi Catatan</title>
  </head>
  <body>
    <main class="container">
+       <h1>Catatan</h1>
+       <h3>Buat catatan baru</h3>
    </main>
    <footer>&copy; 2025 Made with love for Domainesia</footer>
  </body>
</html>
```

### Elemen Interaktif

Kemudian tambahkan form, beberapa input teks beserta label dan button.

```diff
<!doctype html>
<html>
  <head>
    <title>Aplikasi Catatan</title>
  </head>
  <body>
    <main class="container">
      <h1>Catatan</h1>
      <h3>Buat catatan baru</h3>
+     <form>
+       <label for="title"
+         >Judul
+         <input
+           type="text"
+           name="title"
+           id="title"
+           placeholder="Judul catatan"
+           required
+         />
+       </label>
+       <label for="note"
+         >Catatan
+         <textarea
+           name="note"
+           id="note"
+           cols="30"
+           rows="10"
+           placeholder="Tulis catatan kamu disini..."
+           required
+         ></textarea>
+       </label>
+       <label for="category"
+         >Kategori
+         <select name="category" id="category" required>
+           <option value="">-- Pilih Kategori --</option>
+           <option value="personal">Pribadi</option>
+           <option value="work">Kerjaan</option>
+           <option value="other">Lainnya</option>
+         </select>
+       </label>
+       <button type="submit">Simpan</button>
+     </form>
    </main>
    <footer>&copy; 2025 Made with love for Domainesia</footer>
  </body>
</html>
```