//
//JQuery Functions for Robby's Cans 
// Probability Functions
//Harshul Sahni- 2017
//
function generateRandomInt(min,max) { //Random Integer in between a range
                var randomInt = Math.floor(Math.random()*(max-min+1)+min);
                return randomInt;
}

function generateDecimalNumber(min, max) { //Random Decimal in between a range, usually 0 to 1 for probability
                var randomDecimal = Math.random() * (max - min) + min;
                return randomDecimal;
}
function compareFitness(a,b) {
    if (a.fitness < b.fitness)
      return 1;
    if (a.fitness > b.fitness)
      return -1;
    return 0;
}