#!/usr/bin/env bash

git clone https://github.com/yorkie-team/yorkie-ui-old.git temp
cd temp
npm install
npm run build-admin

cd ..
rimraf src/assets
mkdir -p src/assets
cp -R ./temp/dist/assets/* src/assets
rimraf temp
mv src/assets/images/favicon* public/
mv src/assets/images/og* public/
