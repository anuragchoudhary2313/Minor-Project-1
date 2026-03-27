const fs = require('fs');
const content = fs.readFileSync('generate_100_items.js', 'utf8');

const imgMatches = content.match(/img: "([^"]+)"/g);
if (imgMatches) {
    const images = imgMatches.map(m => m.match(/"([^"]+)"/)[1]);
    const counts = {};
    images.forEach(img => {
        counts[img] = (counts[img] || 0) + 1;
    });

    console.log(`Total images: ${images.length}`);
    console.log(`Unique images: ${Object.keys(counts).length}`);
    
    console.log('\nDuplicates (>1):');
    Object.entries(counts).forEach(([img, count]) => {
        if (count > 1) {
            console.log(`${count} times: ${img}`);
        }
    });
} else {
    console.log('No images found.');
}
