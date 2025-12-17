(function(global, factory) {
  /* istanbul ignore next */
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    define('QR', [], factory);
  }
  else {
    if (!global) global = window;
    if (global.QR && global.QR.MIDI) return;
    global.QR = factory();
  }
})(this, function() {
  var _crn = [
    [1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 0, 0, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]
  ];
  var _eye = [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]];
  var _len = [
    0, 19, 34, 55, 80, 108, 136, 156, 194, 232, 274, 324, 370, 428, 461, 523, 589, 647, 721, 795, 861,
    932, 1006, 1094, 1174, 1276, 1370, 1468, 1531, 1631, 1735, 1843, 1955, 2071, 2191, 2306, 2434, 2566, 2702, 2812, 2956
  ];
  var QR = function(s) {
    s = new TextEncoder().encode(s);
    var i, v;
    for (v = 1; v <= 40; v++) if (s.length + (v < 10 ? 2 : 3) <= _len[v]) break;
    if (v > 40) throw "Input string is too long!";
    var b = [0x40];
    if (v >= 10) {
      b[0] += s.length >> 12;
      b.push((s.length >> 4) & 255);
    }
    else b[0] += s.length >> 4;
    b.push((s.length & 15) << 4);
    for (i = 0; i < s.length; i++) {
      b[b.length - 1] += (s[i] >> 4);
      b.push((s[i] & 15) << 4);
    }
    for (i = 0; b.length < _len[v]; i++) b.push((i & 1) ? 17 : 236);
// console.log(b.map(n => n.toString(16)).join(' '));
    var dots = _dots(v);
    _static(dots, v);
    return dots;
  };
  function _eyes(v) {
    var e = [];
    if (v < 2) return e;
    e.push(6);
    var n = Math.floor(v / 7) + 2;
    var m = v * 4 + 10;
    var t = Math.floor((v * 8 + n * 3 + 5) / (n * 4 - 4)) * 2;
    for (var i = 0; i < n - 1; i++) {
      e.splice(1, 0, m);
      m -= t;
    }
    return e;
  }
  function _static(d, v) {
    var i, j, k, m, sz = v * 4 + 17, e = _eyes(v);
    for (i = 0; i < 8; i++) for (j = 0; j < 8; j++) {
      d[i][j] = _crn[i][j];
      d[i][sz - j - 1] = _crn[i][j];
      d[sz - i - 1][j] = _crn[i][j];
    }
    j = 1;
    for (i = 8; i < sz - 8; i++) {
      d[i][6] = j;
      d[6][i] = j;
      j = 1 - j;
    }
    for (k = 0; k < e.length; k++) for (m = 0; m < e.length; m++) {
      if (!k && !m) continue;
      if (!k && m == e.length - 1) continue;
      if (!m && k == e.length - 1) continue;
      for (i = 0; i < 5; i++) for (j = 0; j < 5; j++) {
        d[e[k] + i - 2][e[m] + j - 2] = _eye[i][j];
      }
    }
  }
  function _dots(v) {
    var i, d = [], sz = v * 4 + 17;
    for (i = 0; i < sz; i++) d.push(Array(sz).fill(0));
    return d;
  }
  return QR;
});
