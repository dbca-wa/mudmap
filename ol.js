// OpenLayers 3. See http://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
var p, aa = aa || {}, v = this;
function ba(b) {
  return void 0 !== b;
}
function ca() {
}
function da(b) {
  var c = typeof b;
  if ("object" == c) {
    if (b) {
      if (b instanceof Array) {
        return "array";
      }
      if (b instanceof Object) {
        return c;
      }
      var d = Object.prototype.toString.call(b);
      if ("[object Window]" == d) {
        return "object";
      }
      if ("[object Array]" == d || "number" == typeof b.length && "undefined" != typeof b.splice && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == d || "undefined" != typeof b.call && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == c && "undefined" == typeof b.call) {
      return "object";
    }
  }
  return c;
}
function ea(b) {
  return "array" == da(b);
}
function fa(b) {
  var c = da(b);
  return "array" == c || "object" == c && "number" == typeof b.length;
}
function z(b) {
  return "string" == typeof b;
}
function ga(b) {
  return "number" == typeof b;
}
function ha(b) {
  return "function" == da(b);
}
function ia(b) {
  var c = typeof b;
  return "object" == c && null != b || "function" == c;
}
function C(b) {
  return b[ja] || (b[ja] = ++ka);
}
var ja = "closure_uid_" + (1E9 * Math.random() >>> 0), ka = 0;
function la(b, c, d) {
  return b.call.apply(b.bind, arguments);
}
function ma(b, c, d) {
  if (!b) {
    throw Error();
  }
  if (2 < arguments.length) {
    var e = Array.prototype.slice.call(arguments, 2);
    return function() {
      var d = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(d, e);
      return b.apply(c, d);
    };
  }
  return function() {
    return b.apply(c, arguments);
  };
}
function na(b, c, d) {
  na = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? la : ma;
  return na.apply(null, arguments);
}
function oa(b, c) {
  var d = Array.prototype.slice.call(arguments, 1);
  return function() {
    var c = d.slice();
    c.push.apply(c, arguments);
    return b.apply(this, c);
  };
}
var pa = Date.now || function() {
  return +new Date;
};
function D(b, c) {
  var d = b.split("."), e = v;
  d[0] in e || !e.execScript || e.execScript("var " + d[0]);
  for (var f;d.length && (f = d.shift());) {
    !d.length && ba(c) ? e[f] = c : e[f] ? e = e[f] : e = e[f] = {};
  }
}
function H(b, c) {
  function d() {
  }
  d.prototype = c.prototype;
  b.O = c.prototype;
  b.prototype = new d;
  b.prototype.constructor = b;
  b.qe = function(b, d, g) {
    for (var h = Array(arguments.length - 2), k = 2;k < arguments.length;k++) {
      h[k - 2] = arguments[k];
    }
    return c.prototype[d].apply(b, h);
  };
}
;function qa() {
}
;var ra;
var sa = String.prototype.trim ? function(b) {
  return b.trim();
} : function(b) {
  return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
function ta(b) {
  if (!ua.test(b)) {
    return b;
  }
  -1 != b.indexOf("&") && (b = b.replace(va, "&amp;"));
  -1 != b.indexOf("<") && (b = b.replace(wa, "&lt;"));
  -1 != b.indexOf(">") && (b = b.replace(xa, "&gt;"));
  -1 != b.indexOf('"') && (b = b.replace(ya, "&quot;"));
  -1 != b.indexOf("'") && (b = b.replace(za, "&#39;"));
  -1 != b.indexOf("\x00") && (b = b.replace(Aa, "&#0;"));
  return b;
}
var va = /&/g, wa = /</g, xa = />/g, ya = /"/g, za = /'/g, Aa = /\x00/g, ua = /[\x00&<>"']/, Ba = String.prototype.repeat ? function(b, c) {
  return b.repeat(c);
} : function(b, c) {
  return Array(c + 1).join(b);
};
function Ca(b) {
  b = ba(void 0) ? b.toFixed(void 0) : String(b);
  var c = b.indexOf(".");
  -1 == c && (c = b.length);
  return Ba("0", Math.max(0, 2 - c)) + b;
}
function Da(b, c) {
  return b < c ? -1 : b > c ? 1 : 0;
}
;function Ea(b, c, d) {
  return Math.min(Math.max(b, c), d);
}
var Fa = function() {
  var b;
  "cosh" in Math ? b = Math.cosh : b = function(b) {
    b = Math.exp(b);
    return (b + 1 / b) / 2;
  };
  return b;
}();
function Ga(b, c, d, e, f, g) {
  var h = f - d, k = g - e;
  if (0 !== h || 0 !== k) {
    var l = ((b - d) * h + (c - e) * k) / (h * h + k * k);
    1 < l ? (d = f, e = g) : 0 < l && (d += h * l, e += k * l);
  }
  b = d - b;
  c = e - c;
  return b * b + c * c;
}
;function Ja(b) {
  return function(c) {
    if (c) {
      return [Ea(c[0], b[0], b[2]), Ea(c[1], b[1], b[3])];
    }
  };
}
function Ka(b) {
  return b;
}
;var La = Array.prototype;
function Ma(b, c) {
  La.forEach.call(b, c, void 0);
}
function Na(b, c) {
  return La.filter.call(b, c, void 0);
}
function Oa(b) {
  var c;
  a: {
    c = Pa;
    for (var d = b.length, e = z(b) ? b.split("") : b, f = 0;f < d;f++) {
      if (f in e && c.call(void 0, e[f], f, b)) {
        c = f;
        break a;
      }
    }
    c = -1;
  }
  return 0 > c ? null : z(b) ? b.charAt(c) : b[c];
}
function Qa(b, c) {
  var d = La.indexOf.call(b, c, void 0), e;
  (e = 0 <= d) && La.splice.call(b, d, 1);
  return e;
}
function Ra(b) {
  var c = b.length;
  if (0 < c) {
    for (var d = Array(c), e = 0;e < c;e++) {
      d[e] = b[e];
    }
    return d;
  }
  return [];
}
function Sa(b, c) {
  for (var d = 1;d < arguments.length;d++) {
    var e = arguments[d];
    if (fa(e)) {
      var f = b.length || 0, g = e.length || 0;
      b.length = f + g;
      for (var h = 0;h < g;h++) {
        b[f + h] = e[h];
      }
    } else {
      b.push(e);
    }
  }
}
function Ua(b, c, d, e) {
  La.splice.apply(b, Va(arguments, 1));
}
function Va(b, c, d) {
  return 2 >= arguments.length ? La.slice.call(b, c) : La.slice.call(b, c, d);
}
function Wa(b, c) {
  b.sort(c || Xa);
}
function Ya(b) {
  for (var c = Za, d = 0;d < b.length;d++) {
    b[d] = {index:d, value:b[d]};
  }
  var e = c || Xa;
  Wa(b, function(b, c) {
    return e(b.value, c.value) || b.index - c.index;
  });
  for (d = 0;d < b.length;d++) {
    b[d] = b[d].value;
  }
}
function $a(b, c) {
  if (!fa(b) || !fa(c) || b.length != c.length) {
    return !1;
  }
  for (var d = b.length, e = ab, f = 0;f < d;f++) {
    if (!e(b[f], c[f])) {
      return !1;
    }
  }
  return !0;
}
function Xa(b, c) {
  return b > c ? 1 : b < c ? -1 : 0;
}
function ab(b, c) {
  return b === c;
}
;function bb(b, c) {
  return b > c ? 1 : b < c ? -1 : 0;
}
function cb(b, c, d) {
  var e = b.length;
  if (b[0] <= c) {
    return 0;
  }
  if (!(c <= b[e - 1])) {
    if (0 < d) {
      for (d = 1;d < e;++d) {
        if (b[d] < c) {
          return d - 1;
        }
      }
    } else {
      if (0 > d) {
        for (d = 1;d < e;++d) {
          if (b[d] <= c) {
            return d;
          }
        }
      } else {
        for (d = 1;d < e;++d) {
          if (b[d] == c) {
            return d;
          }
          if (b[d] < c) {
            return b[d - 1] - c < c - b[d] ? d - 1 : d;
          }
        }
      }
    }
  }
  return e - 1;
}
;function db(b) {
  return function(c, d, e) {
    if (void 0 !== c) {
      return c = cb(b, c, e), c = Ea(c + d, 0, b.length - 1), b[c];
    }
  };
}
function eb(b, c, d) {
  return function(e, f, g) {
    if (void 0 !== e) {
      return e = Math.max(Math.floor(Math.log(c / e) / Math.log(b) + (0 < g ? 0 : 0 > g ? 1 : .5)) + f, 0), void 0 !== d && (e = Math.min(e, d)), c / Math.pow(b, e);
    }
  };
}
;function fb(b) {
  if (void 0 !== b) {
    return 0;
  }
}
function gb(b, c) {
  if (void 0 !== b) {
    return b + c;
  }
}
function hb(b) {
  var c = 2 * Math.PI / b;
  return function(b, e) {
    if (void 0 !== b) {
      return b = Math.floor((b + e) / c + .5) * c;
    }
  };
}
function ib() {
  var b = 5 * Math.PI / 180;
  return function(c, d) {
    if (void 0 !== c) {
      return Math.abs(c + d) <= b ? 0 : c + d;
    }
  };
}
;function jb(b, c, d) {
  this.center = b;
  this.resolution = c;
  this.rotation = d;
}
;var kb;
a: {
  var lb = v.navigator;
  if (lb) {
    var mb = lb.userAgent;
    if (mb) {
      kb = mb;
      break a;
    }
  }
  kb = "";
}
function I(b) {
  return -1 != kb.indexOf(b);
}
;function nb(b, c, d) {
  for (var e in b) {
    c.call(d, b[e], e, b);
  }
}
function ob(b, c) {
  for (var d in b) {
    if (c.call(void 0, b[d], d, b)) {
      return !0;
    }
  }
  return !1;
}
function pb(b) {
  var c = 0, d;
  for (d in b) {
    c++;
  }
  return c;
}
function qb(b) {
  var c = [], d = 0, e;
  for (e in b) {
    c[d++] = b[e];
  }
  return c;
}
function rb(b) {
  for (var c in b) {
    return !1;
  }
  return !0;
}
function sb(b) {
  for (var c in b) {
    delete b[c];
  }
}
function tb(b) {
  var c = {}, d;
  for (d in b) {
    c[d] = b[d];
  }
  return c;
}
function ub(b) {
  var c = da(b);
  if ("object" == c || "array" == c) {
    if (ha(b.clone)) {
      return b.clone();
    }
    var c = "array" == c ? [] : {}, d;
    for (d in b) {
      c[d] = ub(b[d]);
    }
    return c;
  }
  return b;
}
var vb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function wb(b, c) {
  for (var d, e, f = 1;f < arguments.length;f++) {
    e = arguments[f];
    for (d in e) {
      b[d] = e[d];
    }
    for (var g = 0;g < vb.length;g++) {
      d = vb[g], Object.prototype.hasOwnProperty.call(e, d) && (b[d] = e[d]);
    }
  }
}
;var xb = I("Opera") || I("OPR"), O = I("Trident") || I("MSIE"), yb = I("Edge"), zb = I("Gecko") && !(-1 != kb.toLowerCase().indexOf("webkit") && !I("Edge")) && !(I("Trident") || I("MSIE")) && !I("Edge"), Ab = -1 != kb.toLowerCase().indexOf("webkit") && !I("Edge"), Bb = I("Macintosh"), Cb = I("Windows"), Db = I("Linux") || I("CrOS");
function Eb() {
  var b = kb;
  if (zb) {
    return /rv\:([^\);]+)(\)|;)/.exec(b);
  }
  if (yb) {
    return /Edge\/([\d\.]+)/.exec(b);
  }
  if (O) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(b);
  }
  if (Ab) {
    return /WebKit\/(\S+)/.exec(b);
  }
}
function Fb() {
  var b = v.document;
  return b ? b.documentMode : void 0;
}
var Gb = function() {
  if (xb && v.opera) {
    var b;
    var c = v.opera.version;
    try {
      b = c();
    } catch (d) {
      b = c;
    }
    return b;
  }
  b = "";
  (c = Eb()) && (b = c ? c[1] : "");
  return O && (c = Fb(), c > parseFloat(b)) ? String(c) : b;
}(), Hb = {};
function Ib(b) {
  var c;
  if (!(c = Hb[b])) {
    c = 0;
    for (var d = sa(String(Gb)).split("."), e = sa(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
      var h = d[g] || "", k = e[g] || "", l = RegExp("(\\d*)(\\D*)", "g"), m = RegExp("(\\d*)(\\D*)", "g");
      do {
        var n = l.exec(h) || ["", "", ""], q = m.exec(k) || ["", "", ""];
        if (0 == n[0].length && 0 == q[0].length) {
          break;
        }
        c = Da(0 == n[1].length ? 0 : parseInt(n[1], 10), 0 == q[1].length ? 0 : parseInt(q[1], 10)) || Da(0 == n[2].length, 0 == q[2].length) || Da(n[2], q[2]);
      } while (0 == c);
    }
    c = Hb[b] = 0 <= c;
  }
  return c;
}
var Jb = v.document, Kb = Jb && O ? Fb() || ("CSS1Compat" == Jb.compatMode ? parseInt(Gb, 10) : 5) : void 0;
var Lb = !O || 9 <= Kb, Mb = !O || 9 <= Kb, Nb = O && !Ib("9");
!Ab || Ib("528");
zb && Ib("1.9b") || O && Ib("8") || xb && Ib("9.5") || Ab && Ib("528");
zb && !Ib("8") || O && Ib("9");
function Ob() {
  0 != Pb && (Qb[C(this)] = this);
  this.X = this.X;
  this.P = this.P;
}
var Pb = 0, Qb = {};
Ob.prototype.X = !1;
Ob.prototype.rb = function() {
  if (!this.X && (this.X = !0, this.I(), 0 != Pb)) {
    var b = C(this);
    delete Qb[b];
  }
};
function Rb(b, c) {
  var d = oa(Sb, c);
  b.X ? d.call(void 0) : (b.P || (b.P = []), b.P.push(ba(void 0) ? na(d, void 0) : d));
}
Ob.prototype.I = function() {
  if (this.P) {
    for (;this.P.length;) {
      this.P.shift()();
    }
  }
};
function Sb(b) {
  b && "function" == typeof b.rb && b.rb();
}
;function P(b, c) {
  this.type = b;
  this.b = this.target = c;
  this.g = !1;
  this.mc = !0;
}
P.prototype.f = function() {
  this.g = !0;
};
P.prototype.preventDefault = function() {
  this.mc = !1;
};
function Tb(b) {
  b.f();
}
;function Vb(b) {
  Vb[" "](b);
  return b;
}
Vb[" "] = ca;
function Wb(b, c) {
  P.call(this, b ? b.type : "");
  this.relatedTarget = this.b = this.target = null;
  this.l = this.h = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.s = this.j = this.c = this.i = !1;
  this.state = null;
  this.v = !1;
  this.a = null;
  if (b) {
    var d = this.type = b.type, e = b.changedTouches ? b.changedTouches[0] : null;
    this.target = b.target || b.srcElement;
    this.b = c;
    var f = b.relatedTarget;
    if (f) {
      if (zb) {
        var g;
        a: {
          try {
            Vb(f.nodeName);
            g = !0;
            break a;
          } catch (h) {
          }
          g = !1;
        }
        g || (f = null);
      }
    } else {
      "mouseover" == d ? f = b.fromElement : "mouseout" == d && (f = b.toElement);
    }
    this.relatedTarget = f;
    null === e ? (this.offsetX = Ab || void 0 !== b.offsetX ? b.offsetX : b.layerX, this.offsetY = Ab || void 0 !== b.offsetY ? b.offsetY : b.layerY, this.clientX = void 0 !== b.clientX ? b.clientX : b.pageX, this.clientY = void 0 !== b.clientY ? b.clientY : b.pageY, this.screenX = b.screenX || 0, this.screenY = b.screenY || 0) : (this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX, this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY, this.screenX = e.screenX || 0, this.screenY = e.screenY || 
    0);
    this.button = b.button;
    this.h = b.keyCode || 0;
    this.l = b.charCode || ("keypress" == d ? b.keyCode : 0);
    this.i = b.ctrlKey;
    this.c = b.altKey;
    this.j = b.shiftKey;
    this.s = b.metaKey;
    this.v = Bb ? b.metaKey : b.ctrlKey;
    this.state = b.state;
    this.a = b;
    b.defaultPrevented && this.preventDefault();
  }
}
H(Wb, P);
var Xb = [1, 4, 2];
function Yb(b) {
  return (Lb ? 0 == b.a.button : "click" == b.type ? !0 : !!(b.a.button & Xb[0])) && !(Ab && Bb && b.i);
}
Wb.prototype.f = function() {
  Wb.O.f.call(this);
  this.a.stopPropagation ? this.a.stopPropagation() : this.a.cancelBubble = !0;
};
Wb.prototype.preventDefault = function() {
  Wb.O.preventDefault.call(this);
  var b = this.a;
  if (b.preventDefault) {
    b.preventDefault();
  } else {
    if (b.returnValue = !1, Nb) {
      try {
        if (b.ctrlKey || 112 <= b.keyCode && 123 >= b.keyCode) {
          b.keyCode = -1;
        }
      } catch (c) {
      }
    }
  }
};
var Zb = "closure_listenable_" + (1E6 * Math.random() | 0);
function $b(b) {
  return !(!b || !b[Zb]);
}
var ac = 0;
function bc(b, c, d, e, f) {
  this.listener = b;
  this.a = null;
  this.src = c;
  this.type = d;
  this.Ga = !!e;
  this.Za = f;
  this.key = ++ac;
  this.Fa = this.Ua = !1;
}
function cc(b) {
  b.Fa = !0;
  b.listener = null;
  b.a = null;
  b.src = null;
  b.Za = null;
}
;function dc(b) {
  this.src = b;
  this.a = {};
  this.c = 0;
}
dc.prototype.add = function(b, c, d, e, f) {
  var g = b.toString();
  b = this.a[g];
  b || (b = this.a[g] = [], this.c++);
  var h = ec(b, c, e, f);
  -1 < h ? (c = b[h], d || (c.Ua = !1)) : (c = new bc(c, this.src, g, !!e, f), c.Ua = d, b.push(c));
  return c;
};
dc.prototype.remove = function(b, c, d, e) {
  b = b.toString();
  if (!(b in this.a)) {
    return !1;
  }
  var f = this.a[b];
  c = ec(f, c, d, e);
  return -1 < c ? (cc(f[c]), La.splice.call(f, c, 1), 0 == f.length && (delete this.a[b], this.c--), !0) : !1;
};
function fc(b, c) {
  var d = c.type;
  if (!(d in b.a)) {
    return !1;
  }
  var e = Qa(b.a[d], c);
  e && (cc(c), 0 == b.a[d].length && (delete b.a[d], b.c--));
  return e;
}
function gc(b, c, d) {
  var e = ba(c), f = e ? c.toString() : "", g = ba(d);
  return ob(b.a, function(b) {
    for (var c = 0;c < b.length;++c) {
      if (!(e && b[c].type != f || g && b[c].Ga != d)) {
        return !0;
      }
    }
    return !1;
  });
}
function ec(b, c, d, e) {
  for (var f = 0;f < b.length;++f) {
    var g = b[f];
    if (!g.Fa && g.listener == c && g.Ga == !!d && g.Za == e) {
      return f;
    }
  }
  return -1;
}
;var hc = "closure_lm_" + (1E6 * Math.random() | 0), ic = {}, jc = 0;
function Q(b, c, d, e, f) {
  if (ea(c)) {
    for (var g = 0;g < c.length;g++) {
      Q(b, c[g], d, e, f);
    }
    return null;
  }
  d = kc(d);
  return $b(b) ? lc(b, c, d, e, f) : mc(b, c, d, !1, e, f);
}
function mc(b, c, d, e, f, g) {
  if (!c) {
    throw Error("Invalid event type");
  }
  var h = !!f, k = nc(b);
  k || (b[hc] = k = new dc(b));
  d = k.add(c, d, e, f, g);
  if (d.a) {
    return d;
  }
  e = oc();
  d.a = e;
  e.src = b;
  e.listener = d;
  if (b.addEventListener) {
    b.addEventListener(c.toString(), e, h);
  } else {
    if (b.attachEvent) {
      b.attachEvent(pc(c.toString()), e);
    } else {
      throw Error("addEventListener and attachEvent are unavailable.");
    }
  }
  jc++;
  return d;
}
function oc() {
  var b = qc, c = Mb ? function(d) {
    return b.call(c.src, c.listener, d);
  } : function(d) {
    d = b.call(c.src, c.listener, d);
    if (!d) {
      return d;
    }
  };
  return c;
}
function rc(b, c, d, e, f) {
  if (ea(c)) {
    for (var g = 0;g < c.length;g++) {
      rc(b, c[g], d, e, f);
    }
    return null;
  }
  d = kc(d);
  return $b(b) ? b.qa.add(String(c), d, !0, e, f) : mc(b, c, d, !0, e, f);
}
function sc(b, c, d, e, f) {
  if (ea(c)) {
    for (var g = 0;g < c.length;g++) {
      sc(b, c[g], d, e, f);
    }
  } else {
    (d = kc(d), $b(b)) ? b.qa.remove(String(c), d, e, f) : b && (b = nc(b)) && (c = b.a[c.toString()], b = -1, c && (b = ec(c, d, !!e, f)), (d = -1 < b ? c[b] : null) && T(d));
  }
}
function T(b) {
  if (ga(b) || !b || b.Fa) {
    return !1;
  }
  var c = b.src;
  if ($b(c)) {
    return fc(c.qa, b);
  }
  var d = b.type, e = b.a;
  c.removeEventListener ? c.removeEventListener(d, e, b.Ga) : c.detachEvent && c.detachEvent(pc(d), e);
  jc--;
  (d = nc(c)) ? (fc(d, b), 0 == d.c && (d.src = null, c[hc] = null)) : cc(b);
  return !0;
}
function pc(b) {
  return b in ic ? ic[b] : ic[b] = "on" + b;
}
function tc(b, c, d, e) {
  var f = !0;
  if (b = nc(b)) {
    if (c = b.a[c.toString()]) {
      for (c = c.concat(), b = 0;b < c.length;b++) {
        var g = c[b];
        g && g.Ga == d && !g.Fa && (g = uc(g, e), f = f && !1 !== g);
      }
    }
  }
  return f;
}
function uc(b, c) {
  var d = b.listener, e = b.Za || b.src;
  b.Ua && T(b);
  return d.call(e, c);
}
function qc(b, c) {
  if (b.Fa) {
    return !0;
  }
  if (!Mb) {
    var d;
    if (!(d = c)) {
      a: {
        d = ["window", "event"];
        for (var e = v, f;f = d.shift();) {
          if (null != e[f]) {
            e = e[f];
          } else {
            d = null;
            break a;
          }
        }
        d = e;
      }
    }
    f = d;
    d = new Wb(f, this);
    e = !0;
    if (!(0 > f.keyCode || void 0 != f.returnValue)) {
      a: {
        var g = !1;
        if (0 == f.keyCode) {
          try {
            f.keyCode = -1;
            break a;
          } catch (l) {
            g = !0;
          }
        }
        if (g || void 0 == f.returnValue) {
          f.returnValue = !0;
        }
      }
      f = [];
      for (g = d.b;g;g = g.parentNode) {
        f.push(g);
      }
      for (var g = b.type, h = f.length - 1;!d.g && 0 <= h;h--) {
        d.b = f[h];
        var k = tc(f[h], g, !0, d), e = e && k;
      }
      for (h = 0;!d.g && h < f.length;h++) {
        d.b = f[h], k = tc(f[h], g, !1, d), e = e && k;
      }
    }
    return e;
  }
  return uc(b, new Wb(c, this));
}
function nc(b) {
  b = b[hc];
  return b instanceof dc ? b : null;
}
var vc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
function kc(b) {
  if (ha(b)) {
    return b;
  }
  b[vc] || (b[vc] = function(c) {
    return b.handleEvent(c);
  });
  return b[vc];
}
;function V() {
  Ob.call(this);
  this.qa = new dc(this);
  this.fb = this;
  this.ka = null;
}
H(V, Ob);
V.prototype[Zb] = !0;
V.prototype.addEventListener = function(b, c, d, e) {
  Q(this, b, c, d, e);
};
V.prototype.removeEventListener = function(b, c, d, e) {
  sc(this, b, c, d, e);
};
function W(b, c) {
  var d, e = b.ka;
  if (e) {
    for (d = [];e;e = e.ka) {
      d.push(e);
    }
  }
  var e = b.fb, f = c, g = f.type || f;
  if (z(f)) {
    f = new P(f, e);
  } else {
    if (f instanceof P) {
      f.target = f.target || e;
    } else {
      var h = f, f = new P(g, e);
      wb(f, h);
    }
  }
  var h = !0, k;
  if (d) {
    for (var l = d.length - 1;!f.g && 0 <= l;l--) {
      k = f.b = d[l], h = wc(k, g, !0, f) && h;
    }
  }
  f.g || (k = f.b = e, h = wc(k, g, !0, f) && h, f.g || (h = wc(k, g, !1, f) && h));
  if (d) {
    for (l = 0;!f.g && l < d.length;l++) {
      k = f.b = d[l], h = wc(k, g, !1, f) && h;
    }
  }
  return h;
}
V.prototype.I = function() {
  V.O.I.call(this);
  if (this.qa) {
    var b = this.qa, c = 0, d;
    for (d in b.a) {
      for (var e = b.a[d], f = 0;f < e.length;f++) {
        ++c, cc(e[f]);
      }
      delete b.a[d];
      b.c--;
    }
  }
  this.ka = null;
};
function lc(b, c, d, e, f) {
  return b.qa.add(String(c), d, !1, e, f);
}
function wc(b, c, d, e) {
  c = b.qa.a[String(c)];
  if (!c) {
    return !0;
  }
  c = c.concat();
  for (var f = !0, g = 0;g < c.length;++g) {
    var h = c[g];
    if (h && !h.Fa && h.Ga == d) {
      var k = h.listener, l = h.Za || h.src;
      h.Ua && fc(b.qa, h);
      f = !1 !== k.call(l, e) && f;
    }
  }
  return f && 0 != e.mc;
}
function xc(b, c, d) {
  return gc(b.qa, ba(c) ? String(c) : void 0, d);
}
;function yc() {
  V.call(this);
  this.h = 0;
}
H(yc, V);
function zc(b) {
  T(b);
}
yc.prototype.c = function() {
  ++this.h;
  W(this, "change");
};
yc.prototype.v = function(b, c, d) {
  return Q(this, b, c, !1, d);
};
yc.prototype.tc = function(b, c, d) {
  return rc(this, b, c, !1, d);
};
function Ac(b, c, d) {
  P.call(this, b);
  this.key = c;
  this.oldValue = d;
}
H(Ac, P);
function X(b) {
  yc.call(this);
  C(this);
  this.H = {};
  void 0 !== b && Bc(this, b);
}
H(X, yc);
var Cc = {};
function Dc(b) {
  return Cc.hasOwnProperty(b) ? Cc[b] : Cc[b] = "change:" + b;
}
X.prototype.get = function(b) {
  var c;
  this.H.hasOwnProperty(b) && (c = this.H[b]);
  return c;
};
X.prototype.Ra = function() {
  return Object.keys(this.H);
};
function Ec(b) {
  var c = {}, d;
  for (d in b.H) {
    c[d] = b.H[d];
  }
  return c;
}
X.prototype.j = function(b, c, d) {
  d ? this.H[b] = c : (d = this.H[b], this.H[b] = c, d !== c && (c = Dc(b), W(this, new Ac(c, b, d)), W(this, new Ac("propertychange", b, d))));
};
function Bc(b, c) {
  for (var d in c) {
    b.j(d, c[d], void 0);
  }
}
;function Fc(b, c) {
  if (ea(b)) {
    return b;
  }
  void 0 === c ? c = [b, b] : (c[0] = b, c[1] = b);
  return c;
}
;function Gc(b, c) {
  var d = b % c;
  return 0 > d * c ? d + c : d;
}
;function Hc(b, c) {
  b[0] += c[0];
  b[1] += c[1];
}
function Ic(b, c) {
  var d = b[0], e = b[1], f = c[0], g = c[1], h = f[0], f = f[1], k = g[0], g = g[1], l = k - h, m = g - f, d = 0 === l && 0 === m ? 0 : (l * (d - h) + m * (e - f)) / (l * l + m * m || 0);
  0 >= d || (1 <= d ? (h = k, f = g) : (h += d * l, f += d * m));
  return [h, f];
}
function Jc(b, c) {
  var d = Gc(b + 180, 360) - 180, e = Math.abs(Math.round(3600 * d));
  return Math.floor(e / 3600) + "\u00b0 " + Ca(Math.floor(e / 60 % 60)) + "\u2032 " + Ca(Math.floor(e % 60)) + "\u2033 " + c.charAt(0 > d ? 1 : 0);
}
function Kc(b, c) {
  for (var d = !0, e = b.length - 1;0 <= e;--e) {
    if (b[e] != c[e]) {
      d = !1;
      break;
    }
  }
  return d;
}
function Lc(b, c) {
  var d = Math.cos(c), e = Math.sin(c), f = b[1] * d + b[0] * e;
  b[0] = b[0] * d - b[1] * e;
  b[1] = f;
}
function Mc(b, c) {
  var d = b[0] - c[0], e = b[1] - c[1];
  return d * d + e * e;
}
function Nc(b, c) {
  return Mc(b, Ic(b, c));
}
;function Oc(b) {
  this.length = b.length || b;
  for (var c = 0;c < this.length;c++) {
    this[c] = b[c] || 0;
  }
}
Oc.prototype.a = 4;
Oc.prototype.c = function(b, c) {
  c = c || 0;
  for (var d = 0;d < b.length && c + d < this.length;d++) {
    this[c + d] = b[d];
  }
};
Oc.prototype.toString = Array.prototype.join;
"undefined" == typeof Float32Array && (Oc.BYTES_PER_ELEMENT = 4, Oc.prototype.BYTES_PER_ELEMENT = Oc.prototype.a, Oc.prototype.set = Oc.prototype.c, Oc.prototype.toString = Oc.prototype.toString, D("Float32Array", Oc));
function Pc(b) {
  this.length = b.length || b;
  for (var c = 0;c < this.length;c++) {
    this[c] = b[c] || 0;
  }
}
Pc.prototype.a = 8;
Pc.prototype.c = function(b, c) {
  c = c || 0;
  for (var d = 0;d < b.length && c + d < this.length;d++) {
    this[c + d] = b[d];
  }
};
Pc.prototype.toString = Array.prototype.join;
if ("undefined" == typeof Float64Array) {
  try {
    Pc.BYTES_PER_ELEMENT = 8;
  } catch (b) {
  }
  Pc.prototype.BYTES_PER_ELEMENT = Pc.prototype.a;
  Pc.prototype.set = Pc.prototype.c;
  Pc.prototype.toString = Pc.prototype.toString;
  D("Float64Array", Pc);
}
;function Qc() {
  var b = Array(16);
  b[0] = 0;
  b[1] = 0;
  b[2] = 0;
  b[3] = 0;
  b[4] = 0;
  b[5] = 0;
  b[6] = 0;
  b[7] = 0;
  b[8] = 0;
  b[9] = 0;
  b[10] = 0;
  b[11] = 0;
  b[12] = 0;
  b[13] = 0;
  b[14] = 0;
  b[15] = 0;
  return b;
}
function Rc(b, c) {
  var d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], k = b[5], l = b[6], m = b[7], n = b[8], q = b[9], r = b[10], t = b[11], w = b[12], A = b[13], u = b[14], y = b[15], B = d * k - e * h, x = d * l - f * h, J = d * m - g * h, G = e * l - f * k, K = e * m - g * k, E = f * m - g * l, S = n * A - q * w, U = n * u - r * w, N = n * y - t * w, L = q * u - r * A, F = q * y - t * A, R = r * y - t * u, M = B * R - x * F + J * L + G * N - K * U + E * S;
  0 != M && (M = 1 / M, c[0] = (k * R - l * F + m * L) * M, c[1] = (-e * R + f * F - g * L) * M, c[2] = (A * E - u * K + y * G) * M, c[3] = (-q * E + r * K - t * G) * M, c[4] = (-h * R + l * N - m * U) * M, c[5] = (d * R - f * N + g * U) * M, c[6] = (-w * E + u * J - y * x) * M, c[7] = (n * E - r * J + t * x) * M, c[8] = (h * F - k * N + m * S) * M, c[9] = (-d * F + e * N - g * S) * M, c[10] = (w * K - A * J + y * B) * M, c[11] = (-n * K + q * J - t * B) * M, c[12] = (-h * L + k * U - l * S) * M, 
  c[13] = (d * L - e * U + f * S) * M, c[14] = (-w * G + A * x - u * B) * M, c[15] = (n * G - q * x + r * B) * M);
}
function Sc(b, c, d) {
  var e = b[1] * c + b[5] * d + 0 * b[9] + b[13], f = b[2] * c + b[6] * d + 0 * b[10] + b[14], g = b[3] * c + b[7] * d + 0 * b[11] + b[15];
  b[12] = b[0] * c + b[4] * d + 0 * b[8] + b[12];
  b[13] = e;
  b[14] = f;
  b[15] = g;
}
new Float64Array(3);
new Float64Array(3);
new Float64Array(4);
new Float64Array(4);
new Float64Array(4);
new Float64Array(16);
function Tc(b) {
  for (var c = Uc(), d = 0, e = b.length;d < e;++d) {
    Vc(c, b[d]);
  }
  return c;
}
function Wc(b, c) {
  var d = Math.min.apply(null, b), e = Math.min.apply(null, c), f = Math.max.apply(null, b), g = Math.max.apply(null, c);
  return Xc(d, e, f, g, void 0);
}
function Yc(b, c, d) {
  return d ? (d[0] = b[0] - c, d[1] = b[1] - c, d[2] = b[2] + c, d[3] = b[3] + c, d) : [b[0] - c, b[1] - c, b[2] + c, b[3] + c];
}
function Zc(b, c) {
  return c ? (c[0] = b[0], c[1] = b[1], c[2] = b[2], c[3] = b[3], c) : b.slice();
}
function $c(b, c) {
  return b[0] <= c[0] && c[2] <= b[2] && b[1] <= c[1] && c[3] <= b[3];
}
function Uc() {
  return [Infinity, Infinity, -Infinity, -Infinity];
}
function Xc(b, c, d, e, f) {
  return f ? (f[0] = b, f[1] = c, f[2] = d, f[3] = e, f) : [b, c, d, e];
}
function ad(b, c) {
  return b[0] == c[0] && b[2] == c[2] && b[1] == c[1] && b[3] == c[3];
}
function bd(b, c) {
  c[0] < b[0] && (b[0] = c[0]);
  c[2] > b[2] && (b[2] = c[2]);
  c[1] < b[1] && (b[1] = c[1]);
  c[3] > b[3] && (b[3] = c[3]);
}
function Vc(b, c) {
  c[0] < b[0] && (b[0] = c[0]);
  c[0] > b[2] && (b[2] = c[0]);
  c[1] < b[1] && (b[1] = c[1]);
  c[1] > b[3] && (b[3] = c[1]);
}
function cd(b, c, d, e, f) {
  for (;d < e;d += f) {
    var g = b, h = c[d], k = c[d + 1];
    g[0] = Math.min(g[0], h);
    g[1] = Math.min(g[1], k);
    g[2] = Math.max(g[2], h);
    g[3] = Math.max(g[3], k);
  }
  return b;
}
function dd(b) {
  var c = 0;
  b[2] < b[0] || b[3] < b[1] || (c = Y(b) * ed(b));
  return c;
}
function fd(b) {
  return [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];
}
function gd(b, c, d, e) {
  var f = c * e[0] / 2;
  e = c * e[1] / 2;
  c = Math.cos(d);
  d = Math.sin(d);
  f = [-f, -f, f, f];
  e = [-e, e, -e, e];
  var g, h, k;
  for (g = 0;4 > g;++g) {
    h = f[g], k = e[g], f[g] = b[0] + h * c - k * d, e[g] = b[1] + h * d + k * c;
  }
  return Wc(f, e);
}
function ed(b) {
  return b[3] - b[1];
}
function hd(b, c) {
  var d = Uc();
  id(b, c) && (d[0] = b[0] > c[0] ? b[0] : c[0], d[1] = b[1] > c[1] ? b[1] : c[1], d[2] = b[2] < c[2] ? b[2] : c[2], d[3] = b[3] < c[3] ? b[3] : c[3]);
  return d;
}
function jd(b) {
  return [b[0], b[3]];
}
function Y(b) {
  return b[2] - b[0];
}
function id(b, c) {
  return b[0] <= c[2] && b[2] >= c[0] && b[1] <= c[3] && b[3] >= c[1];
}
;function kd(b) {
  return function() {
    return b;
  };
}
var ld = kd(!1), md = kd(!0);
function nd(b) {
  var c;
  c = c || 0;
  return function() {
    return b.apply(this, Array.prototype.slice.call(arguments, 0, c));
  };
}
function od(b) {
  var c = arguments, d = c.length;
  return function() {
    for (var b = 0;b < d;b++) {
      if (!c[b].apply(this, arguments)) {
        return !1;
      }
    }
    return !0;
  };
}
;/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function pd(b) {
  this.radius = b;
}
function qd(b, c) {
  var d = b[1] * Math.PI / 180, e = c[1] * Math.PI / 180, f = (e - d) / 2, g = (c[0] - b[0]) * Math.PI / 180 / 2, d = Math.sin(f) * Math.sin(f) + Math.sin(g) * Math.sin(g) * Math.cos(d) * Math.cos(e);
  return 2 * rd.radius * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d));
}
pd.prototype.offset = function(b, c, d) {
  var e = b[1] * Math.PI / 180;
  c /= this.radius;
  var f = Math.asin(Math.sin(e) * Math.cos(c) + Math.cos(e) * Math.sin(c) * Math.cos(d));
  return [180 * (b[0] * Math.PI / 180 + Math.atan2(Math.sin(d) * Math.sin(c) * Math.cos(e), Math.cos(c) - Math.sin(e) * Math.sin(f))) / Math.PI, 180 * f / Math.PI];
};
var rd = new pd(6370997);
var sd = {};
sd.degrees = 2 * Math.PI * rd.radius / 360;
sd.ft = .3048;
sd.m = 1;
sd["us-ft"] = 1200 / 3937;
function td(b) {
  this.c = b.code;
  this.b = b.units;
  this.f = void 0 !== b.extent ? b.extent : null;
  this.l = void 0 !== b.worldExtent ? b.worldExtent : null;
  this.h = void 0 !== b.global ? b.global : !1;
  this.a = !(!this.h || !this.f);
  this.i = void 0 !== b.getPointResolution ? b.getPointResolution : this.v;
  this.j = null;
  this.g = b.metersPerUnit;
  var c = ud, d = b.code, e = vd || v.proj4;
  if ("function" == typeof e && void 0 === c[d]) {
    var f = e.Tb(d);
    if (void 0 !== f) {
      void 0 === b.metersPerUnit && (this.g = f.se);
      void 0 === b.units && (this.b = f.units);
      var g, h;
      for (g in c) {
        if (b = e.Tb(g), void 0 !== b) {
          if (c = xd(g), b === f) {
            yd([c, this]);
          } else {
            h = e(g, d);
            b = h.forward;
            h = h.inverse;
            var c = xd(c), k = xd(this);
            zd(c, k, Ad(b));
            zd(k, c, Ad(h));
          }
        }
      }
    }
  }
}
td.prototype.D = function() {
  return this.f;
};
function Bd(b) {
  return b.g || sd[b.b];
}
td.prototype.v = function(b, c) {
  if ("degrees" == this.b) {
    return b;
  }
  var d = Cd(this, xd("EPSG:4326")), e = [c[0] - b / 2, c[1], c[0] + b / 2, c[1], c[0], c[1] - b / 2, c[0], c[1] + b / 2], e = d(e, e, 2), d = (qd(e.slice(0, 2), e.slice(2, 4)) + qd(e.slice(4, 6), e.slice(6, 8))) / 2, e = Bd(this);
  void 0 !== e && (d /= e);
  return d;
};
td.prototype.getPointResolution = function(b, c) {
  return this.i(b, c);
};
var ud = {}, Dd = {}, vd = null;
function yd(b) {
  Ed(b);
  b.forEach(function(c) {
    b.forEach(function(b) {
      c !== b && zd(c, b, Fd);
    });
  });
}
function Gd(b) {
  ud[b.c] = b;
  zd(b, b, Fd);
}
function Ed(b) {
  var c = [];
  b.forEach(function(b) {
    c.push(Gd(b));
  });
}
function Hd(b) {
  return b ? z(b) ? xd(b) : b : xd("EPSG:3857");
}
function zd(b, c, d) {
  b = b.c;
  c = c.c;
  b in Dd || (Dd[b] = {});
  Dd[b][c] = d;
}
function Ad(b) {
  return function(c, d, e) {
    var f = c.length;
    e = void 0 !== e ? e : 2;
    d = void 0 !== d ? d : Array(f);
    var g, h;
    for (h = 0;h < f;h += e) {
      for (g = b([c[h], c[h + 1]]), d[h] = g[0], d[h + 1] = g[1], g = e - 1;2 <= g;--g) {
        d[h + g] = c[h + g];
      }
    }
    return d;
  };
}
function xd(b) {
  var c;
  if (b instanceof td) {
    c = b;
  } else {
    if (z(b)) {
      c = ud[b];
      var d = vd || v.proj4;
      void 0 === c && "function" == typeof d && void 0 !== d.Tb(b) && (c = new td({code:b}), Gd(c));
    } else {
      c = null;
    }
  }
  return c;
}
function Id(b, c) {
  if (b === c) {
    return !0;
  }
  var d = b.b === c.b;
  return b.c === c.c ? d : Cd(b, c) === Fd && d;
}
function Jd(b, c) {
  var d = xd(b), e = xd(c);
  return Cd(d, e);
}
function Cd(b, c) {
  var d = b.c, e = c.c, f;
  d in Dd && e in Dd[d] && (f = Dd[d][e]);
  void 0 === f && (f = Kd);
  return f;
}
function Kd(b, c) {
  if (void 0 !== c && b !== c) {
    for (var d = 0, e = b.length;d < e;++d) {
      c[d] = b[d];
    }
    b = c;
  }
  return b;
}
function Fd(b, c) {
  var d;
  if (void 0 !== c) {
    d = 0;
    for (var e = b.length;d < e;++d) {
      c[d] = b[d];
    }
    d = c;
  } else {
    d = b.slice();
  }
  return d;
}
function Ld(b, c, d) {
  c = Jd(c, d);
  b = [b[0], b[1], b[0], b[3], b[2], b[1], b[2], b[3]];
  c(b, b, 2);
  return Wc([b[0], b[2], b[4], b[6]], [b[1], b[3], b[5], b[7]]);
}
;function Md() {
  X.call(this);
  this.o = Uc();
  this.u = -1;
  this.f = {};
  this.s = this.i = 0;
}
H(Md, X);
Md.prototype.D = function(b) {
  this.u != this.h && (this.o = this.Va(this.o), this.u = this.h);
  var c = this.o;
  b ? (b[0] = c[0], b[1] = c[1], b[2] = c[2], b[3] = c[3]) : b = c;
  return b;
};
function Nd(b, c, d, e, f, g) {
  var h = f[0], k = f[1], l = f[4], m = f[5], n = f[12];
  f = f[13];
  for (var q = g ? g : [], r = 0;c < d;c += e) {
    var t = b[c], w = b[c + 1];
    q[r++] = h * t + l * w + n;
    q[r++] = k * t + m * w + f;
  }
  g && q.length != r && (q.length = r);
  return q;
}
;function Z() {
  Md.call(this);
  this.g = "XY";
  this.B = 2;
  this.a = null;
}
H(Z, Md);
function Od(b) {
  if ("XY" == b) {
    return 2;
  }
  if ("XYZ" == b || "XYM" == b) {
    return 3;
  }
  if ("XYZM" == b) {
    return 4;
  }
}
Z.prototype.Va = function(b) {
  var c = this.a, d = this.a.length, e = this.B;
  b = Xc(Infinity, Infinity, -Infinity, -Infinity, b);
  return cd(b, c, 0, d, e);
};
Z.prototype.Ab = function(b) {
  this.s != this.h && (sb(this.f), this.i = 0, this.s = this.h);
  if (0 > b || 0 !== this.i && b <= this.i) {
    return this;
  }
  var c = b.toString();
  if (this.f.hasOwnProperty(c)) {
    return this.f[c];
  }
  var d = this.Ea(b);
  if (d.a.length < this.a.length) {
    return this.f[c] = d;
  }
  this.i = b;
  return this;
};
Z.prototype.Ea = function() {
  return this;
};
function Pd(b, c, d) {
  b.B = Od(c);
  b.g = c;
  b.a = d;
}
function Qd(b, c, d, e) {
  if (c) {
    d = Od(c);
  } else {
    for (c = 0;c < e;++c) {
      if (0 === d.length) {
        b.g = "XY";
        b.B = 2;
        return;
      }
      d = d[0];
    }
    d = d.length;
    c = 2 == d ? "XY" : 3 == d ? "XYZ" : 4 == d ? "XYZM" : void 0;
  }
  b.g = c;
  b.B = d;
}
Z.prototype.nb = function(b) {
  this.a && (b(this.a, this.a, this.B), this.c());
};
function Rd(b, c) {
  var d = 0, e, f;
  e = 0;
  for (f = c.length;e < f;++e) {
    b[d++] = c[e];
  }
  return d;
}
function Sd(b, c, d, e) {
  var f, g;
  f = 0;
  for (g = d.length;f < g;++f) {
    var h = d[f], k;
    for (k = 0;k < e;++k) {
      b[c++] = h[k];
    }
  }
  return c;
}
function Td(b, c, d, e, f) {
  f = f ? f : [];
  var g = 0, h, k;
  h = 0;
  for (k = d.length;h < k;++h) {
    c = Sd(b, c, d[h], e), f[g++] = c;
  }
  f.length = g;
  return f;
}
;function Ud(b, c, d, e, f) {
  f = void 0 !== f ? f : [];
  for (var g = 0;c < d;c += e) {
    f[g++] = b.slice(c, c + e);
  }
  f.length = g;
  return f;
}
function Vd(b, c, d, e, f) {
  f = void 0 !== f ? f : [];
  var g = 0, h, k;
  h = 0;
  for (k = d.length;h < k;++h) {
    var l = d[h];
    f[g++] = Ud(b, c, l, e, f[g]);
    c = l;
  }
  f.length = g;
  return f;
}
;function Wd(b, c, d, e, f, g, h) {
  var k = (d - c) / e;
  if (3 > k) {
    for (;c < d;c += e) {
      g[h++] = b[c], g[h++] = b[c + 1];
    }
    return h;
  }
  var l = Array(k);
  l[0] = 1;
  l[k - 1] = 1;
  d = [c, d - e];
  for (var m = 0, n;0 < d.length;) {
    var q = d.pop(), r = d.pop(), t = 0, w = b[r], A = b[r + 1], u = b[q], y = b[q + 1];
    for (n = r + e;n < q;n += e) {
      var B = Ga(b[n], b[n + 1], w, A, u, y);
      B > t && (m = n, t = B);
    }
    t > f && (l[(m - c) / e] = 1, r + e < m && d.push(r, m), m + e < q && d.push(m, q));
  }
  for (n = 0;n < k;++n) {
    l[n] && (g[h++] = b[c + n * e], g[h++] = b[c + n * e + 1]);
  }
  return h;
}
function Xd(b, c, d, e, f, g, h, k) {
  var l, m;
  l = 0;
  for (m = d.length;l < m;++l) {
    var n = d[l];
    a: {
      var q = b, r = n, t = e, w = f, A = g;
      if (c != r) {
        var u = w * Math.round(q[c] / w), y = w * Math.round(q[c + 1] / w);
        c += t;
        A[h++] = u;
        A[h++] = y;
        var B = void 0, x = void 0;
        do {
          if (B = w * Math.round(q[c] / w), x = w * Math.round(q[c + 1] / w), c += t, c == r) {
            A[h++] = B;
            A[h++] = x;
            break a;
          }
        } while (B == u && x == y);
        for (;c < r;) {
          var J, G;
          J = w * Math.round(q[c] / w);
          G = w * Math.round(q[c + 1] / w);
          c += t;
          if (J != B || G != x) {
            var K = B - u, E = x - y, S = J - u, U = G - y;
            K * U == E * S && (0 > K && S < K || K == S || 0 < K && S > K) && (0 > E && U < E || E == U || 0 < E && U > E) || (A[h++] = B, A[h++] = x, u = B, y = x);
            B = J;
            x = G;
          }
        }
        A[h++] = B;
        A[h++] = x;
      }
    }
    k.push(h);
    c = n;
  }
  return h;
}
;function Yd(b, c) {
  Z.call(this);
  this.S(b, c);
}
H(Yd, Z);
p = Yd.prototype;
p.clone = function() {
  var b = new Yd(null);
  Pd(b, this.g, this.a.slice());
  b.c();
  return b;
};
p.J = function() {
  return Ud(this.a, 0, this.a.length, this.B);
};
p.Ea = function(b) {
  var c = [];
  c.length = Wd(this.a, 0, this.a.length, this.B, b, c, 0);
  b = new Yd(null);
  Pd(b, "XY", c);
  b.c();
  return b;
};
p.M = function() {
  return "LinearRing";
};
p.S = function(b, c) {
  b ? (Qd(this, c, b, 1), this.a || (this.a = []), this.a.length = Sd(this.a, 0, b, this.B)) : Pd(this, "XY", null);
  this.c();
};
function Zd(b, c) {
  Z.call(this);
  this.S(b, c);
}
H(Zd, Z);
p = Zd.prototype;
p.clone = function() {
  var b = new Zd(null);
  Pd(b, this.g, this.a.slice());
  b.c();
  return b;
};
p.J = function() {
  return this.a ? this.a.slice() : [];
};
p.Va = function(b) {
  var c = this.a, d = c[0], c = c[1];
  return Xc(d, c, d, c, b);
};
p.M = function() {
  return "Point";
};
p.S = function(b, c) {
  b ? (Qd(this, c, b, 0), this.a || (this.a = []), this.a.length = Rd(this.a, b)) : Pd(this, "XY", null);
  this.c();
};
function $d(b, c, d, e, f, g) {
  for (var h = !1, k = b[d - e], l = b[d - e + 1];c < d;c += e) {
    var m = b[c], n = b[c + 1];
    l > g != n > g && f < (m - k) * (g - l) / (n - l) + k && (h = !h);
    k = m;
    l = n;
  }
  return h;
}
;function ae(b, c, d, e, f, g, h) {
  var k, l, m, n, q, r = f[g + 1], t = [], w = d[0];
  m = b[w - e];
  q = b[w - e + 1];
  for (k = c;k < w;k += e) {
    n = b[k];
    l = b[k + 1];
    if (r <= q && l <= r || q <= r && r <= l) {
      m = (r - q) / (l - q) * (n - m) + m, t.push(m);
    }
    m = n;
    q = l;
  }
  w = NaN;
  q = -Infinity;
  t.sort(bb);
  m = t[0];
  k = 1;
  for (l = t.length;k < l;++k) {
    n = t[k];
    var A = Math.abs(n - m);
    if (A > q) {
      m = (m + n) / 2;
      var u;
      a: {
        if (0 !== d.length && $d(b, c, d[0], e, m, r)) {
          var y = u = void 0;
          u = 1;
          for (y = d.length;u < y;++u) {
            if ($d(b, d[u - 1], d[u], e, m, r)) {
              u = !1;
              break a;
            }
          }
          u = !0;
        } else {
          u = !1;
        }
      }
      u && (w = m, q = A);
    }
    m = n;
  }
  isNaN(w) && (w = f[g]);
  return h ? (h.push(w, r), h) : [w, r];
}
;function be(b, c, d, e) {
  for (var f = 0, g = b[d - e], h = b[d - e + 1];c < d;c += e) {
    var k = b[c], l = b[c + 1], f = f + (k - g) * (l + h), g = k, h = l
  }
  return 0 < f;
}
function ce(b, c, d, e) {
  var f = 0;
  e = void 0 !== e ? e : !1;
  var g, h;
  g = 0;
  for (h = c.length;g < h;++g) {
    var k = c[g], f = be(b, f, k, d);
    if (0 === g) {
      if (e && f || !e && !f) {
        return !1;
      }
    } else {
      if (e && !f || !e && f) {
        return !1;
      }
    }
    f = k;
  }
  return !0;
}
function de(b, c, d, e, f) {
  f = void 0 !== f ? f : !1;
  var g, h;
  g = 0;
  for (h = d.length;g < h;++g) {
    var k = d[g], l = be(b, c, k, e);
    if (0 === g ? f && l || !f && !l : f && !l || !f && l) {
      for (var l = b, m = k, n = e;c < m - n;) {
        var q;
        for (q = 0;q < n;++q) {
          var r = l[c + q];
          l[c + q] = l[m - n + q];
          l[m - n + q] = r;
        }
        c += n;
        m -= n;
      }
    }
    c = k;
  }
  return c;
}
function ee(b, c, d, e) {
  var f = 0, g, h;
  g = 0;
  for (h = c.length;g < h;++g) {
    f = de(b, f, c[g], d, e);
  }
  return f;
}
;function fe(b, c) {
  Z.call(this);
  this.b = [];
  this.w = -1;
  this.A = null;
  this.C = -1;
  this.l = null;
  this.S(b, c);
}
H(fe, Z);
p = fe.prototype;
p.clone = function() {
  var b = new fe(null);
  ge(b, this.g, this.a.slice(), this.b.slice());
  return b;
};
p.J = function(b) {
  var c;
  void 0 !== b ? (c = he(this).slice(), de(c, 0, this.b, this.B, b)) : c = this.a;
  return Vd(c, 0, this.b, this.B);
};
p.Qa = function() {
  return this.b;
};
function ie(b) {
  if (b.w != b.h) {
    var c = fd(b.D());
    b.A = ae(he(b), 0, b.b, b.B, c, 0);
    b.w = b.h;
  }
  return b.A;
}
function he(b) {
  if (b.C != b.h) {
    var c = b.a;
    ce(c, b.b, b.B) ? b.l = c : (b.l = c.slice(), b.l.length = de(b.l, 0, b.b, b.B));
    b.C = b.h;
  }
  return b.l;
}
p.Ea = function(b) {
  var c = [], d = [];
  c.length = Xd(this.a, 0, this.b, this.B, Math.sqrt(b), c, 0, d);
  b = new fe(null);
  ge(b, "XY", c, d);
  return b;
};
p.M = function() {
  return "Polygon";
};
p.S = function(b, c) {
  if (b) {
    Qd(this, c, b, 2);
    this.a || (this.a = []);
    var d = Td(this.a, 0, b, this.B, this.b);
    this.a.length = 0 === d.length ? 0 : d[d.length - 1];
    this.c();
  } else {
    ge(this, "XY", null, this.b);
  }
};
function ge(b, c, d, e) {
  Pd(b, c, d);
  b.b = e;
  b.c();
}
;function je(b) {
  X.call(this);
  b = b || {};
  this.b = [0, 0];
  var c = {};
  c.center = void 0 !== b.center ? b.center : null;
  this.l = Hd(b.projection);
  var d, e, f, g = void 0 !== b.minZoom ? b.minZoom : 0;
  d = void 0 !== b.maxZoom ? b.maxZoom : 28;
  var h = void 0 !== b.zoomFactor ? b.zoomFactor : 2;
  if (void 0 !== b.resolutions) {
    d = b.resolutions, e = d[0], f = d[d.length - 1], d = db(d);
  } else {
    e = Hd(b.projection);
    f = e.D();
    var k = (f ? Math.max(Y(f), ed(f)) : 360 * sd.degrees / Bd(e)) / 256 / Math.pow(2, 0), l = k / Math.pow(2, 28);
    e = b.maxResolution;
    void 0 !== e ? g = 0 : e = k / Math.pow(h, g);
    f = b.minResolution;
    void 0 === f && (f = void 0 !== b.maxZoom ? void 0 !== b.maxResolution ? e / Math.pow(h, d) : k / Math.pow(h, d) : l);
    d = g + Math.floor(Math.log(e / f) / Math.log(h));
    f = e / Math.pow(h, d - g);
    d = eb(h, e, d - g);
  }
  this.g = e;
  this.i = f;
  this.f = g;
  g = void 0 !== b.extent ? Ja(b.extent) : Ka;
  (void 0 !== b.enableRotation ? b.enableRotation : 1) ? (e = b.constrainRotation, e = void 0 === e || !0 === e ? ib() : !1 === e ? gb : ga(e) ? hb(e) : gb) : e = fb;
  this.a = new jb(g, d, e);
  void 0 !== b.resolution ? c.resolution = b.resolution : void 0 !== b.zoom && (c.resolution = this.constrainResolution(this.g, b.zoom - this.f));
  c.rotation = void 0 !== b.rotation ? b.rotation : 0;
  Bc(this, c);
}
H(je, X);
p = je.prototype;
p.constrainResolution = function(b, c, d) {
  return this.a.resolution(b, c || 0, d || 0);
};
p.constrainRotation = function(b, c) {
  return this.a.rotation(b, c || 0);
};
p.ja = function() {
  return this.get("center");
};
p.Fc = function(b) {
  var c = this.ja(), d = this.R(), e = ke(this);
  return gd(c, d, e, b);
};
p.R = function() {
  return this.get("resolution");
};
function ke(b) {
  return b.get("rotation");
}
p.Y = function() {
  var b = this.ja(), c = this.l, d = this.R(), e = ke(this);
  return {center:[Math.round(b[0] / d) * d, Math.round(b[1] / d) * d], projection:void 0 !== c ? c : null, resolution:d, rotation:e};
};
p.Lc = function() {
  var b, c = this.R();
  if (void 0 !== c) {
    var d, e = 0;
    do {
      d = this.constrainResolution(this.g, e);
      if (d == c) {
        b = e;
        break;
      }
      ++e;
    } while (d > this.i);
  }
  return void 0 !== b ? this.f + b : b;
};
p.Hc = function(b, c, d) {
  if (!(b instanceof Z)) {
    var e = b[0], f = b[1], g = b[2], h = b[3], e = [e, f, e, h, g, h, g, f, e, f], f = new fe(null);
    ge(f, "XY", e, [e.length]);
    b = f;
  }
  e = d || {};
  d = void 0 !== e.padding ? e.padding : [0, 0, 0, 0];
  var h = void 0 !== e.constrainResolution ? e.constrainResolution : !0, f = void 0 !== e.nearest ? e.nearest : !1, k;
  void 0 !== e.minResolution ? k = e.minResolution : void 0 !== e.maxZoom ? k = this.constrainResolution(this.g, e.maxZoom - this.f, 0) : k = 0;
  var l = b.a, g = ke(this), e = Math.cos(-g), g = Math.sin(-g), m = Infinity, n = Infinity, q = -Infinity, r = -Infinity;
  b = b.B;
  for (var t = 0, w = l.length;t < w;t += b) {
    var A = l[t] * e - l[t + 1] * g, u = l[t] * g + l[t + 1] * e, m = Math.min(m, A), n = Math.min(n, u), q = Math.max(q, A), r = Math.max(r, u)
  }
  b = [m, n, q, r];
  c = [c[0] - d[1] - d[3], c[1] - d[0] - d[2]];
  c = Math.max(Y(b) / c[0], ed(b) / c[1]);
  c = isNaN(c) ? k : Math.max(c, k);
  h && (k = this.constrainResolution(c, 0, 0), !f && k < c && (k = this.constrainResolution(k, -1, 0)), c = k);
  le(this, c);
  g = -g;
  k = (m + q) / 2 + (d[1] - d[3]) / 2 * c;
  c = (n + r) / 2 + (d[0] - d[2]) / 2 * c;
  this.sa([k * e - c * g, c * e + k * g]);
};
p.rotate = function(b, c) {
  if (void 0 !== c) {
    var d, e = this.ja();
    void 0 !== e && (d = [e[0] - c[0], e[1] - c[1]], Lc(d, b - ke(this)), Hc(d, c));
    this.sa(d);
  }
  this.j("rotation", b);
};
p.sa = function(b) {
  this.j("center", b);
};
function me(b, c) {
  b.b[1] += c;
}
function le(b, c) {
  b.j("resolution", c);
}
p.Xd = function(b) {
  b = this.constrainResolution(this.g, b - this.f, 0);
  le(this, b);
};
function ne(b) {
  return 1 - Math.pow(1 - b, 3);
}
function oe(b) {
  return 3 * b * b - 2 * b * b * b;
}
function pe(b) {
  return b;
}
;function qe(b) {
  var c = b.source, d = b.start ? b.start : Date.now(), e = c[0], f = c[1], g = void 0 !== b.duration ? b.duration : 1E3, h = b.easing ? b.easing : oe;
  return function(b, c) {
    if (c.time < d) {
      return c.animate = !0, c.viewHints[0] += 1, !0;
    }
    if (c.time < d + g) {
      var m = 1 - h((c.time - d) / g), n = e - c.viewState.center[0], q = f - c.viewState.center[1];
      c.animate = !0;
      c.viewState.center[0] += m * n;
      c.viewState.center[1] += m * q;
      c.viewHints[0] += 1;
      return !0;
    }
    return !1;
  };
}
function re(b) {
  var c = b.rotation ? b.rotation : 0, d = b.start ? b.start : Date.now(), e = void 0 !== b.duration ? b.duration : 1E3, f = b.easing ? b.easing : oe, g = b.anchor ? b.anchor : null;
  return function(b, k) {
    if (k.time < d) {
      return k.animate = !0, k.viewHints[0] += 1, !0;
    }
    if (k.time < d + e) {
      var l = 1 - f((k.time - d) / e), l = (c - k.viewState.rotation) * l;
      k.animate = !0;
      k.viewState.rotation += l;
      if (g) {
        var m = k.viewState.center;
        m[0] -= g[0];
        m[1] -= g[1];
        Lc(m, l);
        Hc(m, g);
      }
      k.viewHints[0] += 1;
      return !0;
    }
    return !1;
  };
}
function se(b) {
  var c = b.resolution, d = b.start ? b.start : Date.now(), e = void 0 !== b.duration ? b.duration : 1E3, f = b.easing ? b.easing : oe;
  return function(b, h) {
    if (h.time < d) {
      return h.animate = !0, h.viewHints[0] += 1, !0;
    }
    if (h.time < d + e) {
      var k = 1 - f((h.time - d) / e), l = c - h.viewState.resolution;
      h.animate = !0;
      h.viewState.resolution += k * l;
      h.viewHints[0] += 1;
      return !0;
    }
    return !1;
  };
}
;function te(b, c, d, e) {
  this.a = b;
  this.c = c;
  this.h = d;
  this.b = e;
}
te.prototype.contains = function(b) {
  return ue(this, b[1], b[2]);
};
function ve(b, c) {
  return b.a <= c.a && c.c <= b.c && b.h <= c.h && c.b <= b.b;
}
function ue(b, c, d) {
  return b.a <= c && c <= b.c && b.h <= d && d <= b.b;
}
function we(b) {
  return b.b - b.h + 1;
}
;function xe(b, c, d) {
  P.call(this, b, d);
  this.element = c;
}
H(xe, P);
function ye(b) {
  X.call(this);
  this.a = b ? b : [];
  ze(this);
}
H(ye, X);
p = ye.prototype;
p.clear = function() {
  for (;0 < Ae(this);) {
    this.pop();
  }
};
p.Fb = function(b) {
  var c, d;
  c = 0;
  for (d = b.length;c < d;++c) {
    this.push(b[c]);
  }
  return this;
};
p.forEach = function(b, c) {
  this.a.forEach(b, c);
};
p.sd = function() {
  return this.a;
};
p.item = function(b) {
  return this.a[b];
};
function Ae(b) {
  return b.get("length");
}
p.pop = function() {
  return Be(this, Ae(this) - 1);
};
p.push = function(b) {
  var c = this.a.length;
  Ua(this.a, c, 0, b);
  ze(this);
  W(this, new xe("add", b, this));
  return c;
};
p.remove = function(b) {
  var c = this.a, d, e;
  d = 0;
  for (e = c.length;d < e;++d) {
    if (c[d] === b) {
      return Be(this, d);
    }
  }
};
function Be(b, c) {
  var d = b.a[c];
  La.splice.call(b.a, c, 1);
  ze(b);
  W(b, new xe("remove", d, b));
  return d;
}
function ze(b) {
  b.j("length", b.a.length);
}
;function Ce(b) {
  if (!z(b)) {
    var c = b[0];
    c != (c | 0) && (c = c + .5 | 0);
    var d = b[1];
    d != (d | 0) && (d = d + .5 | 0);
    var e = b[2];
    e != (e | 0) && (e = e + .5 | 0);
    b = "rgba(" + c + "," + d + "," + e + "," + b[3] + ")";
  }
  return b;
}
;var Ee = !O || 9 <= Kb;
!zb && !O || O && 9 <= Kb || zb && Ib("1.9.1");
O && Ib("9");
function Fe(b, c) {
  this.x = ba(b) ? b : 0;
  this.y = ba(c) ? c : 0;
}
p = Fe.prototype;
p.clone = function() {
  return new Fe(this.x, this.y);
};
p.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};
p.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};
p.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};
p.scale = function(b, c) {
  var d = ga(c) ? c : b;
  this.x *= b;
  this.y *= d;
  return this;
};
function Ge(b, c) {
  this.width = b;
  this.height = c;
}
p = Ge.prototype;
p.clone = function() {
  return new Ge(this.width, this.height);
};
p.Dc = function() {
  return this.width * this.height;
};
p.ra = function() {
  return !this.Dc();
};
p.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
p.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
p.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
p.scale = function(b, c) {
  var d = ga(c) ? c : b;
  this.width *= b;
  this.height *= d;
  return this;
};
function He(b) {
  var c = document;
  return z(b) ? c.getElementById(b) : b;
}
function Ie(b, c) {
  nb(c, function(c, e) {
    "style" == e ? b.style.cssText = c : "class" == e ? b.className = c : "for" == e ? b.htmlFor = c : Je.hasOwnProperty(e) ? b.setAttribute(Je[e], c) : 0 == e.lastIndexOf("aria-", 0) || 0 == e.lastIndexOf("data-", 0) ? b.setAttribute(e, c) : b[e] = c;
  });
}
var Je = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function Ke(b) {
  b = b.document.documentElement;
  return new Ge(b.clientWidth, b.clientHeight);
}
function Le(b, c, d) {
  var e = arguments, f = document, g = e[0], h = e[1];
  if (!Ee && h && (h.name || h.type)) {
    g = ["<", g];
    h.name && g.push(' name="', ta(h.name), '"');
    if (h.type) {
      g.push(' type="', ta(h.type), '"');
      var k = {};
      wb(k, h);
      delete k.type;
      h = k;
    }
    g.push(">");
    g = g.join("");
  }
  g = f.createElement(g);
  h && (z(h) ? g.className = h : ea(h) ? g.className = h.join(" ") : Ie(g, h));
  2 < e.length && Me(f, g, e);
  return g;
}
function Me(b, c, d) {
  function e(d) {
    d && c.appendChild(z(d) ? b.createTextNode(d) : d);
  }
  for (var f = 2;f < d.length;f++) {
    var g = d[f];
    !fa(g) || ia(g) && 0 < g.nodeType ? e(g) : Ma(Ne(g) ? Ra(g) : g, e);
  }
}
function Oe(b) {
  b && b.parentNode && b.parentNode.removeChild(b);
}
function Pe(b, c) {
  if (b.contains && 1 == c.nodeType) {
    return b == c || b.contains(c);
  }
  if ("undefined" != typeof b.compareDocumentPosition) {
    return b == c || Boolean(b.compareDocumentPosition(c) & 16);
  }
  for (;c && b != c;) {
    c = c.parentNode;
  }
  return c == b;
}
function Ne(b) {
  if (b && "number" == typeof b.length) {
    if (ia(b)) {
      return "function" == typeof b.item || "string" == typeof b.item;
    }
    if (ha(b)) {
      return "function" == typeof b.item;
    }
  }
  return !1;
}
function Qe() {
}
Qe.prototype.appendChild = function(b, c) {
  b.appendChild(c);
};
Qe.prototype.contains = Pe;
function Re(b) {
  if (b.classList) {
    return b.classList;
  }
  b = b.className;
  return z(b) && b.match(/\S+/g) || [];
}
function Se(b, c) {
  var d;
  b.classList ? d = b.classList.contains(c) : (d = Re(b), d = 0 <= La.indexOf.call(d, c, void 0));
  return d;
}
function Te(b, c) {
  b.classList ? b.classList.add(c) : Se(b, c) || (b.className += 0 < b.className.length ? " " + c : c);
}
function Ue(b, c) {
  b.classList ? b.classList.remove(c) : Se(b, c) && (b.className = Na(Re(b), function(b) {
    return b != c;
  }).join(" "));
}
;function Ve(b, c, d, e) {
  this.top = b;
  this.right = c;
  this.bottom = d;
  this.left = e;
}
p = Ve.prototype;
p.clone = function() {
  return new Ve(this.top, this.right, this.bottom, this.left);
};
p.contains = function(b) {
  return this && b ? b instanceof Ve ? b.left >= this.left && b.right <= this.right && b.top >= this.top && b.bottom <= this.bottom : b.x >= this.left && b.x <= this.right && b.y >= this.top && b.y <= this.bottom : !1;
};
p.ceil = function() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this;
};
p.floor = function() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this;
};
p.round = function() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this;
};
p.scale = function(b, c) {
  var d = ga(c) ? c : b;
  this.left *= b;
  this.right *= b;
  this.top *= d;
  this.bottom *= d;
  return this;
};
function We(b, c) {
  var d = 9 == b.nodeType ? b : b.ownerDocument || b.document;
  return d.defaultView && d.defaultView.getComputedStyle && (d = d.defaultView.getComputedStyle(b, null)) ? d[c] || d.getPropertyValue(c) || "" : "";
}
function Xe(b) {
  if (1 == b.nodeType) {
    var c;
    a: {
      try {
        c = b.getBoundingClientRect();
      } catch (d) {
        c = {left:0, top:0, right:0, bottom:0};
        break a;
      }
      O && b.ownerDocument.body && (b = b.ownerDocument, c.left -= b.documentElement.clientLeft + b.body.clientLeft, c.top -= b.documentElement.clientTop + b.body.clientTop);
    }
    return new Fe(c.left, c.top);
  }
  c = b.changedTouches ? b.changedTouches[0] : b;
  return new Fe(c.clientX, c.clientY);
}
function Ye(b, c) {
  b.style.display = c ? "" : "none";
}
function Ze(b, c, d, e) {
  if (/^\d+px?$/.test(c)) {
    return parseInt(c, 10);
  }
  var f = b.style[d], g = b.runtimeStyle[d];
  b.runtimeStyle[d] = b.currentStyle[d];
  b.style[d] = c;
  c = b.style[e];
  b.style[d] = f;
  b.runtimeStyle[d] = g;
  return c;
}
function $e(b, c) {
  var d = b.currentStyle ? b.currentStyle[c] : null;
  return d ? Ze(b, d, "left", "pixelLeft") : 0;
}
var af = {thin:2, medium:4, thick:6};
function bf(b, c) {
  if ("none" == (b.currentStyle ? b.currentStyle[c + "Style"] : null)) {
    return 0;
  }
  var d = b.currentStyle ? b.currentStyle[c + "Width"] : null;
  return d in af ? af[d] : Ze(b, d, "left", "pixelLeft");
}
;function cf(b, c, d) {
  P.call(this, b);
  this.map = c;
  this.frameState = void 0 !== d ? d : null;
}
H(cf, P);
function df(b) {
  X.call(this);
  this.element = b.element ? b.element : null;
  this.g = this.C = null;
  this.i = [];
  this.render = b.render ? b.render : qa;
  b.target && (this.C = He(b.target));
}
H(df, X);
df.prototype.I = function() {
  Oe(this.element);
  df.O.I.call(this);
};
df.prototype.setMap = function(b) {
  this.g && Oe(this.element);
  0 < this.i.length && (this.i.forEach(T), this.i.length = 0);
  if (this.g = b) {
    (this.C ? this.C : b.o).appendChild(this.element), this.render !== qa && this.i.push(Q(b, "postrender", this.render, !1, this)), b.render();
  }
};
function ef() {
  this.h = 0;
  this.b = {};
  this.a = this.c = null;
}
p = ef.prototype;
p.clear = function() {
  this.h = 0;
  this.b = {};
  this.a = this.c = null;
};
p.forEach = function(b, c) {
  for (var d = this.c;d;) {
    b.call(c, d.Ca, d.Db, this), d = d.ia;
  }
};
p.get = function(b) {
  b = this.b[b];
  if (b === this.a) {
    return b.Ca;
  }
  b === this.c ? (this.c = this.c.ia, this.c.ua = null) : (b.ia.ua = b.ua, b.ua.ia = b.ia);
  b.ia = null;
  b.ua = this.a;
  this.a = this.a.ia = b;
  return b.Ca;
};
p.Wa = function() {
  return this.h;
};
p.Ra = function() {
  var b = Array(this.h), c = 0, d;
  for (d = this.a;d;d = d.ua) {
    b[c++] = d.Db;
  }
  return b;
};
p.Yb = function() {
  var b = Array(this.h), c = 0, d;
  for (d = this.a;d;d = d.ua) {
    b[c++] = d.Ca;
  }
  return b;
};
p.pop = function() {
  var b = this.c;
  delete this.b[b.Db];
  b.ia && (b.ia.ua = null);
  this.c = b.ia;
  this.c || (this.a = null);
  --this.h;
  return b.Ca;
};
p.replace = function(b, c) {
  this.get(b);
  this.b[b].Ca = c;
};
function ff(b, c, d) {
  d = {Db:c, ia:null, ua:b.a, Ca:d};
  b.a ? b.a.ia = d : b.c = d;
  b.a = d;
  b.b[c] = d;
  ++b.h;
}
;function gf(b) {
  ef.call(this);
  this.j = void 0 !== b ? b : 2048;
}
H(gf, ef);
function hf(b) {
  return b.Wa() > b.j;
}
function jf(b, c) {
  for (var d, e;hf(b) && !(d = b.c.Ca, e = d.ba[0].toString(), e in c && c[e].contains(d.ba));) {
    b.pop().rb();
  }
}
;function kf(b, c) {
  V.call(this);
  this.ba = b;
  this.state = c;
  this.a = null;
  this.key = "";
}
H(kf, V);
function lf(b) {
  W(b, "change");
}
kf.prototype.getKey = function() {
  return C(this).toString();
};
kf.prototype.Y = function() {
  return this.state;
};
function mf(b) {
  X.call(this);
  this.i = xd(b.projection);
  this.A = void 0 !== b.attributions ? b.attributions : null;
  this.C = b.logo;
  this.N = void 0 !== b.state ? b.state : "ready";
  this.o = void 0 !== b.wrapX ? b.wrapX : !1;
}
H(mf, X);
mf.prototype.Y = function() {
  return this.N;
};
function nf(b) {
  return b.o;
}
;function of(b) {
  this.minZoom = void 0 !== b.minZoom ? b.minZoom : 0;
  this.b = b.resolutions;
  this.maxZoom = this.b.length - 1;
  this.c = void 0 !== b.origin ? b.origin : null;
  this.j = null;
  void 0 !== b.origins && (this.j = b.origins);
  var c = b.extent;
  void 0 === c || this.c || this.j || (this.c = jd(c));
  this.g = null;
  void 0 !== b.tileSizes && (this.g = b.tileSizes);
  this.f = void 0 !== b.tileSize ? b.tileSize : this.g ? null : 256;
  this.v = void 0 !== c ? c : null;
  this.a = null;
  void 0 !== b.sizes ? this.a = b.sizes.map(function(b) {
    return new te(Math.min(0, b[0]), Math.max(b[0] - 1, -1), Math.min(0, b[1]), Math.max(b[1] - 1, -1));
  }, this) : c && pf(this, c);
  this.h = [0, 0];
}
var qf = [0, 0, 0];
function rf(b, c, d, e, f) {
  f = sf(b, c, f);
  for (c = c[0] - 1;c >= b.minZoom;) {
    if (d.call(null, c, tf(b, f, c, e))) {
      return !0;
    }
    --c;
  }
  return !1;
}
of.prototype.D = function() {
  return this.v;
};
of.prototype.Da = function(b) {
  return this.c ? this.c : this.j[b];
};
of.prototype.R = function(b) {
  return this.b[b];
};
function uf(b, c, d, e) {
  return c[0] < b.maxZoom ? (e = sf(b, c, e), tf(b, e, c[0] + 1, d)) : null;
}
function vf(b, c, d, e) {
  wf(b, c[0], c[1], d, !1, qf);
  var f = qf[1], g = qf[2];
  wf(b, c[2], c[3], d, !0, qf);
  b = qf[1];
  c = qf[2];
  void 0 !== e ? (e.a = f, e.c = b, e.h = g, e.b = c) : e = new te(f, b, g, c);
  return e;
}
function tf(b, c, d, e) {
  d = b.R(d);
  return vf(b, c, d, e);
}
function xf(b, c) {
  var d = b.Da(c[0]), e = b.R(c[0]), f = Fc(yf(b, c[0]), b.h);
  return [d[0] + (c[1] + .5) * f[0] * e, d[1] + (c[2] + .5) * f[1] * e];
}
function sf(b, c, d) {
  var e = b.Da(c[0]), f = b.R(c[0]);
  b = Fc(yf(b, c[0]), b.h);
  var g = e[0] + c[1] * b[0] * f;
  c = e[1] + c[2] * b[1] * f;
  return Xc(g, c, g + b[0] * f, c + b[1] * f, d);
}
function wf(b, c, d, e, f, g) {
  var h = zf(b, e), k = e / b.R(h), l = b.Da(h);
  b = Fc(yf(b, h), b.h);
  c = k * Math.floor((c - l[0]) / e + (f ? .5 : 0)) / b[0];
  d = k * Math.floor((d - l[1]) / e + (f ? 0 : .5)) / b[1];
  f ? (c = Math.ceil(c) - 1, d = Math.ceil(d) - 1) : (c = Math.floor(c), d = Math.floor(d));
  f = c;
  void 0 !== g ? (g[0] = h, g[1] = f, g[2] = d) : g = [h, f, d];
  return g;
}
function yf(b, c) {
  return b.f ? b.f : b.g[c];
}
function zf(b, c) {
  var d = cb(b.b, c, 0);
  return Ea(d, b.minZoom, b.maxZoom);
}
function pf(b, c) {
  for (var d = b.b.length, e = Array(d), f = b.minZoom;f < d;++f) {
    e[f] = tf(b, c, f);
  }
  b.a = e;
}
function Af(b) {
  var c = b.j;
  if (!c) {
    for (var c = Bf(b), d = ed(c), e = Y(c), f = Fc(256), d = Math.max(e / f[0], d / f[1]), e = Array(43), f = 0;43 > f;++f) {
      e[f] = d / Math.pow(2, f);
    }
    c = new of({extent:c, origin:jd(c), resolutions:e, tileSize:void 0});
    b.j = c;
  }
  return c;
}
function Bf(b) {
  b = xd(b);
  var c = b.D();
  c || (b = 180 * sd.degrees / Bd(b), c = Xc(-b, -b, b, b));
  return c;
}
;function Cf(b) {
  mf.call(this, {attributions:b.attributions, extent:b.extent, logo:b.logo, projection:b.projection, state:b.state, wrapX:b.wrapX});
  this.la = void 0 !== b.opaque ? b.opaque : !1;
  this.u = void 0 !== b.tilePixelRatio ? b.tilePixelRatio : 1;
  this.tileGrid = void 0 !== b.tileGrid ? b.tileGrid : null;
  this.a = new gf(b.Qb);
  this.w = [0, 0];
}
H(Cf, mf);
p = Cf.prototype;
p.gc = function() {
  return hf(this.a);
};
p.hc = function(b, c) {
  var d = this.Sa(b);
  d && jf(d, c);
};
function Df(b, c, d, e, f) {
  c = b.Sa(c);
  if (!c) {
    return !1;
  }
  for (var g = !0, h, k, l = e.a;l <= e.c;++l) {
    for (var m = e.h;m <= e.b;++m) {
      h = b.Xa(d, l, m), k = !1, c.b.hasOwnProperty(h) && (h = c.get(h), (k = 2 === h.Y()) && (k = !1 !== f(h))), k || (g = !1);
    }
  }
  return g;
}
p.Xb = function() {
  return "";
};
p.Xa = function(b, c, d) {
  return b + "/" + c + "/" + d;
};
p.zb = function() {
  return this.la;
};
p.ya = function(b) {
  return this.tileGrid ? this.tileGrid : Af(b);
};
p.Sa = function(b) {
  var c = this.i;
  return c && !Id(c, b) ? null : this.a;
};
function Ef(b, c, d) {
  var e = b.ya(d);
  d = b.u;
  c = Fc(yf(e, c), b.w);
  1 == d ? b = c : (b = b.w, void 0 === b && (b = [0, 0]), b[0] = c[0] * d + .5 | 0, b[1] = c[1] * d + .5 | 0);
  return b;
}
function Ff(b, c, d) {
  var e = void 0 !== d ? d : b.i;
  d = b.ya(e);
  if (b.o && e.h) {
    var f = c;
    b = f[0];
    c = xf(d, f);
    var e = Bf(e), g = c[0], h = c[1];
    e[0] <= g && g <= e[2] && e[1] <= h && h <= e[3] ? c = f : (f = Y(e), c[0] += f * Math.ceil((e[0] - c[0]) / f), b = d.R(b), c = wf(d, c[0], c[1], b, !1, void 0));
  }
  e = c[0];
  b = c[1];
  f = c[2];
  d = d.minZoom > e || e > d.maxZoom ? !1 : (d = (g = d.D()) ? tf(d, g, e) : d.a ? d.a[e] : null) ? ue(d, b, f) : !0;
  return d ? c : null;
}
p.sc = qa;
function Gf(b, c) {
  P.call(this, b);
  this.tile = c;
}
H(Gf, P);
function Hf(b) {
  b = b ? b : {};
  this.u = document.createElement("UL");
  this.s = document.createElement("LI");
  this.u.appendChild(this.s);
  Ye(this.s, !1);
  this.f = void 0 !== b.collapsed ? b.collapsed : !0;
  this.l = void 0 !== b.collapsible ? b.collapsible : !0;
  this.l || (this.f = !1);
  var c = b.className ? b.className : "ol-attribution", d = b.tipLabel ? b.tipLabel : "Attributions", e = b.collapseLabel ? b.collapseLabel : "\u00bb";
  this.w = z(e) ? Le("SPAN", {}, e) : e;
  e = b.label ? b.label : "i";
  this.A = z(e) ? Le("SPAN", {}, e) : e;
  d = Le("BUTTON", {type:"button", title:d}, this.l && !this.f ? this.w : this.A);
  Q(d, "click", this.N, !1, this);
  c = Le("DIV", c + " ol-unselectable ol-control" + (this.f && this.l ? " ol-collapsed" : "") + (this.l ? "" : " ol-uncollapsible"), this.u, d);
  df.call(this, {element:c, render:b.render ? b.render : If, target:b.target});
  this.o = !0;
  this.b = {};
  this.a = {};
  this.F = {};
}
H(Hf, df);
function If(b) {
  if (b = b.frameState) {
    var c, d, e, f, g, h, k, l, m, n, q = b.layerStatesArray, r = tb(b.attributions), t = {}, w = b.viewState.projection;
    d = 0;
    for (c = q.length;d < c;d++) {
      if (h = q[d].layer.Z()) {
        if (n = C(h).toString(), m = h.A) {
          for (e = 0, f = m.length;e < f;e++) {
            if (k = m[e], l = C(k).toString(), !(l in r)) {
              if (g = b.usedTiles[n]) {
                var A = h.ya(w);
                g = k.c(g, A, w);
              } else {
                g = !1;
              }
              g ? (l in t && delete t[l], r[l] = k) : t[l] = k;
            }
          }
        }
      }
    }
    c = [r, t];
    d = c[0];
    c = c[1];
    for (var u in this.b) {
      u in d ? (this.a[u] || (Ye(this.b[u], !0), this.a[u] = !0), delete d[u]) : u in c ? (this.a[u] && (Ye(this.b[u], !1), delete this.a[u]), delete c[u]) : (Oe(this.b[u]), delete this.b[u], delete this.a[u]);
    }
    for (u in d) {
      e = document.createElement("LI"), e.innerHTML = d[u].a(), this.u.appendChild(e), this.b[u] = e, this.a[u] = !0;
    }
    for (u in c) {
      e = document.createElement("LI"), e.innerHTML = c[u].a(), Ye(e, !1), this.u.appendChild(e), this.b[u] = e;
    }
    u = !rb(this.a) || !rb(b.logos);
    this.o != u && (Ye(this.element, u), this.o = u);
    u && rb(this.a) ? Te(this.element, "ol-logo-only") : Ue(this.element, "ol-logo-only");
    var y;
    b = b.logos;
    u = this.F;
    for (y in u) {
      y in b || (Oe(u[y]), delete u[y]);
    }
    for (var B in b) {
      B in u || (y = new Image, y.src = B, d = b[B], "" === d ? d = y : (d = Le("A", {href:d}), d.appendChild(y)), this.s.appendChild(d), u[B] = d);
    }
    Ye(this.s, !rb(b));
  } else {
    this.o && (Ye(this.element, !1), this.o = !1);
  }
}
Hf.prototype.N = function(b) {
  b.preventDefault();
  b = this.element;
  Se(b, "ol-collapsed") ? Ue(b, "ol-collapsed") : Te(b, "ol-collapsed");
  if (this.f) {
    b = this.A;
    var c = b.parentNode;
    c && c.replaceChild(this.w, b);
  } else {
    b = this.w, (c = b.parentNode) && c.replaceChild(this.A, b);
  }
  this.f = !this.f;
};
function Jf(b) {
  b = b ? b : {};
  var c = b.className ? b.className : "ol-rotate", d = b.label ? b.label : "\u21e7";
  this.a = null;
  z(d) ? this.a = Le("SPAN", "ol-compass", d) : (this.a = d, Te(this.a, "ol-compass"));
  d = Le("BUTTON", {"class":c + "-reset", type:"button", title:b.tipLabel ? b.tipLabel : "Reset rotation"}, this.a);
  Q(d, "click", Jf.prototype.o, !1, this);
  c = Le("DIV", c + " ol-unselectable ol-control", d);
  d = b.render ? b.render : Kf;
  this.f = b.resetNorth ? b.resetNorth : void 0;
  df.call(this, {element:c, render:d, target:b.target});
  this.l = void 0 !== b.duration ? b.duration : 250;
  this.b = void 0 !== b.autoHide ? b.autoHide : !0;
  this.s = void 0;
  this.b && Te(this.element, "ol-hidden");
}
H(Jf, df);
Jf.prototype.o = function(b) {
  b.preventDefault();
  if (void 0 !== this.f) {
    this.f();
  } else {
    b = this.g;
    var c = b.U();
    if (c) {
      var d = ke(c);
      void 0 !== d && (0 < this.l && (d %= 2 * Math.PI, d < -Math.PI && (d += 2 * Math.PI), d > Math.PI && (d -= 2 * Math.PI), b.oa(re({rotation:d, duration:this.l, easing:ne}))), c.j("rotation", 0));
    }
  }
};
function Kf(b) {
  if (b = b.frameState) {
    b = b.viewState.rotation;
    if (b != this.s) {
      var c = "rotate(" + b + "rad)";
      if (this.b) {
        var d = this.element;
        0 === b ? Te(d, "ol-hidden") : Ue(d, "ol-hidden");
      }
      this.a.style.msTransform = c;
      this.a.style.webkitTransform = c;
      this.a.style.transform = c;
    }
    this.s = b;
  }
}
;function Lf(b) {
  b = b ? b : {};
  var c = b.className ? b.className : "ol-zoom", d = b.delta ? b.delta : 1, e = b.zoomOutLabel ? b.zoomOutLabel : "\u2212", f = b.zoomOutTipLabel ? b.zoomOutTipLabel : "Zoom out", g = Le("BUTTON", {"class":c + "-in", type:"button", title:b.zoomInTipLabel ? b.zoomInTipLabel : "Zoom in"}, b.zoomInLabel ? b.zoomInLabel : "+");
  Q(g, "click", oa(Lf.prototype.b, d), !1, this);
  e = Le("BUTTON", {"class":c + "-out", type:"button", title:f}, e);
  Q(e, "click", oa(Lf.prototype.b, -d), !1, this);
  c = Le("DIV", c + " ol-unselectable ol-control", g, e);
  df.call(this, {element:c, target:b.target});
  this.a = void 0 !== b.duration ? b.duration : 250;
}
H(Lf, df);
Lf.prototype.b = function(b, c) {
  c.preventDefault();
  var d = this.g, e = d.U();
  if (e) {
    var f = e.R();
    f && (0 < this.a && d.oa(se({resolution:f, duration:this.a, easing:ne})), d = e.constrainResolution(f, b), le(e, d));
  }
};
function Mf(b) {
  b = b ? b : {};
  var c = new ye;
  (void 0 !== b.zoom ? b.zoom : 1) && c.push(new Lf(b.zoomOptions));
  (void 0 !== b.rotate ? b.rotate : 1) && c.push(new Jf(b.rotateOptions));
  (void 0 !== b.attribution ? b.attribution : 1) && c.push(new Hf(b.attributionOptions));
  return c;
}
;function Nf(b) {
  b = b ? b : {};
  var c = Le("DIV", b.className ? b.className : "ol-mouse-position");
  df.call(this, {element:c, render:b.render ? b.render : Of, target:b.target});
  Q(this, Dc("projection"), this.u, !1, this);
  b.coordinateFormat && this.j("coordinateFormat", b.coordinateFormat);
  if (b.projection) {
    var d = xd(b.projection);
    this.j("projection", d);
  }
  this.w = b.undefinedHTML ? b.undefinedHTML : "";
  this.l = c.innerHTML;
  this.f = this.b = this.a = null;
}
H(Nf, df);
function Of(b) {
  b = b.frameState;
  b ? this.a != b.viewState.projection && (this.a = b.viewState.projection, this.b = null) : this.a = null;
  Pf(this, this.f);
}
Nf.prototype.u = function() {
  this.b = null;
};
Nf.prototype.s = function(b) {
  this.f = Qf(this.g, b.a);
  Pf(this, this.f);
};
Nf.prototype.o = function() {
  Pf(this, null);
  this.f = null;
};
Nf.prototype.setMap = function(b) {
  Nf.O.setMap.call(this, b);
  b && (b = b.a, this.i.push(Q(b, "mousemove", this.s, !1, this), Q(b, "mouseout", this.o, !1, this)));
};
function Pf(b, c) {
  var d = b.w;
  if (c && b.a) {
    if (!b.b) {
      var e = b.get("projection");
      b.b = e ? Cd(b.a, e) : Kd;
    }
    if (e = b.g.ga(c)) {
      b.b(e, e), d = (d = b.get("coordinateFormat")) ? d(e) : e.toString();
    }
  }
  b.l && d == b.l || (b.element.innerHTML = d, b.l = d);
}
;function Rf(b, c, d) {
  Ob.call(this);
  this.a = null;
  this.h = !1;
  this.f = b;
  this.g = d;
  this.c = c || window;
  this.b = na(this.j, this);
}
H(Rf, Ob);
Rf.prototype.start = function() {
  Sf(this);
  this.h = !1;
  var b = Tf(this), c = Uf(this);
  b && !c && this.c.mozRequestAnimationFrame ? (this.a = Q(this.c, "MozBeforePaint", this.b), this.c.mozRequestAnimationFrame(null), this.h = !0) : this.a = b && c ? b.call(this.c, this.b) : this.c.setTimeout(nd(this.b), 20);
};
function Sf(b) {
  if (null != b.a) {
    var c = Tf(b), d = Uf(b);
    c && !d && b.c.mozRequestAnimationFrame ? T(b.a) : c && d ? d.call(b.c, b.a) : b.c.clearTimeout(b.a);
  }
  b.a = null;
}
Rf.prototype.j = function() {
  this.h && this.a && T(this.a);
  this.a = null;
  this.f.call(this.g, pa());
};
Rf.prototype.I = function() {
  Sf(this);
  Rf.O.I.call(this);
};
function Tf(b) {
  b = b.c;
  return b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || null;
}
function Uf(b) {
  b = b.c;
  return b.cancelAnimationFrame || b.cancelRequestAnimationFrame || b.webkitCancelRequestAnimationFrame || b.mozCancelRequestAnimationFrame || b.oCancelRequestAnimationFrame || b.msCancelRequestAnimationFrame || null;
}
;var Vf;
function Wf() {
  var b = v.MessageChannel;
  "undefined" === typeof b && "undefined" !== typeof window && window.postMessage && window.addEventListener && !I("Presto") && (b = function() {
    var b = document.createElement("IFRAME");
    b.style.display = "none";
    b.src = "";
    document.documentElement.appendChild(b);
    var c = b.contentWindow, b = c.document;
    b.open();
    b.write("");
    b.close();
    var d = "callImmediate" + Math.random(), e = "file:" == c.location.protocol ? "*" : c.location.protocol + "//" + c.location.host, b = na(function(b) {
      if (("*" == e || b.origin == e) && b.data == d) {
        this.port1.onmessage();
      }
    }, this);
    c.addEventListener("message", b, !1);
    this.port1 = {};
    this.port2 = {postMessage:function() {
      c.postMessage(d, e);
    }};
  });
  if ("undefined" !== typeof b && !I("Trident") && !I("MSIE")) {
    var c = new b, d = {}, e = d;
    c.port1.onmessage = function() {
      if (ba(d.next)) {
        d = d.next;
        var b = d.Rb;
        d.Rb = null;
        b();
      }
    };
    return function(b) {
      e.next = {Rb:b};
      e = e.next;
      c.port2.postMessage(0);
    };
  }
  return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(b) {
    var c = document.createElement("SCRIPT");
    c.onreadystatechange = function() {
      c.onreadystatechange = null;
      c.parentNode.removeChild(c);
      c = null;
      b();
      b = null;
    };
    document.documentElement.appendChild(c);
  } : function(b) {
    v.setTimeout(b, 0);
  };
}
;function Xf(b, c) {
  this.c = {};
  this.a = [];
  this.h = this.b = 0;
  var d = arguments.length;
  if (1 < d) {
    if (d % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var e = 0;e < d;e += 2) {
      Yf(this, arguments[e], arguments[e + 1]);
    }
  } else {
    if (b) {
      if (b instanceof Xf) {
        e = b.Ra(), d = b.Yb();
      } else {
        var d = [], f = 0;
        for (e in b) {
          d[f++] = e;
        }
        e = d;
        d = qb(b);
      }
      for (f = 0;f < e.length;f++) {
        Yf(this, e[f], d[f]);
      }
    }
  }
}
p = Xf.prototype;
p.Wa = function() {
  return this.b;
};
p.Yb = function() {
  Zf(this);
  for (var b = [], c = 0;c < this.a.length;c++) {
    b.push(this.c[this.a[c]]);
  }
  return b;
};
p.Ra = function() {
  Zf(this);
  return this.a.concat();
};
p.ra = function() {
  return 0 == this.b;
};
p.clear = function() {
  this.c = {};
  this.h = this.b = this.a.length = 0;
};
p.remove = function(b) {
  return Object.prototype.hasOwnProperty.call(this.c, b) ? (delete this.c[b], this.b--, this.h++, this.a.length > 2 * this.b && Zf(this), !0) : !1;
};
function Zf(b) {
  if (b.b != b.a.length) {
    for (var c = 0, d = 0;c < b.a.length;) {
      var e = b.a[c];
      Object.prototype.hasOwnProperty.call(b.c, e) && (b.a[d++] = e);
      c++;
    }
    b.a.length = d;
  }
  if (b.b != b.a.length) {
    for (var f = {}, d = c = 0;c < b.a.length;) {
      e = b.a[c], Object.prototype.hasOwnProperty.call(f, e) || (b.a[d++] = e, f[e] = 1), c++;
    }
    b.a.length = d;
  }
}
p.get = function(b, c) {
  return Object.prototype.hasOwnProperty.call(this.c, b) ? this.c[b] : c;
};
function Yf(b, c, d) {
  Object.prototype.hasOwnProperty.call(b.c, c) || (b.b++, b.a.push(c), b.h++);
  b.c[c] = d;
}
p.forEach = function(b, c) {
  for (var d = this.Ra(), e = 0;e < d.length;e++) {
    var f = d[e], g = this.get(f);
    b.call(c, g, f, this);
  }
};
p.clone = function() {
  return new Xf(this);
};
function $f() {
  this.a = pa();
}
new $f;
$f.prototype.reset = function() {
  this.a = pa();
};
$f.prototype.get = function() {
  return this.a;
};
function ag(b) {
  V.call(this);
  this.a = b || window;
  this.b = Q(this.a, "resize", this.h, !1, this);
  this.c = Ke(this.a || window);
}
H(ag, V);
ag.prototype.I = function() {
  ag.O.I.call(this);
  this.b && (T(this.b), this.b = null);
  this.c = this.a = null;
};
ag.prototype.h = function() {
  var b = Ke(this.a || window), c = this.c;
  b == c || b && c && b.width == c.width && b.height == c.height || (this.c = b, W(this, "resize"));
};
function bg(b, c, d, e, f) {
  if (!(O || yb || Ab && Ib("525"))) {
    return !0;
  }
  if (Bb && f) {
    return cg(b);
  }
  if (f && !e) {
    return !1;
  }
  ga(c) && (c = dg(c));
  if (!d && (17 == c || 18 == c || Bb && 91 == c)) {
    return !1;
  }
  if ((Ab || yb) && e && d) {
    switch(b) {
      case 220:
      ;
      case 219:
      ;
      case 221:
      ;
      case 192:
      ;
      case 186:
      ;
      case 189:
      ;
      case 187:
      ;
      case 188:
      ;
      case 190:
      ;
      case 191:
      ;
      case 192:
      ;
      case 222:
        return !1;
    }
  }
  if (O && e && c == b) {
    return !1;
  }
  switch(b) {
    case 13:
      return !0;
    case 27:
      return !(Ab || yb);
  }
  return cg(b);
}
function cg(b) {
  if (48 <= b && 57 >= b || 96 <= b && 106 >= b || 65 <= b && 90 >= b || (Ab || yb) && 0 == b) {
    return !0;
  }
  switch(b) {
    case 32:
    ;
    case 43:
    ;
    case 63:
    ;
    case 64:
    ;
    case 107:
    ;
    case 109:
    ;
    case 110:
    ;
    case 111:
    ;
    case 186:
    ;
    case 59:
    ;
    case 189:
    ;
    case 187:
    ;
    case 61:
    ;
    case 188:
    ;
    case 190:
    ;
    case 191:
    ;
    case 192:
    ;
    case 222:
    ;
    case 219:
    ;
    case 220:
    ;
    case 221:
      return !0;
    default:
      return !1;
  }
}
function dg(b) {
  if (zb) {
    b = eg(b);
  } else {
    if (Bb && Ab) {
      a: {
        switch(b) {
          case 93:
            b = 91;
            break a;
        }
      }
    }
  }
  return b;
}
function eg(b) {
  switch(b) {
    case 61:
      return 187;
    case 59:
      return 186;
    case 173:
      return 189;
    case 224:
      return 91;
    case 0:
      return 224;
    default:
      return b;
  }
}
;function fg(b, c) {
  V.call(this);
  b && gg(this, b, c);
}
H(fg, V);
p = fg.prototype;
p.Ta = null;
p.$a = null;
p.Cb = null;
p.ab = null;
p.ha = -1;
p.ta = -1;
p.mb = !1;
var hg = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, ig = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, jg = O || 
yb || Ab && Ib("525"), kg = Bb && zb;
fg.prototype.a = function(b) {
  if (Ab || yb) {
    if (17 == this.ha && !b.i || 18 == this.ha && !b.c || Bb && 91 == this.ha && !b.s) {
      this.ta = this.ha = -1;
    }
  }
  -1 == this.ha && (b.i && 17 != b.h ? this.ha = 17 : b.c && 18 != b.h ? this.ha = 18 : b.s && 91 != b.h && (this.ha = 91));
  jg && !bg(b.h, this.ha, b.j, b.i, b.c) ? this.handleEvent(b) : (this.ta = dg(b.h), kg && (this.mb = b.c));
};
fg.prototype.c = function(b) {
  this.ta = this.ha = -1;
  this.mb = b.c;
};
fg.prototype.handleEvent = function(b) {
  var c = b.a, d, e, f = c.altKey;
  O && "keypress" == b.type ? (d = this.ta, e = 13 != d && 27 != d ? c.keyCode : 0) : (Ab || yb) && "keypress" == b.type ? (d = this.ta, e = 0 <= c.charCode && 63232 > c.charCode && cg(d) ? c.charCode : 0) : xb && !Ab ? (d = this.ta, e = cg(d) ? c.keyCode : 0) : (d = c.keyCode || this.ta, e = c.charCode || 0, kg && (f = this.mb), Bb && 63 == e && 224 == d && (d = 191));
  var g = d = dg(d), h = c.keyIdentifier;
  d ? 63232 <= d && d in hg ? g = hg[d] : 25 == d && b.j && (g = 9) : h && h in ig && (g = ig[h]);
  this.ha = g;
  b = new lg(g, e, 0, c);
  b.c = f;
  W(this, b);
};
function gg(b, c, d) {
  b.ab && mg(b);
  b.Ta = c;
  b.$a = Q(b.Ta, "keypress", b, d);
  b.Cb = Q(b.Ta, "keydown", b.a, d, b);
  b.ab = Q(b.Ta, "keyup", b.c, d, b);
}
function mg(b) {
  b.$a && (T(b.$a), T(b.Cb), T(b.ab), b.$a = null, b.Cb = null, b.ab = null);
  b.Ta = null;
  b.ha = -1;
  b.ta = -1;
}
fg.prototype.I = function() {
  fg.O.I.call(this);
  mg(this);
};
function lg(b, c, d, e) {
  Wb.call(this, e);
  this.type = "key";
  this.h = b;
  this.l = c;
}
H(lg, Wb);
function ng(b, c) {
  V.call(this);
  var d = this.a = b;
  (d = ia(d) && 1 == d.nodeType ? this.a : this.a ? this.a.body : null) && We(d, "direction");
  this.c = Q(this.a, zb ? "DOMMouseScroll" : "mousewheel", this, c);
}
H(ng, V);
ng.prototype.handleEvent = function(b) {
  var c = 0, d = 0;
  b = b.a;
  if ("mousewheel" == b.type) {
    c = 1;
    if (O || Ab && (Cb || Ib("532.0"))) {
      c = 40;
    }
    d = og(-b.wheelDelta, c);
    c = ba(b.wheelDeltaX) ? og(-b.wheelDeltaY, c) : d;
  } else {
    d = b.detail, 100 < d ? d = 3 : -100 > d && (d = -3), ba(b.axis) && b.axis === b.HORIZONTAL_AXIS || (c = d);
  }
  ga(this.b) && (c = Math.min(Math.max(c, -this.b), this.b));
  d = new pg(d, b, 0, c);
  W(this, d);
};
function og(b, c) {
  return Ab && (Bb || Db) && 0 != b % c ? b : b / c;
}
ng.prototype.I = function() {
  ng.O.I.call(this);
  T(this.c);
  this.c = null;
};
function pg(b, c, d, e) {
  Wb.call(this, c);
  this.type = "mousewheel";
  this.detail = b;
  this.o = e;
}
H(pg, Wb);
function qg(b, c, d) {
  P.call(this, b);
  this.a = c;
  b = d ? d : {};
  this.buttons = rg(b);
  this.pressure = sg(b, this.buttons);
  this.bubbles = "bubbles" in b ? b.bubbles : !1;
  this.cancelable = "cancelable" in b ? b.cancelable : !1;
  this.view = "view" in b ? b.view : null;
  this.detail = "detail" in b ? b.detail : null;
  this.screenX = "screenX" in b ? b.screenX : 0;
  this.screenY = "screenY" in b ? b.screenY : 0;
  this.clientX = "clientX" in b ? b.clientX : 0;
  this.clientY = "clientY" in b ? b.clientY : 0;
  this.button = "button" in b ? b.button : 0;
  this.relatedTarget = "relatedTarget" in b ? b.relatedTarget : null;
  this.pointerId = "pointerId" in b ? b.pointerId : 0;
  this.width = "width" in b ? b.width : 0;
  this.height = "height" in b ? b.height : 0;
  this.pointerType = "pointerType" in b ? b.pointerType : "";
  this.isPrimary = "isPrimary" in b ? b.isPrimary : !1;
  c.preventDefault && (this.preventDefault = function() {
    c.preventDefault();
  });
}
H(qg, P);
function rg(b) {
  if (b.buttons || tg) {
    b = b.buttons;
  } else {
    switch(b.which) {
      case 1:
        b = 1;
        break;
      case 2:
        b = 4;
        break;
      case 3:
        b = 2;
        break;
      default:
        b = 0;
    }
  }
  return b;
}
function sg(b, c) {
  var d = 0;
  b.pressure ? d = b.pressure : d = c ? .5 : 0;
  return d;
}
var tg = !1;
try {
  tg = 1 === (new MouseEvent("click", {buttons:1})).buttons;
} catch (b) {
}
;function ug(b, c) {
  var d = document.createElement("CANVAS");
  b && (d.width = b);
  c && (d.height = c);
  return d.getContext("2d");
}
;var vg = v.devicePixelRatio || 1, wg = !1, xg = function() {
  if (!("HTMLCanvasElement" in v)) {
    return !1;
  }
  try {
    var b = ug();
    return b ? (void 0 !== b.setLineDash && (wg = !0), !0) : !1;
  } catch (c) {
    return !1;
  }
}(), yg = "ontouchstart" in v, zg = "PointerEvent" in v, Ag = !!v.navigator.msPointerEnabled;
function Bg(b, c) {
  this.a = b;
  this.j = c;
}
;function Cg(b) {
  Bg.call(this, b, {mousedown:this.dd, mousemove:this.ed, mouseup:this.hd, mouseover:this.gd, mouseout:this.fd});
  this.c = b.c;
  this.b = [];
}
H(Cg, Bg);
function Eg(b, c) {
  for (var d = b.b, e = c.clientX, f = c.clientY, g = 0, h = d.length, k;g < h && (k = d[g]);g++) {
    var l = Math.abs(f - k[1]);
    if (25 >= Math.abs(e - k[0]) && 25 >= l) {
      return !0;
    }
  }
  return !1;
}
function Fg(b) {
  var c = Gg(b, b.a), d = c.preventDefault;
  c.preventDefault = function() {
    b.preventDefault();
    d();
  };
  c.pointerId = 1;
  c.isPrimary = !0;
  c.pointerType = "mouse";
  return c;
}
p = Cg.prototype;
p.dd = function(b) {
  if (!Eg(this, b)) {
    if ((1).toString() in this.c) {
      var c = Fg(b);
      Hg(this.a, Ig, c, b);
      delete this.c[(1).toString()];
    }
    c = Fg(b);
    this.c[(1).toString()] = b;
    Hg(this.a, Jg, c, b);
  }
};
p.ed = function(b) {
  if (!Eg(this, b)) {
    var c = Fg(b);
    Hg(this.a, Kg, c, b);
  }
};
p.hd = function(b) {
  if (!Eg(this, b)) {
    var c = this.c[(1).toString()];
    c && c.button === b.button && (c = Fg(b), Hg(this.a, Lg, c, b), delete this.c[(1).toString()]);
  }
};
p.gd = function(b) {
  if (!Eg(this, b)) {
    var c = Fg(b);
    Mg(this.a, c, b);
  }
};
p.fd = function(b) {
  if (!Eg(this, b)) {
    var c = Fg(b);
    Ng(this.a, c, b);
  }
};
function Og(b) {
  Bg.call(this, b, {MSPointerDown:this.nd, MSPointerMove:this.od, MSPointerUp:this.rd, MSPointerOut:this.pd, MSPointerOver:this.qd, MSPointerCancel:this.md, MSGotPointerCapture:this.kd, MSLostPointerCapture:this.ld});
  this.c = b.c;
  this.b = ["", "unavailable", "touch", "pen", "mouse"];
}
H(Og, Bg);
function Pg(b, c) {
  var d = c;
  ga(c.a.pointerType) && (d = Gg(c, c.a), d.pointerType = b.b[c.a.pointerType]);
  return d;
}
p = Og.prototype;
p.nd = function(b) {
  this.c[b.a.pointerId.toString()] = b;
  var c = Pg(this, b);
  Hg(this.a, Jg, c, b);
};
p.od = function(b) {
  var c = Pg(this, b);
  Hg(this.a, Kg, c, b);
};
p.rd = function(b) {
  var c = Pg(this, b);
  Hg(this.a, Lg, c, b);
  delete this.c[b.a.pointerId.toString()];
};
p.pd = function(b) {
  var c = Pg(this, b);
  Ng(this.a, c, b);
};
p.qd = function(b) {
  var c = Pg(this, b);
  Mg(this.a, c, b);
};
p.md = function(b) {
  var c = Pg(this, b);
  Hg(this.a, Ig, c, b);
  delete this.c[b.a.pointerId.toString()];
};
p.ld = function(b) {
  W(this.a, new qg("lostpointercapture", b, b.a));
};
p.kd = function(b) {
  W(this.a, new qg("gotpointercapture", b, b.a));
};
function Qg(b) {
  Bg.call(this, b, {pointerdown:this.Od, pointermove:this.Pd, pointerup:this.Sd, pointerout:this.Qd, pointerover:this.Rd, pointercancel:this.Nd, gotpointercapture:this.Mc, lostpointercapture:this.cd});
}
H(Qg, Bg);
p = Qg.prototype;
p.Od = function(b) {
  Rg(this.a, b);
};
p.Pd = function(b) {
  Rg(this.a, b);
};
p.Sd = function(b) {
  Rg(this.a, b);
};
p.Qd = function(b) {
  Rg(this.a, b);
};
p.Rd = function(b) {
  Rg(this.a, b);
};
p.Nd = function(b) {
  Rg(this.a, b);
};
p.cd = function(b) {
  Rg(this.a, b);
};
p.Mc = function(b) {
  Rg(this.a, b);
};
function Sg(b, c) {
  Bg.call(this, b, {touchstart:this.be, touchmove:this.ae, touchend:this.$d, touchcancel:this.Zd});
  this.c = b.c;
  this.f = c;
  this.b = void 0;
  this.g = 0;
  this.h = void 0;
}
H(Sg, Bg);
p = Sg.prototype;
p.lc = function() {
  this.g = 0;
  this.h = void 0;
};
function Tg(b, c, d) {
  c = Gg(c, d);
  c.pointerId = d.identifier + 2;
  c.bubbles = !0;
  c.cancelable = !0;
  c.detail = b.g;
  c.button = 0;
  c.buttons = 1;
  c.width = d.webkitRadiusX || d.radiusX || 0;
  c.height = d.webkitRadiusY || d.radiusY || 0;
  c.pressure = d.webkitForce || d.force || .5;
  c.isPrimary = b.b === d.identifier;
  c.pointerType = "touch";
  c.clientX = d.clientX;
  c.clientY = d.clientY;
  c.screenX = d.screenX;
  c.screenY = d.screenY;
  return c;
}
function Ug(b, c, d) {
  function e() {
    c.preventDefault();
  }
  var f = Array.prototype.slice.call(c.a.changedTouches), g = f.length, h, k;
  for (h = 0;h < g;++h) {
    k = Tg(b, c, f[h]), k.preventDefault = e, d.call(b, c, k);
  }
}
p.be = function(b) {
  var c = b.a.touches, d = Object.keys(this.c), e = d.length;
  if (e >= c.length) {
    var f = [], g, h, k;
    for (g = 0;g < e;++g) {
      h = d[g];
      k = this.c[h];
      var l;
      if (!(l = 1 == h)) {
        a: {
          l = c.length;
          for (var m = void 0, n = 0;n < l;n++) {
            if (m = c[n], m.identifier === h - 2) {
              l = !0;
              break a;
            }
          }
          l = !1;
        }
      }
      l || f.push(k.Aa);
    }
    for (g = 0;g < f.length;++g) {
      this.ob(b, f[g]);
    }
  }
  c = pb(this.c);
  if (0 === c || 1 === c && (1).toString() in this.c) {
    this.b = b.a.changedTouches[0].identifier, void 0 !== this.h && v.clearTimeout(this.h);
  }
  Vg(this, b);
  this.g++;
  Ug(this, b, this.Md);
};
p.Md = function(b, c) {
  this.c[c.pointerId] = {target:c.target, Aa:c, jc:c.target};
  var d = this.a;
  c.bubbles = !0;
  Hg(d, Wg, c, b);
  d = this.a;
  c.bubbles = !1;
  Hg(d, Xg, c, b);
  Hg(this.a, Jg, c, b);
};
p.ae = function(b) {
  b.preventDefault();
  Ug(this, b, this.jd);
};
p.jd = function(b, c) {
  var d = this.c[c.pointerId];
  if (d) {
    var e = d.Aa, f = d.jc;
    Hg(this.a, Kg, c, b);
    e && f !== c.target && (e.relatedTarget = c.target, c.relatedTarget = f, e.target = f, c.target ? (Ng(this.a, e, b), Mg(this.a, c, b)) : (c.target = f, c.relatedTarget = null, this.ob(b, c)));
    d.Aa = c;
    d.jc = c.target;
  }
};
p.$d = function(b) {
  Vg(this, b);
  Ug(this, b, this.de);
};
p.de = function(b, c) {
  Hg(this.a, Lg, c, b);
  this.a.Aa(c, b);
  var d = this.a;
  c.bubbles = !1;
  Hg(d, Yg, c, b);
  delete this.c[c.pointerId];
  c.isPrimary && (this.b = void 0, this.h = v.setTimeout(this.lc.bind(this), 200));
};
p.Zd = function(b) {
  Ug(this, b, this.ob);
};
p.ob = function(b, c) {
  Hg(this.a, Ig, c, b);
  this.a.Aa(c, b);
  var d = this.a;
  c.bubbles = !1;
  Hg(d, Yg, c, b);
  delete this.c[c.pointerId];
  c.isPrimary && (this.b = void 0, this.h = v.setTimeout(this.lc.bind(this), 200));
};
function Vg(b, c) {
  var d = b.f.b, e = c.a.changedTouches[0];
  if (b.b === e.identifier) {
    var f = [e.clientX, e.clientY];
    d.push(f);
    v.setTimeout(function() {
      Qa(d, f);
    }, 2500);
  }
}
;function Zg(b) {
  V.call(this);
  this.j = b;
  this.c = {};
  this.h = {};
  this.a = [];
  zg ? $g(this, new Qg(this)) : Ag ? $g(this, new Og(this)) : (b = new Cg(this), $g(this, b), yg && $g(this, new Sg(this, b)));
  b = this.a.length;
  for (var c, d = 0;d < b;d++) {
    c = this.a[d], ah(this, Object.keys(c.j));
  }
}
H(Zg, V);
function $g(b, c) {
  var d = Object.keys(c.j);
  d && (d.forEach(function(b) {
    var d = c.j[b];
    d && (this.h[b] = d.bind(c));
  }, b), b.a.push(c));
}
Zg.prototype.b = function(b) {
  var c = this.h[b.type];
  c && c(b);
};
function ah(b, c) {
  c.forEach(function(b) {
    Q(this.j, b, this.b, !1, this);
  }, b);
}
function bh(b, c) {
  c.forEach(function(b) {
    sc(this.j, b, this.b, !1, this);
  }, b);
}
function Gg(b, c) {
  for (var d = {}, e, f = 0, g = ch.length;f < g;f++) {
    e = ch[f][0], d[e] = b[e] || c[e] || ch[f][1];
  }
  return d;
}
Zg.prototype.Aa = function(b, c) {
  b.bubbles = !0;
  Hg(this, dh, b, c);
};
function Ng(b, c, d) {
  b.Aa(c, d);
  var e = c.relatedTarget;
  e && Pe(c.target, e) || (c.bubbles = !1, Hg(b, Yg, c, d));
}
function Mg(b, c, d) {
  c.bubbles = !0;
  Hg(b, Wg, c, d);
  var e = c.relatedTarget;
  e && Pe(c.target, e) || (c.bubbles = !1, Hg(b, Xg, c, d));
}
function Hg(b, c, d, e) {
  W(b, new qg(c, e, d));
}
function Rg(b, c) {
  W(b, new qg(c.type, c, c.a));
}
Zg.prototype.I = function() {
  for (var b = this.a.length, c, d = 0;d < b;d++) {
    c = this.a[d], bh(this, Object.keys(c.j));
  }
  Zg.O.I.call(this);
};
var Kg = "pointermove", Jg = "pointerdown", Lg = "pointerup", Wg = "pointerover", dh = "pointerout", Xg = "pointerenter", Yg = "pointerleave", Ig = "pointercancel", ch = [["bubbles", !1], ["cancelable", !1], ["view", null], ["detail", null], ["screenX", 0], ["screenY", 0], ["clientX", 0], ["clientY", 0], ["ctrlKey", !1], ["altKey", !1], ["shiftKey", !1], ["metaKey", !1], ["button", 0], ["relatedTarget", null], ["buttons", 0], ["pointerId", 0], ["width", 0], ["height", 0], ["pressure", 0], ["tiltX", 
0], ["tiltY", 0], ["pointerType", ""], ["hwTimestamp", 0], ["isPrimary", !1], ["type", ""], ["target", null], ["currentTarget", null], ["which", 0]];
function eh(b, c, d, e, f) {
  cf.call(this, b, c, f);
  this.a = d;
  this.originalEvent = d.a;
  this.pixel = Qf(c, this.originalEvent);
  this.coordinate = c.ga(this.pixel);
  this.dragging = void 0 !== e ? e : !1;
}
H(eh, cf);
eh.prototype.preventDefault = function() {
  eh.O.preventDefault.call(this);
  this.a.preventDefault();
};
eh.prototype.f = function() {
  eh.O.f.call(this);
  this.a.f();
};
function fh(b, c, d, e, f) {
  eh.call(this, b, c, d.a, e, f);
  this.c = d;
}
H(fh, eh);
function gh(b) {
  V.call(this);
  this.b = b;
  this.g = 0;
  this.f = !1;
  this.c = this.i = this.h = null;
  b = this.b.a;
  this.s = 0;
  this.l = {};
  this.j = new Zg(b);
  this.a = null;
  this.i = Q(this.j, Jg, this.Uc, !1, this);
  this.v = Q(this.j, Kg, this.Td, !1, this);
}
H(gh, V);
function hh(b, c) {
  var d;
  d = new fh(ih, b.b, c);
  W(b, d);
  0 !== b.g ? (v.clearTimeout(b.g), b.g = 0, d = new fh(jh, b.b, c), W(b, d)) : b.g = v.setTimeout(function() {
    this.g = 0;
    var b = new fh(kh, this.b, c);
    W(this, b);
  }.bind(b), 250);
}
function lh(b, c) {
  c.type == mh || c.type == nh ? delete b.l[c.pointerId] : c.type == oh && (b.l[c.pointerId] = !0);
  b.s = pb(b.l);
}
p = gh.prototype;
p.ac = function(b) {
  lh(this, b);
  var c = new fh(mh, this.b, b);
  W(this, c);
  !this.f && 0 === b.button && hh(this, this.c);
  0 === this.s && (this.h.forEach(T), this.h = null, this.f = !1, this.c = null, Sb(this.a), this.a = null);
};
p.Uc = function(b) {
  lh(this, b);
  var c = new fh(oh, this.b, b);
  W(this, c);
  this.c = b;
  this.h || (this.a = new Zg(document), this.h = [Q(this.a, ph, this.vd, !1, this), Q(this.a, mh, this.ac, !1, this), Q(this.j, nh, this.ac, !1, this)]);
};
p.vd = function(b) {
  if (b.clientX != this.c.clientX || b.clientY != this.c.clientY) {
    this.f = !0;
    var c = new fh(qh, this.b, b, this.f);
    W(this, c);
  }
  b.preventDefault();
};
p.Td = function(b) {
  W(this, new fh(b.type, this.b, b, !(!this.c || b.clientX == this.c.clientX && b.clientY == this.c.clientY)));
};
p.I = function() {
  this.v && (T(this.v), this.v = null);
  this.i && (T(this.i), this.i = null);
  this.h && (this.h.forEach(T), this.h = null);
  this.a && (Sb(this.a), this.a = null);
  this.j && (Sb(this.j), this.j = null);
  gh.O.I.call(this);
};
var kh = "singleclick", ih = "click", jh = "dblclick", qh = "pointerdrag", ph = "pointermove", oh = "pointerdown", mh = "pointerup", nh = "pointercancel", rh = {pe:kh, ee:ih, fe:jh, ie:qh, le:ph, he:oh, oe:mh, ne:"pointerover", me:"pointerout", je:"pointerenter", ke:"pointerleave", ge:nh};
function sh(b) {
  X.call(this);
  var c = tb(b);
  c.opacity = void 0 !== b.opacity ? b.opacity : 1;
  c.visible = void 0 !== b.visible ? b.visible : !0;
  c.zIndex = void 0 !== b.zIndex ? b.zIndex : 0;
  c.maxResolution = void 0 !== b.maxResolution ? b.maxResolution : Infinity;
  c.minResolution = void 0 !== b.minResolution ? b.minResolution : 0;
  Bc(this, c);
}
H(sh, X);
function th(b) {
  var c = b.get("opacity"), d = b.Bb(), e = b.get("visible"), f = b.D(), g = b.get("zIndex"), h = b.get("maxResolution"), k = b.get("minResolution");
  return {layer:b, opacity:Ea(c, 0, 1), Yd:d, visible:e, bb:!0, extent:f, zIndex:g, maxResolution:h, minResolution:Math.max(k, 0)};
}
sh.prototype.D = function() {
  return this.get("extent");
};
function uh() {
}
;function vh(b, c, d, e, f, g) {
  P.call(this, b, c);
  this.vectorContext = d;
  this.frameState = e;
  this.context = f;
  this.glContext = g;
}
H(vh, P);
function wh(b) {
  var c = tb(b);
  delete c.source;
  sh.call(this, c);
  this.a = this.g = this.b = null;
  b.map && this.setMap(b.map);
  Q(this, Dc("source"), this.Xc, !1, this);
  this.j("source", b.source ? b.source : null);
}
H(wh, sh);
p = wh.prototype;
p.yb = function(b) {
  b = b ? b : [];
  b.push(th(this));
  return b;
};
p.Z = function() {
  return this.get("source") || null;
};
p.Bb = function() {
  var b = this.Z();
  return b ? b.Y() : "undefined";
};
p.Ld = function() {
  this.c();
};
p.Xc = function() {
  this.a && (T(this.a), this.a = null);
  var b = this.Z();
  b && (this.a = Q(b, "change", this.Ld, !1, this));
  this.c();
};
p.setMap = function(b) {
  T(this.b);
  this.b = null;
  b || this.c();
  T(this.g);
  this.g = null;
  b && (this.b = Q(b, "precompose", function(b) {
    var d = th(this);
    d.bb = !1;
    d.zIndex = Infinity;
    b.frameState.layerStatesArray.push(d);
    b.frameState.layerStates[C(this)] = d;
  }, !1, this), this.g = Q(this, "change", b.render, !1, b), this.c());
};
function xh(b, c, d, e, f, g, h, k) {
  b[0] = 1;
  b[1] = 0;
  b[2] = 0;
  b[3] = 0;
  b[4] = 0;
  b[5] = 1;
  b[6] = 0;
  b[7] = 0;
  b[8] = 0;
  b[9] = 0;
  b[10] = 1;
  b[11] = 0;
  b[12] = 0;
  b[13] = 0;
  b[14] = 0;
  b[15] = 1;
  0 === c && 0 === d || Sc(b, c, d);
  if (1 != e || 1 != f) {
    c = b[1] * e;
    d = b[2] * e;
    var l = b[3] * e, m = b[4] * f, n = b[5] * f, q = b[6] * f;
    f = b[7] * f;
    var r = 1 * b[8], t = 1 * b[9], w = 1 * b[10], A = 1 * b[11], u = b[12], y = b[13], B = b[14], x = b[15];
    b[0] *= e;
    b[1] = c;
    b[2] = d;
    b[3] = l;
    b[4] = m;
    b[5] = n;
    b[6] = q;
    b[7] = f;
    b[8] = r;
    b[9] = t;
    b[10] = w;
    b[11] = A;
    b[12] = u;
    b[13] = y;
    b[14] = B;
    b[15] = x;
  }
  0 !== g && (e = b[0], c = b[1], d = b[2], l = b[3], m = b[4], n = b[5], q = b[6], f = b[7], r = Math.cos(g), g = Math.sin(g), b[0] = e * r + m * g, b[1] = c * r + n * g, b[2] = d * r + q * g, b[3] = l * r + f * g, b[4] = e * -g + m * r, b[5] = c * -g + n * r, b[6] = d * -g + q * r, b[7] = l * -g + f * r);
  0 === h && 0 === k || Sc(b, h, k);
  return b;
}
function yh(b, c, d) {
  var e = b[1], f = b[5], g = b[13], h = c[0];
  c = c[1];
  d[0] = b[0] * h + b[4] * c + b[12];
  d[1] = e * h + f * c + g;
  return d;
}
;function zh(b) {
  yc.call(this);
  this.b = b;
}
H(zh, yc);
zh.prototype.l = qa;
function Ah(b, c, d) {
  return function(e, f) {
    return Df(b, c, e, f, function(b) {
      d[e] || (d[e] = {});
      d[e][b.ba.toString()] = b;
    });
  };
}
function Bh(b, c) {
  c.gc() && b.postRenderFunctions.push(oa(function(b, c, f) {
    c = C(b).toString();
    b.hc(f.viewState.projection, f.usedTiles[c]);
  }, c));
}
function Ch(b, c) {
  if (c) {
    var d, e, f;
    e = 0;
    for (f = c.length;e < f;++e) {
      d = c[e], b[C(d).toString()] = d;
    }
  }
}
function Dh(b, c) {
  var d = c.C;
  void 0 !== d && (z(d) ? b.logos[d] = "" : ia(d) && (b.logos[d.src] = d.href));
}
function Eh(b, c, d, e) {
  c = C(c).toString();
  d = d.toString();
  c in b ? d in b[c] ? (b = b[c][d], e.a < b.a && (b.a = e.a), e.c > b.c && (b.c = e.c), e.h < b.h && (b.h = e.h), e.b > b.b && (b.b = e.b)) : b[c][d] = e : (b[c] = {}, b[c][d] = e);
}
function Fh(b, c, d) {
  return [c * (Math.round(b[0] / c) + d[0] % 2 / 2), c * (Math.round(b[1] / c) + d[1] % 2 / 2)];
}
function Gh(b, c, d, e, f, g, h, k) {
  var l = C(c).toString();
  l in b.wantedTiles || (b.wantedTiles[l] = {});
  var m = b.wantedTiles[l];
  b = b.tileQueue;
  var n = d.minZoom, q, r, t, w, A, u;
  for (u = h;u >= n;--u) {
    for (r = tf(d, g, u, r), t = d.R(u), w = r.a;w <= r.c;++w) {
      for (A = r.h;A <= r.b;++A) {
        h - u <= k ? (q = Hh(c, u, w, A, e, f), 0 == q.Y() && (m[q.ba.toString()] = !0, q.getKey() in b.b || b.g([q, l, xf(d, q.ba), t]))) : c.sc(u, w, A, f);
      }
    }
  }
}
;function Ih(b) {
  this.l = b.opacity;
  this.s = b.rotateWithView;
  this.o = b.rotation;
  this.u = b.scale;
  this.H = b.snapToPixel;
}
;function Jh() {
  this.a = {};
  this.c = 0;
}
Jh.c = function() {
  return Jh.a ? Jh.a : Jh.a = new Jh;
};
Jh.prototype.clear = function() {
  this.a = {};
  this.c = 0;
};
Jh.prototype.get = function(b, c, d) {
  b = c + ":" + b + ":" + (d ? Ce(d) : "null");
  return b in this.a ? this.a[b] : null;
};
function Kh(b, c) {
  Ob.call(this);
  this.g = c;
  this.c = {};
  this.h = {};
}
H(Kh, Ob);
Kh.prototype.I = function() {
  nb(this.c, Sb);
  Kh.O.I.call(this);
};
function Lh() {
  var b = Jh.c();
  if (32 < b.c) {
    var c = 0, d, e;
    for (d in b.a) {
      e = b.a[d];
      var f;
      if (f = 0 === (c++ & 3)) {
        $b(e) ? e = xc(e, void 0, void 0) : (e = nc(e), e = !!e && gc(e, void 0, void 0)), f = !e;
      }
      f && (delete b.a[d], --b.c);
    }
  }
}
function Mh(b, c, d, e, f, g) {
  function h(b) {
    var c = C(b).toString();
    if (!(c in n)) {
      return n[c] = !0, e.call(f, b, null);
    }
  }
  var k, l = d.viewState, m = l.resolution, n = {}, q = l.projection, l = c;
  if (q.a) {
    var q = q.D(), r = Y(q), t = c[0];
    if (t < q[0] || t > q[2]) {
      l = [t + r * Math.ceil((q[0] - t) / r), c[1]];
    }
  }
  q = d.layerStatesArray;
  for (r = q.length - 1;0 <= r;--r) {
    var t = q[r], w = t.layer;
    if (t.visible && m >= t.minResolution && m < t.maxResolution && g.call(null, w)) {
      var A = Nh(b, w);
      w.Z() && (k = A.l(nf(w.Z()) ? l : c, d, t.bb ? e : h, f));
      if (k) {
        break;
      }
    }
  }
}
function Nh(b, c) {
  var d = C(c).toString();
  if (d in b.c) {
    return b.c[d];
  }
  var e;
  e = c instanceof Oh ? new Ph(c) : c instanceof Qh ? new Rh(c) : null;
  b.c[d] = e;
  b.h[d] = Q(e, "change", b.i, !1, b);
  return e;
}
Kh.prototype.i = function() {
  this.g.render();
};
Kh.prototype.f = qa;
Kh.prototype.l = function(b, c) {
  for (var d in this.c) {
    if (!(c && d in c.layerStates)) {
      var e = d, f = this.c[e];
      delete this.c[e];
      T(this.h[e]);
      delete this.h[e];
      Sb(f);
    }
  }
};
function Za(b, c) {
  return b.zIndex - c.zIndex;
}
;function Sh(b, c) {
  this.v = b;
  this.j = c;
  this.a = [];
  this.c = [];
  this.b = {};
}
Sh.prototype.clear = function() {
  this.a.length = 0;
  this.c.length = 0;
  sb(this.b);
};
Sh.prototype.g = function(b) {
  var c = this.v(b);
  return Infinity != c ? (this.a.push(b), this.c.push(c), this.b[this.j(b)] = !0, Th(this, 0, this.a.length - 1), !0) : !1;
};
Sh.prototype.Wa = function() {
  return this.a.length;
};
Sh.prototype.ra = function() {
  return 0 === this.a.length;
};
function Uh(b, c) {
  for (var d = b.a, e = b.c, f = d.length, g = d[c], h = e[c], k = c;c < f >> 1;) {
    var l = 2 * c + 1, m = 2 * c + 2, l = m < f && e[m] < e[l] ? m : l;
    d[c] = d[l];
    e[c] = e[l];
    c = l;
  }
  d[c] = g;
  e[c] = h;
  Th(b, k, c);
}
function Th(b, c, d) {
  var e = b.a;
  b = b.c;
  for (var f = e[d], g = b[d];d > c;) {
    var h = d - 1 >> 1;
    if (b[h] > g) {
      e[d] = e[h], b[d] = b[h], d = h;
    } else {
      break;
    }
  }
  e[d] = f;
  b[d] = g;
}
;function Vh(b, c) {
  Sh.call(this, function(c) {
    return b.apply(null, c);
  }, function(b) {
    return b[0].getKey();
  });
  this.l = c;
  this.h = 0;
  this.f = {};
}
H(Vh, Sh);
Vh.prototype.g = function(b) {
  var c = Vh.O.g.call(this, b);
  c && Q(b[0], "change", this.i, !1, this);
  return c;
};
Vh.prototype.i = function(b) {
  b = b.target;
  var c = b.Y();
  if (2 === c || 3 === c || 4 === c) {
    sc(b, "change", this.i, !1, this), b = b.getKey(), b in this.f && (delete this.f[b], --this.h), this.l();
  }
};
function Wh() {
  this.a = [];
  this.c = this.b = 0;
}
function Xh(b, c) {
  var d = b.c, e = .05 - d, f = Math.log(.05 / b.c) / -.005;
  return qe({source:c, duration:f, easing:function(b) {
    return d * (Math.exp(-.005 * b * f) - 1) / e;
  }});
}
;function Yh(b) {
  X.call(this);
  this.s = null;
  this.wa(!0);
  this.handleEvent = b.handleEvent;
}
H(Yh, X);
Yh.prototype.wa = function(b) {
  this.j("active", b);
};
Yh.prototype.setMap = function(b) {
  this.s = b;
};
function Zh(b, c, d, e, f) {
  if (void 0 !== d) {
    var g = ke(c), h = c.ja();
    void 0 !== g && h && f && 0 < f && (b.oa(re({rotation:g, duration:f, easing:ne})), e && b.oa(qe({source:h, duration:f, easing:ne})));
    c.rotate(d, e);
  }
}
function $h(b, c, d, e, f) {
  var g = c.R();
  d = c.constrainResolution(g, d, 0);
  ai(b, c, d, e, f);
}
function ai(b, c, d, e, f) {
  if (d) {
    var g = c.R(), h = c.ja();
    void 0 !== g && h && d !== g && f && 0 < f && (b.oa(se({resolution:g, duration:f, easing:ne})), e && b.oa(qe({source:h, duration:f, easing:ne})));
    if (e) {
      var k;
      b = c.ja();
      f = c.R();
      void 0 !== b && void 0 !== f && (k = [e[0] - d * (e[0] - b[0]) / f, e[1] - d * (e[1] - b[1]) / f]);
      c.sa(k);
    }
    le(c, d);
  }
}
;function bi(b) {
  b = b ? b : {};
  this.a = b.delta ? b.delta : 1;
  Yh.call(this, {handleEvent:ci});
  this.b = void 0 !== b.duration ? b.duration : 250;
}
H(bi, Yh);
function ci(b) {
  var c = !1, d = b.a;
  if (b.type == jh) {
    var c = b.map, e = b.coordinate, d = d.j ? -this.a : this.a, f = c.U();
    $h(c, f, d, e, this.b);
    b.preventDefault();
    c = !0;
  }
  return !c;
}
;function di(b) {
  b = b.a;
  return b.c && !b.v && b.j;
}
function ei(b) {
  return b.type == kh;
}
function fi(b) {
  b = b.a;
  return !b.c && !b.v && !b.j;
}
function gi(b) {
  b = b.a;
  return !b.c && !b.v && b.j;
}
function hi(b) {
  b = b.a.target.tagName;
  return "INPUT" !== b && "SELECT" !== b && "TEXTAREA" !== b;
}
function ii(b) {
  return "mouse" == b.c.pointerType;
}
;function ji(b) {
  b = b ? b : {};
  Yh.call(this, {handleEvent:b.handleEvent ? b.handleEvent : ki});
  this.gb = b.handleDownEvent ? b.handleDownEvent : ld;
  this.hb = b.handleDragEvent ? b.handleDragEvent : qa;
  this.ib = b.handleMoveEvent ? b.handleMoveEvent : qa;
  this.jb = b.handleUpEvent ? b.handleUpEvent : ld;
  this.l = !1;
  this.N = {};
  this.g = [];
}
H(ji, Yh);
function li(b) {
  for (var c = b.length, d = 0, e = 0, f = 0;f < c;f++) {
    d += b[f].clientX, e += b[f].clientY;
  }
  return [d / c, e / c];
}
function ki(b) {
  if (!(b instanceof fh)) {
    return !0;
  }
  var c = !1, d = b.type;
  if (d === oh || d === qh || d === mh) {
    d = b.c, b.type == mh ? delete this.N[d.pointerId] : b.type == oh ? this.N[d.pointerId] = d : d.pointerId in this.N && (this.N[d.pointerId] = d), this.g = qb(this.N);
  }
  this.l && (b.type == qh ? this.hb(b) : b.type == mh && (this.l = this.jb(b)));
  b.type == oh ? (this.l = b = this.gb(b), c = this.Ba(b)) : b.type == ph && this.ib(b);
  return !c;
}
ji.prototype.Ba = function(b) {
  return b;
};
function mi(b) {
  ji.call(this, {handleDownEvent:ni, handleDragEvent:oi, handleUpEvent:pi});
  b = b ? b : {};
  this.a = b.kinetic;
  this.b = this.f = null;
  this.o = b.condition ? b.condition : fi;
  this.i = !1;
}
H(mi, ji);
function oi(b) {
  var c = li(this.g);
  this.a && this.a.a.push(c[0], c[1], Date.now());
  if (this.b) {
    var d = this.b[0] - c[0], e = c[1] - this.b[1];
    b = b.map;
    var f = b.U(), g = f.Y(), e = d = [d, e], h = g.resolution;
    e[0] *= h;
    e[1] *= h;
    Lc(d, g.rotation);
    Hc(d, g.center);
    d = f.a.center(d);
    b.render();
    f.sa(d);
  }
  this.b = c;
}
function pi(b) {
  b = b.map;
  var c = b.U();
  if (0 === this.g.length) {
    var d;
    if (d = !this.i && this.a) {
      if (d = this.a, 6 > d.a.length) {
        d = !1;
      } else {
        var e = Date.now() - 100, f = d.a.length - 3;
        if (d.a[f + 2] < e) {
          d = !1;
        } else {
          for (var g = f - 3;0 < g && d.a[g + 2] > e;) {
            g -= 3;
          }
          var e = d.a[f + 2] - d.a[g + 2], h = d.a[f] - d.a[g], f = d.a[f + 1] - d.a[g + 1];
          d.b = Math.atan2(f, h);
          d.c = Math.sqrt(h * h + f * f) / e;
          d = .05 < d.c;
        }
      }
    }
    d && (d = (.05 - this.a.c) / -.005, f = this.a.b, g = c.ja(), this.f = Xh(this.a, g), b.oa(this.f), g = qi(b, g), d = b.ga([g[0] - d * Math.cos(f), g[1] - d * Math.sin(f)]), d = c.a.center(d), c.sa(d));
    me(c, -1);
    b.render();
    return !1;
  }
  this.b = null;
  return !0;
}
function ni(b) {
  if (0 < this.g.length && this.o(b)) {
    var c = b.map, d = c.U();
    this.b = null;
    this.l || me(d, 1);
    c.render();
    this.f && Qa(c.w, this.f) && (d.sa(b.frameState.viewState.center), this.f = null);
    this.a && (b = this.a, b.a.length = 0, b.b = 0, b.c = 0);
    this.i = 1 < this.g.length;
    return !0;
  }
  return !1;
}
mi.prototype.Ba = ld;
function ri(b) {
  b = b ? b : {};
  ji.call(this, {handleDownEvent:si, handleDragEvent:ti, handleUpEvent:ui});
  this.b = b.condition ? b.condition : di;
  this.a = void 0;
  this.f = void 0 !== b.duration ? b.duration : 250;
}
H(ri, ji);
function ti(b) {
  if (ii(b)) {
    var c = b.map, d = c.cb();
    b = b.pixel;
    d = Math.atan2(d[1] / 2 - b[1], b[0] - d[0] / 2);
    if (void 0 !== this.a) {
      b = d - this.a;
      var e = c.U(), f = ke(e);
      c.render();
      Zh(c, e, f - b);
    }
    this.a = d;
  }
}
function ui(b) {
  if (!ii(b)) {
    return !0;
  }
  b = b.map;
  var c = b.U();
  me(c, -1);
  var d = ke(c), e = this.f, d = c.constrainRotation(d, 0);
  Zh(b, c, d, void 0, e);
  return !1;
}
function si(b) {
  return ii(b) && Yb(b.a) && this.b(b) ? (b = b.map, me(b.U(), 1), b.render(), this.a = void 0, !0) : !1;
}
ri.prototype.Ba = ld;
function vi(b) {
  this.h = null;
  this.c = document.createElement("div");
  this.c.style.position = "absolute";
  this.c.className = "ol-box " + b;
  this.b = this.j = this.a = null;
}
H(vi, Ob);
vi.prototype.I = function() {
  this.setMap(null);
  vi.O.I.call(this);
};
function wi(b) {
  var c = b.j, d = b.b;
  b = b.c.style;
  b.left = Math.min(c[0], d[0]) + "px";
  b.top = Math.min(c[1], d[1]) + "px";
  b.width = Math.abs(d[0] - c[0]) + "px";
  b.height = Math.abs(d[1] - c[1]) + "px";
}
vi.prototype.setMap = function(b) {
  if (this.a) {
    this.a.u.removeChild(this.c);
    var c = this.c.style;
    c.left = c.top = c.width = c.height = "inherit";
  }
  (this.a = b) && this.a.u.appendChild(this.c);
};
function xi(b) {
  var c = b.j, d = b.b, c = [c, [c[0], d[1]], d, [d[0], c[1]]].map(b.a.ga, b.a);
  c[4] = c[0].slice();
  b.h ? b.h.S([c]) : b.h = new fe([c]);
}
vi.prototype.L = function() {
  return this.h;
};
function yi(b, c, d) {
  P.call(this, b);
  this.coordinate = c;
  this.mapBrowserEvent = d;
}
H(yi, P);
function zi(b) {
  ji.call(this, {handleDownEvent:Ai, handleDragEvent:Bi, handleUpEvent:Ci});
  b = b ? b : {};
  this.a = new vi(b.className || "ol-dragbox");
  this.b = null;
  this.u = b.condition ? b.condition : md;
  this.o = b.boxEndCondition ? b.boxEndCondition : Di;
}
H(zi, ji);
function Di(b, c, d) {
  b = d[0] - c[0];
  c = d[1] - c[1];
  return 64 <= b * b + c * c;
}
function Bi(b) {
  if (ii(b)) {
    var c = this.a, d = b.pixel;
    c.j = this.b;
    c.b = d;
    xi(c);
    wi(c);
    W(this, new yi("boxdrag", b.coordinate, b));
  }
}
zi.prototype.L = function() {
  return this.a.L();
};
zi.prototype.i = qa;
function Ci(b) {
  if (!ii(b)) {
    return !0;
  }
  this.a.setMap(null);
  this.o(b, this.b, b.pixel) && (this.i(b), W(this, new yi("boxend", b.coordinate, b)));
  return !1;
}
function Ai(b) {
  if (ii(b) && Yb(b.a) && this.u(b)) {
    this.b = b.pixel;
    this.a.setMap(b.map);
    var c = this.a, d = this.b;
    c.j = this.b;
    c.b = d;
    xi(c);
    wi(c);
    W(this, new yi("boxstart", b.coordinate, b));
    return !0;
  }
  return !1;
}
;function Ei(b) {
  b = b ? b : {};
  var c = b.condition ? b.condition : gi;
  this.f = void 0 !== b.duration ? b.duration : 200;
  zi.call(this, {condition:c, className:b.className || "ol-dragzoom"});
}
H(Ei, zi);
Ei.prototype.i = function() {
  var b = this.s, c = b.U(), d = b.cb(), e = this.L().D(), d = c.constrainResolution(Math.max(Y(e) / d[0], ed(e) / d[1])), f = c.R(), g = c.ja();
  b.oa(se({resolution:f, duration:this.f, easing:ne}));
  b.oa(qe({source:g, duration:this.f, easing:ne}));
  c.sa(fd(e));
  le(c, d);
};
function Fi(b) {
  Yh.call(this, {handleEvent:Gi});
  b = b || {};
  this.a = void 0 !== b.condition ? b.condition : od(fi, hi);
  this.b = void 0 !== b.duration ? b.duration : 100;
  this.g = void 0 !== b.pixelDelta ? b.pixelDelta : 128;
}
H(Fi, Yh);
function Gi(b) {
  var c = !1;
  if ("key" == b.type) {
    var d = b.a.h;
    if (this.a(b) && (40 == d || 37 == d || 39 == d || 38 == d)) {
      var e = b.map, c = e.U(), f = c.R() * this.g, g = 0, h = 0;
      40 == d ? h = -f : 37 == d ? g = -f : 39 == d ? g = f : h = f;
      d = [g, h];
      Lc(d, ke(c));
      f = this.b;
      if (g = c.ja()) {
        f && 0 < f && e.oa(qe({source:g, duration:f, easing:pe})), e = c.a.center([g[0] + d[0], g[1] + d[1]]), c.sa(e);
      }
      b.preventDefault();
      c = !0;
    }
  }
  return !c;
}
;function Hi(b) {
  Yh.call(this, {handleEvent:Ii});
  b = b ? b : {};
  this.b = b.condition ? b.condition : hi;
  this.a = b.delta ? b.delta : 1;
  this.g = void 0 !== b.duration ? b.duration : 100;
}
H(Hi, Yh);
function Ii(b) {
  var c = !1;
  if ("key" == b.type) {
    var d = b.a.l;
    if (this.b(b) && (43 == d || 45 == d)) {
      c = b.map;
      d = 43 == d ? this.a : -this.a;
      c.render();
      var e = c.U();
      $h(c, e, d, void 0, this.g);
      b.preventDefault();
      c = !0;
    }
  }
  return !c;
}
;function Ji(b) {
  Yh.call(this, {handleEvent:Ki});
  b = b || {};
  this.a = 0;
  this.l = void 0 !== b.duration ? b.duration : 250;
  this.o = void 0 !== b.useAnchor ? b.useAnchor : !0;
  this.g = null;
  this.f = this.b = void 0;
}
H(Ji, Yh);
function Ki(b) {
  var c = !1;
  if ("mousewheel" == b.type) {
    var c = b.map, d = b.a;
    this.o && (this.g = b.coordinate);
    this.a += d.o;
    void 0 === this.b && (this.b = Date.now());
    d = Math.max(80 - (Date.now() - this.b), 0);
    v.clearTimeout(this.f);
    this.f = v.setTimeout(this.i.bind(this, c), d);
    b.preventDefault();
    c = !0;
  }
  return !c;
}
Ji.prototype.i = function(b) {
  var c = Ea(this.a, -1, 1), d = b.U();
  b.render();
  $h(b, d, -c, this.g, this.l);
  this.a = 0;
  this.g = null;
  this.f = this.b = void 0;
};
function Li(b) {
  ji.call(this, {handleDownEvent:Mi, handleDragEvent:Ni, handleUpEvent:Oi});
  b = b || {};
  this.b = null;
  this.f = void 0;
  this.a = !1;
  this.i = 0;
  this.u = void 0 !== b.threshold ? b.threshold : .3;
  this.o = void 0 !== b.duration ? b.duration : 250;
}
H(Li, ji);
function Ni(b) {
  var c = 0, d = this.g[0], e = this.g[1], d = Math.atan2(e.clientY - d.clientY, e.clientX - d.clientX);
  void 0 !== this.f && (c = d - this.f, this.i += c, !this.a && Math.abs(this.i) > this.u && (this.a = !0));
  this.f = d;
  b = b.map;
  d = Xe(b.a);
  e = li(this.g);
  e[0] -= d.x;
  e[1] -= d.y;
  this.b = b.ga(e);
  this.a && (d = b.U(), e = ke(d), b.render(), Zh(b, d, e + c, this.b));
}
function Oi(b) {
  if (2 > this.g.length) {
    b = b.map;
    var c = b.U();
    me(c, -1);
    if (this.a) {
      var d = ke(c), e = this.b, f = this.o, d = c.constrainRotation(d, 0);
      Zh(b, c, d, e, f);
    }
    return !1;
  }
  return !0;
}
function Mi(b) {
  return 2 <= this.g.length ? (b = b.map, this.b = null, this.f = void 0, this.a = !1, this.i = 0, this.l || me(b.U(), 1), b.render(), !0) : !1;
}
Li.prototype.Ba = ld;
function Pi(b) {
  ji.call(this, {handleDownEvent:Qi, handleDragEvent:Ri, handleUpEvent:Si});
  b = b ? b : {};
  this.b = null;
  this.i = void 0 !== b.duration ? b.duration : 400;
  this.a = void 0;
  this.f = 1;
}
H(Pi, ji);
function Ri(b) {
  var c = 1, d = this.g[0], e = this.g[1], f = d.clientX - e.clientX, d = d.clientY - e.clientY, f = Math.sqrt(f * f + d * d);
  void 0 !== this.a && (c = this.a / f);
  this.a = f;
  1 != c && (this.f = c);
  b = b.map;
  var f = b.U(), d = f.R(), e = Xe(b.a), g = li(this.g);
  g[0] -= e.x;
  g[1] -= e.y;
  this.b = b.ga(g);
  b.render();
  ai(b, f, d * c, this.b);
}
function Si(b) {
  if (2 > this.g.length) {
    b = b.map;
    var c = b.U();
    me(c, -1);
    var d = c.R(), e = this.b, f = this.i, d = c.constrainResolution(d, 0, this.f - 1);
    ai(b, c, d, e, f);
    return !1;
  }
  return !0;
}
function Qi(b) {
  return 2 <= this.g.length ? (b = b.map, this.b = null, this.a = void 0, this.f = 1, this.l || me(b.U(), 1), b.render(), !0) : !1;
}
Pi.prototype.Ba = ld;
function Ti(b) {
  var c = b || {};
  b = tb(c);
  delete b.layers;
  c = c.layers;
  sh.call(this, b);
  this.b = [];
  this.a = {};
  Q(this, Dc("layers"), this.Sc, !1, this);
  c ? ea(c) && (c = new ye(c.slice())) : c = new ye;
  this.j("layers", c);
}
H(Ti, sh);
p = Ti.prototype;
p.Ya = function() {
  this.get("visible") && this.c();
};
p.Sc = function() {
  this.b.forEach(T);
  this.b.length = 0;
  var b = this.get("layers");
  this.b.push(Q(b, "add", this.Rc, !1, this), Q(b, "remove", this.Tc, !1, this));
  nb(this.a, function(b) {
    b.forEach(T);
  });
  sb(this.a);
  var b = b.a, c, d, e;
  c = 0;
  for (d = b.length;c < d;c++) {
    e = b[c], this.a[C(e).toString()] = [Q(e, "propertychange", this.Ya, !1, this), Q(e, "change", this.Ya, !1, this)];
  }
  this.c();
};
p.Rc = function(b) {
  b = b.element;
  var c = C(b).toString();
  this.a[c] = [Q(b, "propertychange", this.Ya, !1, this), Q(b, "change", this.Ya, !1, this)];
  this.c();
};
p.Tc = function(b) {
  b = C(b.element).toString();
  this.a[b].forEach(T);
  delete this.a[b];
  this.c();
};
p.yb = function(b) {
  var c = void 0 !== b ? b : [], d = c.length;
  this.get("layers").forEach(function(b) {
    b.yb(c);
  });
  b = th(this);
  var e, f;
  for (e = c.length;d < e;d++) {
    f = c[d], f.opacity *= b.opacity, f.visible = f.visible && b.visible, f.maxResolution = Math.min(f.maxResolution, b.maxResolution), f.minResolution = Math.max(f.minResolution, b.minResolution), void 0 !== b.extent && (f.extent = void 0 !== f.extent ? hd(f.extent, b.extent) : b.extent);
  }
  return c;
};
p.Bb = function() {
  return "ready";
};
function Ui(b) {
  td.call(this, {code:b, units:"m", extent:Vi, global:!0, worldExtent:Wi});
}
H(Ui, td);
Ui.prototype.getPointResolution = function(b, c) {
  return b / Fa(c[1] / 6378137);
};
var Xi = 6378137 * Math.PI, Vi = [-Xi, -Xi, Xi, Xi], Wi = [-180, -85, 180, 85], Yi = "EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(b) {
  return new Ui(b);
});
function Zi(b, c, d) {
  var e = b.length;
  d = 1 < d ? d : 2;
  void 0 === c && (2 < d ? c = b.slice() : c = Array(e));
  for (var f = 0;f < e;f += d) {
    c[f] = 6378137 * Math.PI * b[f] / 180, c[f + 1] = 6378137 * Math.log(Math.tan(Math.PI * (b[f + 1] + 90) / 360));
  }
  return c;
}
function $i(b, c, d) {
  var e = b.length;
  d = 1 < d ? d : 2;
  void 0 === c && (2 < d ? c = b.slice() : c = Array(e));
  for (var f = 0;f < e;f += d) {
    c[f] = 180 * b[f] / (6378137 * Math.PI), c[f + 1] = 360 * Math.atan(Math.exp(b[f + 1] / 6378137)) / Math.PI - 90;
  }
  return c;
}
;var aj = new pd(6378137);
function bj(b, c) {
  td.call(this, {code:b, units:"degrees", extent:cj, axisOrientation:c, global:!0, metersPerUnit:dj, worldExtent:cj});
}
H(bj, td);
bj.prototype.getPointResolution = function(b) {
  return b;
};
var cj = [-180, -90, 180, 90], dj = Math.PI * aj.radius / 180, ej = [new bj("CRS:84"), new bj("EPSG:4326", "neu"), new bj("urn:ogc:def:crs:EPSG::4326", "neu"), new bj("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new bj("urn:ogc:def:crs:OGC:1.3:CRS84"), new bj("urn:ogc:def:crs:OGC:2:84"), new bj("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new bj("urn:x-ogc:def:crs:EPSG:4326", "neu")];
function Oh(b) {
  b = b ? b : {};
  var c = tb(b);
  delete c.preload;
  delete c.useInterimTilesOnError;
  wh.call(this, c);
  this.j("preload", void 0 !== b.preload ? b.preload : 0);
  this.j("useInterimTilesOnError", void 0 !== b.useInterimTilesOnError ? b.useInterimTilesOnError : !0);
}
H(Oh, wh);
var fj = [0, 0, 0, 1], gj = [], hj = [0, 0, 0, 1];
function ij(b) {
  b = b || {};
  this.a = void 0 !== b.color ? b.color : null;
  this.c = void 0;
}
;function jj() {
  this.c = -1;
}
;function kj() {
  this.c = -1;
  this.c = 64;
  this.a = Array(4);
  this.j = Array(this.c);
  this.h = this.b = 0;
  this.reset();
}
H(kj, jj);
kj.prototype.reset = function() {
  this.a[0] = 1732584193;
  this.a[1] = 4023233417;
  this.a[2] = 2562383102;
  this.a[3] = 271733878;
  this.h = this.b = 0;
};
function lj(b, c, d) {
  d || (d = 0);
  var e = Array(16);
  if (z(c)) {
    for (var f = 0;16 > f;++f) {
      e[f] = c.charCodeAt(d++) | c.charCodeAt(d++) << 8 | c.charCodeAt(d++) << 16 | c.charCodeAt(d++) << 24;
    }
  } else {
    for (f = 0;16 > f;++f) {
      e[f] = c[d++] | c[d++] << 8 | c[d++] << 16 | c[d++] << 24;
    }
  }
  c = b.a[0];
  d = b.a[1];
  var f = b.a[2], g = b.a[3], h = 0, h = c + (g ^ d & (f ^ g)) + e[0] + 3614090360 & 4294967295;
  c = d + (h << 7 & 4294967295 | h >>> 25);
  h = g + (f ^ c & (d ^ f)) + e[1] + 3905402710 & 4294967295;
  g = c + (h << 12 & 4294967295 | h >>> 20);
  h = f + (d ^ g & (c ^ d)) + e[2] + 606105819 & 4294967295;
  f = g + (h << 17 & 4294967295 | h >>> 15);
  h = d + (c ^ f & (g ^ c)) + e[3] + 3250441966 & 4294967295;
  d = f + (h << 22 & 4294967295 | h >>> 10);
  h = c + (g ^ d & (f ^ g)) + e[4] + 4118548399 & 4294967295;
  c = d + (h << 7 & 4294967295 | h >>> 25);
  h = g + (f ^ c & (d ^ f)) + e[5] + 1200080426 & 4294967295;
  g = c + (h << 12 & 4294967295 | h >>> 20);
  h = f + (d ^ g & (c ^ d)) + e[6] + 2821735955 & 4294967295;
  f = g + (h << 17 & 4294967295 | h >>> 15);
  h = d + (c ^ f & (g ^ c)) + e[7] + 4249261313 & 4294967295;
  d = f + (h << 22 & 4294967295 | h >>> 10);
  h = c + (g ^ d & (f ^ g)) + e[8] + 1770035416 & 4294967295;
  c = d + (h << 7 & 4294967295 | h >>> 25);
  h = g + (f ^ c & (d ^ f)) + e[9] + 2336552879 & 4294967295;
  g = c + (h << 12 & 4294967295 | h >>> 20);
  h = f + (d ^ g & (c ^ d)) + e[10] + 4294925233 & 4294967295;
  f = g + (h << 17 & 4294967295 | h >>> 15);
  h = d + (c ^ f & (g ^ c)) + e[11] + 2304563134 & 4294967295;
  d = f + (h << 22 & 4294967295 | h >>> 10);
  h = c + (g ^ d & (f ^ g)) + e[12] + 1804603682 & 4294967295;
  c = d + (h << 7 & 4294967295 | h >>> 25);
  h = g + (f ^ c & (d ^ f)) + e[13] + 4254626195 & 4294967295;
  g = c + (h << 12 & 4294967295 | h >>> 20);
  h = f + (d ^ g & (c ^ d)) + e[14] + 2792965006 & 4294967295;
  f = g + (h << 17 & 4294967295 | h >>> 15);
  h = d + (c ^ f & (g ^ c)) + e[15] + 1236535329 & 4294967295;
  d = f + (h << 22 & 4294967295 | h >>> 10);
  h = c + (f ^ g & (d ^ f)) + e[1] + 4129170786 & 4294967295;
  c = d + (h << 5 & 4294967295 | h >>> 27);
  h = g + (d ^ f & (c ^ d)) + e[6] + 3225465664 & 4294967295;
  g = c + (h << 9 & 4294967295 | h >>> 23);
  h = f + (c ^ d & (g ^ c)) + e[11] + 643717713 & 4294967295;
  f = g + (h << 14 & 4294967295 | h >>> 18);
  h = d + (g ^ c & (f ^ g)) + e[0] + 3921069994 & 4294967295;
  d = f + (h << 20 & 4294967295 | h >>> 12);
  h = c + (f ^ g & (d ^ f)) + e[5] + 3593408605 & 4294967295;
  c = d + (h << 5 & 4294967295 | h >>> 27);
  h = g + (d ^ f & (c ^ d)) + e[10] + 38016083 & 4294967295;
  g = c + (h << 9 & 4294967295 | h >>> 23);
  h = f + (c ^ d & (g ^ c)) + e[15] + 3634488961 & 4294967295;
  f = g + (h << 14 & 4294967295 | h >>> 18);
  h = d + (g ^ c & (f ^ g)) + e[4] + 3889429448 & 4294967295;
  d = f + (h << 20 & 4294967295 | h >>> 12);
  h = c + (f ^ g & (d ^ f)) + e[9] + 568446438 & 4294967295;
  c = d + (h << 5 & 4294967295 | h >>> 27);
  h = g + (d ^ f & (c ^ d)) + e[14] + 3275163606 & 4294967295;
  g = c + (h << 9 & 4294967295 | h >>> 23);
  h = f + (c ^ d & (g ^ c)) + e[3] + 4107603335 & 4294967295;
  f = g + (h << 14 & 4294967295 | h >>> 18);
  h = d + (g ^ c & (f ^ g)) + e[8] + 1163531501 & 4294967295;
  d = f + (h << 20 & 4294967295 | h >>> 12);
  h = c + (f ^ g & (d ^ f)) + e[13] + 2850285829 & 4294967295;
  c = d + (h << 5 & 4294967295 | h >>> 27);
  h = g + (d ^ f & (c ^ d)) + e[2] + 4243563512 & 4294967295;
  g = c + (h << 9 & 4294967295 | h >>> 23);
  h = f + (c ^ d & (g ^ c)) + e[7] + 1735328473 & 4294967295;
  f = g + (h << 14 & 4294967295 | h >>> 18);
  h = d + (g ^ c & (f ^ g)) + e[12] + 2368359562 & 4294967295;
  d = f + (h << 20 & 4294967295 | h >>> 12);
  h = c + (d ^ f ^ g) + e[5] + 4294588738 & 4294967295;
  c = d + (h << 4 & 4294967295 | h >>> 28);
  h = g + (c ^ d ^ f) + e[8] + 2272392833 & 4294967295;
  g = c + (h << 11 & 4294967295 | h >>> 21);
  h = f + (g ^ c ^ d) + e[11] + 1839030562 & 4294967295;
  f = g + (h << 16 & 4294967295 | h >>> 16);
  h = d + (f ^ g ^ c) + e[14] + 4259657740 & 4294967295;
  d = f + (h << 23 & 4294967295 | h >>> 9);
  h = c + (d ^ f ^ g) + e[1] + 2763975236 & 4294967295;
  c = d + (h << 4 & 4294967295 | h >>> 28);
  h = g + (c ^ d ^ f) + e[4] + 1272893353 & 4294967295;
  g = c + (h << 11 & 4294967295 | h >>> 21);
  h = f + (g ^ c ^ d) + e[7] + 4139469664 & 4294967295;
  f = g + (h << 16 & 4294967295 | h >>> 16);
  h = d + (f ^ g ^ c) + e[10] + 3200236656 & 4294967295;
  d = f + (h << 23 & 4294967295 | h >>> 9);
  h = c + (d ^ f ^ g) + e[13] + 681279174 & 4294967295;
  c = d + (h << 4 & 4294967295 | h >>> 28);
  h = g + (c ^ d ^ f) + e[0] + 3936430074 & 4294967295;
  g = c + (h << 11 & 4294967295 | h >>> 21);
  h = f + (g ^ c ^ d) + e[3] + 3572445317 & 4294967295;
  f = g + (h << 16 & 4294967295 | h >>> 16);
  h = d + (f ^ g ^ c) + e[6] + 76029189 & 4294967295;
  d = f + (h << 23 & 4294967295 | h >>> 9);
  h = c + (d ^ f ^ g) + e[9] + 3654602809 & 4294967295;
  c = d + (h << 4 & 4294967295 | h >>> 28);
  h = g + (c ^ d ^ f) + e[12] + 3873151461 & 4294967295;
  g = c + (h << 11 & 4294967295 | h >>> 21);
  h = f + (g ^ c ^ d) + e[15] + 530742520 & 4294967295;
  f = g + (h << 16 & 4294967295 | h >>> 16);
  h = d + (f ^ g ^ c) + e[2] + 3299628645 & 4294967295;
  d = f + (h << 23 & 4294967295 | h >>> 9);
  h = c + (f ^ (d | ~g)) + e[0] + 4096336452 & 4294967295;
  c = d + (h << 6 & 4294967295 | h >>> 26);
  h = g + (d ^ (c | ~f)) + e[7] + 1126891415 & 4294967295;
  g = c + (h << 10 & 4294967295 | h >>> 22);
  h = f + (c ^ (g | ~d)) + e[14] + 2878612391 & 4294967295;
  f = g + (h << 15 & 4294967295 | h >>> 17);
  h = d + (g ^ (f | ~c)) + e[5] + 4237533241 & 4294967295;
  d = f + (h << 21 & 4294967295 | h >>> 11);
  h = c + (f ^ (d | ~g)) + e[12] + 1700485571 & 4294967295;
  c = d + (h << 6 & 4294967295 | h >>> 26);
  h = g + (d ^ (c | ~f)) + e[3] + 2399980690 & 4294967295;
  g = c + (h << 10 & 4294967295 | h >>> 22);
  h = f + (c ^ (g | ~d)) + e[10] + 4293915773 & 4294967295;
  f = g + (h << 15 & 4294967295 | h >>> 17);
  h = d + (g ^ (f | ~c)) + e[1] + 2240044497 & 4294967295;
  d = f + (h << 21 & 4294967295 | h >>> 11);
  h = c + (f ^ (d | ~g)) + e[8] + 1873313359 & 4294967295;
  c = d + (h << 6 & 4294967295 | h >>> 26);
  h = g + (d ^ (c | ~f)) + e[15] + 4264355552 & 4294967295;
  g = c + (h << 10 & 4294967295 | h >>> 22);
  h = f + (c ^ (g | ~d)) + e[6] + 2734768916 & 4294967295;
  f = g + (h << 15 & 4294967295 | h >>> 17);
  h = d + (g ^ (f | ~c)) + e[13] + 1309151649 & 4294967295;
  d = f + (h << 21 & 4294967295 | h >>> 11);
  h = c + (f ^ (d | ~g)) + e[4] + 4149444226 & 4294967295;
  c = d + (h << 6 & 4294967295 | h >>> 26);
  h = g + (d ^ (c | ~f)) + e[11] + 3174756917 & 4294967295;
  g = c + (h << 10 & 4294967295 | h >>> 22);
  h = f + (c ^ (g | ~d)) + e[2] + 718787259 & 4294967295;
  f = g + (h << 15 & 4294967295 | h >>> 17);
  h = d + (g ^ (f | ~c)) + e[9] + 3951481745 & 4294967295;
  b.a[0] = b.a[0] + c & 4294967295;
  b.a[1] = b.a[1] + (f + (h << 21 & 4294967295 | h >>> 11)) & 4294967295;
  b.a[2] = b.a[2] + f & 4294967295;
  b.a[3] = b.a[3] + g & 4294967295;
}
function mj(b, c) {
  var d;
  ba(d) || (d = c.length);
  for (var e = d - b.c, f = b.j, g = b.b, h = 0;h < d;) {
    if (0 == g) {
      for (;h <= e;) {
        lj(b, c, h), h += b.c;
      }
    }
    if (z(c)) {
      for (;h < d;) {
        if (f[g++] = c.charCodeAt(h++), g == b.c) {
          lj(b, f);
          g = 0;
          break;
        }
      }
    } else {
      for (;h < d;) {
        if (f[g++] = c[h++], g == b.c) {
          lj(b, f);
          g = 0;
          break;
        }
      }
    }
  }
  b.b = g;
  b.h += d;
}
;function nj(b) {
  b = b || {};
  this.c = void 0 !== b.color ? b.color : null;
  this.h = b.lineCap;
  this.a = void 0 !== b.lineDash ? b.lineDash : null;
  this.j = b.lineJoin;
  this.g = b.miterLimit;
  this.b = b.width;
  this.f = void 0;
}
;function oj(b) {
  b = b || {};
  this.j = this.a = this.h = null;
  this.g = void 0 !== b.fill ? b.fill : null;
  this.c = void 0 !== b.stroke ? b.stroke : null;
  this.b = b.radius;
  this.v = [0, 0];
  this.i = this.f = null;
  var c = b.atlasManager, d = null, e, f = 0;
  this.c && (e = Ce(this.c.c), f = this.c.b, void 0 === f && (f = 1), d = this.c.a, wg || (d = null));
  var g = 2 * (this.b + f) + 1;
  e = {strokeStyle:e, oc:f, size:g, lineDash:d};
  if (void 0 === c) {
    this.a = document.createElement("CANVAS");
    this.a.height = g;
    this.a.width = g;
    var g = this.a.width, h = this.a.getContext("2d");
    this.Vb(e, h, 0, 0);
    this.g ? this.j = this.a : (h = this.j = document.createElement("CANVAS"), h.height = e.size, h.width = e.size, h = h.getContext("2d"), this.Ub(e, h, 0, 0));
  } else {
    g = Math.round(g);
    (d = !this.g) && (h = this.Ub.bind(this, e));
    if (this.c) {
      f = this.c;
      if (void 0 === f.f) {
        var k = "s" + (f.c ? Ce(f.c) : "-") + "," + (void 0 !== f.h ? f.h.toString() : "-") + "," + (f.a ? f.a.toString() : "-") + "," + (void 0 !== f.j ? f.j : "-") + "," + (void 0 !== f.g ? f.g.toString() : "-") + "," + (void 0 !== f.b ? f.b.toString() : "-"), l = new kj;
        mj(l, k);
        var m = Array((56 > l.b ? l.c : 2 * l.c) - l.b);
        m[0] = 128;
        for (k = 1;k < m.length - 8;++k) {
          m[k] = 0;
        }
        for (var n = 8 * l.h, k = m.length - 8;k < m.length;++k) {
          m[k] = n & 255, n /= 256;
        }
        mj(l, m);
        m = Array(16);
        for (k = n = 0;4 > k;++k) {
          for (var q = 0;32 > q;q += 8) {
            m[n++] = l.a[k] >>> q & 255;
          }
        }
        if (8192 >= m.length) {
          l = String.fromCharCode.apply(null, m);
        } else {
          for (l = "", k = 0;k < m.length;k += 8192) {
            l += String.fromCharCode.apply(null, Va(m, k, k + 8192));
          }
        }
        f.f = l;
      }
      f = f.f;
    } else {
      f = "-";
    }
    this.g ? (l = this.g, void 0 === l.c && (l.c = "f" + (l.a ? Ce(l.a) : "-")), l = l.c) : l = "-";
    this.h && f == this.h[1] && l == this.h[2] && this.b == this.h[3] || (this.h = ["c" + f + l + (void 0 !== this.b ? this.b.toString() : "-"), f, l, this.b]);
    h = c.add(this.h[0], g, g, this.Vb.bind(this, e), h);
    this.a = h.image;
    this.v = [h.offsetX, h.offsetY];
    d ? this.j = h.re : this.j = this.a;
  }
  this.f = [g / 2, g / 2];
  this.i = [g, g];
  Ih.call(this, {opacity:1, rotateWithView:!1, rotation:0, scale:1, snapToPixel:void 0 !== b.snapToPixel ? b.snapToPixel : !0});
}
H(oj, Ih);
p = oj.prototype;
p.da = function() {
  return this.a;
};
p.Da = function() {
  return this.v;
};
p.load = qa;
p.ce = qa;
p.Vb = function(b, c, d, e) {
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.translate(d, e);
  c.beginPath();
  c.arc(b.size / 2, b.size / 2, this.b, 0, 2 * Math.PI, !0);
  this.g && (c.fillStyle = Ce(this.g.a), c.fill());
  this.c && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.oc, b.lineDash && c.setLineDash(b.lineDash), c.stroke());
  c.closePath();
};
p.Ub = function(b, c, d, e) {
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.translate(d, e);
  c.beginPath();
  c.arc(b.size / 2, b.size / 2, this.b, 0, 2 * Math.PI, !0);
  c.fillStyle = Ce(fj);
  c.fill();
  this.c && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.oc, b.lineDash && c.setLineDash(b.lineDash), c.stroke());
  c.closePath();
};
function pj(b) {
  b = b || {};
  this.g = null;
  this.b = qj;
  void 0 !== b.geometry && rj(this, b.geometry);
  this.j = void 0 !== b.fill ? b.fill : null;
  this.f = void 0 !== b.image ? b.image : null;
  this.h = void 0 !== b.stroke ? b.stroke : null;
  this.c = void 0 !== b.text ? b.text : null;
  this.a = b.zIndex;
}
pj.prototype.L = function() {
  return this.g;
};
pj.prototype.da = function() {
  return this.f;
};
pj.prototype.i = function() {
  return this.c;
};
function rj(b, c) {
  ha(c) ? b.b = c : z(c) ? b.b = function(b) {
    return b.get(c);
  } : c ? void 0 !== c && (b.b = function() {
    return c;
  }) : b.b = qj;
  b.g = c;
}
function sj(b) {
  if (!ha(b)) {
    var c;
    c = ea(b) ? b : [b];
    b = function() {
      return c;
    };
  }
  return b;
}
var tj = null;
function uj() {
  if (!tj) {
    var b = new ij({color:"rgba(255,255,255,0.4)"}), c = new nj({color:"#3399CC", width:1.25});
    tj = [new pj({image:new oj({fill:b, stroke:c, radius:5}), fill:b, stroke:c})];
  }
  return tj;
}
function vj() {
  var b = {}, c = [255, 255, 255, 1], d = [0, 153, 255, 1];
  b.Polygon = [new pj({fill:new ij({color:[255, 255, 255, .5]})})];
  b.MultiPolygon = b.Polygon;
  b.LineString = [new pj({stroke:new nj({color:c, width:5})}), new pj({stroke:new nj({color:d, width:3})})];
  b.MultiLineString = b.LineString;
  b.Circle = b.Polygon.concat(b.LineString);
  b.Point = [new pj({image:new oj({radius:6, fill:new ij({color:d}), stroke:new nj({color:c, width:1.5})}), zIndex:Infinity})];
  b.MultiPoint = b.Point;
  b.GeometryCollection = b.Polygon.concat(b.LineString, b.Point);
  return b;
}
function qj(b) {
  return b.L();
}
;function Qh(b) {
  b = b ? b : {};
  var c = tb(b);
  delete c.style;
  delete c.renderBuffer;
  delete c.updateWhileAnimating;
  delete c.updateWhileInteracting;
  wh.call(this, c);
  this.f = void 0 !== b.renderBuffer ? b.renderBuffer : 100;
  this.l = null;
  this.i = void 0;
  c = b.style;
  this.l = void 0 !== c ? c : uj;
  this.i = null === c ? void 0 : sj(this.l);
  this.c();
  this.s = void 0 !== b.updateWhileAnimating ? b.updateWhileAnimating : !1;
  this.o = void 0 !== b.updateWhileInteracting ? b.updateWhileInteracting : !1;
}
H(Qh, wh);
function wj(b, c, d, e, f) {
  this.ma = {};
  this.b = b;
  this.u = c;
  this.f = d;
  this.P = e;
  this.fb = f;
  this.j = this.a = this.c = this.W = this.T = this.N = null;
  this.$ = this.ka = this.s = this.A = this.w = this.X = 0;
  this.ca = !1;
  this.g = this.fa = 0;
  this.la = !1;
  this.C = 0;
  this.h = "";
  this.v = this.H = this.wa = this.na = 0;
  this.F = this.l = this.i = null;
  this.o = [];
  this.xa = Qc();
}
function xj(b, c, d) {
  if (b.j) {
    c = Nd(c, 0, d, 2, b.P, b.o);
    d = b.b;
    var e = b.xa, f = d.globalAlpha;
    1 != b.s && (d.globalAlpha = f * b.s);
    var g = b.fa;
    b.ca && (g += b.fb);
    var h, k;
    h = 0;
    for (k = c.length;h < k;h += 2) {
      var l = c[h] - b.X, m = c[h + 1] - b.w;
      b.la && (l = Math.round(l), m = Math.round(m));
      if (0 !== g || 1 != b.g) {
        var n = l + b.X, q = m + b.w;
        xh(e, n, q, b.g, b.g, g, -n, -q);
        d.setTransform(e[0], e[1], e[4], e[5], e[12], e[13]);
      }
      d.drawImage(b.j, b.ka, b.$, b.C, b.A, l, m, b.C, b.A);
    }
    0 === g && 1 == b.g || d.setTransform(1, 0, 0, 1, 0, 0);
    1 != b.s && (d.globalAlpha = f);
  }
}
function yj(b, c, d, e) {
  var f = 0;
  if (b.F && "" !== b.h) {
    b.i && zj(b, b.i);
    b.l && Aj(b, b.l);
    var g = b.F, h = b.b, k = b.W;
    k ? (k.font != g.font && (k.font = h.font = g.font), k.textAlign != g.textAlign && (k.textAlign = h.textAlign = g.textAlign), k.textBaseline != g.textBaseline && (k.textBaseline = h.textBaseline = g.textBaseline)) : (h.font = g.font, h.textAlign = g.textAlign, h.textBaseline = g.textBaseline, b.W = {font:g.font, textAlign:g.textAlign, textBaseline:g.textBaseline});
    c = Nd(c, f, d, e, b.P, b.o);
    for (g = b.b;f < d;f += e) {
      h = c[f] + b.na;
      k = c[f + 1] + b.wa;
      if (0 !== b.H || 1 != b.v) {
        var l = xh(b.xa, h, k, b.v, b.v, b.H, -h, -k);
        g.setTransform(l[0], l[1], l[4], l[5], l[12], l[13]);
      }
      b.l && g.strokeText(b.h, h, k);
      b.i && g.fillText(b.h, h, k);
    }
    0 === b.H && 1 == b.v || g.setTransform(1, 0, 0, 1, 0, 0);
  }
}
function Bj(b, c, d, e, f, g) {
  var h = b.b;
  b = Nd(c, d, e, f, b.P, b.o);
  h.moveTo(b[0], b[1]);
  for (c = 2;c < b.length;c += 2) {
    h.lineTo(b[c], b[c + 1]);
  }
  g && h.lineTo(b[0], b[1]);
  return e;
}
function Cj(b, c, d, e, f) {
  var g = b.b, h, k;
  h = 0;
  for (k = e.length;h < k;++h) {
    d = Bj(b, c, d, e[h], f, !0), g.closePath();
  }
  return d;
}
p = wj.prototype;
p.sb = function(b) {
  if (id(this.f, b.D())) {
    if (this.c || this.a) {
      this.c && zj(this, this.c);
      this.a && Aj(this, this.a);
      var c;
      c = this.P;
      var d = this.o, e = b.a;
      c = e ? Nd(e, 0, e.length, b.B, c, d) : null;
      d = c[2] - c[0];
      e = c[3] - c[1];
      d = Math.sqrt(d * d + e * e);
      e = this.b;
      e.beginPath();
      e.arc(c[0], c[1], d, 0, 2 * Math.PI);
      this.c && e.fill();
      this.a && e.stroke();
    }
    "" !== this.h && yj(this, b.a.slice(0, b.B), 2, 2);
  }
};
p.Gc = function(b, c) {
  var d = b.a, e, f;
  e = 0;
  for (f = d.length;e < f;++e) {
    var g = d[e];
    Dj[g.M()].call(this, g, c);
  }
};
p.Oa = function(b) {
  var c = b.a;
  b = b.B;
  this.j && xj(this, c, c.length);
  "" !== this.h && yj(this, c, c.length, b);
};
p.ub = function(b) {
  var c = b.a;
  b = b.B;
  this.j && xj(this, c, c.length);
  "" !== this.h && yj(this, c, c.length, b);
};
p.Na = function(b) {
  if (id(this.f, b.D())) {
    if (this.a) {
      Aj(this, this.a);
      var c = this.b, d = b.a;
      c.beginPath();
      Bj(this, d, 0, d.length, b.B, !1);
      c.stroke();
    }
    "" !== this.h && (b = Ej(b), yj(this, b, 2, 2));
  }
};
p.tb = function(b) {
  var c = b.D();
  if (id(this.f, c)) {
    if (this.a) {
      Aj(this, this.a);
      var c = this.b, d = b.a, e = 0, f = b.Qa(), g = b.B;
      c.beginPath();
      var h, k;
      h = 0;
      for (k = f.length;h < k;++h) {
        e = Bj(this, d, e, f[h], g, !1);
      }
      c.stroke();
    }
    "" !== this.h && (b = Fj(b), yj(this, b, b.length, 2));
  }
};
p.wb = function(b) {
  if (id(this.f, b.D())) {
    if (this.a || this.c) {
      this.c && zj(this, this.c);
      this.a && Aj(this, this.a);
      var c = this.b;
      c.beginPath();
      Cj(this, he(b), 0, b.Qa(), b.B);
      this.c && c.fill();
      this.a && c.stroke();
    }
    "" !== this.h && (b = ie(b), yj(this, b, 2, 2));
  }
};
p.vb = function(b) {
  if (id(this.f, b.D())) {
    if (this.a || this.c) {
      this.c && zj(this, this.c);
      this.a && Aj(this, this.a);
      var c = this.b, d = Gj(b), e = 0, f = b.b, g = b.B, h, k;
      h = 0;
      for (k = f.length;h < k;++h) {
        var l = f[h];
        c.beginPath();
        e = Cj(this, d, e, l, g);
        this.c && c.fill();
        this.a && c.stroke();
      }
    }
    "" !== this.h && (b = Hj(b), yj(this, b, b.length, 2));
  }
};
function Ij(b) {
  var c = Object.keys(b.ma).map(Number);
  c.sort(bb);
  var d, e, f, g, h;
  d = 0;
  for (e = c.length;d < e;++d) {
    for (f = b.ma[c[d].toString()], g = 0, h = f.length;g < h;++g) {
      f[g](b);
    }
  }
}
function zj(b, c) {
  var d = b.b, e = b.N;
  e ? e.fillStyle != c.fillStyle && (e.fillStyle = d.fillStyle = c.fillStyle) : (d.fillStyle = c.fillStyle, b.N = {fillStyle:c.fillStyle});
}
function Aj(b, c) {
  var d = b.b, e = b.T;
  e ? (e.lineCap != c.lineCap && (e.lineCap = d.lineCap = c.lineCap), wg && !$a(e.lineDash, c.lineDash) && d.setLineDash(e.lineDash = c.lineDash), e.lineJoin != c.lineJoin && (e.lineJoin = d.lineJoin = c.lineJoin), e.lineWidth != c.lineWidth && (e.lineWidth = d.lineWidth = c.lineWidth), e.miterLimit != c.miterLimit && (e.miterLimit = d.miterLimit = c.miterLimit), e.strokeStyle != c.strokeStyle && (e.strokeStyle = d.strokeStyle = c.strokeStyle)) : (d.lineCap = c.lineCap, wg && d.setLineDash(c.lineDash), 
  d.lineJoin = c.lineJoin, d.lineWidth = c.lineWidth, d.miterLimit = c.miterLimit, d.strokeStyle = c.strokeStyle, b.T = {lineCap:c.lineCap, lineDash:c.lineDash, lineJoin:c.lineJoin, lineWidth:c.lineWidth, miterLimit:c.miterLimit, strokeStyle:c.strokeStyle});
}
p.va = function(b, c) {
  if (b) {
    var d = b.a;
    this.c = {fillStyle:Ce(d ? d : fj)};
  } else {
    this.c = null;
  }
  if (c) {
    var d = c.c, e = c.h, f = c.a, g = c.j, h = c.b, k = c.g;
    this.a = {lineCap:void 0 !== e ? e : "round", lineDash:f ? f : gj, lineJoin:void 0 !== g ? g : "round", lineWidth:this.u * (void 0 !== h ? h : 1), miterLimit:void 0 !== k ? k : 10, strokeStyle:Ce(d ? d : hj)};
  } else {
    this.a = null;
  }
};
p.Hb = function(b) {
  if (b) {
    var c = b.f, d = b.da(1), e = b.Da(), f = b.i;
    this.X = c[0];
    this.w = c[1];
    this.A = f[1];
    this.j = d;
    this.s = b.l;
    this.ka = e[0];
    this.$ = e[1];
    this.ca = b.s;
    this.fa = b.o;
    this.g = b.u;
    this.la = b.H;
    this.C = f[0];
  } else {
    this.j = null;
  }
};
p.pa = function(b) {
  if (b) {
    var c = b.i;
    c ? (c = c.a, this.i = {fillStyle:Ce(c ? c : fj)}) : this.i = null;
    var d = b.s;
    if (d) {
      var c = d.c, e = d.h, f = d.a, g = d.j, h = d.b, d = d.g;
      this.l = {lineCap:void 0 !== e ? e : "round", lineDash:f ? f : gj, lineJoin:void 0 !== g ? g : "round", lineWidth:void 0 !== h ? h : 1, miterLimit:void 0 !== d ? d : 10, strokeStyle:Ce(c ? c : hj)};
    } else {
      this.l = null;
    }
    var c = b.j, e = b.g, f = b.f, g = b.v, h = b.l, d = b.b, k = b.a;
    b = b.c;
    this.F = {font:void 0 !== c ? c : "10px sans-serif", textAlign:void 0 !== k ? k : "center", textBaseline:void 0 !== b ? b : "middle"};
    this.h = void 0 !== d ? d : "";
    this.na = void 0 !== e ? this.u * e : 0;
    this.wa = void 0 !== f ? this.u * f : 0;
    this.H = void 0 !== g ? g : 0;
    this.v = this.u * (void 0 !== h ? h : 1);
  } else {
    this.h = "";
  }
};
var Dj = {Point:wj.prototype.Oa, LineString:wj.prototype.Na, Polygon:wj.prototype.wb, MultiPoint:wj.prototype.ub, MultiLineString:wj.prototype.tb, MultiPolygon:wj.prototype.vb, GeometryCollection:wj.prototype.Gc, Circle:wj.prototype.sb};
function Jj(b) {
  zh.call(this, b);
  this.F = Qc();
}
H(Jj, zh);
Jj.prototype.s = function(b, c, d) {
  Kj(this, "precompose", d, b, void 0);
  var e = this.da();
  if (e) {
    var f = c.extent, g = void 0 !== f;
    if (g) {
      var h = b.pixelRatio, k = jd(f), l = [f[2], f[3]], m = [f[2], f[1]], f = [f[0], f[1]];
      yh(b.coordinateToPixelMatrix, k, k);
      yh(b.coordinateToPixelMatrix, l, l);
      yh(b.coordinateToPixelMatrix, m, m);
      yh(b.coordinateToPixelMatrix, f, f);
      d.save();
      d.beginPath();
      d.moveTo(k[0] * h, k[1] * h);
      d.lineTo(l[0] * h, l[1] * h);
      d.lineTo(m[0] * h, m[1] * h);
      d.lineTo(f[0] * h, f[1] * h);
      d.clip();
    }
    h = this.H;
    k = d.globalAlpha;
    d.globalAlpha = c.opacity;
    0 === b.viewState.rotation ? d.drawImage(e, 0, 0, +e.width, +e.height, Math.round(h[12]), Math.round(h[13]), Math.round(e.width * h[0]), Math.round(e.height * h[5])) : (d.setTransform(h[0], h[1], h[4], h[5], h[12], h[13]), d.drawImage(e, 0, 0), d.setTransform(1, 0, 0, 1, 0, 0));
    d.globalAlpha = k;
    g && d.restore();
  }
  Kj(this, "postcompose", d, b, void 0);
};
function Kj(b, c, d, e, f) {
  var g = b.b;
  xc(g, c) && (b = void 0 !== f ? f : Lj(b, e, 0), b = new wj(d, e.pixelRatio, e.extent, b, e.viewState.rotation), W(g, new vh(c, g, b, e, d, null)), Ij(b));
}
function Lj(b, c, d) {
  var e = c.viewState, f = c.pixelRatio;
  return xh(b.F, f * c.size[0] / 2, f * c.size[1] / 2, f / e.resolution, -f / e.resolution, -e.rotation, -e.center[0] + d, -e.center[1]);
}
var Mj = function() {
  var b = null, c = null;
  return function(d) {
    if (!b) {
      b = ug(1, 1);
      c = b.createImageData(1, 1);
      var e = c.data;
      e[0] = 42;
      e[1] = 84;
      e[2] = 126;
      e[3] = 255;
    }
    var e = b.canvas, f = d[0] <= e.width && d[1] <= e.height;
    f || (e.width = d[0], e.height = d[1], e = d[0] - 1, d = d[1] - 1, b.putImageData(c, e, d), d = b.getImageData(e, d, 1, 1), f = $a(c.data, d.data));
    return f;
  };
}();
var Nj = ["Polygon", "LineString", "Image", "Text"];
function Oj(b, c, d) {
  this.$ = b;
  this.F = c;
  this.h = null;
  this.j = 0;
  this.resolution = d;
  this.A = this.w = null;
  this.c = [];
  this.coordinates = [];
  this.T = Qc();
  this.a = [];
  this.N = [];
  this.W = Qc();
  this.ka = Qc();
}
H(Oj, uh);
function Pj(b, c, d, e, f, g) {
  var h = b.coordinates.length, k = b.xb(), l = [c[d], c[d + 1]], m = [NaN, NaN], n = !0, q, r, t;
  for (q = d + f;q < e;q += f) {
    m[0] = c[q];
    m[1] = c[q + 1];
    t = k[1];
    var w = k[2], A = k[3], u = m[0], y = m[1], B = 0;
    u < k[0] ? B = B | 16 : u > w && (B = B | 4);
    y < t ? B |= 8 : y > A && (B |= 2);
    0 === B && (B = 1);
    t = B;
    t !== r ? (n && (b.coordinates[h++] = l[0], b.coordinates[h++] = l[1]), b.coordinates[h++] = m[0], b.coordinates[h++] = m[1], n = !1) : 1 === t ? (b.coordinates[h++] = m[0], b.coordinates[h++] = m[1], n = !1) : n = !0;
    l[0] = m[0];
    l[1] = m[1];
    r = t;
  }
  q === d + f && (b.coordinates[h++] = l[0], b.coordinates[h++] = l[1]);
  g && (b.coordinates[h++] = c[d], b.coordinates[h++] = c[d + 1]);
  return h;
}
function Qj(b, c) {
  b.w = [0, c, 0];
  b.c.push(b.w);
  b.A = [0, c, 0];
  b.a.push(b.A);
}
function Rj(b, c, d, e, f, g, h, k, l) {
  var m;
  m = b.T;
  if (e[0] == m[0] && e[1] == m[1] && e[4] == m[4] && e[5] == m[5] && e[12] == m[12] && e[13] == m[13]) {
    m = b.N;
  } else {
    m = Nd(b.coordinates, 0, b.coordinates.length, 2, e, b.N);
    var n = b.T;
    n[0] = e[0];
    n[1] = e[1];
    n[2] = e[2];
    n[3] = e[3];
    n[4] = e[4];
    n[5] = e[5];
    n[6] = e[6];
    n[7] = e[7];
    n[8] = e[8];
    n[9] = e[9];
    n[10] = e[10];
    n[11] = e[11];
    n[12] = e[12];
    n[13] = e[13];
    n[14] = e[14];
    n[15] = e[15];
  }
  e = !rb(g);
  var n = 0, q = h.length, r = 0, t, w = b.W;
  b = b.ka;
  for (var A, u, y, B;n < q;) {
    var x = h[n], J, G, K, E;
    switch(x[0]) {
      case 0:
        r = x[1];
        e && g[C(r).toString()] || !r.L() ? n = x[2] : void 0 === l || id(l, r.L().D()) ? ++n : n = x[2];
        break;
      case 1:
        c.beginPath();
        ++n;
        break;
      case 2:
        r = x[1];
        t = m[r];
        x = m[r + 1];
        y = m[r + 2] - t;
        r = m[r + 3] - x;
        c.arc(t, x, Math.sqrt(y * y + r * r), 0, 2 * Math.PI, !0);
        ++n;
        break;
      case 3:
        c.closePath();
        ++n;
        break;
      case 4:
        r = x[1];
        t = x[2];
        J = x[3];
        K = x[4] * d;
        var S = x[5] * d, U = x[6];
        G = x[7];
        var N = x[8], L = x[9];
        y = x[11];
        B = x[12];
        var F = x[13], R = x[14];
        for (x[10] && (y += f);r < t;r += 2) {
          x = m[r] - K;
          E = m[r + 1] - S;
          F && (x = Math.round(x), E = Math.round(E));
          if (1 != B || 0 !== y) {
            var M = x + K, Ta = E + S;
            xh(w, M, Ta, B, B, y, -M, -Ta);
            c.transform(w[0], w[1], w[4], w[5], w[12], w[13]);
          }
          M = c.globalAlpha;
          1 != G && (c.globalAlpha = M * G);
          var Ta = R + N > J.width ? J.width - N : R, Ha = U + L > J.height ? J.height - L : U;
          c.drawImage(J, N, L, Ta, Ha, x, E, Ta * d, Ha * d);
          1 != G && (c.globalAlpha = M);
          if (1 != B || 0 !== y) {
            Rc(w, b), c.transform(b[0], b[1], b[4], b[5], b[12], b[13]);
          }
        }
        ++n;
        break;
      case 5:
        r = x[1];
        t = x[2];
        K = x[3];
        S = x[4] * d;
        U = x[5] * d;
        y = x[6];
        B = x[7] * d;
        J = x[8];
        for (G = x[9];r < t;r += 2) {
          x = m[r] + S;
          E = m[r + 1] + U;
          if (1 != B || 0 !== y) {
            xh(w, x, E, B, B, y, -x, -E), c.transform(w[0], w[1], w[4], w[5], w[12], w[13]);
          }
          N = K.split("\n");
          L = N.length;
          1 < L ? (F = Math.round(1.5 * c.measureText("M").width), E -= (L - 1) / 2 * F) : F = 0;
          for (R = 0;R < L;R++) {
            M = N[R], G && c.strokeText(M, x, E), J && c.fillText(M, x, E), E += F;
          }
          if (1 != B || 0 !== y) {
            Rc(w, b), c.transform(b[0], b[1], b[4], b[5], b[12], b[13]);
          }
        }
        ++n;
        break;
      case 6:
        if (void 0 !== k && (r = x[1], r = k(r))) {
          return r;
        }
        ++n;
        break;
      case 7:
        c.fill();
        ++n;
        break;
      case 8:
        r = x[1];
        t = x[2];
        x = m[r];
        E = m[r + 1];
        y = x + .5 | 0;
        B = E + .5 | 0;
        if (y !== A || B !== u) {
          c.moveTo(x, E), A = y, u = B;
        }
        for (r += 2;r < t;r += 2) {
          if (x = m[r], E = m[r + 1], y = x + .5 | 0, B = E + .5 | 0, y !== A || B !== u) {
            c.lineTo(x, E), A = y, u = B;
          }
        }
        ++n;
        break;
      case 9:
        c.fillStyle = x[1];
        ++n;
        break;
      case 10:
        A = void 0 !== x[7] ? x[7] : !0;
        u = x[2];
        c.strokeStyle = x[1];
        c.lineWidth = A ? u * d : u;
        c.lineCap = x[3];
        c.lineJoin = x[4];
        c.miterLimit = x[5];
        wg && c.setLineDash(x[6]);
        u = A = NaN;
        ++n;
        break;
      case 11:
        c.font = x[1];
        c.textAlign = x[2];
        c.textBaseline = x[3];
        ++n;
        break;
      case 12:
        c.stroke();
        ++n;
        break;
      default:
        ++n;
    }
  }
}
function Sj(b) {
  var c = b.a;
  c.reverse();
  var d, e = c.length, f, g, h = -1;
  for (d = 0;d < e;++d) {
    if (f = c[d], g = f[0], 6 == g) {
      h = d;
    } else {
      if (0 == g) {
        f[2] = d;
        f = b.a;
        for (g = d;h < g;) {
          var k = f[h];
          f[h] = f[g];
          f[g] = k;
          ++h;
          --g;
        }
        h = -1;
      }
    }
  }
}
function Tj(b, c) {
  b.w[2] = b.c.length;
  b.w = null;
  b.A[2] = b.a.length;
  b.A = null;
  var d = [6, c];
  b.c.push(d);
  b.a.push(d);
}
Oj.prototype.eb = qa;
Oj.prototype.xb = function() {
  return this.F;
};
function Uj(b, c, d) {
  Oj.call(this, b, c, d);
  this.i = this.C = null;
  this.X = this.P = this.H = this.u = this.o = this.s = this.l = this.v = this.f = this.g = this.b = void 0;
}
H(Uj, Oj);
Uj.prototype.Oa = function(b, c) {
  if (this.i) {
    Qj(this, c);
    var d = b.a, e = this.coordinates.length, d = Pj(this, d, 0, d.length, b.B, !1);
    this.c.push([4, e, d, this.i, this.b, this.g, this.f, this.v, this.l, this.s, this.o, this.u, this.H, this.P, this.X]);
    this.a.push([4, e, d, this.C, this.b, this.g, this.f, this.v, this.l, this.s, this.o, this.u, this.H, this.P, this.X]);
    Tj(this, c);
  }
};
Uj.prototype.ub = function(b, c) {
  if (this.i) {
    Qj(this, c);
    var d = b.a, e = this.coordinates.length, d = Pj(this, d, 0, d.length, b.B, !1);
    this.c.push([4, e, d, this.i, this.b, this.g, this.f, this.v, this.l, this.s, this.o, this.u, this.H, this.P, this.X]);
    this.a.push([4, e, d, this.C, this.b, this.g, this.f, this.v, this.l, this.s, this.o, this.u, this.H, this.P, this.X]);
    Tj(this, c);
  }
};
Uj.prototype.eb = function() {
  Sj(this);
  this.g = this.b = void 0;
  this.i = this.C = null;
  this.X = this.P = this.u = this.o = this.s = this.l = this.v = this.H = this.f = void 0;
};
Uj.prototype.Hb = function(b) {
  var c = b.f, d = b.i, e = b.j, f = b.da(1), g = b.Da();
  this.b = c[0];
  this.g = c[1];
  this.C = e;
  this.i = f;
  this.f = d[1];
  this.v = b.l;
  this.l = g[0];
  this.s = g[1];
  this.o = b.s;
  this.u = b.o;
  this.H = b.u;
  this.P = b.H;
  this.X = d[0];
};
function Vj(b, c, d) {
  Oj.call(this, b, c, d);
  this.b = {Ma:void 0, Ha:void 0, Ia:null, Ja:void 0, Ka:void 0, La:void 0, Eb:0, strokeStyle:void 0, lineCap:void 0, lineDash:null, lineJoin:void 0, lineWidth:void 0, miterLimit:void 0};
}
H(Vj, Oj);
function Wj(b, c, d, e, f) {
  var g = b.coordinates.length;
  c = Pj(b, c, d, e, f, !1);
  g = [8, g, c];
  b.c.push(g);
  b.a.push(g);
  return e;
}
p = Vj.prototype;
p.xb = function() {
  this.h || (this.h = Zc(this.F), 0 < this.j && Yc(this.h, this.resolution * (this.j + 1) / 2, this.h));
  return this.h;
};
function Xj(b) {
  var c = b.b, d = c.strokeStyle, e = c.lineCap, f = c.lineDash, g = c.lineJoin, h = c.lineWidth, k = c.miterLimit;
  c.Ma == d && c.Ha == e && $a(c.Ia, f) && c.Ja == g && c.Ka == h && c.La == k || (c.Eb != b.coordinates.length && (b.c.push([12]), c.Eb = b.coordinates.length), b.c.push([10, d, h, e, g, k, f], [1]), c.Ma = d, c.Ha = e, c.Ia = f, c.Ja = g, c.Ka = h, c.La = k);
}
p.Na = function(b, c) {
  var d = this.b, e = d.lineWidth;
  void 0 !== d.strokeStyle && void 0 !== e && (Xj(this), Qj(this, c), this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash], [1]), d = b.a, Wj(this, d, 0, d.length, b.B), this.a.push([12]), Tj(this, c));
};
p.tb = function(b, c) {
  var d = this.b, e = d.lineWidth;
  if (void 0 !== d.strokeStyle && void 0 !== e) {
    Xj(this);
    Qj(this, c);
    this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash], [1]);
    var d = b.Qa(), e = b.a, f = b.B, g = 0, h, k;
    h = 0;
    for (k = d.length;h < k;++h) {
      g = Wj(this, e, g, d[h], f);
    }
    this.a.push([12]);
    Tj(this, c);
  }
};
p.eb = function() {
  this.b.Eb != this.coordinates.length && this.c.push([12]);
  Sj(this);
  this.b = null;
};
p.va = function(b, c) {
  var d = c.c;
  this.b.strokeStyle = Ce(d ? d : hj);
  d = c.h;
  this.b.lineCap = void 0 !== d ? d : "round";
  d = c.a;
  this.b.lineDash = d ? d : gj;
  d = c.j;
  this.b.lineJoin = void 0 !== d ? d : "round";
  d = c.b;
  this.b.lineWidth = void 0 !== d ? d : 1;
  d = c.g;
  this.b.miterLimit = void 0 !== d ? d : 10;
  this.b.lineWidth > this.j && (this.j = this.b.lineWidth, this.h = null);
};
function Yj(b, c, d) {
  Oj.call(this, b, c, d);
  this.b = {Sb:void 0, Ma:void 0, Ha:void 0, Ia:null, Ja:void 0, Ka:void 0, La:void 0, fillStyle:void 0, strokeStyle:void 0, lineCap:void 0, lineDash:null, lineJoin:void 0, lineWidth:void 0, miterLimit:void 0};
}
H(Yj, Oj);
function Zj(b, c, d, e, f) {
  var g = b.b, h = [1];
  b.c.push(h);
  b.a.push(h);
  var k, h = 0;
  for (k = e.length;h < k;++h) {
    var l = e[h], m = b.coordinates.length;
    d = Pj(b, c, d, l, f, !0);
    d = [8, m, d];
    m = [3];
    b.c.push(d, m);
    b.a.push(d, m);
    d = l;
  }
  c = [7];
  b.a.push(c);
  void 0 !== g.fillStyle && b.c.push(c);
  void 0 !== g.strokeStyle && (g = [12], b.c.push(g), b.a.push(g));
  return d;
}
p = Yj.prototype;
p.sb = function(b, c) {
  var d = this.b, e = d.strokeStyle;
  if (void 0 !== d.fillStyle || void 0 !== e) {
    ak(this);
    Qj(this, c);
    this.a.push([9, Ce(fj)]);
    void 0 !== d.strokeStyle && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]);
    var f = b.a, e = this.coordinates.length;
    Pj(this, f, 0, f.length, b.B, !1);
    f = [1];
    e = [2, e];
    this.c.push(f, e);
    this.a.push(f, e);
    e = [7];
    this.a.push(e);
    void 0 !== d.fillStyle && this.c.push(e);
    void 0 !== d.strokeStyle && (d = [12], this.c.push(d), this.a.push(d));
    Tj(this, c);
  }
};
p.wb = function(b, c) {
  var d = this.b, e = d.strokeStyle;
  if (void 0 !== d.fillStyle || void 0 !== e) {
    ak(this), Qj(this, c), this.a.push([9, Ce(fj)]), void 0 !== d.strokeStyle && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]), d = b.Qa(), e = he(b), Zj(this, e, 0, d, b.B), Tj(this, c);
  }
};
p.vb = function(b, c) {
  var d = this.b, e = d.strokeStyle;
  if (void 0 !== d.fillStyle || void 0 !== e) {
    ak(this);
    Qj(this, c);
    this.a.push([9, Ce(fj)]);
    void 0 !== d.strokeStyle && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]);
    var d = b.b, e = Gj(b), f = b.B, g = 0, h, k;
    h = 0;
    for (k = d.length;h < k;++h) {
      g = Zj(this, e, g, d[h], f);
    }
    Tj(this, c);
  }
};
p.eb = function() {
  Sj(this);
  this.b = null;
  var b = this.$;
  if (0 !== b) {
    var c = this.coordinates, d, e;
    d = 0;
    for (e = c.length;d < e;++d) {
      c[d] = b * Math.round(c[d] / b);
    }
  }
};
p.xb = function() {
  this.h || (this.h = Zc(this.F), 0 < this.j && Yc(this.h, this.resolution * (this.j + 1) / 2, this.h));
  return this.h;
};
p.va = function(b, c) {
  var d = this.b;
  if (b) {
    var e = b.a;
    d.fillStyle = Ce(e ? e : fj);
  } else {
    d.fillStyle = void 0;
  }
  c ? (e = c.c, d.strokeStyle = Ce(e ? e : hj), e = c.h, d.lineCap = void 0 !== e ? e : "round", e = c.a, d.lineDash = e ? e.slice() : gj, e = c.j, d.lineJoin = void 0 !== e ? e : "round", e = c.b, d.lineWidth = void 0 !== e ? e : 1, e = c.g, d.miterLimit = void 0 !== e ? e : 10, d.lineWidth > this.j && (this.j = d.lineWidth, this.h = null)) : (d.strokeStyle = void 0, d.lineCap = void 0, d.lineDash = null, d.lineJoin = void 0, d.lineWidth = void 0, d.miterLimit = void 0);
};
function ak(b) {
  var c = b.b, d = c.fillStyle, e = c.strokeStyle, f = c.lineCap, g = c.lineDash, h = c.lineJoin, k = c.lineWidth, l = c.miterLimit;
  void 0 !== d && c.Sb != d && (b.c.push([9, d]), c.Sb = c.fillStyle);
  void 0 === e || c.Ma == e && c.Ha == f && c.Ia == g && c.Ja == h && c.Ka == k && c.La == l || (b.c.push([10, e, k, f, h, l, g]), c.Ma = e, c.Ha = f, c.Ia = g, c.Ja = h, c.Ka = k, c.La = l);
}
function bk(b, c, d) {
  Oj.call(this, b, c, d);
  this.P = this.H = this.u = null;
  this.i = "";
  this.o = this.s = this.l = this.v = 0;
  this.f = this.g = this.b = null;
}
H(bk, Oj);
function ck(b, c, d, e, f) {
  if ("" !== b.i && b.f && (b.b || b.g)) {
    if (b.b) {
      var g = b.b, h = b.u;
      if (!h || h.fillStyle != g.fillStyle) {
        var k = [9, g.fillStyle];
        b.c.push(k);
        b.a.push(k);
        h ? h.fillStyle = g.fillStyle : b.u = {fillStyle:g.fillStyle};
      }
    }
    b.g && (g = b.g, h = b.H, h && h.lineCap == g.lineCap && h.lineDash == g.lineDash && h.lineJoin == g.lineJoin && h.lineWidth == g.lineWidth && h.miterLimit == g.miterLimit && h.strokeStyle == g.strokeStyle || (k = [10, g.strokeStyle, g.lineWidth, g.lineCap, g.lineJoin, g.miterLimit, g.lineDash, !1], b.c.push(k), b.a.push(k), h ? (h.lineCap = g.lineCap, h.lineDash = g.lineDash, h.lineJoin = g.lineJoin, h.lineWidth = g.lineWidth, h.miterLimit = g.miterLimit, h.strokeStyle = g.strokeStyle) : b.H = 
    {lineCap:g.lineCap, lineDash:g.lineDash, lineJoin:g.lineJoin, lineWidth:g.lineWidth, miterLimit:g.miterLimit, strokeStyle:g.strokeStyle}));
    g = b.f;
    h = b.P;
    h && h.font == g.font && h.textAlign == g.textAlign && h.textBaseline == g.textBaseline || (k = [11, g.font, g.textAlign, g.textBaseline], b.c.push(k), b.a.push(k), h ? (h.font = g.font, h.textAlign = g.textAlign, h.textBaseline = g.textBaseline) : b.P = {font:g.font, textAlign:g.textAlign, textBaseline:g.textBaseline});
    Qj(b, f);
    g = b.coordinates.length;
    c = Pj(b, c, 0, d, e, !1);
    c = [5, g, c, b.i, b.v, b.l, b.s, b.o, !!b.b, !!b.g];
    b.c.push(c);
    b.a.push(c);
    Tj(b, f);
  }
}
bk.prototype.pa = function(b) {
  if (b) {
    var c = b.i;
    c ? (c = c.a, c = Ce(c ? c : fj), this.b ? this.b.fillStyle = c : this.b = {fillStyle:c}) : this.b = null;
    var d = b.s;
    if (d) {
      var c = d.c, e = d.h, f = d.a, g = d.j, h = d.b, d = d.g, e = void 0 !== e ? e : "round", f = f ? f.slice() : gj, g = void 0 !== g ? g : "round", h = void 0 !== h ? h : 1, d = void 0 !== d ? d : 10, c = Ce(c ? c : hj);
      if (this.g) {
        var k = this.g;
        k.lineCap = e;
        k.lineDash = f;
        k.lineJoin = g;
        k.lineWidth = h;
        k.miterLimit = d;
        k.strokeStyle = c;
      } else {
        this.g = {lineCap:e, lineDash:f, lineJoin:g, lineWidth:h, miterLimit:d, strokeStyle:c};
      }
    } else {
      this.g = null;
    }
    var l = b.j, c = b.g, e = b.f, f = b.v, h = b.l, d = b.b, g = b.a, k = b.c;
    b = void 0 !== l ? l : "10px sans-serif";
    g = void 0 !== g ? g : "center";
    k = void 0 !== k ? k : "middle";
    this.f ? (l = this.f, l.font = b, l.textAlign = g, l.textBaseline = k) : this.f = {font:b, textAlign:g, textBaseline:k};
    this.i = void 0 !== d ? d : "";
    this.v = void 0 !== c ? c : 0;
    this.l = void 0 !== e ? e : 0;
    this.s = void 0 !== f ? f : 0;
    this.o = void 0 !== h ? h : 1;
  } else {
    this.i = "";
  }
};
function dk(b, c, d, e) {
  this.f = b;
  this.c = c;
  this.g = d;
  this.b = e;
  this.a = {};
  this.h = ug(1, 1);
  this.j = Qc();
}
function ek(b) {
  for (var c in b.a) {
    var d = b.a[c], e;
    for (e in d) {
      d[e].eb();
    }
  }
}
function fk(b, c, d, e, f, g) {
  var h = b.j;
  xh(h, .5, .5, 1 / d, -1 / d, -e, -c[0], -c[1]);
  var k = b.h;
  k.clearRect(0, 0, 1, 1);
  var l;
  void 0 !== b.b && (l = Uc(), Vc(l, c), Yc(l, d * b.b, l));
  return gk(b, k, h, e, f, function(b) {
    if (0 < k.getImageData(0, 0, 1, 1).data[3]) {
      if (b = g(b)) {
        return b;
      }
      k.clearRect(0, 0, 1, 1);
    }
  }, l);
}
function hk(b, c, d) {
  var e = void 0 !== c ? c.toString() : "0";
  c = b.a[e];
  void 0 === c && (c = {}, b.a[e] = c);
  e = c[d];
  void 0 === e && (e = new ik[d](b.f, b.c, b.g), c[d] = e);
  return e;
}
dk.prototype.ra = function() {
  return rb(this.a);
};
function jk(b, c, d, e, f, g) {
  var h = Object.keys(b.a).map(Number);
  h.sort(bb);
  var k = b.c, l = k[0], m = k[1], n = k[2], k = k[3], l = [l, m, l, k, n, k, n, m];
  Nd(l, 0, 8, 2, e, l);
  c.save();
  c.beginPath();
  c.moveTo(l[0], l[1]);
  c.lineTo(l[2], l[3]);
  c.lineTo(l[4], l[5]);
  c.lineTo(l[6], l[7]);
  c.closePath();
  c.clip();
  for (var q, r, l = 0, m = h.length;l < m;++l) {
    for (q = b.a[h[l].toString()], n = 0, k = Nj.length;n < k;++n) {
      r = q[Nj[n]], void 0 !== r && Rj(r, c, d, e, f, g, r.c, void 0);
    }
  }
  c.restore();
}
function gk(b, c, d, e, f, g, h) {
  var k = Object.keys(b.a).map(Number);
  k.sort(function(b, c) {
    return c - b;
  });
  var l, m, n, q, r;
  l = 0;
  for (m = k.length;l < m;++l) {
    for (q = b.a[k[l].toString()], n = Nj.length - 1;0 <= n;--n) {
      if (r = q[Nj[n]], void 0 !== r && (r = Rj(r, c, 1, d, e, f, r.a, g, h))) {
        return r;
      }
    }
  }
}
var ik = {Image:Uj, LineString:Vj, Polygon:Yj, Text:bk};
function kk(b, c) {
  return C(b) - C(c);
}
function lk(b, c) {
  var d = .5 * b / c;
  return d * d;
}
function mk(b, c, d, e, f, g) {
  var h;
  (h = d.da()) && h.ce(f, g);
  if (f = (0,d.b)(c)) {
    e = f.Ab(e), (0,nk[e.M()])(b, e, d, c);
  }
  return !1;
}
var nk = {Point:function(b, c, d, e) {
  var f = d.da();
  if (f) {
    var g = hk(b, d.a, "Image");
    g.Hb(f);
    g.Oa(c, e);
  }
  if (f = d.c) {
    b = hk(b, d.a, "Text"), b.pa(f), ck(b, c.a, 2, 2, e);
  }
}, LineString:function(b, c, d, e) {
  var f = d.h;
  if (f) {
    var g = hk(b, d.a, "LineString");
    g.va(null, f);
    g.Na(c, e);
  }
  if (f = d.c) {
    b = hk(b, d.a, "Text"), b.pa(f), ck(b, Ej(c), 2, 2, e);
  }
}, Polygon:function(b, c, d, e) {
  var f = d.j, g = d.h;
  if (f || g) {
    var h = hk(b, d.a, "Polygon");
    h.va(f, g);
    h.wb(c, e);
  }
  if (f = d.c) {
    b = hk(b, d.a, "Text"), b.pa(f), ck(b, ie(c), 2, 2, e);
  }
}, MultiPoint:function(b, c, d, e) {
  var f = d.da();
  if (f) {
    var g = hk(b, d.a, "Image");
    g.Hb(f);
    g.ub(c, e);
  }
  if (f = d.c) {
    b = hk(b, d.a, "Text"), b.pa(f), d = c.a, ck(b, d, d.length, c.B, e);
  }
}, MultiLineString:function(b, c, d, e) {
  var f = d.h;
  if (f) {
    var g = hk(b, d.a, "LineString");
    g.va(null, f);
    g.tb(c, e);
  }
  if (f = d.c) {
    b = hk(b, d.a, "Text"), b.pa(f), c = Fj(c), ck(b, c, c.length, 2, e);
  }
}, MultiPolygon:function(b, c, d, e) {
  var f = d.j, g = d.h;
  if (g || f) {
    var h = hk(b, d.a, "Polygon");
    h.va(f, g);
    h.vb(c, e);
  }
  if (f = d.c) {
    b = hk(b, d.a, "Text"), b.pa(f), c = Hj(c), ck(b, c, c.length, 2, e);
  }
}, GeometryCollection:function(b, c, d, e) {
  c = c.a;
  var f, g;
  f = 0;
  for (g = c.length;f < g;++f) {
    (0,nk[c[f].M()])(b, c[f], d, e);
  }
}, Circle:function(b, c, d, e) {
  var f = d.j, g = d.h;
  if (f || g) {
    var h = hk(b, d.a, "Polygon");
    h.va(f, g);
    h.sb(c, e);
  }
  if (f = d.c) {
    b = hk(b, d.a, "Text"), b.pa(f), ck(b, c.a.slice(0, c.B), 2, 2, e);
  }
}};
var ok = !((I("Chrome") || I("CriOS")) && !I("Opera") && !I("OPR") && !I("Edge")) || I("iPhone") && !I("iPod") && !I("iPad") || I("iPad") || I("iPod");
function pk(b, c, d, e) {
  b = d - b;
  c = e - c;
  var f = Math.sqrt(b * b + c * c);
  return [Math.round(d + b / f), Math.round(e + c / f)];
}
function qk(b, c, d, e, f, g, h, k, l, m) {
  var n = ug(Math.round(d * b), Math.round(d * c));
  if (0 === l.length) {
    return n.canvas;
  }
  n.scale(d, d);
  var q = Uc();
  l.forEach(function(b) {
    bd(q, b.extent);
  });
  var r = ug(Math.round(d * Y(q) / e), Math.round(d * ed(q) / e));
  r.scale(d / e, d / e);
  r.translate(-q[0], q[3]);
  l.forEach(function(b) {
    r.drawImage(b.image, b.extent[0], -b.extent[3], Y(b.extent), ed(b.extent));
  });
  var t = jd(h);
  k.h.forEach(function(b) {
    var c = b.source, f = b.target, h = c[1][0], k = c[1][1], l = c[2][0], m = c[2][1];
    b = (f[0][0] - t[0]) / g;
    var G = -(f[0][1] - t[1]) / g, K = (f[1][0] - t[0]) / g, E = -(f[1][1] - t[1]) / g, S = (f[2][0] - t[0]) / g, U = -(f[2][1] - t[1]) / g, f = c[0][0], c = c[0][1], h = h - f, k = k - c, l = l - f, m = m - c;
    a: {
      h = [[h, k, 0, 0, K - b], [l, m, 0, 0, S - b], [0, 0, h, k, E - G], [0, 0, l, m, U - G]];
      k = h.length;
      for (l = 0;l < k;l++) {
        for (var m = l, N = Math.abs(h[l][l]), L = l + 1;L < k;L++) {
          var F = Math.abs(h[L][l]);
          F > N && (N = F, m = L);
        }
        if (0 === N) {
          h = null;
          break a;
        }
        N = h[m];
        h[m] = h[l];
        h[l] = N;
        for (m = l + 1;m < k;m++) {
          for (N = -h[m][l] / h[l][l], L = l;L < k + 1;L++) {
            h[m][L] = l == L ? 0 : h[m][L] + N * h[l][L];
          }
        }
      }
      l = Array(k);
      for (m = k - 1;0 <= m;m--) {
        for (l[m] = h[m][k] / h[m][m], N = m - 1;0 <= N;N--) {
          h[N][k] -= h[N][m] * l[m];
        }
      }
      h = l;
    }
    h && (n.save(), n.beginPath(), ok ? (l = (b + K + S) / 3, m = (G + E + U) / 3, k = pk(l, m, b, G), K = pk(l, m, K, E), S = pk(l, m, S, U), n.moveTo(k[0], k[1]), n.lineTo(K[0], K[1]), n.lineTo(S[0], S[1])) : (n.moveTo(b, G), n.lineTo(K, E), n.lineTo(S, U)), n.closePath(), n.clip(), n.transform(h[0], h[2], h[1], h[3], b, G), n.translate(q[0] - f, q[3] - c), n.scale(e / d, -e / d), n.drawImage(r.canvas, 0, 0), n.restore());
  });
  m && (n.save(), n.strokeStyle = "black", n.lineWidth = 1, k.h.forEach(function(b) {
    var c = b.target;
    b = (c[0][0] - t[0]) / g;
    var d = -(c[0][1] - t[1]) / g, e = (c[1][0] - t[0]) / g, f = -(c[1][1] - t[1]) / g, h = (c[2][0] - t[0]) / g, c = -(c[2][1] - t[1]) / g;
    n.beginPath();
    n.moveTo(b, d);
    n.lineTo(e, f);
    n.lineTo(h, c);
    n.closePath();
    n.stroke();
  }), n.restore());
  return n.canvas;
}
;function rk(b, c, d, e, f) {
  this.b = b;
  this.j = c;
  var g = {}, h = Jd(this.j, this.b);
  this.c = function(b) {
    var c = b[0] + "/" + b[1];
    g[c] || (g[c] = h(b));
    return g[c];
  };
  this.g = e;
  this.l = f * f;
  this.h = [];
  this.i = !1;
  this.v = this.b.a && !!e && !!this.b.D() && Y(e) == Y(this.b.D());
  this.a = this.b.D() ? Y(this.b.D()) : null;
  this.f = this.j.D() ? Y(this.j.D()) : null;
  b = jd(d);
  c = [d[2], d[3]];
  e = [d[2], d[1]];
  d = [d[0], d[1]];
  f = this.c(b);
  var k = this.c(c), l = this.c(e), m = this.c(d);
  sk(this, b, c, e, d, f, k, l, m, 10);
  if (this.i) {
    var n = Infinity;
    this.h.forEach(function(b) {
      n = Math.min(n, b.source[0][0], b.source[1][0], b.source[2][0]);
    });
    this.h.forEach(function(b) {
      if (Math.max(b.source[0][0], b.source[1][0], b.source[2][0]) - n > this.a / 2) {
        var c = [[b.source[0][0], b.source[0][1]], [b.source[1][0], b.source[1][1]], [b.source[2][0], b.source[2][1]]];
        c[0][0] - n > this.a / 2 && (c[0][0] -= this.a);
        c[1][0] - n > this.a / 2 && (c[1][0] -= this.a);
        c[2][0] - n > this.a / 2 && (c[2][0] -= this.a);
        Math.max(c[0][0], c[1][0], c[2][0]) - Math.min(c[0][0], c[1][0], c[2][0]) < this.a / 2 && (b.source = c);
      }
    }, this);
  }
  g = {};
}
function sk(b, c, d, e, f, g, h, k, l, m) {
  var n = Tc([g, h, k, l]), q = b.a ? Y(n) / b.a : null, r = b.b.a && .5 < q && 1 > q, t = !1;
  if (0 < m) {
    if (b.j.h && b.f) {
      var w = Tc([c, d, e, f]), t = t | .25 < Y(w) / b.f
    }
    !r && b.b.h && q && (t |= .25 < q);
  }
  if (t || !b.g || id(n, b.g)) {
    if (!(t || isFinite(g[0]) && isFinite(g[1]) && isFinite(h[0]) && isFinite(h[1]) && isFinite(k[0]) && isFinite(k[1]) && isFinite(l[0]) && isFinite(l[1]))) {
      if (0 < m) {
        t = !0;
      } else {
        return;
      }
    }
    if (0 < m && (t || (q = b.c([(c[0] + e[0]) / 2, (c[1] + e[1]) / 2]), n = r ? (Gc(g[0], b.a) + Gc(k[0], b.a)) / 2 - Gc(q[0], b.a) : (g[0] + k[0]) / 2 - q[0], q = (g[1] + k[1]) / 2 - q[1], t = n * n + q * q > b.l), t)) {
      Math.abs(c[0] - e[0]) <= Math.abs(c[1] - e[1]) ? (r = [(d[0] + e[0]) / 2, (d[1] + e[1]) / 2], n = b.c(r), q = [(f[0] + c[0]) / 2, (f[1] + c[1]) / 2], t = b.c(q), sk(b, c, d, r, q, g, h, n, t, m - 1), sk(b, q, r, e, f, t, n, k, l, m - 1)) : (r = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2], n = b.c(r), q = [(e[0] + f[0]) / 2, (e[1] + f[1]) / 2], t = b.c(q), sk(b, c, r, q, f, g, n, t, l, m - 1), sk(b, r, d, e, q, n, h, k, t, m - 1));
      return;
    }
    if (r) {
      if (!b.v) {
        return;
      }
      b.i = !0;
    }
    b.h.push({source:[g, k, l], target:[c, e, f]});
    b.h.push({source:[g, h, k], target:[c, d, e]});
  }
}
function tk(b) {
  var c = Uc();
  b.h.forEach(function(b) {
    b = b.source;
    Vc(c, b[0]);
    Vc(c, b[1]);
    Vc(c, b[2]);
  });
  return c;
}
;function uk(b) {
  X.call(this);
  this.za = void 0;
  this.a = "geometry";
  this.i = null;
  this.f = void 0;
  this.b = null;
  Q(this, Dc(this.a), this.g, !1, this);
  void 0 !== b && (b instanceof Md || !b ? vk(this, b) : Bc(this, b));
}
H(uk, X);
uk.prototype.clone = function() {
  var b = new uk(Ec(this));
  wk(b, this.a);
  var c = this.L();
  c && vk(b, c.clone());
  if (c = this.i) {
    b.i = c, b.f = c ? xk(c) : void 0, b.c();
  }
  return b;
};
uk.prototype.L = function() {
  return this.get(this.a);
};
uk.prototype.l = function() {
  this.c();
};
uk.prototype.g = function() {
  this.b && (T(this.b), this.b = null);
  var b = this.L();
  b && (this.b = Q(b, "change", this.l, !1, this));
  this.c();
};
function vk(b, c) {
  b.j(b.a, c);
}
function wk(b, c) {
  sc(b, Dc(b.a), b.g, !1, b);
  b.a = c;
  Q(b, Dc(b.a), b.g, !1, b);
  b.g();
}
function xk(b) {
  if (!ha(b)) {
    var c;
    c = ea(b) ? b : [b];
    b = function() {
      return c;
    };
  }
  return b;
}
;function yk(b, c, d) {
  if (ha(b)) {
    d && (b = na(b, d));
  } else {
    if (b && "function" == typeof b.handleEvent) {
      b = na(b.handleEvent, b);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return 2147483647 < c ? -1 : v.setTimeout(b, c || 0);
}
;var zk = v.JSON.parse, Ak = v.JSON.stringify;
function Bk() {
}
Bk.prototype.a = null;
function Ck(b) {
  var c;
  (c = b.a) || (c = {}, Dk(b) && (c[0] = !0, c[1] = !0), c = b.a = c);
  return c;
}
;var Ek;
function Fk() {
}
H(Fk, Bk);
function Gk(b) {
  return (b = Dk(b)) ? new ActiveXObject(b) : new XMLHttpRequest;
}
function Dk(b) {
  if (!b.c && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0;d < c.length;d++) {
      var e = c[d];
      try {
        return new ActiveXObject(e), b.c = e;
      } catch (f) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return b.c;
}
Ek = new Fk;
var Hk = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
function Ik(b) {
  if (b[1]) {
    var c = b[0], d = c.indexOf("#");
    0 <= d && (b.push(c.substr(d)), b[0] = c = c.substr(0, d));
    d = c.indexOf("?");
    0 > d ? b[1] = "?" : d == c.length - 1 && (b[1] = void 0);
  }
  return b.join("");
}
function Jk(b, c, d) {
  if (ea(c)) {
    for (var e = 0;e < c.length;e++) {
      Jk(b, String(c[e]), d);
    }
  } else {
    null != c && d.push("&", b, "" === c ? "" : "=", encodeURIComponent(String(c)));
  }
}
function Kk(b, c) {
  for (var d in c) {
    Jk(d, c[d], b);
  }
  return b;
}
;function Lk(b) {
  V.call(this);
  this.A = new Xf;
  this.v = b || null;
  this.a = !1;
  this.i = this.G = null;
  this.j = this.C = this.o = "";
  this.c = this.s = this.h = this.l = !1;
  this.f = 0;
  this.b = null;
  this.g = Mk;
  this.u = this.N = !1;
}
H(Lk, V);
var Mk = "", Nk = /^https?$/i, Ok = ["POST", "PUT"];
function Pk(b, c) {
  if (b.G) {
    throw Error("[goog.net.XhrIo] Object is active with another request=" + b.o + "; newUri=" + c);
  }
  b.o = c;
  b.j = "";
  b.C = "GET";
  b.l = !1;
  b.a = !0;
  b.G = b.v ? Gk(b.v) : Gk(Ek);
  b.i = b.v ? Ck(b.v) : Ck(Ek);
  b.G.onreadystatechange = na(b.H, b);
  try {
    b.s = !0, b.G.open("GET", String(c), !0), b.s = !1;
  } catch (g) {
    Qk(b, g);
    return;
  }
  var d = b.A.clone(), e = Oa(d.Ra()), f = v.FormData && !1;
  !(0 <= La.indexOf.call(Ok, "GET", void 0)) || e || f || Yf(d, "Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  d.forEach(function(b, c) {
    this.G.setRequestHeader(c, b);
  }, b);
  b.g && (b.G.responseType = b.g);
  "withCredentials" in b.G && (b.G.withCredentials = b.N);
  try {
    Rk(b), 0 < b.f && (b.u = Sk(b.G), b.u ? (b.G.timeout = b.f, b.G.ontimeout = na(b.w, b)) : b.b = yk(b.w, b.f, b)), b.h = !0, b.G.send(""), b.h = !1;
  } catch (g) {
    Qk(b, g);
  }
}
function Sk(b) {
  return O && Ib(9) && ga(b.timeout) && ba(b.ontimeout);
}
function Pa(b) {
  return "content-type" == b.toLowerCase();
}
Lk.prototype.w = function() {
  "undefined" != typeof aa && this.G && (this.j = "Timed out after " + this.f + "ms, aborting", W(this, "timeout"), this.G && this.a && (this.a = !1, this.c = !0, this.G.abort(), this.c = !1, W(this, "complete"), W(this, "abort"), Tk(this)));
};
function Qk(b, c) {
  b.a = !1;
  b.G && (b.c = !0, b.G.abort(), b.c = !1);
  b.j = c;
  Uk(b);
  Tk(b);
}
function Uk(b) {
  b.l || (b.l = !0, W(b, "complete"), W(b, "error"));
}
Lk.prototype.I = function() {
  this.G && (this.a && (this.a = !1, this.c = !0, this.G.abort(), this.c = !1), Tk(this, !0));
  Lk.O.I.call(this);
};
Lk.prototype.H = function() {
  this.X || (this.s || this.h || this.c ? Vk(this) : this.F());
};
Lk.prototype.F = function() {
  Vk(this);
};
function Vk(b) {
  if (b.a && "undefined" != typeof aa && (!b.i[1] || 4 != Wk(b) || 2 != Xk(b))) {
    if (b.h && 4 == Wk(b)) {
      yk(b.H, 0, b);
    } else {
      if (W(b, "readystatechange"), 4 == Wk(b)) {
        b.a = !1;
        try {
          if (Yk(b)) {
            W(b, "complete"), W(b, "success");
          } else {
            var c;
            try {
              c = 2 < Wk(b) ? b.G.statusText : "";
            } catch (d) {
              c = "";
            }
            b.j = c + " [" + Xk(b) + "]";
            Uk(b);
          }
        } finally {
          Tk(b);
        }
      }
    }
  }
}
function Tk(b, c) {
  if (b.G) {
    Rk(b);
    var d = b.G, e = b.i[0] ? ca : null;
    b.G = null;
    b.i = null;
    c || W(b, "ready");
    try {
      d.onreadystatechange = e;
    } catch (f) {
    }
  }
}
function Rk(b) {
  b.G && b.u && (b.G.ontimeout = null);
  ga(b.b) && (v.clearTimeout(b.b), b.b = null);
}
function Yk(b) {
  var c = Xk(b), d;
  a: {
    switch(c) {
      case 200:
      ;
      case 201:
      ;
      case 202:
      ;
      case 204:
      ;
      case 206:
      ;
      case 304:
      ;
      case 1223:
        d = !0;
        break a;
      default:
        d = !1;
    }
  }
  if (!d) {
    if (c = 0 === c) {
      b = String(b.o).match(Hk)[1] || null, !b && v.self && v.self.location && (b = v.self.location.protocol, b = b.substr(0, b.length - 1)), c = !Nk.test(b ? b.toLowerCase() : "");
    }
    d = c;
  }
  return d;
}
function Wk(b) {
  return b.G ? b.G.readyState : 0;
}
function Xk(b) {
  try {
    return 2 < Wk(b) ? b.G.status : -1;
  } catch (c) {
    return -1;
  }
}
function Zk(b) {
  try {
    return b.G ? b.G.responseText : "";
  } catch (c) {
    return "";
  }
}
function $k(b) {
  try {
    if (!b.G) {
      return null;
    }
    if ("response" in b.G) {
      return b.G.response;
    }
    switch(b.g) {
      case Mk:
      ;
      case "text":
        return b.G.responseText;
      case "arraybuffer":
        if ("mozResponseArrayBuffer" in b.G) {
          return b.G.mozResponseArrayBuffer;
        }
      ;
    }
    return null;
  } catch (c) {
    return null;
  }
}
;function al() {
  if (!O) {
    return !1;
  }
  try {
    return new ActiveXObject("MSXML2.DOMDocument"), !0;
  } catch (b) {
    return !1;
  }
}
var bl = O && al();
a: {
  if (!document.implementation || !document.implementation.createDocument) {
    if (bl) {
      var cl = new ActiveXObject("MSXML2.DOMDocument");
      if (cl) {
        cl.resolveExternals = !1;
        cl.validateOnParse = !1;
        try {
          cl.setProperty("ProhibitDTD", !0), cl.setProperty("MaxXMLSize", 2048), cl.setProperty("MaxElementDepth", 256);
        } catch (b) {
        }
      }
      if (cl) {
        break a;
      }
    }
    throw Error("Your browser does not support creating new documents");
  }
}
;function dl(b, c, d) {
  return function(e, f, g) {
    var h = new Lk;
    h.g = "arraybuffer" == c.M() ? "arraybuffer" : "text";
    Q(h, "complete", function(b) {
      b = b.target;
      if (Yk(b)) {
        var e = c.M(), f;
        if ("json" == e) {
          f = Zk(b);
        } else {
          if ("text" == e) {
            f = Zk(b);
          } else {
            if ("xml" == e) {
              if (!O) {
                try {
                  f = b.G ? b.G.responseXML : null;
                } catch (h) {
                  f = null;
                }
              }
              f || (f = Zk(b), f = (new DOMParser).parseFromString(f, "application/xml"));
            } else {
              "arraybuffer" == e && (f = $k(b));
            }
          }
        }
        f && d.call(this, c.c(f, {featureProjection:g}), el(c, fl(f)));
      }
      Sb(b);
    }, !1, this);
    ha(b) ? Pk(h, b(e, f, g)) : Pk(h, b);
  };
}
function gl(b, c) {
  return dl(b, c, function(b) {
    hl(this, b);
    this.c();
  });
}
;function il() {
  return [[-Infinity, -Infinity, Infinity, Infinity]];
}
;var jl;
(function() {
  var b = {Wb:{}};
  (function() {
    function c(b, d) {
      if (!(this instanceof c)) {
        return new c(b, d);
      }
      this.lb = Math.max(4, b || 9);
      this.Nb = Math.max(2, Math.ceil(.4 * this.lb));
      d && this.zc(d);
      this.clear();
    }
    function d(b, c) {
      b.bbox = e(b, 0, b.children.length, c);
    }
    function e(b, c, d, e) {
      for (var g = [Infinity, Infinity, -Infinity, -Infinity], h;c < d;c++) {
        h = b.children[c], f(g, b.aa ? e(h) : h.bbox);
      }
      return g;
    }
    function f(b, c) {
      b[0] = Math.min(b[0], c[0]);
      b[1] = Math.min(b[1], c[1]);
      b[2] = Math.max(b[2], c[2]);
      b[3] = Math.max(b[3], c[3]);
    }
    function g(b, c) {
      return b.bbox[0] - c.bbox[0];
    }
    function h(b, c) {
      return b.bbox[1] - c.bbox[1];
    }
    function k(b) {
      return (b[2] - b[0]) * (b[3] - b[1]);
    }
    function l(b) {
      return b[2] - b[0] + (b[3] - b[1]);
    }
    function m(b, c) {
      return b[0] <= c[0] && b[1] <= c[1] && c[2] <= b[2] && c[3] <= b[3];
    }
    function n(b, c) {
      return c[0] <= b[2] && c[1] <= b[3] && c[2] >= b[0] && c[3] >= b[1];
    }
    function q(b, c, d, e, f) {
      for (var g = [c, d], h;g.length;) {
        d = g.pop(), c = g.pop(), d - c <= e || (h = c + Math.ceil((d - c) / e / 2) * e, r(b, c, d, h, f), g.push(c, h, h, d));
      }
    }
    function r(b, c, d, e, f) {
      for (var g, h, k, l, m;d > c;) {
        600 < d - c && (g = d - c + 1, h = e - c + 1, k = Math.log(g), l = .5 * Math.exp(2 * k / 3), m = .5 * Math.sqrt(k * l * (g - l) / g) * (0 > h - g / 2 ? -1 : 1), k = Math.max(c, Math.floor(e - h * l / g + m)), h = Math.min(d, Math.floor(e + (g - h) * l / g + m)), r(b, k, h, e, f));
        g = b[e];
        h = c;
        l = d;
        t(b, c, e);
        for (0 < f(b[d], g) && t(b, c, d);h < l;) {
          t(b, h, l);
          h++;
          for (l--;0 > f(b[h], g);) {
            h++;
          }
          for (;0 < f(b[l], g);) {
            l--;
          }
        }
        0 === f(b[c], g) ? t(b, c, l) : (l++, t(b, l, d));
        l <= e && (c = l + 1);
        e <= l && (d = l - 1);
      }
    }
    function t(b, c, d) {
      var e = b[c];
      b[c] = b[d];
      b[d] = e;
    }
    c.prototype = {all:function() {
      return this.Jb(this.data, []);
    }, search:function(b) {
      var c = this.data, d = [], e = this.ea;
      if (!n(b, c.bbox)) {
        return d;
      }
      for (var f = [], g, h, k, l;c;) {
        g = 0;
        for (h = c.children.length;g < h;g++) {
          k = c.children[g], l = c.aa ? e(k) : k.bbox, n(b, l) && (c.aa ? d.push(k) : m(b, l) ? this.Jb(k, d) : f.push(k));
        }
        c = f.pop();
      }
      return d;
    }, load:function(b) {
      if (!b || !b.length) {
        return this;
      }
      if (b.length < this.Nb) {
        for (var c = 0, d = b.length;c < d;c++) {
          this.V(b[c]);
        }
        return this;
      }
      b = this.Lb(b.slice(), 0, b.length - 1, 0);
      this.data.children.length ? this.data.height === b.height ? this.Ob(this.data, b) : (this.data.height < b.height && (c = this.data, this.data = b, b = c), this.Mb(b, this.data.height - b.height - 1, !0)) : this.data = b;
      return this;
    }, V:function(b) {
      b && this.Mb(b, this.data.height - 1);
      return this;
    }, clear:function() {
      this.data = {children:[], height:1, bbox:[Infinity, Infinity, -Infinity, -Infinity], aa:!0};
      return this;
    }, remove:function(b) {
      if (!b) {
        return this;
      }
      for (var c = this.data, d = this.ea(b), e = [], f = [], g, h, k, l;c || e.length;) {
        c || (c = e.pop(), h = e[e.length - 1], g = f.pop(), l = !0);
        if (c.aa && (k = c.children.indexOf(b), -1 !== k)) {
          c.children.splice(k, 1);
          e.push(c);
          this.yc(e);
          break;
        }
        l || c.aa || !m(c.bbox, d) ? h ? (g++, c = h.children[g], l = !1) : c = null : (e.push(c), f.push(g), g = 0, h = c, c = c.children[0]);
      }
      return this;
    }, ea:function(b) {
      return b;
    }, pb:function(b, c) {
      return b[0] - c[0];
    }, qb:function(b, c) {
      return b[1] - c[1];
    }, toJSON:function() {
      return this.data;
    }, Jb:function(b, c) {
      for (var d = [];b;) {
        b.aa ? c.push.apply(c, b.children) : d.push.apply(d, b.children), b = d.pop();
      }
      return c;
    }, Lb:function(b, c, e, f) {
      var g = e - c + 1, h = this.lb, k;
      if (g <= h) {
        return k = {children:b.slice(c, e + 1), height:1, bbox:null, aa:!0}, d(k, this.ea), k;
      }
      f || (f = Math.ceil(Math.log(g) / Math.log(h)), h = Math.ceil(g / Math.pow(h, f - 1)));
      k = {children:[], height:f, bbox:null, aa:!1};
      var g = Math.ceil(g / h), h = g * Math.ceil(Math.sqrt(h)), l, m, n;
      for (q(b, c, e, h, this.pb);c <= e;c += h) {
        for (m = Math.min(c + h - 1, e), q(b, c, m, g, this.qb), l = c;l <= m;l += g) {
          n = Math.min(l + g - 1, m), k.children.push(this.Lb(b, l, n, f - 1));
        }
      }
      d(k, this.ea);
      return k;
    }, xc:function(b, c, d, e) {
      for (var f, g, h, l, m, n, q, r;;) {
        e.push(c);
        if (c.aa || e.length - 1 === d) {
          break;
        }
        q = r = Infinity;
        f = 0;
        for (g = c.children.length;f < g;f++) {
          h = c.children[f], m = k(h.bbox), n = h.bbox, n = (Math.max(n[2], b[2]) - Math.min(n[0], b[0])) * (Math.max(n[3], b[3]) - Math.min(n[1], b[1])) - m, n < r ? (r = n, q = m < q ? m : q, l = h) : n === r && m < q && (q = m, l = h);
        }
        c = l;
      }
      return c;
    }, Mb:function(b, c, d) {
      var e = this.ea;
      d = d ? b.bbox : e(b);
      var e = [], g = this.xc(d, this.data, c, e);
      g.children.push(b);
      for (f(g.bbox, d);0 <= c;) {
        if (e[c].children.length > this.lb) {
          this.Ac(e, c), c--;
        } else {
          break;
        }
      }
      this.uc(d, e, c);
    }, Ac:function(b, c) {
      var e = b[c], f = e.children.length, g = this.Nb;
      this.vc(e, g, f);
      f = this.wc(e, g, f);
      f = {children:e.children.splice(f, e.children.length - f), height:e.height, bbox:null, aa:!1};
      e.aa && (f.aa = !0);
      d(e, this.ea);
      d(f, this.ea);
      c ? b[c - 1].children.push(f) : this.Ob(e, f);
    }, Ob:function(b, c) {
      this.data = {children:[b, c], height:b.height + 1, bbox:null, aa:!1};
      d(this.data, this.ea);
    }, wc:function(b, c, d) {
      var f, g, h, l, m, n, q;
      m = n = Infinity;
      for (f = c;f <= d - c;f++) {
        g = e(b, 0, f, this.ea), h = e(b, f, d, this.ea), l = Math.max(0, Math.min(g[2], h[2]) - Math.max(g[0], h[0])) * Math.max(0, Math.min(g[3], h[3]) - Math.max(g[1], h[1])), g = k(g) + k(h), l < m ? (m = l, q = f, n = g < n ? g : n) : l === m && g < n && (n = g, q = f);
      }
      return q;
    }, vc:function(b, c, d) {
      var e = b.aa ? this.pb : g, f = b.aa ? this.qb : h, k = this.Kb(b, c, d, e);
      c = this.Kb(b, c, d, f);
      k < c && b.children.sort(e);
    }, Kb:function(b, c, d, g) {
      b.children.sort(g);
      g = this.ea;
      var h = e(b, 0, c, g), k = e(b, d - c, d, g), m = l(h) + l(k), n, q;
      for (n = c;n < d - c;n++) {
        q = b.children[n], f(h, b.aa ? g(q) : q.bbox), m += l(h);
      }
      for (n = d - c - 1;n >= c;n--) {
        q = b.children[n], f(k, b.aa ? g(q) : q.bbox), m += l(k);
      }
      return m;
    }, uc:function(b, c, d) {
      for (;0 <= d;d--) {
        f(c[d].bbox, b);
      }
    }, yc:function(b) {
      for (var c = b.length - 1, e;0 <= c;c--) {
        0 === b[c].children.length ? 0 < c ? (e = b[c - 1].children, e.splice(e.indexOf(b[c]), 1)) : this.clear() : d(b[c], this.ea);
      }
    }, zc:function(b) {
      var c = ["return a", " - b", ";"];
      this.pb = new Function("a", "b", c.join(b[0]));
      this.qb = new Function("a", "b", c.join(b[1]));
      this.ea = new Function("a", "return [a" + b.join(", a") + "];");
    }};
    "undefined" !== typeof b ? b.Wb = c : "undefined" !== typeof self ? self.a = c : window.a = c;
  })();
  jl = b.Wb;
})();
function kl(b) {
  this.c = jl(b);
  this.a = {};
}
p = kl.prototype;
p.V = function(b, c) {
  var d = [b[0], b[1], b[2], b[3], c];
  this.c.V(d);
  this.a[C(c)] = d;
};
p.load = function(b, c) {
  for (var d = Array(c.length), e = 0, f = c.length;e < f;e++) {
    var g = b[e], h = c[e], g = [g[0], g[1], g[2], g[3], h];
    d[e] = g;
    this.a[C(h)] = g;
  }
  this.c.load(d);
};
p.remove = function(b) {
  b = C(b);
  var c = this.a[b];
  delete this.a[b];
  return null !== this.c.remove(c);
};
function ll(b, c, d) {
  var e = C(d);
  ad(b.a[e].slice(0, 4), c) || (b.remove(d), b.V(c, d));
}
function ml(b) {
  return b.c.all().map(function(b) {
    return b[4];
  });
}
function nl(b, c) {
  return b.c.search(c).map(function(b) {
    return b[4];
  });
}
p.forEach = function(b, c) {
  return pl(ml(this), b, c);
};
function ql(b, c, d, e) {
  return pl(nl(b, c), d, e);
}
function pl(b, c, d) {
  for (var e, f = 0, g = b.length;f < g && !(e = c.call(d, b[f]));f++) {
  }
  return e;
}
p.ra = function() {
  return rb(this.a);
};
p.clear = function() {
  this.c.clear();
  this.a = {};
};
p.D = function() {
  return this.c.data.bbox;
};
function rl(b) {
  b = b || {};
  mf.call(this, {attributions:b.attributions, logo:b.logo, projection:void 0, state:"ready", wrapX:void 0 !== b.wrapX ? b.wrapX : !0});
  this.u = qa;
  void 0 !== b.loader ? this.u = b.loader : void 0 !== b.url && (this.u = gl(b.url, b.format));
  this.F = void 0 !== b.strategy ? b.strategy : il;
  var c = void 0 !== b.useSpatialIndex ? b.useSpatialIndex : !0;
  this.a = c ? new kl : null;
  this.w = new kl;
  this.b = {};
  this.g = {};
  this.l = {};
  this.s = {};
  this.f = null;
  var d, e;
  b.features instanceof ye ? (d = b.features, e = d.a) : ea(b.features) && (e = b.features);
  c || void 0 !== d || (d = new ye(e));
  void 0 !== e && hl(this, e);
  void 0 !== d && sl(this, d);
}
H(rl, mf);
function tl(b, c) {
  var d = C(c).toString();
  if (ul(b, d, c)) {
    vl(b, d, c);
    var e = c.L();
    e ? (d = e.D(), b.a && b.a.V(d, c)) : b.b[d] = c;
    W(b, new wl("addfeature", c));
  }
}
function vl(b, c, d) {
  b.s[c] = [Q(d, "change", b.ic, !1, b), Q(d, "propertychange", b.ic, !1, b)];
}
function ul(b, c, d) {
  var e = !0, f = d.za;
  void 0 !== f ? f.toString() in b.g ? e = !1 : b.g[f.toString()] = d : b.l[c] = d;
  return e;
}
function hl(b, c) {
  var d, e, f, g, h = [], k = [], l = [];
  e = 0;
  for (f = c.length;e < f;e++) {
    g = c[e], d = C(g).toString(), ul(b, d, g) && k.push(g);
  }
  e = 0;
  for (f = k.length;e < f;e++) {
    g = k[e];
    d = C(g).toString();
    vl(b, d, g);
    var m = g.L();
    m ? (d = m.D(), h.push(d), l.push(g)) : b.b[d] = g;
  }
  b.a && b.a.load(h, l);
  e = 0;
  for (f = k.length;e < f;e++) {
    W(b, new wl("addfeature", k[e]));
  }
}
function sl(b, c) {
  var d = !1;
  Q(b, "addfeature", function(b) {
    d || (d = !0, c.push(b.feature), d = !1);
  });
  Q(b, "removefeature", function(b) {
    d || (d = !0, c.remove(b.feature), d = !1);
  });
  Q(c, "add", function(b) {
    d || (b = b.element, d = !0, tl(this, b), this.c(), d = !1);
  }, !1, b);
  Q(c, "remove", function(b) {
    d || (b = b.element, d = !0, xl(this, b), d = !1);
  }, !1, b);
  b.f = c;
}
p = rl.prototype;
p.clear = function(b) {
  if (b) {
    for (var c in this.s) {
      this.s[c].forEach(T);
    }
    this.f || (this.s = {}, this.g = {}, this.l = {});
  } else {
    b = this.kc, this.a && (this.a.forEach(b, this), nb(this.b, b, this));
  }
  this.f && this.f.clear();
  this.a && this.a.clear();
  this.w.clear();
  this.b = {};
  W(this, new wl("clear"));
  this.c();
};
function yl(b, c, d, e) {
  b.a ? ql(b.a, c, d, e) : b.f && b.f.forEach(d, e);
}
function zl(b) {
  return b.f;
}
p.D = function() {
  return this.a.D();
};
p.ic = function(b) {
  b = b.target;
  var c = C(b).toString(), d = b.L();
  d ? (d = d.D(), c in this.b ? (delete this.b[c], this.a && this.a.V(d, b)) : this.a && ll(this.a, d, b)) : c in this.b || (this.a && this.a.remove(b), this.b[c] = b);
  d = b.za;
  void 0 !== d ? (d = d.toString(), c in this.l ? (delete this.l[c], this.g[d] = b) : this.g[d] !== b && (Al(this, b), this.g[d] = b)) : c in this.l || (Al(this, b), this.l[c] = b);
  this.c();
  W(this, new wl("changefeature", b));
};
p.ra = function() {
  return this.a.ra() && rb(this.b);
};
function Bl(b, c, d, e) {
  var f = b.w;
  c = b.F(c, d);
  var g, h;
  g = 0;
  for (h = c.length;g < h;++g) {
    var k = c[g];
    ql(f, k, function(b) {
      return $c(b.extent, k);
    }) || (b.u.call(b, k, d, e), f.V(k, {extent:k.slice()}));
  }
}
function xl(b, c) {
  var d = C(c).toString();
  d in b.b ? delete b.b[d] : b.a && b.a.remove(c);
  b.kc(c);
  b.c();
}
p.kc = function(b) {
  var c = C(b).toString();
  this.s[c].forEach(T);
  delete this.s[c];
  var d = b.za;
  void 0 !== d ? delete this.g[d.toString()] : delete this.l[c];
  W(this, new wl("removefeature", b));
};
function Al(b, c) {
  for (var d in b.g) {
    if (b.g[d] === c) {
      delete b.g[d];
      break;
    }
  }
}
function wl(b, c) {
  P.call(this, b);
  this.feature = c;
}
H(wl, P);
function Ph(b) {
  Jj.call(this, b);
  this.a = this.g = null;
  this.i = !1;
  this.u = null;
  this.H = Qc();
  this.A = this.C = this.w = NaN;
  this.f = this.j = null;
  this.N = [0, 0];
}
H(Ph, Jj);
Ph.prototype.da = function() {
  return this.g;
};
Ph.prototype.o = function(b, c) {
  function d(b) {
    b = b.Y();
    return 2 == b || 4 == b || 3 == b && !S;
  }
  var e = b.pixelRatio, f = b.viewState, g = f.projection, h = this.b, k = h.Z(), l = k.ya(g), m = zf(l, f.resolution), n = Ef(k, m, g), q = n[0] / Fc(yf(l, m), this.N)[0], r = l.R(m), q = r / q, t = f.center, w;
  r == f.resolution ? (t = Fh(t, r, b.size), w = gd(t, r, f.rotation, b.size)) : w = b.extent;
  void 0 !== c.extent && (w = hd(w, c.extent));
  if (w[2] < w[0] || w[3] < w[1]) {
    return !1;
  }
  var A = vf(l, w, r), u = n[0] * (A.c - A.a + 1), y = n[1] * we(A), B, x;
  this.g ? (B = this.g, x = this.u, this.a[0] < u || this.a[1] < y || this.C !== n[0] || this.A !== n[1] || this.i && (this.a[0] > u || this.a[1] > y) ? (B.width = u, B.height = y, this.a = [u, y], this.i = !Mj(this.a), this.j = null) : (u = this.a[0], y = this.a[1], m == this.w && ve(this.j, A) || (this.j = null))) : (x = ug(u, y), this.g = x.canvas, this.a = [u, y], this.u = x, this.i = !Mj(this.a));
  var J, G;
  this.j ? (y = this.j, u = y.c - y.a + 1) : (u /= n[0], y /= n[1], J = A.a - Math.floor((u - (A.c - A.a + 1)) / 2), G = A.h - Math.floor((y - we(A)) / 2), this.w = m, this.C = n[0], this.A = n[1], this.j = new te(J, J + u - 1, G, G + y - 1), this.f = Array(u * y), y = this.j);
  B = {};
  B[m] = {};
  var K = [], E = Ah(k, g, B), S = h.get("useInterimTilesOnError"), U = Uc(), N = new te(0, 0, 0, 0), L, F, R;
  for (G = A.a;G <= A.c;++G) {
    for (R = A.h;R <= A.b;++R) {
      F = Hh(k, m, G, R, e, g), !d(F) && F.a && (F = F.a), d(F) ? B[m][F.ba.toString()] = F : (L = rf(l, F.ba, E, N, U), L || (K.push(F), (L = uf(l, F.ba, N, U)) && E(m + 1, L)));
    }
  }
  E = 0;
  for (L = K.length;E < L;++E) {
    F = K[E], G = n[0] * (F.ba[1] - y.a), R = n[1] * (y.b - F.ba[2]), x.clearRect(G, R, n[0], n[1]);
  }
  K = Object.keys(B).map(Number);
  K.sort(bb);
  var M = k.zb(g), Ta = jd(sf(l, [m, y.a, y.b], U)), Ha, De, Ia, wd, Ub, Dg, E = 0;
  for (L = K.length;E < L;++E) {
    if (Ha = K[E], n = Ef(k, Ha, g), wd = B[Ha], Ha == m) {
      for (De in wd) {
        F = wd[De], J = (F.ba[2] - y.h) * u + (F.ba[1] - y.a), this.f[J] != F && (G = n[0] * (F.ba[1] - y.a), R = n[1] * (y.b - F.ba[2]), Ia = F.Y(), 4 != Ia && (3 != Ia || S) && M || x.clearRect(G, R, n[0], n[1]), 2 == Ia && x.drawImage(F.da(), 0, 0, n[0], n[1], G, R, n[0], n[1]), this.f[J] = F);
      }
    } else {
      for (De in Ha = l.R(Ha) / r, wd) {
        for (F = wd[De], J = sf(l, F.ba, U), G = (J[0] - Ta[0]) / q, R = (Ta[1] - J[3]) / q, Dg = Ha * n[0], Ub = Ha * n[1], Ia = F.Y(), 4 != Ia && M || x.clearRect(G, R, Dg, Ub), 2 == Ia && x.drawImage(F.da(), 0, 0, n[0], n[1], G, R, Dg, Ub), F = tf(l, J, m, N), J = Math.max(F.a, y.a), R = Math.min(F.c, y.c), G = Math.max(F.h, y.h), F = Math.min(F.b, y.b), Ia = J;Ia <= R;++Ia) {
          for (Ub = G;Ub <= F;++Ub) {
            J = (Ub - y.h) * u + (Ia - y.a), this.f[J] = void 0;
          }
        }
      }
    }
  }
  Eh(b.usedTiles, k, m, A);
  Gh(b, k, l, e, g, w, m, h.get("preload"));
  Bh(b, k);
  Dh(b, k);
  xh(this.H, e * b.size[0] / 2, e * b.size[1] / 2, e * q / f.resolution, e * q / f.resolution, f.rotation, (Ta[0] - t[0]) / q, (t[1] - Ta[1]) / q);
  return !0;
};
function Rh(b) {
  Jj.call(this, b);
  this.j = !1;
  this.w = -1;
  this.u = NaN;
  this.f = Uc();
  this.a = this.i = null;
  this.g = ug();
}
H(Rh, Jj);
Rh.prototype.s = function(b, c, d) {
  var e = b.extent, f = b.pixelRatio, g = c.bb ? b.skippedFeatureUids : {}, h = b.viewState, k = h.projection, h = h.rotation, l = k.D(), m = this.b.Z(), n = Lj(this, b, 0);
  Kj(this, "precompose", d, b, n);
  var q = this.a;
  if (q && !q.ra()) {
    var r;
    xc(this.b, "render") ? (this.g.canvas.width = d.canvas.width, this.g.canvas.height = d.canvas.height, r = this.g) : r = d;
    var t = r.globalAlpha;
    r.globalAlpha = c.opacity;
    jk(q, r, f, n, h, g);
    if (m.o && k.a && !$c(l, e)) {
      c = e[0];
      k = Y(l);
      for (m = 0;c < l[0];) {
        --m, n = k * m, n = Lj(this, b, n), jk(q, r, f, n, h, g), c += k;
      }
      m = 0;
      for (c = e[2];c > l[2];) {
        ++m, n = k * m, n = Lj(this, b, n), jk(q, r, f, n, h, g), c -= k;
      }
      n = Lj(this, b, 0);
    }
    r != d && (Kj(this, "render", r, b, n), d.drawImage(r.canvas, 0, 0));
    r.globalAlpha = t;
  }
  Kj(this, "postcompose", d, b, n);
};
Rh.prototype.l = function(b, c, d, e) {
  if (this.a) {
    var f = c.viewState.resolution, g = c.viewState.rotation, h = this.b, k = c.layerStates[C(h)], l = {};
    return fk(this.a, b, f, g, k.bb ? c.skippedFeatureUids : {}, function(b) {
      var c = C(b).toString();
      if (!(c in l)) {
        return l[c] = !0, d.call(e, b, h);
      }
    });
  }
};
Rh.prototype.A = function() {
  var b = this.b;
  b.get("visible") && "ready" == b.Bb() && this.c();
};
Rh.prototype.o = function(b) {
  function c(b) {
    var c, e = b.f;
    e ? c = e.call(b, m) : (e = d.i) && (c = e(b, m));
    if (c) {
      if (c) {
        e = !1;
        if (ea(c)) {
          for (var f = 0, g = c.length;f < g;++f) {
            e = mk(r, b, c[f], lk(m, n), this.A, this) || e;
          }
        } else {
          e = mk(r, b, c, lk(m, n), this.A, this) || e;
        }
        b = e;
      } else {
        b = !1;
      }
      this.j = this.j || b;
    }
  }
  var d = this.b, e = d.Z();
  Ch(b.attributions, e.A);
  Dh(b, e);
  var f = b.viewHints[0], g = b.viewHints[1], h = d.s, k = d.o;
  if (!this.j && !h && f || !k && g) {
    return !0;
  }
  var l = b.extent, k = b.viewState, f = k.projection, m = k.resolution, n = b.pixelRatio, g = d.h, q = d.f, h = d.get("renderOrder");
  void 0 === h && (h = kk);
  l = Yc(l, q * m);
  q = k.projection.D();
  e.o && k.projection.a && !$c(q, b.extent) && (b = Math.max(Y(l) / 2, Y(q)), l[0] = q[0] - b, l[2] = q[2] + b);
  if (!this.j && this.u == m && this.w == g && this.i == h && $c(this.f, l)) {
    return !0;
  }
  Sb(this.a);
  this.a = null;
  this.j = !1;
  var r = new dk(.5 * m / n, l, m, d.f);
  Bl(e, l, m, f);
  if (h) {
    var t = [];
    yl(e, l, function(b) {
      t.push(b);
    }, this);
    t.sort(h);
    t.forEach(c, this);
  } else {
    yl(e, l, c, this);
  }
  ek(r);
  this.u = m;
  this.w = g;
  this.i = h;
  this.f = l;
  this.a = r;
  return !0;
};
function Cl(b, c) {
  var d = /\{z\}/g, e = /\{x\}/g, f = /\{y\}/g, g = /\{-y\}/g;
  return function(h) {
    if (h) {
      return b.replace(d, h[0].toString()).replace(e, h[1].toString()).replace(f, function() {
        return (-h[2] - 1).toString();
      }).replace(g, function() {
        return (we(c.a ? c.a[h[0]] : null) + h[2]).toString();
      });
    }
  };
}
function Dl(b, c) {
  for (var d = b.length, e = Array(d), f = 0;f < d;++f) {
    e[f] = Cl(b[f], c);
  }
  return El(e);
}
function El(b) {
  return 1 === b.length ? b[0] : function(c, d, e) {
    if (c) {
      return b[Gc((c[1] << c[0]) + c[2], b.length)](c, d, e);
    }
  };
}
function Fl() {
}
function Gl(b) {
  var c = [], d = /\{(\d)-(\d)\}/.exec(b) || /\{([a-z])-([a-z])\}/.exec(b);
  if (d) {
    var e = d[2].charCodeAt(0), f;
    for (f = d[1].charCodeAt(0);f <= e;++f) {
      c.push(b.replace(d[0], String.fromCharCode(f)));
    }
  } else {
    c.push(b);
  }
  return c;
}
;function Hl(b) {
  Cf.call(this, {attributions:b.attributions, Qb:b.Qb, extent:b.extent, logo:b.logo, opaque:b.opaque, projection:b.projection, state:b.state, tileGrid:b.tileGrid, tilePixelRatio:b.tilePixelRatio, wrapX:b.wrapX});
  this.tileLoadFunction = b.tileLoadFunction;
  this.tileUrlFunction = this.b ? this.b.bind(this) : Fl;
  this.urls = null;
  if (b.urls) {
    var c = b.urls;
    this.urls = c;
    Il(this, this.b ? this.b.bind(this) : Dl(c, this.tileGrid));
  } else {
    b.url && (c = b.url, this.urls = [c], c = Gl(c), Il(this, this.b ? this.b.bind(this) : Dl(c, this.tileGrid)));
  }
  b.tileUrlFunction && Il(this, b.tileUrlFunction);
}
H(Hl, Cf);
Hl.prototype.T = function(b) {
  b = b.target;
  switch(b.Y()) {
    case 1:
      W(this, new Gf("tileloadstart", b));
      break;
    case 2:
      W(this, new Gf("tileloadend", b));
      break;
    case 3:
      W(this, new Gf("tileloaderror", b));
  }
};
function Il(b, c) {
  b.a.clear();
  b.tileUrlFunction = c;
  b.c();
}
Hl.prototype.sc = function(b, c, d) {
  b = this.Xa(b, c, d);
  this.a.b.hasOwnProperty(b) && this.a.get(b);
};
function Jl(b, c) {
  Kh.call(this, 0, c);
  this.j = ug();
  this.a = this.j.canvas;
  this.a.style.width = "100%";
  this.a.style.height = "100%";
  this.a.className = "ol-unselectable";
  b.insertBefore(this.a, b.childNodes[0] || null);
  this.b = !0;
  this.v = Qc();
}
H(Jl, Kh);
function Kl(b, c, d) {
  var e = b.g, f = b.j;
  if (xc(e, c)) {
    var g = d.extent, h = d.pixelRatio, k = d.viewState.rotation, l = d.pixelRatio, m = d.viewState, n = m.resolution;
    b = xh(b.v, b.a.width / 2, b.a.height / 2, l / n, -l / n, -m.rotation, -m.center[0], -m.center[1]);
    g = new wj(f, h, g, b, k);
    W(e, new vh(c, e, g, d, f, null));
    Ij(g);
  }
}
Jl.prototype.M = function() {
  return "canvas";
};
Jl.prototype.f = function(b) {
  if (b) {
    var c = this.j, d = b.size[0] * b.pixelRatio, e = b.size[1] * b.pixelRatio;
    this.a.width != d || this.a.height != e ? (this.a.width = d, this.a.height = e) : c.clearRect(0, 0, this.a.width, this.a.height);
    d = b.viewState;
    e = b.coordinateToPixelMatrix;
    xh(e, b.size[0] / 2, b.size[1] / 2, 1 / d.resolution, -1 / d.resolution, -d.rotation, -d.center[0], -d.center[1]);
    Rc(e, b.pixelToCoordinateMatrix);
    Kl(this, "precompose", b);
    d = b.layerStatesArray;
    Ya(d);
    var e = b.viewState.resolution, f, g, h, k;
    f = 0;
    for (g = d.length;f < g;++f) {
      k = d[f], h = k.layer, h = Nh(this, h), k.visible && e >= k.minResolution && e < k.maxResolution && "ready" == k.Yd && h.o(b, k) && h.s(b, k, c);
    }
    Kl(this, "postcompose", b);
    this.b || (Ye(this.a, !0), this.b = !0);
    for (var l in this.c) {
      if (!(l in b.layerStates)) {
        b.postRenderFunctions.push(this.l.bind(this));
        break;
      }
    }
    b.postRenderFunctions.push(Lh);
  } else {
    this.b && (Ye(this.a, !1), this.b = !1);
  }
};
var Ll = ["canvas", "webgl", "dom"];
function Ml(b) {
  X.call(this);
  var c = Nl(b);
  this.gb = void 0 !== b.loadTilesWhileAnimating ? b.loadTilesWhileAnimating : !1;
  this.hb = void 0 !== b.loadTilesWhileInteracting ? b.loadTilesWhileInteracting : !1;
  this.jb = void 0 !== b.pixelRatio ? b.pixelRatio : vg;
  this.ib = c.logos;
  this.i = new Rf(this.Ud, void 0, this);
  Rb(this, this.i);
  this.wa = Qc();
  this.kb = Qc();
  this.xa = 0;
  this.b = null;
  this.la = Uc();
  this.s = this.A = null;
  this.a = document.createElement("DIV");
  this.a.className = "ol-viewport";
  this.a.style.position = "relative";
  this.a.style.overflow = "hidden";
  this.a.style.width = "100%";
  this.a.style.height = "100%";
  this.a.style.msTouchAction = "none";
  this.a.style.a = "none";
  yg && Te(this.a, "ol-touch");
  this.u = document.createElement("DIV");
  this.u.className = "ol-overlaycontainer";
  this.a.appendChild(this.u);
  this.o = document.createElement("DIV");
  this.o.className = "ol-overlaycontainer-stopevent";
  Q(this.o, ["click", "dblclick", "mousedown", "touchstart", "MSPointerDown", oh, zb ? "DOMMouseScroll" : "mousewheel"], Tb);
  this.a.appendChild(this.o);
  b = new gh(this);
  Q(b, qb(rh), this.$b, !1, this);
  Rb(this, b);
  this.$ = c.keyboardEventTarget;
  this.l = new fg;
  Q(this.l, "key", this.Zb, !1, this);
  Rb(this, this.l);
  b = new ng(this.a);
  Q(b, "mousewheel", this.Zb, !1, this);
  Rb(this, b);
  this.C = c.controls;
  this.g = c.interactions;
  this.N = c.overlays;
  this.ca = {};
  this.T = new c.Wd(this.a, this);
  Rb(this, this.T);
  this.na = new ag;
  Rb(this, this.na);
  this.F = this.f = null;
  this.w = [];
  this.fa = [];
  this.ma = new Vh(this.Kc.bind(this), this.Zc.bind(this));
  this.W = {};
  Q(this, Dc("layergroup"), this.Oc, !1, this);
  Q(this, Dc("view"), this.$c, !1, this);
  Q(this, Dc("size"), this.Wc, !1, this);
  Q(this, Dc("target"), this.Yc, !1, this);
  Bc(this, c.values);
  this.C.forEach(function(b) {
    b.setMap(this);
  }, this);
  Q(this.C, "add", function(b) {
    b.element.setMap(this);
  }, !1, this);
  Q(this.C, "remove", function(b) {
    b.element.setMap(null);
  }, !1, this);
  this.g.forEach(function(b) {
    b.setMap(this);
  }, this);
  Q(this.g, "add", function(b) {
    b.element.setMap(this);
  }, !1, this);
  Q(this.g, "remove", function(b) {
    b.element.setMap(null);
  }, !1, this);
  this.N.forEach(this.Pb, this);
  Q(this.N, "add", function(b) {
    this.Pb(b.element);
  }, !1, this);
  Q(this.N, "remove", function(b) {
    var c = b.element.za;
    void 0 !== c && delete this.ca[c.toString()];
    b.element.setMap(null);
  }, !1, this);
}
H(Ml, X);
p = Ml.prototype;
p.Cc = function(b) {
  this.g.push(b);
};
p.Pb = function(b) {
  var c = b.za;
  void 0 !== c && (this.ca[c.toString()] = b);
  b.setMap(this);
};
p.oa = function(b) {
  this.render();
  Array.prototype.push.apply(this.w, arguments);
};
p.I = function() {
  Oe(this.a);
  Ml.O.I.call(this);
};
function Ol(b, c, d, e, f) {
  b.b && (c = b.ga(c), Mh(b.T, c, b.b, d, void 0 !== e ? e : null, void 0 !== f ? f : md));
}
function Qf(b, c) {
  var d, e = b.a;
  d = Xe(c);
  e = Xe(e);
  d = new Fe(d.x - e.x, d.y - e.y);
  return [d.x, d.y];
}
function Pl(b) {
  b = b.get("target");
  return void 0 !== b ? He(b) : null;
}
p.ga = function(b) {
  var c = this.b;
  return c ? (b = b.slice(), yh(c.pixelToCoordinateMatrix, b, b)) : null;
};
function qi(b, c) {
  var d = b.b;
  if (d) {
    var e = c.slice(0, 2);
    return yh(d.coordinateToPixelMatrix, e, e);
  }
  return null;
}
p.cb = function() {
  return this.get("size");
};
p.U = function() {
  return this.get("view");
};
p.Kc = function(b, c, d, e) {
  var f = this.b;
  if (!(f && c in f.wantedTiles && f.wantedTiles[c][b.ba.toString()])) {
    return Infinity;
  }
  b = d[0] - f.focus[0];
  d = d[1] - f.focus[1];
  return 65536 * Math.log(e) + Math.sqrt(b * b + d * d) / e;
};
p.Zb = function(b, c) {
  var d = new eh(c || b.type, this, b);
  this.$b(d);
};
p.$b = function(b) {
  if (this.b) {
    this.F = b.coordinate;
    b.frameState = this.b;
    var c = this.g.a, d;
    if (!1 !== W(this, b)) {
      for (d = c.length - 1;0 <= d;d--) {
        var e = c[d];
        if (e.get("active") && !e.handleEvent(b)) {
          break;
        }
      }
    }
  }
};
p.Vc = function() {
  var b = this.b, c = this.ma;
  if (!c.ra()) {
    var d = 16, e = d, f = 0;
    b && (f = b.viewHints, f[0] && (d = this.gb ? 8 : 0, e = 2), f[1] && (d = this.hb ? 8 : 0, e = 2), f = pb(b.wantedTiles));
    d *= f;
    e *= f;
    if (c.h < d) {
      var f = c.v, g = c.a, h = c.c, k = 0, l = g.length, m, n, q;
      for (n = 0;n < l;++n) {
        m = g[n], q = f(m), Infinity == q ? delete c.b[c.j(m)] : (h[k] = q, g[k++] = m);
      }
      g.length = k;
      h.length = k;
      for (f = (c.a.length >> 1) - 1;0 <= f;f--) {
        Uh(c, f);
      }
      for (f = 0;c.h < d && f < e && 0 < c.Wa();) {
        g = c, k = g.a, l = g.c, h = k[0], 1 == k.length ? (k.length = 0, l.length = 0) : (k[0] = k.pop(), l[0] = l.pop(), Uh(g, 0)), k = g.j(h), delete g.b[k], g = h[0], 0 === g.Y() && (c.f[g.getKey()] = !0, ++c.h, ++f, g.load());
      }
    }
  }
  c = this.fa;
  e = 0;
  for (d = c.length;e < d;++e) {
    c[e](this, b);
  }
  c.length = 0;
};
p.Wc = function() {
  this.render();
};
p.Yc = function() {
  var b = Pl(this);
  mg(this.l);
  b ? (b.appendChild(this.a), gg(this.l, this.$ ? this.$ : b), this.f || (this.f = Q(this.na, "resize", this.rc, !1, this))) : (Oe(this.a), this.f && (T(this.f), this.f = null));
  this.rc();
};
p.Zc = function() {
  this.render();
};
p.ad = function() {
  this.render();
};
p.$c = function() {
  this.A && (T(this.A), this.A = null);
  var b = this.U();
  b && (this.A = Q(b, "propertychange", this.ad, !1, this));
  this.render();
};
p.Pc = function() {
  this.render();
};
p.Qc = function() {
  this.render();
};
p.Oc = function() {
  this.s && (this.s.forEach(T), this.s = null);
  var b = this.get("layergroup");
  b && (this.s = [Q(b, "propertychange", this.Qc, !1, this), Q(b, "change", this.Pc, !1, this)]);
  this.render();
};
p.Vd = function() {
  var b = this.i;
  Sf(b);
  b.j();
};
p.render = function() {
  null != this.i.a || this.i.start();
};
p.Ud = function(b) {
  var c, d, e, f = this.cb(), g = this.U(), h = null;
  if (c = void 0 !== f && 0 < f[0] && 0 < f[1] && g) {
    c = !!g.ja() && void 0 !== g.R();
  }
  if (c) {
    var h = g.b.slice(), k = this.get("layergroup").yb(), l = {};
    c = 0;
    for (d = k.length;c < d;++c) {
      l[C(k[c].layer)] = k[c];
    }
    e = g.Y();
    h = {animate:!1, attributions:{}, coordinateToPixelMatrix:this.wa, extent:null, focus:this.F ? this.F : e.center, index:this.xa++, layerStates:l, layerStatesArray:k, logos:tb(this.ib), pixelRatio:this.jb, pixelToCoordinateMatrix:this.kb, postRenderFunctions:[], size:f, skippedFeatureUids:this.W, tileQueue:this.ma, time:b, usedTiles:{}, viewState:e, viewHints:h, wantedTiles:{}};
  }
  if (h) {
    b = this.w;
    c = f = 0;
    for (d = b.length;c < d;++c) {
      g = b[c], g(this, h) && (b[f++] = g);
    }
    b.length = f;
    h.extent = gd(e.center, e.resolution, e.rotation, h.size);
  }
  this.b = h;
  this.T.f(h);
  h && (h.animate && this.render(), Array.prototype.push.apply(this.fa, h.postRenderFunctions), 0 !== this.w.length || h.viewHints[0] || h.viewHints[1] || ad(h.extent, this.la) || (W(this, new cf("moveend", this, h)), Zc(h.extent, this.la)));
  W(this, new cf("postrender", this, h));
  c = e = this.Vc;
  this && (c = na(e, this));
  !ha(v.setImmediate) || v.Window && v.Window.prototype && v.Window.prototype.setImmediate == v.setImmediate ? (Vf || (Vf = Wf()), Vf(c)) : v.setImmediate(c);
};
p.Ib = function(b) {
  this.j("size", b);
};
p.nc = function(b) {
  b = C(b).toString();
  this.W[b] = !0;
  this.render();
};
p.rc = function() {
  var b = Pl(this);
  if (b) {
    var c = 9 == b.nodeType ? b : b.ownerDocument || b.document, d = O && b.currentStyle, e;
    if (e = d) {
      c || ra || (ra = new Qe), e = !0;
    }
    if (e && "auto" != d.width && "auto" != d.height && !d.boxSizing) {
      c = Ze(b, d.width, "width", "pixelWidth"), b = Ze(b, d.height, "height", "pixelHeight"), b = new Ge(c, b);
    } else {
      d = new Ge(b.offsetWidth, b.offsetHeight);
      if (O) {
        c = $e(b, "paddingLeft");
        e = $e(b, "paddingRight");
        var f = $e(b, "paddingTop"), g = $e(b, "paddingBottom"), c = new Ve(f, e, g, c);
      } else {
        c = We(b, "paddingLeft"), e = We(b, "paddingRight"), f = We(b, "paddingTop"), g = We(b, "paddingBottom"), c = new Ve(parseFloat(f), parseFloat(e), parseFloat(g), parseFloat(c));
      }
      !O || 9 <= Kb ? (e = We(b, "borderLeftWidth"), f = We(b, "borderRightWidth"), g = We(b, "borderTopWidth"), b = We(b, "borderBottomWidth"), b = new Ve(parseFloat(g), parseFloat(f), parseFloat(b), parseFloat(e))) : (e = bf(b, "borderLeft"), f = bf(b, "borderRight"), g = bf(b, "borderTop"), b = bf(b, "borderBottom"), b = new Ve(g, f, b, e));
      b = new Ge(d.width - b.left - c.left - c.right - b.right, d.height - b.top - c.top - c.bottom - b.bottom);
    }
    this.Ib([b.width, b.height]);
  } else {
    this.Ib(void 0);
  }
};
p.pc = function(b) {
  b = C(b).toString();
  delete this.W[b];
  this.render();
};
function Nl(b) {
  var c = null;
  void 0 !== b.keyboardEventTarget && (c = z(b.keyboardEventTarget) ? document.getElementById(b.keyboardEventTarget) : b.keyboardEventTarget);
  var d = {}, e = {};
  if (void 0 === b.logo || "boolean" == typeof b.logo && b.logo) {
    e["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"] = 
    "http://openlayers.org/";
  } else {
    var f = b.logo;
    z(f) ? e[f] = "" : ia(f) && (e[f.src] = f.href);
  }
  f = b.layers instanceof Ti ? b.layers : new Ti({layers:b.layers});
  d.layergroup = f;
  d.target = b.target;
  d.view = void 0 !== b.view ? b.view : new je;
  var f = Kh, g;
  void 0 !== b.renderer ? ea(b.renderer) ? g = b.renderer : z(b.renderer) && (g = [b.renderer]) : g = Ll;
  var h, k;
  h = 0;
  for (k = g.length;h < k;++h) {
    if ("canvas" == g[h] && xg) {
      f = Jl;
      break;
    }
  }
  var l;
  void 0 !== b.controls ? l = ea(b.controls) ? new ye(b.controls.slice()) : b.controls : l = Mf();
  if (void 0 !== b.interactions) {
    g = ea(b.interactions) ? new ye(b.interactions.slice()) : b.interactions;
  } else {
    g = {};
    h = new ye;
    k = new Wh;
    (void 0 !== g.altShiftDragRotate ? g.altShiftDragRotate : 1) && h.push(new ri);
    (void 0 !== g.doubleClickZoom ? g.doubleClickZoom : 1) && h.push(new bi({delta:g.zoomDelta, duration:g.zoomDuration}));
    (void 0 !== g.dragPan ? g.dragPan : 1) && h.push(new mi({kinetic:k}));
    (void 0 !== g.pinchRotate ? g.pinchRotate : 1) && h.push(new Li);
    (void 0 !== g.pinchZoom ? g.pinchZoom : 1) && h.push(new Pi({duration:g.zoomDuration}));
    if (void 0 !== g.keyboard ? g.keyboard : 1) {
      h.push(new Fi), h.push(new Hi({delta:g.zoomDelta, duration:g.zoomDuration}));
    }
    (void 0 !== g.mouseWheelZoom ? g.mouseWheelZoom : 1) && h.push(new Ji({duration:g.zoomDuration}));
    (void 0 !== g.shiftDragZoom ? g.shiftDragZoom : 1) && h.push(new Ei({duration:g.zoomDuration}));
    g = h;
  }
  b = void 0 !== b.overlays ? ea(b.overlays) ? new ye(b.overlays.slice()) : b.overlays : new ye;
  return {controls:l, interactions:g, keyboardEventTarget:c, logos:e, overlays:b, Wd:f, values:d};
}
yd(Yi);
yd(ej);
ej.forEach(function(b) {
  Yi.forEach(function(c) {
    zd(b, c, Zi);
    zd(c, b, $i);
  });
});
function Ql(b) {
  b = b ? b : {};
  var c = b.className ? b.className : "ol-scale-line";
  this.f = Le("DIV", c + "-inner");
  this.b = Le("DIV", c + " ol-unselectable", this.f);
  this.s = null;
  this.l = void 0 !== b.minWidth ? b.minWidth : 64;
  this.a = !1;
  this.u = void 0;
  this.o = "";
  df.call(this, {element:this.b, render:b.render ? b.render : Rl, target:b.target});
  Q(this, Dc("units"), this.w, !1, this);
  this.j("units", b.units || "metric");
}
H(Ql, df);
var Sl = [1, 2, 5];
function Rl(b) {
  (b = b.frameState) ? this.s = b.viewState : this.s = null;
  Tl(this);
}
Ql.prototype.w = function() {
  Tl(this);
};
function Tl(b) {
  var c = b.s;
  if (c) {
    var d = c.projection, e = Bd(d), c = d.getPointResolution(c.resolution, c.center) * e, e = b.l * c, d = "", f = b.get("units");
    "degrees" == f ? (d = sd.degrees, c /= d, e < d / 60 ? (d = "\u2033", c *= 3600) : e < d ? (d = "\u2032", c *= 60) : d = "\u00b0") : "imperial" == f ? .9144 > e ? (d = "in", c /= .0254) : 1609.344 > e ? (d = "ft", c /= .3048) : (d = "mi", c /= 1609.344) : "nautical" == f ? (c /= 1852, d = "nm") : "metric" == f ? 1 > e ? (d = "mm", c *= 1E3) : 1E3 > e ? d = "m" : (d = "km", c /= 1E3) : "us" == f && (.9144 > e ? (d = "in", c *= 39.37) : 1609.344 > e ? (d = "ft", c /= .30480061) : (d = "mi", c /= 
    1609.3472));
    for (var f = 3 * Math.floor(Math.log(b.l * c) / Math.log(10)), g;;) {
      g = Sl[(f % 3 + 3) % 3] * Math.pow(10, Math.floor(f / 3));
      e = Math.round(g / c);
      if (isNaN(e)) {
        Ye(b.b, !1);
        b.a = !1;
        return;
      }
      if (e >= b.l) {
        break;
      }
      ++f;
    }
    c = g + " " + d;
    b.o != c && (b.f.innerHTML = c, b.o = c);
    b.u != e && (b.f.style.width = e + "px", b.u = e);
    b.a || (Ye(b.b, !0), b.a = !0);
  } else {
    b.a && (Ye(b.b, !1), b.a = !1);
  }
}
;function Ul() {
  this.defaultDataProjection = null;
}
function Vl(b, c) {
  var d;
  c && (d = {featureProjection:c.featureProjection, dataProjection:c.dataProjection ? c.dataProjection : b.defaultDataProjection, rightHanded:c.rightHanded});
  return d;
}
function Wl(b, c, d) {
  var e = d ? xd(d.featureProjection) : null;
  d = d ? xd(d.dataProjection) : null;
  e && d && !Id(e, d) ? b instanceof Md ? (b = c ? b.clone() : b, b.nb(Jd(c ? e : d, c ? d : e)), c = b) : c = Ld(c ? b.slice() : b, c ? e : d, c ? d : e) : c = b;
  return c;
}
;function Xl() {
  this.defaultDataProjection = null;
}
H(Xl, Ul);
function fl(b) {
  return ia(b) ? b : z(b) ? (b = zk(b)) ? b : null : null;
}
Xl.prototype.M = function() {
  return "json";
};
Xl.prototype.c = function(b, c) {
  var d = fl(b), e;
  c && (e = {dataProjection:c.dataProjection ? c.dataProjection : el(this, fl(b)), featureProjection:c.featureProjection});
  e = Vl(this, e);
  if ("Feature" == d.type) {
    e = [Yl(this, d, e)];
  } else {
    if ("FeatureCollection" == d.type) {
      var f = [], d = d.features, g, h;
      g = 0;
      for (h = d.length;g < h;++g) {
        f.push(Yl(this, d[g], e));
      }
      e = f;
    } else {
      e = [];
    }
  }
  return e;
};
Xl.prototype.b = function(b, c) {
  var d;
  d = Vl(this, c);
  var e = [], f, g;
  f = 0;
  for (g = b.length;f < g;++f) {
    e.push(Zl(this, b[f], d));
  }
  return Ak({type:"FeatureCollection", features:e});
};
function $l(b, c, d, e, f) {
  var g = NaN, h = NaN, k = (d - c) / e;
  if (0 !== k) {
    if (1 == k) {
      g = b[c], h = b[c + 1];
    } else {
      if (2 == k) {
        g = .5 * b[c] + .5 * b[c + e], h = .5 * b[c + 1] + .5 * b[c + e + 1];
      } else {
        var h = b[c], k = b[c + 1], l = 0, g = [0], m;
        for (m = c + e;m < d;m += e) {
          var n = b[m], q = b[m + 1], l = l + Math.sqrt((n - h) * (n - h) + (q - k) * (q - k));
          g.push(l);
          h = n;
          k = q;
        }
        d = .5 * l;
        for (var h = Xa, k = 0, l = g.length, r;k < l;) {
          m = k + l >> 1, n = h(d, g[m]), 0 < n ? k = m + 1 : (l = m, r = !n);
        }
        h = r ? k : ~k;
        0 > h ? (r = (d - g[-h - 2]) / (g[-h - 1] - g[-h - 2]), c += (-h - 2) * e, g = b[c], g = g + r * (b[c + e] - g), d = b[c + 1], h = d + r * (b[c + e + 1] - d)) : (g = b[c + h * e], h = b[c + h * e + 1]);
      }
    }
  }
  return f ? (f[0] = g, f[1] = h, f) : [g, h];
}
;function am(b, c) {
  Z.call(this);
  this.b = null;
  this.l = -1;
  this.S(b, c);
}
H(am, Z);
p = am.prototype;
p.clone = function() {
  var b = new am(null);
  bm(b, this.g, this.a.slice());
  return b;
};
p.J = function() {
  return Ud(this.a, 0, this.a.length, this.B);
};
function Ej(b) {
  if (b.l != b.h) {
    var c;
    c = $l(b.a, 0, b.a.length, b.B, b.b);
    b.b = c;
    b.l = b.h;
  }
  return b.b;
}
p.Ea = function(b) {
  var c = [];
  c.length = Wd(this.a, 0, this.a.length, this.B, b, c, 0);
  b = new am(null);
  bm(b, "XY", c);
  return b;
};
p.M = function() {
  return "LineString";
};
p.S = function(b, c) {
  b ? (Qd(this, c, b, 1), this.a || (this.a = []), this.a.length = Sd(this.a, 0, b, this.B), this.c()) : bm(this, "XY", null);
};
function bm(b, c, d) {
  Pd(b, c, d);
  b.c();
}
;function cm(b, c) {
  Z.call(this);
  this.b = [];
  this.S(b, c);
}
H(cm, Z);
p = cm.prototype;
p.clone = function() {
  var b = new cm(null), c = this.b.slice();
  Pd(b, this.g, this.a.slice());
  b.b = c;
  b.c();
  return b;
};
p.J = function() {
  return Vd(this.a, 0, this.b, this.B);
};
p.Qa = function() {
  return this.b;
};
function Fj(b) {
  var c = [], d = b.a, e = 0, f = b.b;
  b = b.B;
  var g, h;
  g = 0;
  for (h = f.length;g < h;++g) {
    var k = f[g], e = $l(d, e, k, b);
    Sa(c, e);
    e = k;
  }
  return c;
}
p.Ea = function(b) {
  var c = [], d = [], e = this.a, f = this.b, g = this.B, h = 0, k = 0, l, m;
  l = 0;
  for (m = f.length;l < m;++l) {
    var n = f[l], k = Wd(e, h, n, g, b, c, k);
    d.push(k);
    h = n;
  }
  c.length = k;
  b = new cm(null);
  Pd(b, "XY", c);
  b.b = d;
  b.c();
  return b;
};
p.M = function() {
  return "MultiLineString";
};
p.S = function(b, c) {
  if (b) {
    Qd(this, c, b, 2);
    this.a || (this.a = []);
    var d = Td(this.a, 0, b, this.B, this.b);
    this.a.length = 0 === d.length ? 0 : d[d.length - 1];
  } else {
    d = this.b, Pd(this, "XY", null), this.b = d;
  }
  this.c();
};
function dm(b, c) {
  Z.call(this);
  this.S(b, c);
}
H(dm, Z);
dm.prototype.clone = function() {
  var b = new dm(null);
  Pd(b, this.g, this.a.slice());
  b.c();
  return b;
};
dm.prototype.J = function() {
  return Ud(this.a, 0, this.a.length, this.B);
};
dm.prototype.M = function() {
  return "MultiPoint";
};
dm.prototype.S = function(b, c) {
  b ? (Qd(this, c, b, 1), this.a || (this.a = []), this.a.length = Sd(this.a, 0, b, this.B)) : Pd(this, "XY", null);
  this.c();
};
function em(b, c) {
  Z.call(this);
  this.b = [];
  this.w = -1;
  this.A = null;
  this.C = -1;
  this.l = null;
  this.S(b, c);
}
H(em, Z);
p = em.prototype;
p.clone = function() {
  var b = new em(null), c = ub(this.b);
  Pd(b, this.g, this.a.slice());
  b.b = c;
  b.c();
  return b;
};
p.J = function(b) {
  var c;
  void 0 !== b ? (c = Gj(this).slice(), ee(c, this.b, this.B, b)) : c = this.a;
  b = c;
  c = this.b;
  var d = this.B, e = 0, f = [], g = 0, h, k;
  h = 0;
  for (k = c.length;h < k;++h) {
    var l = c[h];
    f[g++] = Vd(b, e, l, d, f[g]);
    e = l[l.length - 1];
  }
  f.length = g;
  return f;
};
function Hj(b) {
  if (b.w != b.h) {
    var c = b.a, d = b.b, e = b.B, f = 0, g = [], h, k, l = Uc();
    h = 0;
    for (k = d.length;h < k;++h) {
      var m = d[h], l = cd(Xc(Infinity, Infinity, -Infinity, -Infinity, void 0), c, f, m[0], e);
      g.push((l[0] + l[2]) / 2, (l[1] + l[3]) / 2);
      f = m[m.length - 1];
    }
    c = Gj(b);
    d = b.b;
    e = b.B;
    f = 0;
    h = [];
    k = 0;
    for (l = d.length;k < l;++k) {
      m = d[k], h = ae(c, f, m, e, g, 2 * k, h), f = m[m.length - 1];
    }
    b.A = h;
    b.w = b.h;
  }
  return b.A;
}
function Gj(b) {
  if (b.C != b.h) {
    var c = b.a, d;
    a: {
      d = b.b;
      var e, f;
      e = 0;
      for (f = d.length;e < f;++e) {
        if (!ce(c, d[e], b.B, void 0)) {
          d = !1;
          break a;
        }
      }
      d = !0;
    }
    d ? b.l = c : (b.l = c.slice(), b.l.length = ee(b.l, b.b, b.B));
    b.C = b.h;
  }
  return b.l;
}
p.Ea = function(b) {
  var c = [], d = [], e = this.a, f = this.b, g = this.B;
  b = Math.sqrt(b);
  var h = 0, k = 0, l, m;
  l = 0;
  for (m = f.length;l < m;++l) {
    var n = f[l], q = [], k = Xd(e, h, n, g, b, c, k, q);
    d.push(q);
    h = n[n.length - 1];
  }
  c.length = k;
  e = new em(null);
  Pd(e, "XY", c);
  e.b = d;
  e.c();
  return e;
};
p.M = function() {
  return "MultiPolygon";
};
p.S = function(b, c) {
  if (b) {
    Qd(this, c, b, 3);
    this.a || (this.a = []);
    var d = this.a, e = this.B, f = this.b, g = 0, f = f ? f : [], h = 0, k, l;
    k = 0;
    for (l = b.length;k < l;++k) {
      g = Td(d, g, b[k], e, f[h]), f[h++] = g, g = g[g.length - 1];
    }
    f.length = h;
    0 === f.length ? this.a.length = 0 : (d = f[f.length - 1], this.a.length = 0 === d.length ? 0 : d[d.length - 1]);
  } else {
    d = this.b, Pd(this, "XY", null), this.b = d;
  }
  this.c();
};
function fm(b) {
  Md.call(this);
  this.a = b ? b : null;
  gm(this);
}
H(fm, Md);
function hm(b) {
  var c, d;
  if (b.a) {
    for (c = 0, d = b.a.length;c < d;++c) {
      sc(b.a[c], "change", b.c, !1, b);
    }
  }
}
function gm(b) {
  var c, d;
  if (b.a) {
    for (c = 0, d = b.a.length;c < d;++c) {
      Q(b.a[c], "change", b.c, !1, b);
    }
  }
}
p = fm.prototype;
p.clone = function() {
  var b = new fm(null), c = this.a, d = [], e, f;
  e = 0;
  for (f = c.length;e < f;++e) {
    d.push(c[e].clone());
  }
  hm(b);
  b.a = d;
  gm(b);
  b.c();
  return b;
};
p.Va = function(b) {
  Xc(Infinity, Infinity, -Infinity, -Infinity, b);
  for (var c = this.a, d = 0, e = c.length;d < e;++d) {
    bd(b, c[d].D());
  }
  return b;
};
p.Ab = function(b) {
  this.s != this.h && (sb(this.f), this.i = 0, this.s = this.h);
  if (0 > b || 0 !== this.i && b < this.i) {
    return this;
  }
  var c = b.toString();
  if (this.f.hasOwnProperty(c)) {
    return this.f[c];
  }
  var d = [], e = this.a, f = !1, g, h;
  g = 0;
  for (h = e.length;g < h;++g) {
    var k = e[g], l = k.Ab(b);
    d.push(l);
    l !== k && (f = !0);
  }
  if (f) {
    return b = new fm(null), hm(b), b.a = d, gm(b), b.c(), this.f[c] = b;
  }
  this.i = b;
  return this;
};
p.M = function() {
  return "GeometryCollection";
};
p.ra = function() {
  return 0 === this.a.length;
};
p.nb = function(b) {
  var c = this.a, d, e;
  d = 0;
  for (e = c.length;d < e;++d) {
    c[d].nb(b);
  }
  this.c();
};
p.I = function() {
  hm(this);
  fm.O.I.call(this);
};
function im(b) {
  b = b ? b : {};
  this.defaultDataProjection = null;
  this.defaultDataProjection = xd(b.defaultDataProjection ? b.defaultDataProjection : "EPSG:4326");
  this.a = b.geometryName;
}
H(im, Xl);
function jm(b, c) {
  return b ? Wl((0,km[b.type])(b), !1, c) : null;
}
function lm(b, c) {
  return (0,mm[b.M()])(Wl(b, !0, c), c);
}
var km = {Point:function(b) {
  return new Zd(b.coordinates);
}, LineString:function(b) {
  return new am(b.coordinates);
}, Polygon:function(b) {
  return new fe(b.coordinates);
}, MultiPoint:function(b) {
  return new dm(b.coordinates);
}, MultiLineString:function(b) {
  return new cm(b.coordinates);
}, MultiPolygon:function(b) {
  return new em(b.coordinates);
}, GeometryCollection:function(b, c) {
  var d = b.geometries.map(function(b) {
    return jm(b, c);
  });
  return new fm(d);
}}, mm = {Point:function(b) {
  return {type:"Point", coordinates:b.J()};
}, LineString:function(b) {
  return {type:"LineString", coordinates:b.J()};
}, Polygon:function(b, c) {
  var d;
  c && (d = c.rightHanded);
  return {type:"Polygon", coordinates:b.J(d)};
}, MultiPoint:function(b) {
  return {type:"MultiPoint", coordinates:b.J()};
}, MultiLineString:function(b) {
  return {type:"MultiLineString", coordinates:b.J()};
}, MultiPolygon:function(b, c) {
  var d;
  c && (d = c.rightHanded);
  return {type:"MultiPolygon", coordinates:b.J(d)};
}, GeometryCollection:function(b, c) {
  return {type:"GeometryCollection", geometries:b.a.map(function(b) {
    return lm(b, c);
  })};
}, Circle:function() {
  return {type:"GeometryCollection", geometries:[]};
}};
function Yl(b, c, d) {
  d = jm(c.geometry, d);
  var e = new uk;
  b.a && wk(e, b.a);
  vk(e, d);
  void 0 !== c.id && (e.za = c.id, e.c());
  c.properties && Bc(e, c.properties);
  return e;
}
function el(b, c) {
  var d = c.crs;
  return d ? "name" == d.type ? xd(d.properties.name) : "EPSG" == d.type ? xd("EPSG:" + d.properties.code) : null : b.defaultDataProjection;
}
function Zl(b, c, d) {
  d = Vl(b, d);
  b = {type:"Feature"};
  var e = c.za;
  void 0 !== e && (b.id = e);
  (e = c.L()) ? b.geometry = lm(e, d) : b.geometry = null;
  d = Ec(c);
  delete d[c.a];
  rb(d) ? b.properties = null : b.properties = d;
  return b;
}
;function nm(b) {
  b = b || {};
  this.j = b.font;
  this.v = b.rotation;
  this.l = b.scale;
  this.b = b.text;
  this.a = b.textAlign;
  this.c = b.textBaseline;
  this.i = void 0 !== b.fill ? b.fill : new ij({color:"#333"});
  this.s = void 0 !== b.stroke ? b.stroke : null;
  this.g = void 0 !== b.offsetX ? b.offsetX : 0;
  this.f = void 0 !== b.offsetY ? b.offsetY : 0;
}
nm.prototype.h = function(b) {
  this.b = b;
};
function om(b, c, d) {
  Z.call(this);
  pm(this, b, c ? c : 0, d);
}
H(om, Z);
om.prototype.clone = function() {
  var b = new om(null);
  Pd(b, this.g, this.a.slice());
  b.c();
  return b;
};
om.prototype.Va = function(b) {
  var c = this.a, d = c[this.B] - c[0];
  return Xc(c[0] - d, c[1] - d, c[0] + d, c[1] + d, b);
};
om.prototype.M = function() {
  return "Circle";
};
function pm(b, c, d, e) {
  if (c) {
    Qd(b, e, c, 0);
    b.a || (b.a = []);
    e = b.a;
    c = Rd(e, c);
    e[c++] = e[0] + d;
    var f;
    d = 1;
    for (f = b.B;d < f;++d) {
      e[c++] = e[d];
    }
    e.length = c;
  } else {
    Pd(b, "XY", null);
  }
  b.c();
}
;function qm(b, c, d) {
  for (var e = [], f = b(0), g = b(1), h = c(f), k = c(g), l = [g, f], m = [k, h], n = [1, 0], q = {}, r = 1E5, t, w, A, u, y;0 < --r && 0 < n.length;) {
    A = n.pop(), f = l.pop(), h = m.pop(), g = A.toString(), g in q || (e.push(h[0], h[1]), q[g] = !0), u = n.pop(), g = l.pop(), k = m.pop(), y = (A + u) / 2, t = b(y), w = c(t), Ga(w[0], w[1], h[0], h[1], k[0], k[1]) < d ? (e.push(k[0], k[1]), g = u.toString(), q[g] = !0) : (n.push(u, y, y, A), m.push(k, w, w, h), l.push(g, t, t, f));
  }
  return e;
}
function rm(b, c, d, e, f) {
  var g = xd("EPSG:4326");
  return qm(function(e) {
    return [b, c + (d - c) * e];
  }, Jd(g, e), f);
}
function sm(b, c, d, e, f) {
  var g = xd("EPSG:4326");
  return qm(function(e) {
    return [c + (d - c) * e, b];
  }, Jd(g, e), f);
}
;function tm(b) {
  b = b || {};
  this.c = this.s = null;
  this.h = this.v = Infinity;
  this.g = this.l = -Infinity;
  this.F = this.C = Infinity;
  this.T = this.N = -Infinity;
  this.fa = void 0 !== b.targetSize ? b.targetSize : 100;
  this.$ = void 0 !== b.maxLines ? b.maxLines : 100;
  this.j = [];
  this.a = [];
  this.f = [];
  this.b = [];
  this.ca = void 0 !== b.strokeStyle ? b.strokeStyle : um;
  this.P = {font:"12px Calibri,sans-serif", textAlign:"center", fill:new ij({color:"rgba(0,0,0,1)"}), stroke:new nj({color:"rgba(255,255,255,1)", width:3})};
  this.H = this.o = void 0;
  this.u = null;
  this.i = void 0 !== b.showLabels ? b.showLabels : !1;
  this.A = void 0 !== b.lonLabelFormatter ? b.lonLabelFormatter : null;
  this.ka = void 0 !== b.lonLabelPosition ? Ea(b.lonLabelPosition, 0, 1) : 1;
  this.w = void 0 !== b.latLabelFormatter ? b.latLabelFormatter : null;
  this.W = void 0 !== b.latLabelPosition ? Ea(b.latLabelPosition, 0, 1) : 1;
  this.setMap(void 0 !== b.map ? b.map : null);
}
var um = new nj({color:"rgba(0,0,0,0.2)"}), vm = [90, 45, 30, 20, 10, 5, 2, 1, .5, .2, .1, .05, .01, .005, .002, .001];
function wm(b, c, d, e, f, g, h) {
  var k = h;
  c = rm(c, d, e, b.c, f);
  k = void 0 !== b.j[k] ? b.j[k] : new am(null);
  bm(k, "XY", c);
  id(k.D(), g) && (b.j[h++] = k);
  return h;
}
function xm(b, c, d, e, f) {
  var g = f;
  d = [rm(c, b.l, b.v, b.c, d)[0], e[1] + Math.abs(e[1] - e[3]) * b.ka];
  g = void 0 !== b.a[g] ? b.a[g].Pa : new Zd(null);
  g.S(d);
  d = new nm(b.P);
  d.h(b.A ? b.A(c) : c.toString());
  d.c = "bottom";
  d.a = "center";
  b.a[f++] = {Pa:g, style:d};
  return f;
}
function ym(b, c, d, e, f) {
  var g = f;
  c = sm(c, b.g, b.h, b.c, d);
  g = void 0 !== b.f[g] ? b.f[g] : new am(null);
  bm(g, "XY", c);
  id(g.D(), e) && (b.f[f++] = g);
  return f;
}
function zm(b, c, d, e, f) {
  var g = f;
  d = sm(c, b.g, b.h, b.c, d);
  e = [e[0] + Math.abs(e[0] - e[2]) * b.W, d[1]];
  g = void 0 !== b.b[g] ? b.b[g].Pa : new Zd(null);
  g.S(e);
  e = new nm(b.P);
  e.c = "middle";
  e.h(b.w ? b.w(c) : c.toString());
  e.a = "right";
  b.b[f++] = {Pa:g, style:e};
  return f;
}
tm.prototype.X = function(b) {
  var c = b.vectorContext, d = b.frameState, e = d.extent;
  b = d.viewState;
  var f = b.center, g = b.projection, h = b.resolution;
  b = d.pixelRatio;
  b = h * h / (4 * b * b);
  if (!this.c || !Id(this.c, g)) {
    var k = xd("EPSG:4326"), l = g.D(), m = g.l, n = Ld(m, k, g), q = m[2], r = m[1], t = m[0], w = n[3], A = n[2], u = n[1], n = n[0];
    this.v = m[3];
    this.h = q;
    this.l = r;
    this.g = t;
    this.C = w;
    this.F = A;
    this.N = u;
    this.T = n;
    this.o = Jd(k, g);
    this.H = Jd(g, k);
    this.u = this.H(fd(l));
    this.c = g;
  }
  k = 0;
  g.a && (g = g.D(), k = Y(g), d = d.focus[0], d < g[0] || d > g[2]) && (k *= Math.ceil((g[0] - d) / k), e = [e[0] + k, e[1], e[2] + k, e[3]]);
  d = this.u[0];
  g = this.u[1];
  k = -1;
  m = Math.pow(this.fa * h, 2);
  q = [];
  r = [];
  h = 0;
  for (l = vm.length;h < l;++h) {
    t = vm[h] / 2;
    q[0] = d - t;
    q[1] = g - t;
    r[0] = d + t;
    r[1] = g + t;
    this.o(q, q);
    this.o(r, r);
    t = Math.pow(r[0] - q[0], 2) + Math.pow(r[1] - q[1], 2);
    if (t <= m) {
      break;
    }
    k = vm[h];
  }
  h = k;
  if (-1 == h) {
    this.j.length = this.f.length = 0, this.a.length = this.b.length = 0;
  } else {
    d = this.H(f);
    f = d[0];
    d = d[1];
    g = this.$;
    k = 0;
    l = [Math.max(e[0], this.T), Math.max(e[1], this.N), Math.min(e[2], this.F), Math.min(e[3], this.C)];
    l = Ld(l, this.c, "EPSG:4326");
    q = l[3];
    t = l[1];
    f = Math.floor(f / h) * h;
    r = Ea(f, this.g, this.h);
    m = wm(this, r, t, q, b, e, 0);
    this.i && (k = xm(this, r, b, e, 0));
    for (l = 0;r != this.g && l++ < g;) {
      r = Math.max(r - h, this.g), m = wm(this, r, t, q, b, e, m), this.i && (k = xm(this, r, b, e, k));
    }
    r = Ea(f, this.g, this.h);
    for (l = 0;r != this.h && l++ < g;) {
      r = Math.min(r + h, this.h), m = wm(this, r, t, q, b, e, m), this.i && (k = xm(this, r, b, e, k));
    }
    this.j.length = m;
    this.a.length = k;
    d = Math.floor(d / h) * h;
    f = Ea(d, this.l, this.v);
    k = 0;
    m = ym(this, f, b, e, 0);
    this.i && (k = zm(this, f, b, e, 0));
    for (l = 0;f != this.l && l++ < g;) {
      f = Math.max(f - h, this.l), m = ym(this, f, b, e, m), this.i && (k = zm(this, f, b, e, k));
    }
    f = Ea(d, this.l, this.v);
    for (l = 0;f != this.v && l++ < g;) {
      f = Math.min(f + h, this.v), m = ym(this, f, b, e, m), this.i && (k = zm(this, f, b, e, k));
    }
    this.f.length = m;
    this.b.length = k;
  }
  c.va(null, this.ca);
  b = 0;
  for (f = this.j.length;b < f;++b) {
    e = this.j[b], c.Na(e, null);
  }
  b = 0;
  for (f = this.f.length;b < f;++b) {
    e = this.f[b], c.Na(e, null);
  }
  if (this.i) {
    b = 0;
    for (f = this.a.length;b < f;++b) {
      e = this.a[b].Pa, h = this.a[b].style, c.pa(h), c.Oa(e, null);
    }
    b = 0;
    for (f = this.b.length;b < f;++b) {
      e = this.b[b].Pa, h = this.b[b].style, c.pa(h), c.Oa(e, null);
    }
  }
};
tm.prototype.setMap = function(b) {
  this.s && (sc(this.s, "postcompose", this.X, !1, this), this.s.render());
  b && (b.v("postcompose", this.X, this), b.render());
  this.s = b;
};
function Am(b, c, d, e, f) {
  kf.call(this, b, c);
  this.j = d;
  this.c = new Image;
  null !== e && (this.c.crossOrigin = e);
  this.b = {};
  this.h = null;
  this.g = f;
}
H(Am, kf);
p = Am.prototype;
p.I = function() {
  1 == this.state && Bm(this);
  this.a && Sb(this.a);
  Am.O.I.call(this);
};
p.da = function(b) {
  if (void 0 !== b) {
    var c = C(b);
    if (c in this.b) {
      return this.b[c];
    }
    b = rb(this.b) ? this.c : this.c.cloneNode(!1);
    return this.b[c] = b;
  }
  return this.c;
};
p.getKey = function() {
  return this.j;
};
p.td = function() {
  this.state = 3;
  Bm(this);
  lf(this);
};
p.ud = function() {
  this.state = this.c.naturalWidth && this.c.naturalHeight ? 2 : 4;
  Bm(this);
  lf(this);
};
p.load = function() {
  0 == this.state && (this.state = 1, lf(this), this.h = [rc(this.c, "error", this.td, !1, this), rc(this.c, "load", this.ud, !1, this)], this.g(this, this.j));
};
function Bm(b) {
  b.h.forEach(T);
  b.h = null;
}
;function Cm(b, c) {
  P.call(this, b);
  this.feature = c;
}
H(Cm, P);
function Dm(b) {
  ji.call(this, {handleDownEvent:Em, handleEvent:Fm, handleUpEvent:Gm});
  this.T = null;
  this.C = !1;
  this.na = b.source ? b.source : null;
  this.la = b.features ? b.features : null;
  this.Bc = b.snapTolerance ? b.snapTolerance : 12;
  this.F = b.type;
  this.b = Hm(this.F);
  this.fa = b.minPoints ? b.minPoints : this.b === Im ? 3 : 2;
  this.ca = b.maxPoints ? b.maxPoints : Infinity;
  var c = b.geometryFunction;
  if (!c) {
    if ("Circle" === this.F) {
      c = function(b, c) {
        var d = c ? c : new om([NaN, NaN]);
        pm(d, b[0], Math.sqrt(Mc(b[0], b[1])));
        return d;
      };
    } else {
      var d, c = this.b;
      c === Jm ? d = Zd : c === Km ? d = am : c === Im && (d = fe);
      c = function(b, c) {
        var g = c;
        g ? g.S(b) : g = new d(b);
        return g;
      };
    }
  }
  this.w = c;
  this.A = this.o = this.a = this.u = this.f = this.i = null;
  this.Ec = b.clickTolerance ? b.clickTolerance * b.clickTolerance : 36;
  this.W = new Qh({source:new rl({useSpatialIndex:!1, wrapX:b.wrapX ? b.wrapX : !1}), style:b.style ? b.style : Lm()});
  this.ma = b.geometryName;
  this.kb = b.condition ? b.condition : fi;
  this.$ = b.freehandCondition ? b.freehandCondition : gi;
  Q(this, Dc("active"), this.xa, !1, this);
}
H(Dm, ji);
function Lm() {
  var b = vj();
  return function(c) {
    return b[c.L().M()];
  };
}
Dm.prototype.setMap = function(b) {
  Dm.O.setMap.call(this, b);
  this.xa();
};
function Fm(b) {
  var c = !this.C;
  this.C && b.type === qh ? (Mm(this, b), c = !1) : b.type === ph ? c = Nm(this, b) : b.type === jh && (c = !1);
  return ki.call(this, b) && c;
}
function Em(b) {
  if (this.kb(b)) {
    return this.T = b.pixel, !0;
  }
  if (this.b !== Km && this.b !== Im || !this.$(b)) {
    return !1;
  }
  this.T = b.pixel;
  this.C = !0;
  this.i || Om(this, b);
  return !0;
}
function Gm(b) {
  this.C = !1;
  var c = this.T, d = b.pixel, e = c[0] - d[0], c = c[1] - d[1], d = !0;
  e * e + c * c <= this.Ec && (Nm(this, b), this.i ? this.b === Pm ? Qm(this) : Rm(this, b) ? Qm(this) : Mm(this, b) : (Om(this, b), this.b === Jm && Qm(this)), d = !1);
  return d;
}
function Nm(b, c) {
  if (b.i) {
    var d = c.coordinate, e = b.f.L(), f;
    b.b === Jm ? f = b.a : b.b === Im ? (f = b.a[0], f = f[f.length - 1], Rm(b, c) && (d = b.i.slice())) : (f = b.a, f = f[f.length - 1]);
    f[0] = d[0];
    f[1] = d[1];
    b.w(b.a, e);
    b.u && b.u.L().S(d);
    e instanceof fe && b.b !== Im ? (b.o || (b.o = new uk(new am(null))), 0 >= e.b.length ? d = null : (d = new Yd(null), Pd(d, e.g, e.a.slice(0, e.b[0])), d.c()), e = b.o.L(), bm(e, d.g, d.a)) : b.A && (e = b.o.L(), e.S(b.A));
    Sm(b);
  } else {
    e = c.coordinate.slice(), b.u ? b.u.L().S(e) : (b.u = new uk(new Zd(e)), Sm(b));
  }
  return !0;
}
function Rm(b, c) {
  var d = !1;
  if (b.f) {
    var e = !1, f = [b.i];
    b.b === Km ? e = b.a.length > b.fa : b.b === Im && (e = b.a[0].length > b.fa, f = [b.a[0][0], b.a[0][b.a[0].length - 2]]);
    if (e) {
      for (var e = c.map, g = 0, h = f.length;g < h;g++) {
        var k = f[g], l = qi(e, k), m = c.pixel, d = m[0] - l[0], l = m[1] - l[1], m = b.C && b.$(c) ? 1 : b.Bc;
        if (d = Math.sqrt(d * d + l * l) <= m) {
          b.i = k;
          break;
        }
      }
    }
  }
  return d;
}
function Om(b, c) {
  var d = c.coordinate;
  b.i = d;
  b.b === Jm ? b.a = d.slice() : b.b === Im ? (b.a = [[d.slice(), d.slice()]], b.A = b.a[0]) : (b.a = [d.slice(), d.slice()], b.b === Pm && (b.A = b.a));
  b.A && (b.o = new uk(new am(b.A)));
  d = b.w(b.a);
  b.f = new uk;
  b.ma && wk(b.f, b.ma);
  vk(b.f, d);
  Sm(b);
  W(b, new Cm("drawstart", b.f));
}
function Mm(b, c) {
  var d = c.coordinate, e = b.f.L(), f, g;
  if (b.b === Km) {
    b.i = d.slice(), g = b.a, g.push(d.slice()), f = g.length > b.ca, b.w(g, e);
  } else {
    if (b.b === Im) {
      g = b.a[0];
      g.push(d.slice());
      if (f = g.length > b.ca) {
        b.i = g[0];
      }
      b.w(b.a, e);
    }
  }
  Sm(b);
  f && Qm(b);
}
function Qm(b) {
  var c = Tm(b), d = b.a, e = c.L();
  b.b === Km ? (d.pop(), b.w(d, e)) : b.b === Im && (d[0].pop(), d[0].push(d[0][0]), b.w(d, e));
  "MultiPoint" === b.F ? vk(c, new dm([d])) : "MultiLineString" === b.F ? vk(c, new cm([d])) : "MultiPolygon" === b.F && vk(c, new em([d]));
  W(b, new Cm("drawend", c));
  b.la && b.la.push(c);
  b.na && (b = b.na, tl(b, c), b.c());
}
function Tm(b) {
  b.i = null;
  var c = b.f;
  c && (b.f = null, b.u = null, b.o = null, b.W.Z().clear(!0));
  return c;
}
Dm.prototype.Ba = ld;
function Sm(b) {
  var c = [];
  b.f && c.push(b.f);
  b.o && c.push(b.o);
  b.u && c.push(b.u);
  b = b.W.Z();
  b.clear(!0);
  hl(b, c);
  b.c();
}
Dm.prototype.xa = function() {
  var b = this.s, c = this.get("active");
  b && c || Tm(this);
  this.W.setMap(c ? b : null);
};
function Hm(b) {
  var c;
  "Point" === b || "MultiPoint" === b ? c = Jm : "LineString" === b || "MultiLineString" === b ? c = Km : "Polygon" === b || "MultiPolygon" === b ? c = Im : "Circle" === b && (c = Pm);
  return c;
}
var Jm = "Point", Km = "LineString", Im = "Polygon", Pm = "Circle";
function Um(b, c, d) {
  P.call(this, b);
  this.features = c;
  this.mapBrowserPointerEvent = d;
}
H(Um, P);
function Vm(b) {
  ji.call(this, {handleDownEvent:Wm, handleDragEvent:Xm, handleEvent:Ym, handleUpEvent:Zm});
  this.ca = b.deleteCondition ? b.deleteCondition : od(fi, ei);
  this.$ = this.b = null;
  this.T = [0, 0];
  this.u = this.C = !1;
  this.a = new kl;
  this.w = void 0 !== b.pixelTolerance ? b.pixelTolerance : 10;
  this.i = this.W = !1;
  this.f = null;
  this.A = new Qh({source:new rl({useSpatialIndex:!1, wrapX:!!b.wrapX}), style:b.style ? b.style : $m(), updateWhileAnimating:!0, updateWhileInteracting:!0});
  this.F = {Point:this.Cd, LineString:this.cc, LinearRing:this.cc, Polygon:this.Dd, MultiPoint:this.Ad, MultiLineString:this.zd, MultiPolygon:this.Bd, GeometryCollection:this.yd};
  this.o = b.features;
  this.o.forEach(this.Gb, this);
  Q(this.o, "add", this.wd, !1, this);
  Q(this.o, "remove", this.xd, !1, this);
}
H(Vm, ji);
p = Vm.prototype;
p.Gb = function(b) {
  var c = b.L();
  c.M() in this.F && this.F[c.M()].call(this, b, c);
  (c = this.s) && an(this, this.T, c);
  Q(b, "change", this.bc, !1, this);
};
function bn(b, c) {
  b.u || (b.u = !0, W(b, new Um("modifystart", b.o, c)));
}
function cn(b, c) {
  dn(b, c);
  b.b && 0 === Ae(b.o) && (xl(b.A.Z(), b.b), b.b = null);
  sc(c, "change", b.bc, !1, b);
}
function dn(b, c) {
  var d = b.a, e = [];
  d.forEach(function(b) {
    c === b.feature && e.push(b);
  });
  for (var f = e.length - 1;0 <= f;--f) {
    d.remove(e[f]);
  }
}
p.setMap = function(b) {
  this.A.setMap(b);
  Vm.O.setMap.call(this, b);
};
p.wd = function(b) {
  this.Gb(b.element);
};
p.bc = function(b) {
  this.i || (b = b.target, cn(this, b), this.Gb(b));
};
p.xd = function(b) {
  cn(this, b.element);
};
p.Cd = function(b, c) {
  var d = c.J(), d = {feature:b, geometry:c, K:[d, d]};
  this.a.V(c.D(), d);
};
p.Ad = function(b, c) {
  var d = c.J(), e, f, g;
  f = 0;
  for (g = d.length;f < g;++f) {
    e = d[f], e = {feature:b, geometry:c, depth:[f], index:f, K:[e, e]}, this.a.V(c.D(), e);
  }
};
p.cc = function(b, c) {
  var d = c.J(), e, f, g, h;
  e = 0;
  for (f = d.length - 1;e < f;++e) {
    g = d.slice(e, e + 2), h = {feature:b, geometry:c, index:e, K:g}, this.a.V(Tc(g), h);
  }
};
p.zd = function(b, c) {
  var d = c.J(), e, f, g, h, k, l, m;
  h = 0;
  for (k = d.length;h < k;++h) {
    for (e = d[h], f = 0, g = e.length - 1;f < g;++f) {
      l = e.slice(f, f + 2), m = {feature:b, geometry:c, depth:[h], index:f, K:l}, this.a.V(Tc(l), m);
    }
  }
};
p.Dd = function(b, c) {
  var d = c.J(), e, f, g, h, k, l, m;
  h = 0;
  for (k = d.length;h < k;++h) {
    for (e = d[h], f = 0, g = e.length - 1;f < g;++f) {
      l = e.slice(f, f + 2), m = {feature:b, geometry:c, depth:[h], index:f, K:l}, this.a.V(Tc(l), m);
    }
  }
};
p.Bd = function(b, c) {
  var d = c.J(), e, f, g, h, k, l, m, n, q, r;
  l = 0;
  for (m = d.length;l < m;++l) {
    for (n = d[l], h = 0, k = n.length;h < k;++h) {
      for (e = n[h], f = 0, g = e.length - 1;f < g;++f) {
        q = e.slice(f, f + 2), r = {feature:b, geometry:c, depth:[h, l], index:f, K:q}, this.a.V(Tc(q), r);
      }
    }
  }
};
p.yd = function(b, c) {
  var d, e = c.a;
  for (d = 0;d < e.length;++d) {
    this.F[e[d].M()].call(this, b, e[d]);
  }
};
function en(b, c) {
  var d = b.b;
  if (d) {
    d.L().S(c);
  } else {
    d = new uk(new Zd(c));
    b.b = d;
    var e = b.A.Z();
    tl(e, d);
    e.c();
  }
}
function fn(b, c) {
  return b.index - c.index;
}
function Wm(b) {
  an(this, b.pixel, b.map);
  this.f = [];
  this.u = !1;
  var c = this.b;
  if (c) {
    var d = [], c = c.L().J(), e = Tc([c]), e = nl(this.a, e), f = {};
    e.sort(fn);
    for (var g = 0, h = e.length;g < h;++g) {
      var k = e[g], l = k.K, m = C(k.feature), n = k.depth;
      n && (m += "-" + n.join("-"));
      f[m] || (f[m] = Array(2));
      if (Kc(l[0], c) && !f[m][0]) {
        this.f.push([k, 0]), f[m][0] = k;
      } else {
        if (Kc(l[1], c) && !f[m][1]) {
          if ("LineString" !== k.geometry.M() && "MultiLineString" !== k.geometry.M() || !f[m][0] || 0 !== f[m][0].index) {
            this.f.push([k, 1]), f[m][1] = k;
          }
        } else {
          C(l) in this.$ && !f[m][0] && !f[m][1] && d.push([k, c]);
        }
      }
    }
    d.length && bn(this, b);
    for (b = d.length - 1;0 <= b;--b) {
      this.bd.apply(this, d[b]);
    }
  }
  return !!this.b;
}
function Xm(b) {
  this.C = !1;
  bn(this, b);
  b = b.coordinate;
  for (var c = 0, d = this.f.length;c < d;++c) {
    for (var e = this.f[c], f = e[0], g = f.depth, h = f.geometry, k = h.J(), l = f.K, e = e[1];b.length < h.B;) {
      b.push(0);
    }
    switch(h.M()) {
      case "Point":
        k = b;
        l[0] = l[1] = b;
        break;
      case "MultiPoint":
        k[f.index] = b;
        l[0] = l[1] = b;
        break;
      case "LineString":
        k[f.index + e] = b;
        l[e] = b;
        break;
      case "MultiLineString":
        k[g[0]][f.index + e] = b;
        l[e] = b;
        break;
      case "Polygon":
        k[g[0]][f.index + e] = b;
        l[e] = b;
        break;
      case "MultiPolygon":
        k[g[1]][g[0]][f.index + e] = b, l[e] = b;
    }
    f = h;
    this.i = !0;
    f.S(k);
    this.i = !1;
  }
  en(this, b);
}
function Zm(b) {
  for (var c, d = this.f.length - 1;0 <= d;--d) {
    c = this.f[d][0], ll(this.a, Tc(c.K), c);
  }
  this.u && (W(this, new Um("modifyend", this.o, b)), this.u = !1);
  return !1;
}
function Ym(b) {
  if (!(b instanceof fh)) {
    return !0;
  }
  var c;
  b.map.U().b.slice()[1] || b.type != ph || this.l || (this.T = b.pixel, an(this, b.pixel, b.map));
  if (this.b && this.ca(b)) {
    if (b.type == kh && this.C) {
      c = !0;
    } else {
      this.b.L();
      bn(this, b);
      c = this.f;
      var d = {}, e, f, g, h, k, l, m, n, q;
      for (k = c.length - 1;0 <= k;--k) {
        if (g = c[k], n = g[0], h = n.geometry, f = h.J(), q = C(n.feature), n.depth && (q += "-" + n.depth.join("-")), m = e = l = void 0, 0 === g[1] ? (e = n, l = n.index) : 1 == g[1] && (m = n, l = n.index + 1), q in d || (d[q] = [m, e, l]), g = d[q], void 0 !== m && (g[0] = m), void 0 !== e && (g[1] = e), void 0 !== g[0] && void 0 !== g[1]) {
          e = f;
          q = !1;
          m = l - 1;
          switch(h.M()) {
            case "MultiLineString":
              f[n.depth[0]].splice(l, 1);
              q = !0;
              break;
            case "LineString":
              f.splice(l, 1);
              q = !0;
              break;
            case "MultiPolygon":
              e = e[n.depth[1]];
            case "Polygon":
              e = e[n.depth[0]], 4 < e.length && (l == e.length - 1 && (l = 0), e.splice(l, 1), q = !0, 0 === l && (e.pop(), e.push(e[0]), m = e.length - 1));
          }
          q && (this.a.remove(g[0]), this.a.remove(g[1]), e = h, this.i = !0, e.S(f), this.i = !1, f = {depth:n.depth, feature:n.feature, geometry:n.geometry, index:m, K:[g[0].K[0], g[1].K[1]]}, this.a.V(Tc(f.K), f), gn(this, h, l, n.depth, -1), this.b && (xl(this.A.Z(), this.b), this.b = null));
        }
      }
      c = !0;
      W(this, new Um("modifyend", this.o, b));
      this.u = !1;
    }
  }
  b.type == kh && (this.C = !1);
  return ki.call(this, b) && !c;
}
function an(b, c, d) {
  function e(b, c) {
    return Nc(f, b.K) - Nc(f, c.K);
  }
  var f = d.ga(c), g = d.ga([c[0] - b.w, c[1] + b.w]), h = d.ga([c[0] + b.w, c[1] - b.w]), g = Tc([g, h]), g = nl(b.a, g);
  if (0 < g.length) {
    g.sort(e);
    var h = g[0].K, k = Ic(f, h), l = qi(d, k);
    if (Math.sqrt(Mc(c, l)) <= b.w) {
      c = qi(d, h[0]);
      d = qi(d, h[1]);
      c = Mc(l, c);
      d = Mc(l, d);
      b.W = Math.sqrt(Math.min(c, d)) <= b.w;
      b.W && (k = c > d ? h[1] : h[0]);
      en(b, k);
      d = {};
      d[C(h)] = !0;
      c = 1;
      for (l = g.length;c < l;++c) {
        if (k = g[c].K, Kc(h[0], k[0]) && Kc(h[1], k[1]) || Kc(h[0], k[1]) && Kc(h[1], k[0])) {
          d[C(k)] = !0;
        } else {
          break;
        }
      }
      b.$ = d;
      return;
    }
  }
  b.b && (xl(b.A.Z(), b.b), b.b = null);
}
p.bd = function(b, c) {
  for (var d = b.K, e = b.feature, f = b.geometry, g = b.depth, h = b.index, k;c.length < f.B;) {
    c.push(0);
  }
  switch(f.M()) {
    case "MultiLineString":
      k = f.J();
      k[g[0]].splice(h + 1, 0, c);
      break;
    case "Polygon":
      k = f.J();
      k[g[0]].splice(h + 1, 0, c);
      break;
    case "MultiPolygon":
      k = f.J();
      k[g[1]][g[0]].splice(h + 1, 0, c);
      break;
    case "LineString":
      k = f.J();
      k.splice(h + 1, 0, c);
      break;
    default:
      return;
  }
  this.i = !0;
  f.S(k);
  this.i = !1;
  k = this.a;
  k.remove(b);
  gn(this, f, h, g, 1);
  var l = {K:[d[0], c], feature:e, geometry:f, depth:g, index:h};
  k.V(Tc(l.K), l);
  this.f.push([l, 1]);
  d = {K:[c, d[1]], feature:e, geometry:f, depth:g, index:h + 1};
  k.V(Tc(d.K), d);
  this.f.push([d, 0]);
  this.C = !0;
};
function gn(b, c, d, e, f) {
  ql(b.a, c.D(), function(b) {
    b.geometry === c && (void 0 === e || void 0 === b.depth || $a(b.depth, e)) && b.index > d && (b.index += f);
  });
}
function $m() {
  var b = vj();
  return function() {
    return b.Point;
  };
}
;function hn(b, c, d, e) {
  P.call(this, b);
  this.selected = c;
  this.deselected = d;
  this.mapBrowserEvent = e;
}
H(hn, P);
function jn(b) {
  Yh.call(this, {handleEvent:kn});
  var c = b ? b : {};
  this.o = c.condition ? c.condition : ei;
  this.i = c.addCondition ? c.addCondition : ld;
  this.C = c.removeCondition ? c.removeCondition : ld;
  this.F = c.toggleCondition ? c.toggleCondition : gi;
  this.l = c.multi ? c.multi : !1;
  this.g = c.filter ? c.filter : md;
  var d = new Qh({source:new rl({useSpatialIndex:!1, features:c.features, wrapX:c.wrapX}), style:c.style ? c.style : ln(), updateWhileAnimating:!0, updateWhileInteracting:!0});
  this.a = d;
  if (c.layers) {
    if (ha(c.layers)) {
      b = function(b) {
        return b === d || c.layers(b);
      };
    } else {
      var e = c.layers;
      b = function(b) {
        return b === d || 0 <= e.indexOf(b);
      };
    }
  } else {
    b = md;
  }
  this.f = b;
  this.b = {};
  b = zl(this.a.Z());
  Q(b, "add", this.u, !1, this);
  Q(b, "remove", this.A, !1, this);
}
H(jn, Yh);
jn.prototype.w = function() {
  return zl(this.a.Z());
};
function kn(b) {
  if (!this.o(b)) {
    return !0;
  }
  var c = this.i(b), d = this.C(b), e = this.F(b), f = !c && !d && !e, g = b.map, h = zl(this.a.Z()), k = [], l = [], m = !1;
  if (f) {
    Ol(g, b.pixel, function(b, c) {
      if (this.g(b, c)) {
        l.push(b);
        var d = C(b);
        this.b[d] = c;
        return !this.l;
      }
    }, this, this.f), 0 < l.length && 1 == Ae(h) && h.item(0) == l[0] || (m = !0, 0 !== Ae(h) && (k = Array.prototype.concat(h.a), h.clear()), h.Fb(l), 0 === l.length ? sb(this.b) : 0 < k.length && k.forEach(function(b) {
      b = C(b);
      delete this.b[b];
    }, this));
  } else {
    Ol(g, b.pixel, function(b, f) {
      if (f !== this.a) {
        if ((c || e) && !(!this.g(b, f) || 0 <= h.a.indexOf(b) || 0 <= l.indexOf(b))) {
          l.push(b);
          var g = C(b);
          this.b[g] = f;
        }
      } else {
        if (d || e) {
          k.push(b), g = C(b), delete this.b[g];
        }
      }
    }, this, this.f);
    for (f = k.length - 1;0 <= f;--f) {
      h.remove(k[f]);
    }
    h.Fb(l);
    if (0 < l.length || 0 < k.length) {
      m = !0;
    }
  }
  m && W(this, new hn("select", l, k, b));
  return "pointermove" == b.type;
}
jn.prototype.setMap = function(b) {
  var c = this.s, d = zl(this.a.Z());
  c && d.forEach(c.pc, c);
  jn.O.setMap.call(this, b);
  this.a.setMap(b);
  b && d.forEach(b.nc, b);
};
function ln() {
  var b = vj();
  Sa(b.Polygon, b.LineString);
  Sa(b.GeometryCollection, b.LineString);
  return function(c) {
    return b[c.L().M()];
  };
}
jn.prototype.u = function(b) {
  b = b.element;
  var c = this.s;
  c && c.nc(b);
};
jn.prototype.A = function(b) {
  b = b.element;
  var c = this.s;
  c && c.pc(b);
};
function mn(b) {
  ji.call(this, {handleEvent:nn, handleDownEvent:md, handleUpEvent:on});
  b = b ? b : {};
  this.i = b.source ? b.source : null;
  this.f = b.features ? b.features : null;
  this.T = [];
  this.u = {};
  this.w = {};
  this.C = {};
  this.o = {};
  this.A = null;
  this.b = void 0 !== b.pixelTolerance ? b.pixelTolerance : 10;
  this.W = pn.bind(this);
  this.a = new kl;
  this.F = {Point:this.Jd, LineString:this.fc, LinearRing:this.fc, Polygon:this.Kd, MultiPoint:this.Hd, MultiLineString:this.Gd, MultiPolygon:this.Id, GeometryCollection:this.Fd};
}
H(mn, ji);
function qn(b, c, d) {
  d = void 0 !== d ? d : !0;
  var e = c.L(), f = b.F[e.M()];
  if (f) {
    var g = C(c);
    b.C[g] = e.D(Uc());
    f.call(b, c, e);
    d && (b.w[g] = e.v("change", b.Nc.bind(b, c), b), b.u[g] = c.v(Dc(c.a), b.Ed, b));
  }
}
p = mn.prototype;
p.Ic = function(b) {
  qn(this, b);
};
p.Jc = function(b) {
  rn(this, b);
};
p.dc = function(b) {
  var c;
  b instanceof wl ? c = b.feature : b instanceof xe && (c = b.element);
  qn(this, c);
};
p.ec = function(b) {
  var c;
  b instanceof wl ? c = b.feature : b instanceof xe && (c = b.element);
  rn(this, c);
};
p.Ed = function(b) {
  b = b.b;
  rn(this, b, !0);
  qn(this, b, !0);
};
p.Nc = function(b) {
  if (this.l) {
    var c = C(b);
    c in this.o || (this.o[c] = b);
  } else {
    this.qc(b);
  }
};
function rn(b, c, d) {
  d = void 0 !== d ? d : !0;
  var e = C(c), f = b.C[e];
  if (f) {
    var g = b.a, h = [];
    ql(g, f, function(b) {
      c === b.feature && h.push(b);
    });
    for (f = h.length - 1;0 <= f;--f) {
      g.remove(h[f]);
    }
    d && (T(b.w[e]), delete b.w[e], T(b.u[e]), delete b.u[e]);
  }
}
p.setMap = function(b) {
  var c = this.s, d = this.T, e, f;
  this.f ? f = this.f : this.i && (f = this.i, f.f ? e = f.f.a : f.a && (e = ml(f.a), rb(f.b) || Sa(e, qb(f.b))), f = e);
  e = f;
  c && (d.forEach(zc), d.length = 0, e.forEach(this.Jc, this));
  mn.O.setMap.call(this, b);
  b && (this.f ? (d.push(this.f.v("add", this.dc, this)), d.push(this.f.v("remove", this.ec, this))) : this.i && (d.push(this.i.v("addfeature", this.dc, this)), d.push(this.i.v("removefeature", this.ec, this))), e.forEach(this.Ic, this));
};
p.Ba = ld;
p.qc = function(b) {
  rn(this, b, !1);
  qn(this, b, !1);
};
p.Fd = function(b, c) {
  var d, e = c.a;
  for (d = 0;d < e.length;++d) {
    this.F[e[d].M()].call(this, b, e[d]);
  }
};
p.fc = function(b, c) {
  var d = c.J(), e, f, g, h;
  e = 0;
  for (f = d.length - 1;e < f;++e) {
    g = d.slice(e, e + 2), h = {feature:b, K:g}, this.a.V(Tc(g), h);
  }
};
p.Gd = function(b, c) {
  var d = c.J(), e, f, g, h, k, l, m;
  h = 0;
  for (k = d.length;h < k;++h) {
    for (e = d[h], f = 0, g = e.length - 1;f < g;++f) {
      l = e.slice(f, f + 2), m = {feature:b, K:l}, this.a.V(Tc(l), m);
    }
  }
};
p.Hd = function(b, c) {
  var d = c.J(), e, f, g;
  f = 0;
  for (g = d.length;f < g;++f) {
    e = d[f], e = {feature:b, K:[e, e]}, this.a.V(c.D(), e);
  }
};
p.Id = function(b, c) {
  var d = c.J(), e, f, g, h, k, l, m, n, q, r;
  l = 0;
  for (m = d.length;l < m;++l) {
    for (n = d[l], h = 0, k = n.length;h < k;++h) {
      for (e = n[h], f = 0, g = e.length - 1;f < g;++f) {
        q = e.slice(f, f + 2), r = {feature:b, K:q}, this.a.V(Tc(q), r);
      }
    }
  }
};
p.Jd = function(b, c) {
  var d = c.J(), d = {feature:b, K:[d, d]};
  this.a.V(c.D(), d);
};
p.Kd = function(b, c) {
  var d = c.J(), e, f, g, h, k, l, m;
  h = 0;
  for (k = d.length;h < k;++h) {
    for (e = d[h], f = 0, g = e.length - 1;f < g;++f) {
      l = e.slice(f, f + 2), m = {feature:b, K:l}, this.a.V(Tc(l), m);
    }
  }
};
function nn(b) {
  var c, d, e = b.pixel, f = b.coordinate;
  c = b.map;
  var g = c.ga([e[0] - this.b, e[1] + this.b]);
  d = c.ga([e[0] + this.b, e[1] - this.b]);
  var g = Tc([g, d]), h = nl(this.a, g), k = !1, g = !1, l = null;
  d = null;
  0 < h.length && (this.A = f, h.sort(this.W), h = h[0].K, l = Ic(f, h), d = qi(c, l), Math.sqrt(Mc(e, d)) <= this.b && (g = !0, e = qi(c, h[0]), f = qi(c, h[1]), e = Mc(d, e), f = Mc(d, f), k = Math.sqrt(Math.min(e, f)) <= this.b)) && (l = e > f ? h[1] : h[0], d = qi(c, l), d = [Math.round(d[0]), Math.round(d[1])]);
  c = l;
  g && (b.coordinate = c.slice(0, 2), b.pixel = d);
  return ki.call(this, b);
}
function on() {
  var b = qb(this.o);
  b.length && (b.forEach(this.qc, this), this.o = {});
  return !1;
}
function pn(b, c) {
  return Nc(this.A, b.K) - Nc(this.A, c.K);
}
;function sn(b, c, d, e, f, g, h, k, l, m) {
  kf.call(this, f, 0);
  this.u = void 0 !== m ? m : !1;
  this.o = h;
  this.j = null;
  this.h = {};
  this.g = c;
  this.i = e;
  this.v = g ? g : f;
  this.c = [];
  this.b = null;
  this.f = 0;
  g = sf(e, this.v);
  m = this.i.D();
  f = this.g.D();
  g = m ? hd(g, m) : g;
  if (0 === dd(g)) {
    this.state = 4;
  } else {
    (m = b.D()) && (f ? f = hd(f, m) : f = m);
    m = e.R(this.v[0]);
    var n = fd(g);
    e = Jd(d, b)(n, void 0, n.length);
    m = d.getPointResolution(m, n);
    n = Bd(d);
    void 0 !== n && (m *= n);
    n = Bd(b);
    void 0 !== n && (m /= n);
    e = b.getPointResolution(m, e) / m;
    isFinite(e) && !isNaN(e) && 0 < e && (m /= e);
    e = m;
    if (!isFinite(e) || isNaN(e) || 0 >= e) {
      this.state = 4;
    } else {
      if (this.l = new rk(b, d, g, f, e * (void 0 !== l ? l : .5)), 0 === this.l.h.length) {
        this.state = 4;
      } else {
        if (this.f = zf(c, e), d = tk(this.l), f && (b.a ? (d[1] = Ea(d[1], f[1], f[3]), d[3] = Ea(d[3], f[1], f[3])) : d = hd(d, f)), dd(d)) {
          if (b = tf(c, d, this.f), 100 > (b.c - b.a + 1) * we(b)) {
            for (c = b.a;c <= b.c;c++) {
              for (d = b.h;d <= b.b;d++) {
                (l = k(this.f, c, d, h)) && this.c.push(l);
              }
            }
            0 === this.c.length && (this.state = 4);
          } else {
            this.state = 3;
          }
        } else {
          this.state = 4;
        }
      }
    }
  }
}
H(sn, kf);
sn.prototype.I = function() {
  1 == this.state && (this.b.forEach(T), this.b = null);
  sn.O.I.call(this);
};
sn.prototype.da = function(b) {
  if (void 0 !== b) {
    var c = C(b);
    if (c in this.h) {
      return this.h[c];
    }
    b = rb(this.h) ? this.j : this.j.cloneNode(!1);
    return this.h[c] = b;
  }
  return this.j;
};
sn.prototype.s = function() {
  var b = [];
  this.c.forEach(function(c) {
    c && 2 == c.Y() && b.push({extent:sf(this.g, c.ba), image:c.da()});
  }, this);
  this.c.length = 0;
  if (0 === b.length) {
    this.state = 3;
  } else {
    var c = this.v[0], d = yf(this.i, c), e = ga(d) ? d : d[0], d = ga(d) ? d : d[1], c = this.i.R(c), f = this.g.R(this.f), g = sf(this.i, this.v);
    this.j = qk(e, d, this.o, f, this.g.D(), c, g, this.l, b, this.u);
    this.state = 2;
  }
  lf(this);
};
sn.prototype.load = function() {
  if (0 == this.state) {
    this.state = 1;
    lf(this);
    var b = 0;
    this.b = [];
    this.c.forEach(function(c) {
      var d = c.Y();
      if (0 == d || 1 == d) {
        b++;
        var e;
        e = lc(c, "change", function() {
          var d = c.Y();
          if (2 == d || 3 == d || 4 == d) {
            T(e), b--, 0 === b && (this.b.forEach(T), this.b = null, this.s());
          }
        }, !1, this);
        this.b.push(e);
      }
    }, this);
    this.c.forEach(function(b) {
      0 == b.Y() && b.load();
    });
    0 === b && v.setTimeout(this.s.bind(this), 0);
  }
};
function tn(b) {
  Hl.call(this, {attributions:b.attributions, extent:b.extent, logo:b.logo, opaque:b.opaque, projection:b.projection, state:b.state, tileGrid:b.tileGrid, tileLoadFunction:b.tileLoadFunction ? b.tileLoadFunction : un, tilePixelRatio:b.tilePixelRatio, tileUrlFunction:b.tileUrlFunction, url:b.url, urls:b.urls, wrapX:b.wrapX});
  this.crossOrigin = void 0 !== b.crossOrigin ? b.crossOrigin : null;
  this.tileClass = void 0 !== b.tileClass ? b.tileClass : Am;
  this.g = {};
  this.l = {};
  this.ma = b.reprojectionErrorThreshold;
}
H(tn, Hl);
p = tn.prototype;
p.gc = function() {
  return hf(this.a) ? !0 : ob(this.g, function(b) {
    return hf(b);
  });
};
p.hc = function(b, c) {
  var d = this.Sa(b);
  jf(this.a, this.a == d ? c : {});
  nb(this.g, function(b) {
    jf(b, b == d ? c : {});
  });
};
p.zb = function(b) {
  return this.i && b && !Id(this.i, b) ? !1 : tn.O.zb.call(this, b);
};
p.ya = function(b) {
  var c = this.i;
  return !this.tileGrid || c && !Id(c, b) ? (c = C(b).toString(), c in this.l || (this.l[c] = Af(b)), this.l[c]) : this.tileGrid;
};
p.Sa = function(b) {
  var c = this.i;
  if (!c || Id(c, b)) {
    return this.a;
  }
  b = C(b).toString();
  b in this.g || (this.g[b] = new gf);
  return this.g[b];
};
function vn(b, c, d, e, f, g, h) {
  c = [c, d, e];
  f = (d = Ff(b, c, g)) ? b.tileUrlFunction(d, f, g) : void 0;
  f = new b.tileClass(c, void 0 !== f ? 0 : 4, void 0 !== f ? f : "", b.crossOrigin, b.tileLoadFunction);
  f.key = h;
  Q(f, "change", b.T, !1, b);
  return f;
}
function Hh(b, c, d, e, f, g) {
  if (b.i && g && !Id(b.i, g)) {
    f = b.Sa(g);
    d = [c, d, e];
    c = b.Xa.apply(b, d);
    if (f.b.hasOwnProperty(c)) {
      return f.get(c);
    }
    var h = b.i;
    e = b.ya(h);
    var k = b.ya(g), l = Ff(b, d, g);
    b = new sn(h, e, g, k, d, l, b.u, function(b, c, d, e) {
      return wn(this, b, c, d, e, h);
    }.bind(b), b.ma, !1);
    ff(f, c, b);
    return b;
  }
  return wn(b, c, d, e, f, g);
}
function wn(b, c, d, e, f, g) {
  var h = null, k = b.Xa(c, d, e), l = b.Xb();
  if (b.a.b.hasOwnProperty(k)) {
    if (h = b.a.get(k), h.key != l) {
      var m = h;
      h.a && h.a.key == l ? (h = h.a, 2 == m.Y() && (h.a = m)) : (h = vn(b, c, d, e, f, g, l), 2 == m.Y() ? h.a = m : m.a && 2 == m.a.Y() && (h.a = m.a, m.a = null));
      h.a && (h.a.a = null);
      b.a.replace(k, h);
    }
  } else {
    h = vn(b, c, d, e, f, g, l), ff(b.a, k, h);
  }
  return h;
}
function un(b, c) {
  b.da().src = c;
}
;function xn(b) {
  this.i = b.matrixIds;
  of.call(this, {extent:b.extent, origin:b.origin, origins:b.origins, resolutions:b.resolutions, tileSize:b.tileSize, tileSizes:b.tileSizes, sizes:b.sizes});
}
H(xn, of);
function yn(b) {
  function c(b) {
    b = "KVP" == e ? Ik(Kk([b], g)) : b.replace(/\{(\w+?)\}/g, function(b, c) {
      return c.toLowerCase() in g ? g[c.toLowerCase()] : b;
    });
    return function(c) {
      if (c) {
        var d = {TileMatrix:f.i[c[0]], TileCol:c[1], TileRow:-c[2] - 1};
        wb(d, h);
        c = b;
        return c = "KVP" == e ? Ik(Kk([c], d)) : c.replace(/\{(\w+?)\}/g, function(b, c) {
          return d[c];
        });
      }
    };
  }
  this.fa = void 0 !== b.version ? b.version : "1.0.0";
  this.W = void 0 !== b.format ? b.format : "image/jpeg";
  this.f = void 0 !== b.dimensions ? b.dimensions : {};
  this.s = "";
  zn(this);
  this.$ = b.layer;
  this.F = b.matrixSet;
  this.ca = b.style;
  var d = b.urls;
  void 0 === d && void 0 !== b.url && (d = Gl(b.url));
  var e = this.na = void 0 !== b.requestEncoding ? b.requestEncoding : "KVP", f = b.tileGrid, g = {layer:this.$, style:this.ca, tilematrixset:this.F};
  "KVP" == e && wb(g, {Service:"WMTS", Request:"GetTile", Version:this.fa, Format:this.W});
  var h = this.f, k = d && 0 < d.length ? El(d.map(c)) : Fl;
  tn.call(this, {attributions:b.attributions, crossOrigin:b.crossOrigin, logo:b.logo, projection:b.projection, reprojectionErrorThreshold:b.reprojectionErrorThreshold, tileClass:b.tileClass, tileGrid:f, tileLoadFunction:b.tileLoadFunction, tilePixelRatio:b.tilePixelRatio, tileUrlFunction:k, urls:d, wrapX:void 0 !== b.wrapX ? b.wrapX : !1});
}
H(yn, tn);
yn.prototype.Xb = function() {
  return this.s;
};
function zn(b) {
  var c = 0, d = [], e;
  for (e in b.f) {
    d[c++] = e + "-" + b.f[e];
  }
  b.s = d.join("/");
}
;D("ol.extent.getWidth", Y);
D("ol.extent.getTopLeft", jd);
D("ol.Map", Ml);
Ml.prototype.addInteraction = Ml.prototype.Cc;
Ml.prototype.getSize = Ml.prototype.cb;
Ml.prototype.setSize = Ml.prototype.Ib;
Ml.prototype.getView = Ml.prototype.U;
Ml.prototype.once = Ml.prototype.tc;
Ml.prototype.on = Ml.prototype.v;
Ml.prototype.renderSync = Ml.prototype.Vd;
D("ol.View", je);
je.prototype.fit = je.prototype.Hc;
je.prototype.calculateExtent = je.prototype.Fc;
je.prototype.getCenter = je.prototype.ja;
je.prototype.getZoom = je.prototype.Lc;
je.prototype.setCenter = je.prototype.sa;
je.prototype.setZoom = je.prototype.Xd;
D("ol.Collection", ye);
ye.prototype.getArray = ye.prototype.sd;
ye.prototype.extend = ye.prototype.Fb;
ye.prototype.clear = ye.prototype.clear;
D("ol.Graticule", tm);
D("ol.Sphere", pd);
D("ol.tilegrid.WMTS", xn);
D("ol.source.WMTS", yn);
D("ol.source.Vector", rl);
rl.prototype.getExtent = rl.prototype.D;
D("ol.layer.Tile", Oh);
D("ol.layer.Vector", Qh);
Qh.prototype.getSource = Qh.prototype.Z;
D("ol.style.Style", pj);
pj.prototype.getText = pj.prototype.i;
D("ol.style.Stroke", nj);
D("ol.style.Circle", oj);
D("ol.style.Fill", ij);
D("ol.style.Text", nm);
nm.prototype.setText = nm.prototype.h;
D("ol.format.GeoJSON", im);
im.prototype.readFeatures = im.prototype.c;
im.prototype.writeFeatures = im.prototype.b;
Yh.prototype.setActive = Yh.prototype.wa;
D("ol.interaction.Draw", Dm);
D("ol.interaction.Select", jn);
jn.prototype.on = jn.prototype.v;
jn.prototype.getFeatures = jn.prototype.w;
D("ol.interaction.Modify", Vm);
D("ol.interaction.Snap", mn);
uk.prototype.set = uk.prototype.j;
D("ol.control.defaults", Mf);
D("ol.control.ScaleLine", Ql);
D("ol.control.MousePosition", Nf);
D("ol.coordinate.toStringHDMS", function(b) {
  return b ? Jc(b[1], "NS") + " " + Jc(b[0], "EW") : "";
});

