// calculator script

var topDisplay = document.getElementById("topDisplay");
var bottomDisplay = document.getElementById("bottomDisplay");
var number = "";
var operator = "";
var result = 0;
var replaceDisplay = true;
var negativeFraction = true;

//add event listeners to number keys
let digits = document.querySelectorAll(".number");
digits.forEach(function(digit){
  digit.addEventListener("click", function(){
    inputNumber(digit.textContent);
  })
})

//functionn to input numbers
function inputNumber(key) {
  if (result) { //show results after entering every digit
      number += key;
      topDisplay.textContent += key;
      bottomDisplay.textContent = key === "." ? bottomDisplay.textContent : calculate(); //show results after entering every digit for the next number.
    } else {
    if (number && !replaceDisplay) { //enter next digits
      if (operator === "-") { // calculare if the first number is a negative function
        number = -Math.abs("0." + key); 
        topDisplay.textContent += key;
      } else {
        number += key;
        topDisplay.textContent += key;
      }
    } else {// enter first digit
      if (operator === "-") { // if first number is negative
        number += -Math.abs(key); 
        topDisplay.textContent += key; 
        replaceDisplay = false;
      } else {
        number = key;
        topDisplay.textContent = key
        replaceDisplay = false;
      }
    }
  }  
  document.querySelectorAll(".operator").forEach(function(sign){
    sign.disabled = false;
  })
}

//Add event listeners to operator keys
let signs = document.querySelectorAll(".operator");
signs.forEach(function(sign){
  sign.addEventListener("click", function(){
    inputOperator(sign.textContent);
  })
})

//function to input operators
function inputOperator(key) { 
  if (topDisplay.textContent === "" && number === "" && key !== "-"){
    topDisplay.textContent;
    number;
  } else {
    //check previous operator to avoid duplicates
    const previousOperator = topDisplay.textContent.slice(-1);
    if (previousOperator.includes("+") 
      || previousOperator.includes("-") 
      || previousOperator.includes("*") 
      || previousOperator.includes("*") 
      || previousOperator.includes("/")){
      document.querySelectorAll(".operator").forEach(function(sign){
        sign.disabled = true;
      })
    }else{
      topDisplay.textContent += key; 
      result = result ? calculate() : parseFloat(number);
      number = "";
    }  
    operator = key;
    document.querySelector(".decimal").disabled = false; 
    document.querySelector(".equalTo").disabled = false; 
  }
}

//calculate results
function calculate(){
  try{
    switch(operator){
      case "+":
        return result + parseFloat(number);
      break;
      case "-":
        return result - parseFloat(number);
      break;
      case "*":
        return result * parseFloat(number);
      break;
      case "/":
        return result / parseFloat(number);
    }

  } catch (error) {
    // Code to handle the error
    topDisplay.textContent = `Error: ${error.message}`;
  }
}

//add event listerner to decimal button
let decimal = document.querySelector(".decimal");
decimal.addEventListener("click", function(){
  InputDecimal(decimal.textContent);
});

//input dicimal
function InputDecimal(key){
  inputNumber(key);
  replaceDisplay = false;
  //dissable the dicimall key to avoid repeatition on same number
  decimal.setAttribute("disabled", true); 
  // disable the sign operator after the point
  document.querySelectorAll(".operator").forEach(function(sign){
    sign.disabled = true;
  })
}

//add event listerner to cancel buttom
let cancel = document.querySelector(".clear");
cancel.addEventListener("click", cancelKey);

//function to cancel
function cancelKey(){
  number = "";
  operator = "";
  result = 0;
  replaceDisplay = true;
    topDisplay.textContent = topDisplay.textContent.slice(0, -1); 
    const string = topDisplay.textContent;
    const expression = string.split("");
    for (let i = 0; i < expression.length; i++) {
      if ( expression [i] === "+" 
        || expression [i] === "-" 
        || expression [i] === "*" 
        || expression [i] === "/" ) {
        inputOperator(expression[i]);
      } else {
        inputNumber(expression[i]);
        if (!result) {
          bottomDisplay.textContent = "";
        }
      }
    } 
}

//add event listener to cancel all key
let cancelAll = document.querySelector(".clearAll");
cancelAll.addEventListener("click", cancelAllKey)

//function to cancel All
function cancelAllKey(){
  bottomDisplay.textContent = "";
  topDisplay.textContent = "";
  result = 0;
  number = "";
  operator = "+";
  document.querySelector(".decimal").disabled = false;
  document.querySelector(".blacket").disabled = false;  
  document.querySelectorAll(".operator").forEach(function(sign){
    sign.disabled = false;
  })
}
 
//add event listerner to equals
let equals = document.querySelector(".equalTo");
equals.addEventListener("click", function(){
  showResults()
})

// showResults
function showResults(){
  topDisplay.textContent = calculate().toFixed(2);
  //reset all variables for next calculation
  number = calculate();
  result = 0
  operator = "";
  bottomDisplay.textContent = "";
  replaceDisplay = true;
  negativeFraction = true;
  document.querySelector(".equalTo").disabled = true;
}

//add event listeners to keyboard buttons
document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case '0':
      inputNumber(document.querySelector('#zero'));
      break;
    case '1':
      inputNumber(document.querySelector('#one'));
      break;
    case '2':
      inputNumber(document.querySelector('#two'));
      break;
    case '3':
      inputNumber(document.querySelector('#three'));
      break;
    case '4':
      inputNumber(document.querySelector('#four'));
      break;
    case '5':
      inputNumber(document.querySelector('#five'));
      break;
    case '6':
      inputNumber(document.querySelector('#six'));
      break;
    case '7':
      inputNumber(document.querySelector('#seven'));
      break;
    case '8':
      inputNumber(document.querySelector('#eight'));
      break;
    case '9':
      inputNumber(document.querySelector('#nine'));
      break;
    case '+':
      inputOperator(document.querySelector('#plus'));
      break;
    case '-':
      inputOperator(document.querySelector('#minus'));
      break;
    case '*':
      inputOperator(document.querySelector('#times'));
      break;
    case '/':
      inputOperator(document.querySelector('#division)'));
      break;
    case ".":
      InputDecimal(document.querySelector('#point)'));
      break;
    case '(':
      inputBlackets(document.querySelector('#openBlacket'));
      break;
    case ')':
      inputBlackets(document.querySelector('#closeBlacket'));
      break;
    case "Enter":
      showResults(document.querySelector('#equals'));
      break;
    case 'Backspace':
      cancelKey(document.querySelector('#cancel'));
      break;
    case 'Escape':
      cancelAllKey(document.querySelector('#cancelAll'));
      break;
  }
});