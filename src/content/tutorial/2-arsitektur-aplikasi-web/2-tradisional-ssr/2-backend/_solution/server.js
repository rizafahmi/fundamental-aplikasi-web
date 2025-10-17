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

  return html(event, template);
});

app.post("/", async (event) => {
  const data = await readBody(event);
  console.log(data);
  const template = await readFile(
    join(__dirname, "templates", "index.html"),
    "utf-8",
  );

  return html(event, template);
});

serve(app, { port: 3000 });

console.log("Server running on http://localhost:3000");
