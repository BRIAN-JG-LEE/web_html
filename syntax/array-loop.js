let number = [3, 325, 1, 474, 567, 30];

let i = 0;
let total = 0;
while (i < number.length) {
  total = total + number[i];
  i = i + 1;
}
console.log(`total:${total}`);
