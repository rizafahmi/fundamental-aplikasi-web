import { H3, serve, html, readBody } from "h3";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { staticFilesHandler } from "./lib/static.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let NOTES = [];

const app = new H3();

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

// Serve static files from templates directory
app.use("/**", staticFilesHandler);

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
