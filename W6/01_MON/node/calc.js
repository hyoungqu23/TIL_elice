function add(a, b) {
  return a + b;
}

const sub = (a, b) => {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

const div = (a, b) => {
  return a / b;
}

// module.exports.내보내는이름 = 여기서쓰는 이름;
// module.exports.add1 = add;
// module.exports.sub = sub;
// module.exports.mul = mul;
// module.exports.div = div;

module.exports = {
  add1: add,
  sub: sub,
  mul: mul,
  div: div
}