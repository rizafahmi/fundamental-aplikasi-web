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

  event.res.status = 200;
  event.res.statusText = "OK";
  event.res.headers.set("Content-Type", "text/html");
  return template;
});

app.post("/api", async (event) => {
  const data = await readBody(event);
  NOTES = NOTES.concat(data);

  return { status: 201, message: "Note created" };
});

app.get("/api", function () {
  return NOTES;
});

serve(app, { port: 3000 });

console.log("Server running on http://localhost:3000");
