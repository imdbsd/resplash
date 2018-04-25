[Resplash Screenshoot](./screenshoot/example1.png)

# Resplash

A chrome extension build using [react.js](https://reactjs.org/ "react.js") and using asset from [unsplash](https://unsplash.com/).

Inspired by [be limitless](https://chrome.google.com/webstore/category/extensions?hl=en "be limitless") and bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to build locally

```bash
cd your/dir/to/put/this/extension
git clone https://github.com/elepampam/resplash.git
cd resplash
npm install

// run development
npm start
// build extension, will appear on build directory
npm build
```

## Install it to your chrome manually

This extension is not published yet in chrome web store yet, so you need to build it manually to use it.

Or simply download the build zip [here](https://drive.google.com/open?id=1EnJsOAarbyNV8CHguiKfqHsls5PS4IUm).

open `chrome://extension` from your chrome and enable developer mode

[step one](./screenshoot/example2.png)

click `load unpacked` and go to `your/dir/to/put/this/extension/resplash`

click the `build` folder and click `ok` to add it as extension to your chrome

## Feature

* Version 1.0
  * Hi-res pict in the background
  * Bookmark your favorite and important site (up to 6 bookmark)
  * Digital clock
  * Current Weather, powered by [openweather.org](https://openweathermap.org/)
  * Motivational quote