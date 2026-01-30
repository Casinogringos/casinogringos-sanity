const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Find all PNG files in public directory
const findPngFiles = (dir) => {
  const files = fs.readdirSync(dir);
  return files.filter(file => file.toLowerCase().endsWith('.png'));
};

const convertPngToWebp = async () => {
  const pngFiles = findPngFiles(publicDir);

  console.log(`\nFound ${pngFiles.length} PNG files to convert\n`);

  let converted = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of pngFiles) {
    const pngPath = path.join(publicDir, file);
    const webpPath = path.join(publicDir, file.replace(/\.png$/i, '.webp'));

    // Skip if WebP already exists
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipped (exists): ${file}`);
      skipped++;
      continue;
    }

    try {
      const pngStats = fs.statSync(pngPath);
      const pngSize = (pngStats.size / 1024).toFixed(2);

      await sharp(pngPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      const webpSize = (webpStats.size / 1024).toFixed(2);
      const savings = ((1 - webpStats.size / pngStats.size) * 100).toFixed(1);

      console.log(`✅ Converted: ${file}`);
      console.log(`   ${pngSize}KB (PNG) → ${webpSize}KB (WebP) | -${savings}% savings\n`);

      converted++;
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
      errors++;
    }
  }

  console.log('\n=== Conversion Summary ===');
  console.log(`✅ Converted: ${converted} files`);
  console.log(`⏭️  Skipped: ${skipped} files (already exist)`);
  console.log(`❌ Errors: ${errors} files`);
  console.log('\n💡 Next steps:');
  console.log('1. Review the converted WebP files');
  console.log('2. Update any hardcoded PNG references to WebP in your code');
  console.log('3. Test the site locally');
  console.log('4. Delete PNG files after verifying WebP works (optional)');
};

convertPngToWebp()
  .then(() => {
    console.log('\n✨ Conversion complete!\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
