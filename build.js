const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

// Copy index.html into dist (update base paths if needed)
const srcIndex = path.join(__dirname, 'index.html');
const destIndex = path.join(dist, 'index.html');
let html = fs.readFileSync(srcIndex, 'utf8');

// Adjust asset paths for production: when index.html is copied into dist/,
// change the stylesheet reference from './dist/styles.css' -> './styles.css'
html = html.replace(/href="\.\/dist\/styles\.css"/g, 'href="./styles.css"');
fs.writeFileSync(destIndex, html, 'utf8');
console.log('Copied index.html -> dist/index.html');
