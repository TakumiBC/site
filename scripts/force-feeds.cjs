const fs = require('fs');
const path = require('path');

const dist = path.join(process.cwd(), 'dist');

const rssXml = path.join(dist, 'rss.xml');

if (!fs.existsSync(rssXml)) {
  console.error('dist/rss.xml not found');
  process.exit(1);
}

const targets = [
  'rss/index.html',
  'rss2/index.html',
  'rss2.xml',
  'feed/index.html',
  'feed.xml'
];

for (const target of targets) {
  const targetPath = path.join(dist, target);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(rssXml, targetPath);
  console.log(`Created dist/${target}`);
}
