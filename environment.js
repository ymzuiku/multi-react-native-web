// /Users/ym/work/local/RNProject/ios/build/info.plist RNProject
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const rootPath = path.resolve(__dirname, './');
const packageWeb = require('./app/package.json');
const packageNative = require('./app/package.json');

const argv = process.argv.splice(2);

const paths = {
  root: rootPath,
  web: path.resolve(rootPath, './app/web'),
  webSrc: path.resolve(rootPath, './app/web/src'),
  webPackage: path.resolve(rootPath, './app/web/src/package.json'),
  app: path.resolve(rootPath, './app'),
  appSrc: path.resolve(rootPath, './app/src'),
  appNodeModules: path.resolve(rootPath, './app/node_modules'),
  appYarnLock: path.resolve(rootPath, './app/yarn.lock'),
  src: path.resolve(rootPath, './app/src'),
  node_modules: path.resolve(rootPath, './app/node_modules'),
  yarnLock: path.resolve(rootPath, './app/yarn.lock'),
  project: undefined,
  projectSrc: undefined,
};

const yarnLock = fs.readFileSync(paths.yarnLock, {
  encoding: 'utf-8',
});

let projectName = 'base-app';
let isWeb = false;
let isNative = false;

for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--project') {
    projectName = argv[i + 1];
    paths.project = path.resolve(rootPath, projectName);
    paths.projectSrc = paths.project + '/src';
  }
  if (argv[i] === 'web') {
    isWeb = true;
  }
  if (argv[i] === 'native') {
    isNative = true;
  }
}

function runWeb() {
  if (isWeb) {
    // web
    packageWeb.name = 'sub-web';
    fs.removeSync(paths.webSrc);
    fs.removeSync(paths.webPackage);
    fs.writeJSONSync(paths.web + '/package.json', packageWeb);
    try {
      execSync(`ln -s ${paths.src} ${paths.webSrc}`);
    } catch (err) {}
  }
}

function runNative() {
  if (isNative) {
    // native
    // packageNative.name = projectName.toLowerCase();
    // fs.removeSync(paths.app + '/index.js');
  }
}

function runProject() {
  if (projectName !== 'base-app') {
    // otherProject
    const nativeEnvFilse = [
      'tsconfig.json',
      'rn-cli.config.js',
      'package.json',
      '.babelrc',
    ];
    for (let i = 0; i < nativeEnvFilse.length; i++) {
      const file = nativeEnvFilse[i];
      fs.copyFileSync(paths.app + '/' + file, paths.app + '/' + file);
    }
    try {
      execSync(`cd ${paths.project} && react-native init ${projectName}`);
    } catch (err) {}
    if (
      !fs.existsSync(paths.appYarnLock) ||
      fs.readFileSync(paths.appYarnLock, { encoding: 'utf-8' }) !== yarnLock
    ) {
      fs.removeSync(paths.app + '/node_modules');
      fs.copySync(paths.yarnLock, paths.appYarnLock);
      fs.copySync(paths.node_modules, paths.appNodeModules);
    }
  }
}

runWeb();
runNative();
// runProject();
