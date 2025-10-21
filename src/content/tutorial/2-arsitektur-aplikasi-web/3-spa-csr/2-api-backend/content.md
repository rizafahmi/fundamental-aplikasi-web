---
type: lesson
title: API Backend
focus: /server.js
---

## API Backend

Server kita sebelumnya melakukan proses rendering komponen notes. Kita kembalikan ke kode sebelumnya, sehingga proses rendering bisa dipindah ke sisi client.

Disini server kita berfungsi untuk merender index.html template saja dan REST API untuk `GET /api` dan `POST /api`.

```javascript
import { H3, serve, html, readBody } from "h3";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { staticFilesHandler } from "./lib/static.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let NOTES = [];

const app = new H3();

// Serve static files from templates directory
app.use("/**", staticFilesHandler);

// Serve the main HTML page
app.get("/", async (event) => {
  const template = await readFile(
    join(__dirname, "templates", "index.html"),
    "utf-8",
  );

  return html(event, template);
});

app.post("/", async (event) => {
  const data = await readBody(event);
  NOTES = NOTES.concat(data);

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

### `GET /api` untuk mendapatkan daftar Catatan

```javascript
app.get("/api", function () {
  return NOTES;
});
```

### `POST /api` untuk menyimpan catatan

```javascript
app.post("/api", async (event) => {
  const data = await readBody(event);
  NOTES = NOTES.concat(data);

  return { status: 201, message: "Note created" };
});
```
