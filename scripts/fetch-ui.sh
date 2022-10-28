#!/usr/bin/env bash

git clone https://github.com/yorkie-team/yorkie-ui.git temp
cd temp
npm install
npm run build-admin

cd ..
rm -rf src/assets
mkdir -p src/assets
cp -R ./temp/dist/assets/* src/assets 
rm -rf temp
