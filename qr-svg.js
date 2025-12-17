const QR = require('.');
const txt = process.argv[2];
if (txt == undefined) {
    console.log('Usage: ' + process.argv[1].split(/\/|\\/).slice(-1)[0] + ' <text-to-encode>');
    process.exit(0);
}
const qr = QR(txt);
var i, j;
console.log('<svg version="1.1" viewBox="-2 -2 ' + (qr.length + 4) + ' ' + (qr.length + 4) + '" xmlns="http://www.w3.org/2000/svg">');
for (i = 0; i < qr.length; i++) for (j = 0; j < qr.length; j++) if (qr[i][j]) {
    console.log('<rect width="1" height="1" x="' + j + '" y="' + i + '"/>');
}
console.log('</svg>');