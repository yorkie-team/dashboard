#!/usr/bin/env bash

git clone git@github.com:yorkie-team/yorkie-ui.git temp
cd temp
npm install
npm run build

cd ..
cp -R ./temp/dist/assets/* src/assets 
cp -R ./temp/dist/components src/assets/styles
rm -rf temp