# qr-min

[![npm](https://img.shields.io/npm/v/qr-min.svg)](https://www.npmjs.com/package/qr-min)
[![npm](https://img.shields.io/npm/dt/qr-min.svg)](https://www.npmjs.com/package/qr-min)
[![build](https://github.com/jazz-soft/qr-min/actions/workflows/build.yml/badge.svg)](https://github.com/jazz-soft/qr-min/actions)
[![Coverage Status](https://coveralls.io/repos/github/jazz-soft/qr-min/badge.svg?branch=main)](https://coveralls.io/github/jazz-soft/qr-min?branch=main)

Minimal implementation to generate a QR code from a UTF-8 string.  
This is all you need for 99.9% of applications.

Pure JavaScript. No dependencies. Works in browser and Node.js.

If you need finer control over QR code generation,  
please check https://github.com/nayuki/QR-Code-generator

## Usage

##### Plain HTML

```html
<script src="qr-min.js"></script>
```

##### CDN (jsdelivr)

```html
<script src="https://cdn.jsdelivr.net/npm/qr-min"></script>
```

##### CDN (unpkg)

```html
<script src="https://unpkg.com/qr-min"></script>
```

##### Node.js

```js
const QR = require('qr-min');
```

## API

`QR(...)` - the only function in this package.
Takes a string and returns a 2-dimensional array of the dots in the QR code.  
Use this data to produce an image in your own artistic style.

##### Example
```js
const QR = require('qr-min');
const qr = QR('https://github.com/jazz-soft/qr-min');
var i, j, s = '';
for (i = 0; i < qr.length; i += 2) {
    for (j = 0; j < qr.length; j++) s += i + 1 < qr.length && qr[i + 1][j] ? qr[i][j] ? '█' : '▄' : qr[i][j] ? '▀' : ' ';
    s += '\n';
}
console.log(s);
```
This will produce the following output:
```
█▀▀▀▀▀█  ▄▀  ▄▀  ▀ █  █▀▀▀▀▀█
█ ███ █ ▀▄ ▀▄▄ ▀  ▀▀█ █ ███ █
█ ▀▀▀ █  ▀▄▄█▀▄▄▀███▄ █ ▀▀▀ █
▀▀▀▀▀▀▀ █ ▀▄▀ ▀ █▄█▄▀ ▀▀▀▀▀▀▀
█▀▀▄██▀▀█▄ ▄█▄ ▀██▄ █▀█  ▄▀ ▄
█ ▄ █▄▀ ▄▄█▀█▄█▄ ██ ▀▀▀▄█ ▀█▀
█▄ ▄ █▀▀  ██  █▀█▀ ▀███  █ ▀█
▀█▀█▄▀▀█▄ ▀▄ ▀ ▄▄█▄ ▄▄█ ▀█ █▀
  █▄▀█▀  ▄ ▄█▄ ▀██ ▀▀▄█▀ █▄▀█
▀▄▄▄ █▀ ▄▀ ▀█▄█▄▄█ ▄▄█▄██▄ █▀
▀  ▀  ▀ ▄▀██  █▀▀█▄██▀▀▀█ ▄▄▄
█▀▀▀▀▀█ █ █▄ ▀  ▀▄ ▀█ ▀ ██ ▀█
█ ███ █ ▀▀█▄█▄  ▄▀▀ █▀▀██ ▄▄█
█ ▀▀▀ █ █▄ ▀█▄█▄ █▄█▄▄ ▀█▀ ▄▀
▀▀▀▀▀▀▀ ▀▀▀▀  ▀  ▀ ▀▀▀ ▀▀  ▀▀
```
Sorry, it doesn’t look very impressive in the Markdown document, but it works nevertheless! :)

See more examples of generating SVG and Canvas images in this repository.