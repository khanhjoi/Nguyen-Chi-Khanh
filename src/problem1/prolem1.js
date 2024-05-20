var sum_to_n_a = function (n) {
  // your code here
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;

  // time complexity: O(n)
  // space: O(1)
};

var sum_to_n_b = function (n) {
  // your code here
  let i = 1;
  let sum = 0;
  while (i <= n) {
    sum += i;
    i++;
  }
  return sum;

  // time complexity: O(n)
  // space: O(1)
};

var sum_to_n_c = function (n) {
  if (n === 0) {
    return 0;
  }

  return n + sum_to_n_c(n - 1);

  // time complexity: O(n)
  // space: O(1)
};

// best way to calculate
var sum_to_n_d = function (n) {
  return (n * (n + 1)) / 2;
  // time complexity: O(1)
  // space: O(1)
};

console.log(sum_to_n_a(10));
console.log(sum_to_n_b(10));
console.log(sum_to_n_c(10));
console.log(sum_to_n_d(10));
