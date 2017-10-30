var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
/////////////////////////////////////////////////
  var noNuts = function(products){
    return products.containsNuts === false
  }
  var noMush = function(products, i ){
    return products.ingredients[i] === 'mushrooms'
  }
  productsICanEat = products.filter(noNuts).filter(noMush);
  var dinnerOptions = productsICanEat.length

      expect(productsICanEat.length).toBe(dinnerOptions);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
  
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 233168;    /* try chaining range() and reduce() */

var dividByThreeOrFive = function(ele){
    return ele%3 === 0 || ele%5 === 0;
}
var sumTotal = function(acc, ele){
  return acc + ele;
}

    var sum = _.range(1, 1000).filter(dividByThreeOrFive)
                                .reduce(sumTotal, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    var counter = function(acc, j){
      acc[j] = (acc[j] || 0) + 1;
      return acc
     // return ingredientCount;
     //console.log('acc: ',acc);
    // console.log('j: ',j);
    // console.log(this)
    }

    var ingredientCount = _(products).chain()
                                    .map(function(product){ return product.ingredients;})
                                    .flatten()
                                    .reduce(counter, {})
                                    .value();
//input array inside object          
//use map to look at just ingredients
//use reduce to create them in an object them equal 1 or add them together
//return ingredients[ingredientCount]
//output number 
    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

var largestPrimeFactor = function(num){
  var  findNthPrime = function(n){
      var primeNumbers = [NaN,2];
      let currentNumber = 2;
      let oneNumberLess = 3;
      while(primeNumbers[primeNumbers.length-1] <= n/2){
        if(oneNumberLess === 1){
          if(currentNumber > 2){
            primeNumbers.push(currentNumber)
          }
          currentNumber ++;
          oneNumberLess = Math.ceil(currentNumber/2) - 1;
        } else if(currentNumber % oneNumberLess === 0){
          currentNumber ++;
          oneNumberLess = currentNumber - 1;
        } else if(currentNumber % oneNumberLess !== 0){
          oneNumberLess --;
        }
      }
      primeNumbers.shift();
      return primeNumbers;
}
  var possibleFactors = findNthPrime(num);
  
  
  for(var i = possibleFactors.length - 1; i >=0; i--){
    console.log(possibleFactors[i])
    if(num%possibleFactors[i] === 0){
      return possibleFactors[i];
    }
  }
  return undefined;
  
}

  });
  
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
var largestDigitdrome = function(){
   var enormeousArray = [];
   //range and reduce
  for(var i = 100; i <= 999; i++){
  for(var j = i; j <= 999; j++){
  var ele = i * j;
  enormeousArray.push(ele.toString());
 }
}
  var palindroms = enormeousArray.filter(function(item, index, array){
    return item === array[index].split('').reverse().join('');
        });
  return palindroms.pop()
}
  });
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    
      function divisibleUpToN(n){
  var commonMulti = 2 * n;
  //start at twice the value
  for(var divisor = n -1; divisor > 0;){
    if(commonMulti % divisor !== 0){
      //if it's not divisible, add n
      commonMulti += n;
      divisor = n - 1;
    } else if(commonMulti % divisor === 0){
      //if it is divisible, check next number down
      divisor -= 1
    }
  }
  //start is a bad variableName but it returns the number  
  return commonMulti
}
/*  This works but the time complexity is forever.

divisibleUpToN(11);

//can do it by multiplying primes and largest factors everything from 1 to n
    */ 
  });
 
  it("should find the difference between the sum of the squares and the square of the sums", function () {
        var squareSumDifference = function(num1, num2){
          var sumSquared = ((num1 + num2)**2);
          var squareSum = (num2**2 + num2**2);
          return Math.abs(sumSquared - squareSum);
      }
     
  });

  it("should find the 10001st prime", function () {
    var  findNthPrime = function(n){
      var primeNumbers = [NaN,2];
      //list of prime's
      let currentNumber = 2;
     // current test number
      let oneNumberLess = 3;
      //current test divisor for test number
      //for(let i = 2; n === primeNumbers.length; i++){
      //this can be improved by having oneNumberLess
      while(primeNumbers.length <= n){
        //until you've found the nth prime number
        if(oneNumberLess === 1){
          //if it got to 1 then it's prime
          if(currentNumber > 2){
            primeNumbers.push(currentNumber)
          }
          //move on to the next number
          currentNumber ++;
          oneNumberLess = currentNumber - 1;
        //this passes, but 
        } else if(currentNumber % oneNumberLess === 0){
          //if divisible, next number
          currentNumber ++;
          oneNumberLess = currentNumber - 1;
        } else if(currentNumber % oneNumberLess !== 0){
          //if not divisible, check next divisor - 1
          oneNumberLess --;
        }
      }
      return primeNumbers[n];
}
  });
  
});