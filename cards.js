'use strict';
/**
 Helpers
 */

// Array equal
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

var fs = require('fs');
let dataToWrite = 'Anzahl Karten;Druchmischen;\n';


/**
* Code
*/
let startTime = new Date();
let amountOfCards = 500;

console.log('Mische jeden Stapel mit bis zu '+amountOfCards+' Karten');


// create decks

for (let cardsOnDeck = 2, j = amountOfCards; cardsOnDeck <= amountOfCards; cardsOnDeck += 2) {
  let mixedCounter = 0;
	let original_stack = [];
	let mixed_stack = [];
  let halfedStack = cardsOnDeck / 2;
  // ES6
  original_stack = Array.apply(null, Array(cardsOnDeck)).map((x, i)=>i)

  /* Simple Javascript */
  // Fill original stack
	// for (let card = 1; card <= cardsOnDeck; card++) {
		// original_stack.push(card);
	// }


	while (!original_stack.equals(mixed_stack)) {

    // create first mixed stack
    if(mixed_stack.length === 0){
      // clone original stack
      mixed_stack = original_stack.slice(0);
    }

    let bottom_stack = [];
    let top_stack = [];

    // mix stack to get two separated stacks -- bottom & top
    for (let card = 0, allCardsInStack = mixed_stack.length; card<=allCardsInStack; card++){
      if((card + 1) <= halfedStack ) {
        bottom_stack.push(mixed_stack.shift());
      } else {
        top_stack.push(mixed_stack.shift());
      }
    }

    // new empty mixed_stack
    mixed_stack = [];

    // now mix the stacks
    for(let mixCard = 1; mixCard <= halfedStack; mixCard++){
      mixed_stack.push(bottom_stack.shift());
      mixed_stack.push(top_stack.shift());
    }

    // let currentCard = 1;
    // while (currentCard <= cardsOnDeck / 2) {
    //   mixed_stack.push(temp_list_bottom.shift());
    //   mixed_stack.push(temp_list_top.shift());
    //   currentCard++;
    // }

    mixedCounter++;
  }

  dataToWrite += cardsOnDeck + ';' + mixedCounter + ';\n';
  // console.log(mixedCounter + " mal Mischen bei " +  cardsOnDeck  + " Karten");
}

fs.writeFile('analyseNodeJS.csv', dataToWrite, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});


let endTime = new Date();
console.log('Der Durchgang dauerte: ' + ((endTime - startTime)/1000) + ' Sekunden');
