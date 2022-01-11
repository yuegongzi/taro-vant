#!/bin/bash

yarn
npx vant-cli build-site


cd ./../taro-vant-demo
yarn
pwd
npm run real:h5Doc

cd  ./../taro-vant-doc

mv  ./../taro-vant-demo/build/assets  ./site

mv  ./../taro-vant-demo/build/index.html  ./site/mobile.html
