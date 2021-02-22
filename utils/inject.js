function noIndex () {
    const fs = require('fs');
    fs.unlink(`${__dirname}/../dist/index.html`,
      (err) => {
        console.log('index.html was deleted');
      }
    );
  
    const mani = fs.readdirSync(
      `${__dirname}/../dist/`
    ).filter(
      i => i.indexOf('.js') !== -1 &&
           i.indexOf('precache-manifest') !== -1
    ).map(i => `${__dirname}/../dist/${i}`)[0];
  
    if (mani) fs.readFile(mani, 'utf-8', (err, data) => {
      if (err) return console.log('not found');
      const val = data.replace(
        `"/index.html"`, `"/"`
      );
  
      fs.writeFile(mani, val, 'utf-8', (err) => {
        if (err) return console.log('error');
        console.log('file done');
      });
    });
  }
  
  function jsCSS () {
    const fs = require('fs');
  
    const js = fs.readdirSync(
      `${__dirname}/../dist/js/`
    ).filter(
      i => i.indexOf('.js') !== -1 &&
           i.indexOf('.map') === -1
    ).map(i => `/js/${i}`).reverse();
  
    const css = fs.readdirSync(
      `${__dirname}/../dist/css/`
    ).filter(
      i => (
        i.indexOf('.min.css') !== -1 || 
        i.indexOf('app.') !== -1
      ) && i.indexOf('.map') === -1
    ).map(i => `/css/${i}`).reverse();
  
    return { js, css };
  }
  
  function addSW () {
    const fs = require('fs');
    fs.unlink(`${__dirname}/../dist/index.html`,
      (err) => {
        console.log('index.html was deleted');
      }
    );
  
    const files = fs.readdirSync(
      `${__dirname}/../dist/`
    ).filter(
      i => i.indexOf('sw.js') > -1 ||
           i.indexOf('service-worker.js') > -1
    ).map(i => `${__dirname}/../dist/${i}`);
  
    const sw = files.find(i => i.indexOf('sw.js') > -1);
    const sewo = files.find(i => i.indexOf('service-worker.js') > -1);
  
    fs.readFile(sewo, 'utf-8', (e, sewo_data) => {
      if (e) return console.log(sewo, ' - not found');
      fs.readFile(sw, 'utf-8', (er, sw_data) => {
        if (er) return console.log(sw, ' - not found');
        const val = sewo_data + sw_data;
        fs.writeFile(sewo, val, 'utf-8', (err) => {
          if (err) return console.log('error');
          console.log('file done');
        });
      });
    });
  }
  
  module.exports = { noIndex, jsCSS, addSW }
  