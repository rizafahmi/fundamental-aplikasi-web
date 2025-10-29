---
type: lesson
title: Backend dengan Framework
focus: /package.json
---

<video src="/ssr.m4v" autoplay loop muted></video>

# Backend dengan Framework

Umumnya, dengan menggunakan web framework seperti Express, Hono, H3 dan lainnya, kode untuk web server, routing, dan assets management bisa menjadi lebih ringkas.

[H3](https://h3.dev/) menarik karena cepat, ringan, dan ringkas. H3 sangat dekat dengan web standards sehingga lebih mudah dijalankan dengan berbagai runtime JavaScript seperti Node, Deno, Bun dan yang lainnya.

#### Setup

Lakukan npm init untuk menandai proyek sebagai proyek nodejs.

```shell
npm init -y
```

Lalu instalasi h3

```shell
npm install h3@beta
```

Buka `package.json`, tambahkan `"type": "module"` agar dapat menggunakan ESModule (import).

```json
{
  "name": "fundamental-aplikasi-web-demo",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "type": "module",
  "dependencies": {
    "h3": "^2.0.0-beta.5"
  }
}
```

Ubah kode server agar menggunakan h3.

```javascript
import { H3, serve, html, readBody } from "h3";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { staticFilesHandler } from "./lib/static.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new H3();

// Serve static files from templates directory
app.use("/**", staticFilesHandler);

// Serve the main HTML page
app.get("/", async (event) => {
  const template = await readFile(
    join(__dirname, "templates", "index.html"),
    "utf-8",
  );

  event.res.status = 200;
  event.res.statusText = "OK";
  event.res.headers.set("Content-Type", "text/html");
  return template;
});

serve(app, { port: 3000 });

console.log("Server running on http://localhost:3000");
```

Buat file untuk menangani file statis di `lib/static.js`.

```javascript
import { serveStatic } from "h3";
import { stat } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFile } from "fs/promises";

export function staticFilesHandler(event) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const url = event.node.req.url;

  // Only serve specific static files
  if (url.endsWith(".js") || url.endsWith(".css")) {
    return serveStatic(event, {
      getContents: (id) => readFile(join(__dirname, "../", "public", id)),
      getMeta: async (id) => {
        const stats = await stat(join(__dirname, "../", "public", id)).catch(
          () => {},
        );
        if (stats?.isFile()) {
          return {
            size: stats.size,
            mtime: stats.mtimeMs,
          };
        }
      },
    });
  }
}
```

### Web Server untuk Aplikasi Catatan

Pertama, untuk dapat mengirimkan data dari browser ke server, kita perlu ubah metode pengiriman form. Jika sebelumnya semua data diproses di browser (dengan JavaScript), sekarang metode pengiriman form perlu diubah menjadi POST di file `index.html`.

```diff
<!doctype html>
<html>
  <head>
    <title>Aplikasi Catatan</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <main class="container">
      <h1>Catatan</h1>
      <h3>Buat catatan baru</h3>
-     <form id="form">
+     <form id="form" action="/" method="POST">
        <label for="title"
          >Judul
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Judul catatan"
            required
          />
        </label>
        <label for="note"
          >Catatan
          <textarea
            name="note"
            id="note"
            cols="30"
            rows="10"
            placeholder="Tulis catatan kamu disini..."
            required
          ></textarea>
        </label>
        <label for="category"
          >Kategori
          <select name="category" id="category" required>
            <option value="">-- Pilih Kategori --</option>
            <option value="personal">Pribadi</option>
            <option value="work">Kerjaan</option>
            <option value="other">Lainnya</option>
          </select>
        </label>

        <button type="submit" id="save_button">Simpan</button>
      </form>
    </main>
    <aside>
      <h3>Catatan</h3>
      <div class="notes">{{NOTES}}</div>
    </aside>
    <script src="/app.js"></script>
    <footer>&copy; 2025 Made with love for Domainesia</footer>
  </body>
</html>
```

#### Menangani `POST /`

Di sisi server, kita harus menangani dan membaca data form yang dikirimkan.

```javascript
import { H3, serve, html, readBody } from "h3";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { staticFilesHandler } from "./lib/static.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new H3();

// Serve static files from templates directory
app.use("/**", staticFilesHandler);

// Serve the main HTML page
app.get("/", async (event) => {
  const template = await readFile(
    join(__dirname, "templates", "index.html"),
    "utf-8",
  );

  event.res.status = 200;
  event.res.statusText = "OK";
  event.res.headers.set("Content-Type", "text/html");
  return template;
});

app.post("/", async (event) => {
  const data = await readBody(event);
  console.log(data);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
});

serve(app, { port: 3000 });

console.log("Server running on http://localhost:3000");
```

#### Menyimpan Catatan

```diff
import { H3, serve, html, readBody } from "h3";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { staticFilesHandler } from "./lib/static.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

+ let NOTES = [];

const app = new H3();

// Serve static files from templates directory
app.use("/**", staticFilesHandler);

// Serve the main HTML page
app.get("/", async (event) => {
  const template = await readFile(
    join(__dirname, "templates", "index.html"),
    "utf-8",
  );

  event.res.status = 200;
  event.res.statusText = "OK";
  event.res.headers.set("Content-Type", "text/html");
  return template
});

app.post("/", async (event) => {
  const data = await readBody(event);
- console.log(data);
+ NOTES = NOTES.concat(data);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
});

serve(app, { port: 3000 });

console.log("Server running on http://localhost:3000");

```

#### Menampilkan Daftar Catatan

Untuk menampilkan daftar catatan, dan berhubung tidak menggunakan template engine, kita akan menggunakan trik [string replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

```html
<aside>
  <h3>Catatan</h3>
  <div class="notes">{{NOTES}}</div>
</aside>
```

Untuk setiap catatan akan dibuatkan komponen tersendiri, dan ketika ingin ditampilkan dapat menggunakan pemanggilan fungsi.

```javascript
function noteComponent({ title, note }) {
  return `<div class="note">
    <h2 class="note__title">${title}</h2>
    <p class="note__body">
      ${note}
    </p>
    <div class="note__actions">
      <button class="note__btn note__view">View Detail</button>
      <button class="note__btn note__delete">Delete Note</button>
    </div>
  </div>`;
}

// Serve the main HTML page
app.get("/", async (event) => {
  const template = await readFile(
    join(__dirname, "templates", "index.html"),
    "utf-8",
  );

  // Replace placeholders in template
  const notesHTML = NOTES.map((note) => noteComponent(note)).join("");

  const renderedHTML = template.replace("{{NOTES}}", notesHTML);

  event.res.status = 200;
  event.res.statusText = "OK";
  event.res.headers.set("Content-Type", "text/html");
  return renderedHTML;
});
```

## Kesimpulan

Pada arsitektur ini, fokus utama ada di sisi server. Sedangkan client/browser bahkan hanya HTML dan CSS saja, tanpa JavaScript.
