if [ "$1" == "init" ];then
  npm i -g pillar-pack
  yarn install
  cd app
  yarn install
fi

if [ "$1" == "web" ];then
  yarn env web
  cd $2/web
  pillar-pack -s index.tsx
fi

if [ "$1" == "web-prod" ];then
  yarn env web
  cd $2/web
  NODE_ENV=production pillar-pack -s index.web.tsx
fi

if [ "$1" == "web-build" ];then
  yarn env web
  cd $2/web
  NODE_ENV=production pillar-pack -s index.web.tsx --prod
fi

if [ "$1" == "start" ];then
  yarn env native
  cd $2
  node node_modules/react-native/local-cli/cli.js start
fi

if [ "$1" == "ios" ];then
  yarn env native
  cd $2
  node node_modules/react-native/local-cli/cli.js run-ios
fi

if [ "$1" == "ios-prod" ];then
  yarn env native
  cd $2
  NODE_ENV=production node node_modules/react-native/local-cli/cli.js run-ios
fi

if [ "$1" == "android" ];then
  yarn env native
  cd $2
  node node_modules/react-native/local-cli/cli.js run-android
fi

if [ "$1" == "android-prod" ];then
  yarn env native
  cd $2
  NODE_ENV=production node node_modules/react-native/local-cli/cli.js run-android
fi
