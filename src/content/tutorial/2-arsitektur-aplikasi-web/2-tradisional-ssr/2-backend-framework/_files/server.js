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