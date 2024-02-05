const firstName = "zakaria";
const lastName = "samir";
const PI = 3.14;
const radius = 14;
const favoriteSuperHero = "albert einstein";
const favoriteQuote =
  '"what we know is a drop and what we don\'t know is an ocean"';
const fullName = firstName + " " + lastName;
const area = PI * radius ** 2;
const perimeter = 2 * PI * radius;
const motivation =
  "A wise man named " + favoriteSuperHero + ":" + favoriteQuote;
console.log(fullName);
console.log(area);
console.log(perimeter);
console.log(motivation);

let a = 3;
let b = 10;

// Swap the values of a and b here
// [a,b]=[b,a]
a = a + b;
b = a - b;
a = a - b;
console.log("After swapping: a = ", a, " and b = ", b); // should output: After swapping: a = 10 and b = 5

var day = 1;
switch (day) {
  case 1:
    console.log("Monday");

  case 2:
    console.log("Tuesday");

  case 3:
    console.log("Wednsday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Unvalid Day");
}
// ---------------------------------------
let aa = -15;
let bb = 6;
let cc = 2.6;

if (aa > bb && aa > cc) console.log(aa);
else if (bb > aa && bb > cc) console.log(bb);
else console.log(cc);
//------------------------------------
let score = 84;

// your program goes here
if (score > 85) console.log("A");
else if (score > 70) console.log("B");
else if (score > 55) console.log("C");
else if (score <= 55 && score > 40) console.log("D");
else if (score <= 40 && score > 15) console.log("E");
else if (score <= 15) console.log("F");