// calculator script

let topDisplay = document.getElementById("topDisplay");
let bottomDisplay = document.getElementById("bottomDisplay");
let entries = "";
let result = 0;

//add event listeners to number keys
let numbers = document.querySelectorAll(".number");
numbers.forEach(function(number){
  number.addEventListener("click", function(){
    inputNumber(number);
  })
})

//functionn to input numbers
function inputNumber(key) {
  if(bottomDisplay.textContent === "0"){
    bottomDisplay.textContent = key.textContent;
    entries = key.textContent;
  }else{
    bottomDisplay.textContent += key.textContent;
    entries += key.textContent;
  }
  document.querySelector("#openBlacket").disabled = false; 
  document.querySelector("#closeBlacket").disabled = false;     
}

//Add event listeners to operator keys
let operators = document.querySelectorAll(".operator");
operators.forEach(function(operator){
  operator.addEventListener("click", function(){
    inputOperator(operator);
  })
})

let operator = "+"; // default operator to add first number to resulta
//function to input operators
function inputOperator(key) {
  if (bottomDisplay.textContent == "0" && entries == ""){
    bottomDisplay.textContent;
    entries;
  } else {
    previousOperator = bottomDisplay.textContent.slice(-1);
    //check previous operator to avoid duplicates
    if (previousOperator.includes("+") || 
      previousOperator.includes("-") ||
      previousOperator.includes("*") ||
      previousOperator.includes("*") ||
      previousOperator.includes("/")){
        bottomDisplay.textContent = bottomDisplay.textContent.slice(0, -1) + 
        key.textContent;
        operator = key.textContent;
      }else{
        bottomDisplay.textContent += key.textContent;
        entries += key.textContent;
        topDisplay.textContent = calculate();
      }  
    document.querySelector(".decimal").disabled = false; 
    document.querySelector(".blacket").disabled = false; 
  }
}

//calculate results
function calculate(){
  try{
    switch(operator){
      case "+":
        result += parseFloat(entries.slice(0, -1));
      break;
      case "-":
        result -= parseFloat(entries.slice(0, -1));
      break;
      case "*":
        result *= parseFloat(entries.slice(0, -1));
      break;
      case "/":
        result /= parseFloat(entries.slice(0, -1));
      break;
      default: // default assignment for first number
        result = parseFloat(entries.slice(0, -1));
    }
    operator = entries.slice(-1); //changing operators according to entries
    entries = "";
    if (result.toString().indexOf('.') !== -1) {
      return result.toFixed(4);
    } else {
    return result;
    }
  } catch(e) {
    topDisplay = "ERROR!"
  }
}

//add event listerner to decimal button
let decimal = document.querySelector(".decimal");
decimal.addEventListener("click", function(){
  InputDecimal(decimal);
});

//input dicimal
function InputDecimal(key){
  if(bottomDisplay.textContent === "0"){
    bottomDisplay.textContent = key.textContent;
  }else{
    bottomDisplay.textContent += key.textContent;
  }
  entries += key.textContent;
  //dissable the dicimall key to avoid repeatition on same number
  key.setAttribute("disabled", true); 
  //enable blackets if they were disabled.
  document.querySelector(".blacket").disabled = false; 
}

//add event listerner to cancel buttom
let cancel = document.querySelector(".clear");
cancel.addEventListener("click", cancelKey);

//function to cancel
function cancelKey(){
  let previousEntry = bottomDisplay.textContent.slice(0, -1)
  bottomDisplay.textContent = bottomDisplay.textContent.slice(0, -1);
  entries = entries.slice(0, -1);
  if(bottomDisplay.textContent == ""){
    bottomDisplay.textContent = "0";
    entries = "";
  }else if(previousEntry.includes("+") ||
    previousEntry.includes("-") ||
    previousEntry.includes("*") ||
    previousEntry.includes("/") ){
      bottomDisplay.textContent = "0";
      topDisplay.textContent = "";
      entries = "";
  }//else{
  //   bottomDisplay.textContent = bottomDisplay.textContent.slice(0, -1);
  //   entries = entries.slice(0, -1);
  // }
  document.querySelector(".decimal").disabled = false; 
  document.querySelector(".blacket").disabled = false; 
}

//add event listener to cancel all key
let cancelAll = document.querySelector(".clearAll");
cancelAll.addEventListener("click", cancelAllKey)

//function to cancel All
function cancelAllKey(){
  bottomDisplay.textContent = "0";
  topDisplay.textContent = "";
  entries = "";
  result = 0;
  document.querySelector(".decimal").disabled = false;
  document.querySelector(".blacket").disabled = false;  
}

// add event listeners to blacket keys
let blackets = document.querySelectorAll(".blacket");
blackets.forEach(function(blacket){
  blacket.addEventListener("click", function(){
    inputBlackets(blacket);
  })
})

//function to input blackets
function inputBlackets(key){
  let previousBlacket = bottomDisplay.textContent.slice(-1);
  if(bottomDisplay.textContent === "0" && key.textContent === ")"){
    bottomDisplay.textContent = "0";
  } else if(bottomDisplay.textContent === "0" && key.textContent === "("){
    bottomDisplay.textContent = key.textContent;
  } else if((previousBlacket === "(" && key.textContent === ")") ||
    (previousBlacket === "(" && key.textContent === "(") ||
    (previousBlacket === ")" && key.textContent === ")")) {
    key.setAttribute("disabled", true);
  } else{
    bottomDisplay.textContent += key.textContent;
  }
  document.querySelector(".decimal").disabled = false; 
}
 
//add event listerner to equals
let equals = document.querySelector(".equalTo");
equals.addEventListener("click", function(){
  showResults()
})

// showResults
function showResults(){
  entries += "=";
  topDisplay.textContent = calculate();
  //reset all variables for next calculation
  entries = "";
  result = 0;
  operator = "";
  bottomDisplay.textContent = "0";
}

//add event listeners to keyboard buttons
bottomDisplay.addEventListener('keydown', function (event) {
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
