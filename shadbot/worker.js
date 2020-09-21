const { parentPort } = require('worker_threads');
(function() {
  "use strict";
  var root = "object" == typeof window ? window : {},
      NODE_JS = !root.JS_SHA1_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
  NODE_JS && (root = global);
  var COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && "object" == typeof module && module.exports,
      AMD = "function" == typeof define && define.amd,
      HEX_CHARS = "0123456789abcdef".split(""),
      EXTRA = [-2147483648, 8388608, 32768, 128],
      SHIFT = [24, 16, 8, 0],
      OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"],
      blocks = [],
      createOutputMethod = function (t) {
        return function (h) {
          return new Sha1(!0).update(h)[t]()
        }
      },
      createMethod = function () {
        var t = createOutputMethod("hex");
        NODE_JS && (t = nodeWrap(t)), t.create = function () {
          return new Sha1
        }, t.update = function (h) {
          return t.create().update(h)
        };
        for (var h = 0; h < OUTPUT_TYPES.length; ++h) {
          var s = OUTPUT_TYPES[h];
          t[s] = createOutputMethod(s)
        }
        return t
      },
      nodeWrap = function (method) {
        var crypto = eval("require('crypto')"),
            Buffer = eval("require('buffer').Buffer"),
            nodeMethod = function (t) {
              if ("string" == typeof t) return crypto.createHash("sha1").update(t, "utf8").digest("hex");
              if (t.constructor === ArrayBuffer) t = new Uint8Array(t);
              else if (void 0 === t.length) return method(t);
              return crypto.createHash("sha1").update(new Buffer(t)).digest("hex")
            };
        return nodeMethod
      };

  function Sha1(t) {
    t ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.h0 = 1732584193, this.h1 = 4023233417, this.h2 = 2562383102, this.h3 = 271733878, this.h4 = 3285377520, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0
  }
  Sha1.prototype.update = function (t) {
    if (!this.finalized) {
      var h = "string" != typeof t;
      h && t.constructor === root.ArrayBuffer && (t = new Uint8Array(t));
      for (var s, e, i = 0, r = t.length || 0, o = this.blocks; i < r;) {
        if (this.hashed && (this.hashed = !1, o[0] = this.block, o[16] = o[1] = o[2] = o[3] = o[4] = o[5] = o[6] = o[7] = o[8] = o[9] = o[10] = o[11] = o[12] = o[13] = o[14] = o[15] = 0), h)
          for (e = this.start; i < r && e < 64; ++i) o[e >> 2] |= t[i] << SHIFT[3 & e++];
        else
          for (e = this.start; i < r && e < 64; ++i)(s = t.charCodeAt(i)) < 128 ? o[e >> 2] |= s << SHIFT[3 & e++] : s < 2048 ? (o[e >> 2] |= (192 | s >> 6) << SHIFT[3 & e++], o[e >> 2] |= (128 | 63 & s) << SHIFT[3 & e++]) : s < 55296 || s >= 57344 ? (o[e >> 2] |= (224 | s >> 12) << SHIFT[3 & e++], o[e >> 2] |= (128 | s >> 6 & 63) << SHIFT[3 & e++], o[e >> 2] |= (128 | 63 & s) << SHIFT[3 & e++]) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++i)), o[e >> 2] |= (240 | s >> 18) << SHIFT[3 & e++], o[e >> 2] |= (128 | s >> 12 & 63) << SHIFT[3 & e++], o[e >> 2] |= (128 | s >> 6 & 63) << SHIFT[3 & e++], o[e >> 2] |= (128 | 63 & s) << SHIFT[3 & e++]);
        this.lastByteIndex = e, this.bytes += e - this.start, e >= 64 ? (this.block = o[16], this.start = e - 64, this.hash(), this.hashed = !0) : this.start = e
      }
      return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
    }
  }, Sha1.prototype.finalize = function () {
    if (!this.finalized) {
      this.finalized = !0;
      var t = this.blocks,
          h = this.lastByteIndex;
      t[16] = this.block, t[h >> 2] |= EXTRA[3 & h], this.block = t[16], h >= 56 && (this.hashed || this.hash(), t[0] = this.block, t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = this.hBytes << 3 | this.bytes >>> 29, t[15] = this.bytes << 3, this.hash()
    }
  }, Sha1.prototype.hash = function () {
    var t, h, s = this.h0,
        e = this.h1,
        i = this.h2,
        r = this.h3,
        o = this.h4,
        H = this.blocks;
    for (t = 16; t < 80; ++t) h = H[t - 3] ^ H[t - 8] ^ H[t - 14] ^ H[t - 16], H[t] = h << 1 | h >>> 31;
    for (t = 0; t < 20; t += 5) s = (h = (e = (h = (i = (h = (r = (h = (o = (h = s << 5 | s >>> 27) + (e & i | ~e & r) + o + 1518500249 + H[t] << 0) << 5 | o >>> 27) + (s & (e = e << 30 | e >>> 2) | ~s & i) + r + 1518500249 + H[t + 1] << 0) << 5 | r >>> 27) + (o & (s = s << 30 | s >>> 2) | ~o & e) + i + 1518500249 + H[t + 2] << 0) << 5 | i >>> 27) + (r & (o = o << 30 | o >>> 2) | ~r & s) + e + 1518500249 + H[t + 3] << 0) << 5 | e >>> 27) + (i & (r = r << 30 | r >>> 2) | ~i & o) + s + 1518500249 + H[t + 4] << 0, i = i << 30 | i >>> 2;
    for (; t < 40; t += 5) s = (h = (e = (h = (i = (h = (r = (h = (o = (h = s << 5 | s >>> 27) + (e ^ i ^ r) + o + 1859775393 + H[t] << 0) << 5 | o >>> 27) + (s ^ (e = e << 30 | e >>> 2) ^ i) + r + 1859775393 + H[t + 1] << 0) << 5 | r >>> 27) + (o ^ (s = s << 30 | s >>> 2) ^ e) + i + 1859775393 + H[t + 2] << 0) << 5 | i >>> 27) + (r ^ (o = o << 30 | o >>> 2) ^ s) + e + 1859775393 + H[t + 3] << 0) << 5 | e >>> 27) + (i ^ (r = r << 30 | r >>> 2) ^ o) + s + 1859775393 + H[t + 4] << 0, i = i << 30 | i >>> 2;
    for (; t < 60; t += 5) s = (h = (e = (h = (i = (h = (r = (h = (o = (h = s << 5 | s >>> 27) + (e & i | e & r | i & r) + o - 1894007588 + H[t] << 0) << 5 | o >>> 27) + (s & (e = e << 30 | e >>> 2) | s & i | e & i) + r - 1894007588 + H[t + 1] << 0) << 5 | r >>> 27) + (o & (s = s << 30 | s >>> 2) | o & e | s & e) + i - 1894007588 + H[t + 2] << 0) << 5 | i >>> 27) + (r & (o = o << 30 | o >>> 2) | r & s | o & s) + e - 1894007588 + H[t + 3] << 0) << 5 | e >>> 27) + (i & (r = r << 30 | r >>> 2) | i & o | r & o) + s - 1894007588 + H[t + 4] << 0, i = i << 30 | i >>> 2;
    for (; t < 80; t += 5) s = (h = (e = (h = (i = (h = (r = (h = (o = (h = s << 5 | s >>> 27) + (e ^ i ^ r) + o - 899497514 + H[t] << 0) << 5 | o >>> 27) + (s ^ (e = e << 30 | e >>> 2) ^ i) + r - 899497514 + H[t + 1] << 0) << 5 | r >>> 27) + (o ^ (s = s << 30 | s >>> 2) ^ e) + i - 899497514 + H[t + 2] << 0) << 5 | i >>> 27) + (r ^ (o = o << 30 | o >>> 2) ^ s) + e - 899497514 + H[t + 3] << 0) << 5 | e >>> 27) + (i ^ (r = r << 30 | r >>> 2) ^ o) + s - 899497514 + H[t + 4] << 0, i = i << 30 | i >>> 2;
    this.h0 = this.h0 + s << 0, this.h1 = this.h1 + e << 0, this.h2 = this.h2 + i << 0, this.h3 = this.h3 + r << 0, this.h4 = this.h4 + o << 0
  }, Sha1.prototype.hex = function () {
    this.finalize();
    var t = this.h0,
        h = this.h1,
        s = this.h2,
        e = this.h3,
        i = this.h4;
    return HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[h >> 28 & 15] + HEX_CHARS[h >> 24 & 15] + HEX_CHARS[h >> 20 & 15] + HEX_CHARS[h >> 16 & 15] + HEX_CHARS[h >> 12 & 15] + HEX_CHARS[h >> 8 & 15] + HEX_CHARS[h >> 4 & 15] + HEX_CHARS[15 & h] + HEX_CHARS[s >> 28 & 15] + HEX_CHARS[s >> 24 & 15] + HEX_CHARS[s >> 20 & 15] + HEX_CHARS[s >> 16 & 15] + HEX_CHARS[s >> 12 & 15] + HEX_CHARS[s >> 8 & 15] + HEX_CHARS[s >> 4 & 15] + HEX_CHARS[15 & s] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i]
  }, Sha1.prototype.toString = Sha1.prototype.hex, Sha1.prototype.digest = function () {
    this.finalize();
    var t = this.h0,
        h = this.h1,
        s = this.h2,
        e = this.h3,
        i = this.h4;
    return [t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, 255 & h, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i]
  }, Sha1.prototype.array = Sha1.prototype.digest, Sha1.prototype.arrayBuffer = function () {
    this.finalize();
    var t = new ArrayBuffer(20),
        h = new DataView(t);
    return h.setUint32(0, this.h0), h.setUint32(4, this.h1), h.setUint32(8, this.h2), h.setUint32(12, this.h3), h.setUint32(16, this.h4), t
  };
  root.sha1 = createMethod()
})();
function solve(r, e) {
  for(;;) {
    var a = randomString();
    if(checc(sha1(r + a + r), e) == true) {
      return a;
    }
  }
}
function randomString() {
  let a = '';
  const n = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let i = 0; i < 16; ++i) {
    a += n[Math.random() * n.length | 0];
  }
  return a;
}
function checc(b, e) {
  for(var n = 0; n < (e / 4 | 0); ++n) {
    if(b[n] != '0') return false;
  }
  for(n = 4 * (e / 4 | 0); n < e; ++n) {
    if(!(s[b.charCodeAt(n / 4 | 0)] & 1 << (3 & n))) return false;
  }
  return true;
}
const s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
parentPort.on('message', function(e) {
  parentPort.postMessage([e[0], solve(e[1], e[2])]);
});
