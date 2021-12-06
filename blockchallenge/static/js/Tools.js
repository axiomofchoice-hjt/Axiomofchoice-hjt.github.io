function toChinese(x) {
  var mp = [
    "零", "一", "二", "三", "四",
    "五", "六", "七", "八", "九"
  ];
  if (x < 10) return mp[x];
  if (x == 10) return "十";
  if (x < 20) return "十" + mp[x % 10];
  if (x % 10 != 0) return mp[Math.floor(x / 10)] + "十" + mp[x % 10];
  if (x % 10 == 0) return mp[Math.floor(x / 10)] + "十";
  return "??"
}

function ArrayGen(len, el, step) {
  var res = [];
  for (let i = 0; i < len; i++) {
    if (typeof (step) === "number") {
      res.push(el + step * i);
    } else {
      res.push(el);
    }
  }
  return res;
}
function MatrixGen(n, m, el) {
  var res = [];
  for (let i = 0; i < n; i++) {
    res.push(ArrayGen(m, el));
  }
  return res;
}
function random(n) {
  return Math.floor(Math.random() * n);
}
function equal(x, y) { return x === y; }
function less(x, y) { return x < y; }
function greater(x, y) { return x > y; }
function lessEqual(x, y) { return x <= y; }
function greaterEqual(x, y) { return x >= y; }
function notEqual(x, y) { return x !== y; }

dn4 = [[0, 1], [-1, 0], [0, -1], [1, 0]];
dn8 = dn4.concat([[1, 1], [1, -1], [-1, 1], [-1, -1]]);

function vecAdd(A, B) { return [A[0] + B[0], A[1] + B[1]]; }
function vecSub(A, B) { return [A[0] - B[0], A[1] - B[1]]; }
function vecEqual(A, B) { return A[0] == B[0] && A[1] == B[1]; }
function exEqual(A, B) {
  if (Array.isArray(A) && Array.isArray(B)) {
    if (A.length !== B.length) return false;
    for (let i = 0; i < A.length; i++) if (!exEqual(A[i], B[i])) return false;
    return true;
  } else {
    return A === B;
  }
}
function copy(A) {
  if (Array.isArray(A)) {
    var res = [];
    for (let i of A) res.push(copy(i));
    return res;
  } else {
    return A;
  }
}

function print() {
  if (arguments.length === 0) console.log();
  else if (arguments.length === 1) console.log(arguments[0]);
  else if (arguments.length === 2) console.log(arguments[0], arguments[1]);
  else if (arguments.length === 3) console.log(arguments[0], arguments[1], arguments[2]);
  else console.log("please extend print()");
}

function ArraySum(v) {
  var sum = 0;
  for (let i of v) { sum += i; }
  return sum;
}

function ArrayShuffle(v) {
  for (let i = v.length - 1; i > 0; i--) {
    let j = random(i + 1);
    [v[i], v[j]] = [v[j], v[i]]
  }
}

function mdist(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}