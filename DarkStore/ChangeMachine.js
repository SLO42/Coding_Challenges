const makeChangeMachine = values => {
    let combo = values;

    return function(amount, succ, fail)
    {
        const total = (combo[1] * 1) + (combo[5] * 5) +
            (combo[10] * 10) + (combo[25] * 25);
        const backup = {1: combo[1], 5: combo[5], 10: combo[10], 25: combo[25]};
        // console.log(`cents left: ${total}`);
        if (amount > total)
            return fail();
        else
        {
            let output = {1: 0, 5: 0, 10: 0, 25: 0};
            while (combo[25] && amount >= 25)
            {
                amount -= 25;
                combo[25] -= 1;
                output[25] += 1;
            }
            while (combo[10] && amount >= 10)
            {
                amount -= 10;
                combo[10] -= 1;
                output[10] += 1;
            }
            while (combo[5] && amount >= 5)
            {
                amount -= 5;
                combo[5] -= 1;
                output[5] += 1;
            }
            while (combo[1] && amount >= 1)
            {
                amount -= 1;
                combo[1] -= 1;
                output[1] += 1;
            }
            if (amount != 0)
                return fail();
            else
            {
                if (succ(output))
                    return 1;
                else 
                    combo = backup;
            }
        }
    }
}


// from the prompt


const myChangeMachine = makeChangeMachine({ 1: 20, 5: 3, 10: 4, 25:3 });

const error = () => console.log('Sorry, I cannot do that!');

const dump = combo => console.log(`
  ${combo[1]} pennies
  ${combo[5]} nickels
  ${combo[10]} dimes
  ${combo[25]} quarters`);

const picky = combo => {
  dump(combo);
  if (combo[1]) {
    console.log('Nope, I hate pennies');
    return false;
  }
  return true;
}

const easy = combo => {
  dump(combo);
  return true;  
}
myChangeMachine(131, picky, error);


// // prints out 'Nope, I hate pennies'

// myChangeMachine(131, easy, error);

// // prints out
// //  1 pennies
// //  3 nickels
// //  4 dimes
// //  3 quarters

// myChangeMachine(131, easy, error);

// prints out 'Sorry, I cannot do that!'
// because the previous call used up all but 19¢