const fs = require('fs');
const path = require('path');

const pagesDir = path.join(process.cwd(), 'pages');

async function getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  
  return Array.prototype.concat(...files);
}

getFiles(pagesDir)
  .then(files => {
    const manifest = files
      .filter(file => !file.includes('api') && !file.startsWith('_') && file.endsWith('.js'))
      .map(file => file.replace(pagesDir, '').replace(/\\/g, '/').replace(/\.[^/.]+$/, "").substring(1));

    const manifestObject = manifest.reduce((obj, file) => {
      const parts = file.split('/');
      parts.reduce((o, part, i) => {
        if (i === parts.length - 1) {
          // If this is the last part of the path, add it to an array.
          if (!o._files) o._files = [];
          o._files.push(part);
        } else {
          // If it's not the last part, add it as an object.
          if (!o[part]) o[part] = {};
        }
        return o[part];
      }, obj);
      return obj;
    }, {});

    fs.writeFile('pages-manifest.json', JSON.stringify(manifestObject), err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
