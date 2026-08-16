import fs from 'fs';
import path from 'path';

const projectFiles = [
  '98545f49d0d134aa30e79e5be19d9d71.jpg',
  'baad21b764983983d526d962ba2039e9.jpg',
  'b9a4748fa08cefe0ab059a504d33f13d.jpg',
  '9553211551fadf8045ccc624a049cb0f.jpg',
  'a4d1550e351fd3de3a19ab05a58f1b17.jpg',
  'd6891d4ffab93b85c8c1c7a7465dba7d.jpg',
  '4c2a9421550ffb56b92c1d347dc6e6b1.jpg',
  '6835d700137a559c3c7681405f09e06f.jpg',
  'b59689fce29c42e124c152b88cb500b8.jpg',
  'c0cc64f9978f64be1236bde48b58e0c0.jpg',
  '37555dc0fefe3ef0e645960d8ba73056.jpg'
];

const bannerFiles = [
  'banner1.png',
  'banner2.png',
  'banner3.png'
];

async function main() {
  const dirs = [
    'src/assets/images/projects',
    'src/assets/images/banners',
    'src/assets/images/brand',
    'public/projects'
  ];

  for (const d of dirs) {
    fs.mkdirSync(path.resolve(d), { recursive: true });
  }

  // 1. Download project photos
  for (const file of projectFiles) {
    const url = `https://rameshackk.github.io/rvs-builders/projects/${file}`;
    console.log("Downloading project photo:", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    
    // Save to src/assets/images/projects and public/projects
    fs.writeFileSync(path.resolve(`src/assets/images/projects/${file}`), buf);
    fs.writeFileSync(path.resolve(`public/projects/${file}`), buf);
    console.log(`Saved ${file} (${buf.length} bytes)`);
  }

  // 2. Download banners
  for (const file of bannerFiles) {
    const url = `https://rameshackk.github.io/rvs-builders/${file}`;
    console.log("Downloading banner:", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    
    // Save to src/assets/images/banners and public
    fs.writeFileSync(path.resolve(`src/assets/images/banners/${file}`), buf);
    fs.writeFileSync(path.resolve(`public/${file}`), buf);
    console.log(`Saved ${file} (${buf.length} bytes)`);
  }

  // 3. Copy brand logo files to src/assets/images/brand/
  const logoFiles = ['logo.png', 'logo-cropped.png', 'logo-icon.png', 'favicon.png', 'favicon.ico'];
  for (const file of logoFiles) {
    if (fs.existsSync(path.resolve(`public/${file}`))) {
      fs.copyFileSync(path.resolve(`public/${file}`), path.resolve(`src/assets/images/brand/${file}`));
      console.log(`Copied brand asset: ${file}`);
    }
  }

  console.log("All assets downloaded and organized successfully!");
}

main().catch(console.error);
