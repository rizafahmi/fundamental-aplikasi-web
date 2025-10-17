import { H3, serve, serveStatic, html } from "h3";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new H3();

// Serve static files from templates directory
app.use("/**", async (event) => {
  const url = event.node.req.url;

  // Only serve specific static files
  if (url === "/app.js" || url === "/style.css") {
    return serveStatic(event, {
      getContents: (id) => readFile(join(__dirname, "templates", id)),
      getMeta: async (id) => {
        const stats = await stat(join(__dirname, "templates", id)).catch(
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
});

// Serve the main HTML page
app.get("/", async (event) => {
  const template = await readFile(
    join(__dirname, "templates", "index.html"),
    "utf-8",
  );

  return html(event, template);
});

serve(app, { port: 3000 });

console.log("Server running on http://localhost:3000");
