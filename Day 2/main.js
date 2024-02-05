// Your program
function factorial(n) {
  for (let i = n - 1; i >= 1; i--) {
    n = n * i;
  }
  return n;
}
console.log(factorial(5));
// Output : 120

//---------------------------------

var num1 = 123542765;
let result = 0;
// Your program
while (num1 > 0) {
  num1 = (num1 / 10) | 0;
  result++;
}
console.log(result);

// ----------------------------------------------

let n = 4;
let letter = "";
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n - i; j++) {
    letter += " ";
  }
  for (let k = 0; k < 2 * i - 1; k++) {
    letter += "*";
  }
  letter += "\n";
}
for (let r = 1; r <= n; r++) {
  if (r !== n) {
    letter += " ";
  } else {
    letter += "|";
  }
}
console.log(letter);

//-----------------------------------
let C;
function combinator(n, p) {
  C = factorial(n) / (factorial(p) * factorial(n - p));
  console.log(C);
}
combinator(5, 2);
//-----------------------------------
                                                                                                                                                                                                                                                                                                                     calculator(5, 'c', 2) // 10
function calculator(a, o, b) {
  let result;
  switch (o) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    case "%":
      result = a % b;
      break;
    case "c":
      result = combinator(a, b);
      break;
    default:
      break;
  }
  console.log(result);
}
// The function call should look like this :
calculator(5, "+", 1); // 6
calculator(3, "*", -4); // -12
calculator(5, "c", 2); // 10