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
  return html(event, `<h1>Hello from server</h1>`);
});

serve(app, { port: 3000 });

console.log("Server running on http://localhost:3000");
