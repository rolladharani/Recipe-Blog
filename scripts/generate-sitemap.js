const fs = require("fs")

const urls = [
  "/",
  "/recipes",
  "/recipes/spanish-paella",
  "/recipes/french-croissant"
]

const locales = ["en","es","fr"]

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

urls.forEach(url=>{
  locales.forEach(locale=>{
    sitemap += `
<url>
<loc>http://localhost:3000/${locale}${url}</loc>
</url>`
  })
})

sitemap += `
</urlset>`

fs.writeFileSync("./public/sitemap.xml", sitemap)