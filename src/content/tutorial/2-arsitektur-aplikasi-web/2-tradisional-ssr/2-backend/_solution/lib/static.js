import { serveStatic } from "h3";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";

export function staticFilesHandler(event) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const url = event.node.req.url;

  // Only serve specific static files
  if (url.endsWith(".js") || url.endsWith(".css")) {
    return serveStatic(event, {
      getContents: (id) => readFile(join(__dirname, "../", "templates", id)),
      getMeta: async (id) => {
        const stats = await stat(join(__dirname, "../", "templates", id)).catch(
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
