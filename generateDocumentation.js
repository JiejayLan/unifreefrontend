const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');

// The react components to load
const componentsFolder = './src/components/';

// path for the JSON file
const componentsJsonPath = './docs/components.json';

const componentDataArray = [];

function pushComponent(component) {
  componentDataArray.push(component);
}


function createComponentFile() {
  const componentJsonArray = JSON.stringify(componentDataArray, null, 2);
  fs.writeFile(componentsJsonPath, componentJsonArray, 'utf-8', (error, data) => {
    if (error) {
      throw error;
    }
  });
}


/**
 * Use React-Docgen to parse the loaded component
 * into the JS object of props, comments
 * @param {File} component
 * @param {String} filename
 */
function parseComponent(component, filename) {
  const componentInfo = reactDocs.parse(component);
  const splitIndex = filename.indexOf('/src/');
  const componentName = filename.substring(splitIndex + 4);
  // assign name to component info
  componentInfo.filename = componentName;
  pushComponent(componentInfo);
}


/**
 * Load a component file, then runs parsing callback
 * @param {String} file
 * @param {Promise} resolve
 */
function loadComponent(file, resolve) {
  fs.readFile(file, (err, data) => {
    if (err) {
      throw err;
    }
    // Parse the component into JS object
    resolve(parseComponent(data, file));
  });
}

/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 *
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir
 * @param {Function} done
 */
function filewalker(dir, done) {
  let results = []; fs.readdir(dir, async (err, list) => {
    if (err) return done(err); let pending = list.length;
    if (!pending) return done(null, results); list.forEach(file => {
      file = path.resolve(dir, file); fs.stat(file, async (stat) => {
        // If directory, execute a recursive call
        if (stat && stat.isDirectory()) {
          filewalker(file, (res) => {
            results = results.concat(res);
            // eslint-disable-next-line no-plusplus
            if (!--pending) done(null, results);
          });
        } else {
          // Check if is a Javascript file
          // And not a story or test
          if (
            file.endsWith('.js')
            && !file.endsWith('.story.js')
            && !file.endsWith('.test.js')
          ) {
            await new Promise((resolve) => {
              loadComponent(file, resolve);
            });
            results.push(file);
          }
          // eslint-disable-next-line no-plusplus
          if (!--pending) done(null, results);
        }
      });
    });
  });
}


filewalker(componentsFolder, (err) => {
  if (err) {
    throw err;
  }
  createComponentFile();
});
