---
type: lesson
title: Backend NodeJS
focus: /server.js
---

<video src="/ssr.m4v" autoplay loop muted></video>

# Backend NodeJS

Backend adalah jantung aplikasi yang menangani logic bisnis, rendering HTML, dan komunikasi dengan database. Backend bertanggung jawab menghasilkan HTML lengkap sebelum dikirim ke browser.

Arsitektur ini juga dikenal dengan istilah server yang dapat menerima request dan mengirimkan response dalam format html. Arsitektur ini juga digunakan lebih lanjut untuk arsitektur server-side rendering.

## Apa itu Backend?

Backend adalah:

- **Server-Side Rendering Engine**: Menghasilkan HTML di server
- **Business Logic Handler**: Memproses data dan logika aplikasi
- **Database Interface**: Mengelola komunikasi dengan database
- **API Provider**: Menyediakan endpoints untuk berbagai kebutuhan
- **Authentication Manager**: Menangani otentikasi dan otorisasi

## Komponen Utama Backend

### Web Server

Contoh menggunakan fungsi built-in web server.

```javascript
import http from "http";

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on("request", (request, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1>Hello from server</h1>`);
});

server.listen(3000);
```

Jalanan server.

```shell
node --watch server.js
```

Buka di browser http://localhost:3000/

### Template Rendering

Berikut adalah contoh rendering file `index.html` yang kita punya sebelumnya. Pindahkan ke sebuah folder, `templates/index.html` misalnya.

```javascript
import http from "http";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on("request", async (req, res) => {
  const template = await readFile(
    join(__dirname, "templates", "index.html"),
    "utf-8",
  );

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(template);
});

server.listen(3000);
```

Jika ingin template yang dinamis, kita bisa menggunakan template engine seperti [EJS](https://ejs.co/), [Handlebars](https://handlebarsjs.com/) atau [Nunjucks](https://mozilla.github.io/nunjucks/).

### Routing

```javascript
import http from "http";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on("request", async (req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    const template = await readFile(
      join(__dirname, "templates", "index.html"),
      "utf-8",
    );

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(template);
  } else {
    console.error(`${req.url} is 404!`);
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000);
```

### Assets Management

File statis seperti css, javascript, gambar dan file statis lainnya juga perlu ditangani oleh web server. Pindahkan semua file statis ke folder lain seperti `public/app.js` dan `public/style.css`.

```javascript
import http from "http";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on("request", async (req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    const template = await readFile(
      join(__dirname, "templates", "index.html"),
      "utf-8",
    );

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(template);
  }
  // Serve CSS files
  else if (req.url.endsWith(".css")) {
    try {
      const content = await readFile(
        join(__dirname, "public", req.url),
        "utf-8",
      );
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(content);
    } catch (error) {
      console.error(`${req.url} is 404!`);
      res.writeHead(404);
      res.end();
    }
  }
  // Serve JS files
  else if (req.url.endsWith(".js")) {
    try {
      const content = await readFile(
        join(__dirname, "public", req.url),
        "utf-8",
      );
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(content);
    } catch (error) {
      console.error(`${req.url} is 404!`);
      res.writeHead(404);
      res.end();
    }
  } else {
    console.error(`${req.url} is 404!`);
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000);
```

