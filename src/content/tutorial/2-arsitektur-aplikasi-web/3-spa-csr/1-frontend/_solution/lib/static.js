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
