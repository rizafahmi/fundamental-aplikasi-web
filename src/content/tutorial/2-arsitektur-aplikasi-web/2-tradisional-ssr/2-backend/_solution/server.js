import { H3, serve } from "h3";
import fs from "node:fs";

const app = new H3().get("/", (event) => {
  const template = fs.ReadStream("./templates/index.html");
  return template;
});

serve(app, { port: 3000 });
