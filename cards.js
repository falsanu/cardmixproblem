console.time('The process took');

const fs = require('fs');

const amountOfCards = 500;
let dataToWrite = 'Amount of Cards;Mixes;\n';
console.log('Mixes every stack with up to '+amountOfCards+' cards');

const checkOrder = (memo, value) => ({ inOrder: memo.inOrder && memo.lastValue < value, lastValue: value});

let deck = [];
let temp = [];
for (let i = 2; i <= amountOfCards; i += 2) {
  let i2 = i * 0.5;
  deck.push(i - 1, i);
  temp.push(i - 1, i);

  let count;
  for (count = 0; count < 1 || !deck.reduce(checkOrder, { inOrder: true, lastValue: 0 }).inOrder; count++) {
    for (let j = 0; j * 2 < i; j++) {
      temp[j] = deck[2 * j];
      temp[i2 + j] = deck[2 * j + 1];
    }
    [deck, temp] = [temp, deck];
  }

  dataToWrite = `${dataToWrite}${i};${count};\n`;
}

fs.writeFile('analyseNodeJS.csv', dataToWrite, 'utf8', function (err) {
  if (err) {
    console.log('Some error occurred - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});

console.timeEnd('The process took');
