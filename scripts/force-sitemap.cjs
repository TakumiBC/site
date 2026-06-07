const fs = require('fs');
const path = require('path');

const dist = path.join(process.cwd(), 'dist');
const sitemap0 = path.join(dist, 'sitemap-0.xml');
const sitemapIndex = path.join(dist, 'sitemap-index.xml');
const sitemapXml = path.join(dist, 'sitemap.xml');

if (fs.existsSync(sitemap0)) {
  fs.copyFileSync(sitemap0, sitemapXml);
  console.log('Created dist/sitemap.xml from dist/sitemap-0.xml');
} else if (fs.existsSync(sitemapIndex)) {
  fs.copyFileSync(sitemapIndex, sitemapXml);
  console.log('Created dist/sitemap.xml from dist/sitemap-index.xml');
} else {
  console.error('No sitemap file found in dist/');
  process.exit(1);
}
