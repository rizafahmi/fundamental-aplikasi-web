# Fundamental Aplikasi Web

Materi webinar tentang fundamental pengembangan aplikasi web bersama @domainesia. Materi ini menggunakan TutorialKit.

## Outline Materi

1. Pembuka
	Kenalan
	Agenda
	Logistik
	Outcome
2. Arsitektur aplikasi web
		Web Statis
			HTML
			CSS
			JavaScript
		Tradisional (SSR)
			Frontend
			Backend
			Database
		SPA (CSR)
			Frontend
			API/GraphQL/gRPC/Backend
				Kalo gak mau backend, bisa coba BaaS
			Database
		Beberapa arsitektur lainnya
			Fullstack/Meta framework
			HTML over the wire
			https://www.patterns.dev/#patterns
3. Live Demo
	Frontend
		HTML, CSS, JavaScript
	Backend
		Node, h3
	Bonus: Nitro, database
4. Referensi, diskusi & tanya-jawab

## Struktur Project

```bash
.
├── astro.config.mjs    # TutorialKit menggunakan Astro 🚀 (https://astro.build)
├── src
│   ├── ...
│   ├── content
│   │   └── tutorial    # Konten tutorial Anda berada di sini
│   └── templates       # Template Anda (lihat di bawah untuk informasi lebih lanjut)
├── public
│   ├── favicon.svg
│   └── logo.svg        # Logo default yang digunakan di kiri atas untuk tutorial Anda
├── ...
├── theme.ts            # Kustomisasi tema tutorial
└── uno.config.ts       # Konfigurasi UnoCSS (https://unocss.dev/)
```

## Memulai

Pastikan Anda telah menginstal semua dependensi dan menjalankan dev server:

```bash
bun install
bun run dev
```

## Struktur UI

```markdown
┌─────────────────────────────────────────────────────┐
│ ● ● ●                                               │
├───────────────────────────┬─────────────────────────┤
│                           │                         │
│                           │                         │
│                           │                         │
│                           │                         │
│                           │       Code Editor       │
│                           │                         │
│                           │                         │
│                           │                         │
│                           │                         │
│          Content          ├─────────────────────────┤
│                           │                         │
│                           │                         │
│                           │  Preview & Boot Screen  │
│                           │                         │
│                           │                         │
│                           ├─────────────────────────┤
│                           │                         │
│                           │        Terminal         │
│                           │                         │
└───────────────────────────┴─────────────────────────┘
```

## Membuat Konten

Tutorial terdiri dari bagian, bab, dan pelajaran. Contohnya:

- Bagian 1: Dasar-dasar Vite
  - Bab 1: Pengenalan
    - Pelajaran 1: Selamat datang!
    - Pelajaran 2: Mengapa Vite?
    - …
  - Bab 2: Project Vite pertama Anda
- Bagian 2: CLI
  - …

Konten Anda diorganisir ke dalam pelajaran, dengan bab dan bagian menyediakan struktur dan mendefinisikan metadata umum untuk pelajaran-pelajaran tersebut.

Berikut adalah contoh bagaimana tampilannya di `src/content/tutorial`:

```bash
tutorial
├── 1-basics-of-vite
│   ├── 1-introduction
│   │   ├── 1-welcome
│   │   │   ├── content.md    # Konten pelajaran Anda
│   │   │   ├── _files        # Set file awal
│   │   │   │   └── ...
│   │   │   └── _solution     # Solusi dari pelajaran
│   │   │       └── ...
│   │   ├── 2-why-vite
│   │   │   ├── content.md
│   │   │   └── _files
│   │   │       └── ...
│   │   └── meta.md           # Metadata untuk bab
│   └── meta.md               # Metadata untuk bagian
├── 2-advanced
│   ├── ...
│   └── meta.md
└── meta.md                   # Metadata untuk tutorial
```

### Format Konten yang Didukung

Konten dapat ditulis sebagai file Markdown (`.md`) atau menggunakan [MDX](https://mdxjs.com/) (`.mdx`). File memiliki Front Matter di bagian atas yang berisi metadata dan semua yang ada setelahnya adalah konten pelajaran Anda.

**Contoh**

```markdown
---
type: lesson
title: Selamat datang!
---

# Selamat datang di TutorialKit!

Dalam tutorial ini kami akan memandu Anda tentang cara mengatur lingkungan Anda untuk
menulis tutorial pertama Anda 🤩
```

File metadata (`meta.md`) dari bagian, bab, dan pelajaran tidak berisi konten apapun. File ini hanya berisi Front Matter untuk konfigurasi.

### Metadata

Berikut adalah gambaran umum properti yang dapat digunakan sebagai bagian dari Front Matter:

| Property        | Required | Type                        | Inherited | Description                                                                                                                                           |
| --------------- | -------- | --------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| type            | ✅       | `part \| chapter \| lesson` | ❌        | Tipe dari metadata.                                                                                                                                   |
| title           | ✅       | `string`                    | ❌        | Judul dari bagian, bab, atau pelajaran.                                                                                                              |
| slug            |          | `string`                    | ❌        | Memungkinkan Anda menyesuaikan pathname URL yaitu `/:partSlug/:chapterSlug/:lessonSlug`.                                                             |
| previews        |          | `Preview[]`                 | ✅        | Konfigurasi port mana yang harus digunakan untuk preview. Jika tidak ditentukan, port terendah akan digunakan.                                      |
| autoReload      |          | `boolean`                   | ✅        | Navigasi ke pelajaran yang menentukan `autoReload` akan selalu memuat ulang preview. Ini biasanya hanya diperlukan jika server Anda tidak mendukung HMR. |
| prepareCommands |          | `Command[]`                 | ✅        | Daftar perintah yang dijalankan secara berurutan. Biasanya digunakan untuk menginstal dependensi atau menjalankan script.                          |
| mainCommand     |          | `Command`                   | ✅        | Perintah utama yang akan dijalankan. Perintah ini akan berjalan setelah `prepareCommands`.                                                           |

`Command` memiliki bentuk sebagai berikut:

```ts
string | [command: string, title: string] | { command: string, title: string }
```

`title` digunakan sebagai bagian dari boot screen (lihat [Struktur UI](#struktur-ui)).

`Preview` memiliki bentuk sebagai berikut:

```ts
string | [port: number, title: string] | { port: number, title: string }
```

Dalam sebagian besar kasus, metadata diwariskan. Misalnya, jika Anda menentukan `mainCommand` pada sebuah bab tanpa menentukannya pada pelajaran-pelajarannya, setiap pelajaran akan menggunakan `mainCommand` dari bab masing-masing. Ini berlaku juga untuk bab dan bagian.
