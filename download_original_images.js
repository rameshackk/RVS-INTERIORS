import fs from 'fs';
import path from 'path';

async function downloadAll() {
  const htmlRes = await fetch('https://rameshackk.github.io/rvs-builders/');
  const html = await htmlRes.text();
  console.log("Fetched HTML length:", html.length);

  const jsMatch = html.match(/src=["'](\/rvs-builders\/assets\/index-[^"']+\.js)["']/);
  if (!jsMatch) {
    console.log("No JS bundle match in HTML:", html);
    return;
  }

  const jsUrl = 'https://rameshackk.github.io' + jsMatch[1];
  console.log("Fetching JS bundle:", jsUrl);
  const jsRes = await fetch(jsUrl);
  const jsText = await jsRes.text();

  // Find all image paths in the JS bundle
  const regex = /["'](\/rvs-builders\/assets\/[^"']+\.(?:jpg|png|jpeg|webp))["']/g;
  let m;
  const imageUrls = new Set();
  while ((m = regex.exec(jsText)) !== null) {
    imageUrls.add('https://rameshackk.github.io' + m[1]);
  }

  console.log(`Found ${imageUrls.size} images in original site:`, Array.from(imageUrls));

  const targetDir = path.resolve('src/assets/images');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let index = 1;
  for (const url of imageUrls) {
    const filename = path.basename(url);
    console.log(`Downloading (${index}/${imageUrls.size}):`, filename);
    const res = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(targetDir, filename), buffer);
    index++;
  }

  console.log("All original images downloaded into src/assets/images/ successfully!");
}

downloadAll().catch(console.error);
