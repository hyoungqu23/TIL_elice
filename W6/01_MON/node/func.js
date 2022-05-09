let number = 0;

module.exports.num1 = number += 1;

module.exports.func1 = () => {
  return number += 1;
}

module.exports = () => {
  return (number += 1);
};

// 클로저 활용하기
module.exports = () => {
  let number = 0;

  function clos() {
      return number += 1;
  }

  return clos;
}