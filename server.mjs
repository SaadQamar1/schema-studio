import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { extname, join } from "node:path"
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" }
createServer(async (request, response) => {
  const file = request.url === "/" ? "public/index.html" : `public${request.url}`
  try { const contents = await readFile(join(process.cwd(), file)); response.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" }); response.end(contents) }
  catch { response.writeHead(404); response.end("Not found") }
}).listen(process.env.PORT || 3000, "0.0.0.0", () => console.log(`Running at http://localhost:${process.env.PORT || 3000}`))
