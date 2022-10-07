const calcScreen = document.querySelector('.calculator-screen');
const bottomDiv = document.querySelector('.bottom-div');
const clearBtn = document.querySelector('.clear');
const topDiv = document.querySelector('.top-div');
const backspaceBtn = document.querySelector('#delete');
let bottomDivText = '';
let num1 = undefined;
let num2 = undefined;
let operandPressed = false;
let num = false;
const calcBtns = document.querySelector('.calc-btns');
let result = undefined;
let operand = undefined;
let operandSymbol = '';
let prevClass = 'num';
let prevOperand = false;
let prevEqual = false;
let decimalPresent = false;
let equalBtn = document.querySelector('#equals');
let calculation = {
    'add': function(num1, num2){return num1 + num2},
    'subtract': function(num1, num2){return num1 - num2},
    'divide': function(num1, num2){return num1 / num2},
    'multiply': function(num1, num2){return num1 * num2},
    'exponent': function(num1, num2){return num1 ** num2}
 }

function recordEvent(e) {
    console.log(`This is num1 at beginning of iteration: ${num1}`);
    console.log(`This is num2 at beginning of iteration: ${num2}`);
    console.log(`This is the prevOperand at beginning of iteration: ${prevOperand}`);
    if (e.type === 'click') {
        // Button Pressed Variables
        btnText = e.target.innerText;
        class_ = e.target.className;
        id_ = e.target.id;
    } else {
        btnText = e.key;
        console.log(`This is btnText: ${btnText}`)
        console.log(e);
        if (e.key === "0" || e.key ===  "1" || e.key ===  "2" || e.key ===  "3" || e.key ===  "4" || e.key ===  "5" || e.key ===  "6" || e.key ===  "7" || e.key ===  "8" || e.key ===  "9") {
            class_ = 'num';
            id_ = '';
        }
        else {
            class_ = '';
            
            if (e.key === "+"){
            id_ = "add";
            }
            else if (e.key === "-") {
                id_ = "subtract";
            }
            else if (e.key === "*") {
                id_ = "multiply";
            }
            else if (e.key === "/") {
                id_ = "divide";
                class_ = "divi";
            }
            else if (e.key === 'Backspace') {
                id_ = 'delete';
                backspaceEvent();
            } else if (e.key === 'Enter') {
                id_ = 'equals';
                btnText = '=';
            }
        }
    }
    bottomDivText = document.createTextNode(btnText);
    console.log(`This is btnText: ${btnText}`);
    console.log(`This is the current class: ${class_}`);
    console.log(`This is the current id: ${id_}`);
    console.log(e.target);

    if (class_ === 'clear' || id_ === 'delete') {
        return;
    }

    if (id_) {
        operandPressed = true;
        operand = id_;
        operandSymbol = e.target.innerText;
        num = false;
        if (e.type !== 'click') {
            operandSymbol = btnText;
        }
    }

    if (class_ === 'num') {
        num = true;
        operandPressed = false;
    }

    if (operand === 'equals' && !prevOperand) {
        return;
    }

    else if (num && !operand) {
        console.log('Num pressed & no previous operand')
        if (e.target.innerText === '.' && decimalPresent){
            return;
        } else {
        bottomDiv.innerText += btnText;
    }}

    else if (operandPressed && !prevOperand) {
        console.log('Operand Pressed & no previous operand');
        topDiv.innerText = `${bottomDiv.innerText} ${operandSymbol} `;
        num1 = parseFloat(bottomDiv.innerText);
        decimalPresent = false;
    }

    else if (num && operand) {
        console.log('Num pressed & operand present')
        if (e.target.innerText === '.' && decimalPresent){
            return;
        } else {
            if (prevClass === 'divi' && e.target.innerText === '0' || prevClass === 'divi' && e.key === '0') {
                clearCalc();
                alert("Yeah no. You're done. No dividing by 0. (You're not about to crash my calculator)");
                return;
            }
            console.log('Num pressed & have an operand');
            if (!prevClass || prevClass === 'divi') {
                bottomDiv.innerText = '';
            }
            bottomDiv.innerText += btnText;
        }}

    else if (operandPressed && prevOperand && id_ !== 'equals') {
        console.log('Operand Pressed & Previous Operand')
        console.log(`This is num1 right before operand pressed & previous operand fxn: ${num1}`);
         console.log(`This is num2 right before operand pressed & previous operand fxn: ${num2}`);
        // Set num2
        num2 = parseFloat(bottomDiv.innerText);
        result = calculation[prevOperand](num1, num2);
        result = parseFloat(result.toFixed(5))
        topDiv.appendChild(document.createTextNode(`${num2} ${btnText} `));
        bottomDiv.innerText = result;
        num1 = result;
        decimalPresent = false;
    }

    else if (id_ === 'equals') {
        console.log('Equals/operand+pressing operator has been triggered');
        // Set num2
        num2 = parseFloat(bottomDiv.innerText);
        // Do the function
        result = calculation[prevOperand](num1, num2);
        result = parseFloat(result.toFixed(5))
        topDiv.appendChild(document.createTextNode(`${bottomDiv.innerText} = `));
        bottomDiv.innerText = '';
        bottomDiv.innerText = result;
        // decimalPresent = false;
        prevEqual = true;
        num1 = result;
        reset();
        prevOperand = false;
        }

    if (e.target.innerText === '.') {
        decimalPresent = true;
    }

    prevClass = class_;
    if (operand && operand !== 'equals') {
        prevOperand = operand;
    }

    console.log(`This is num1: ${num1}`);
    console.log(`This is num2: ${num2}`);
    console.log(`This is the result: ${result}`)
    console.log(`This is the operand: ${operand}`);
    console.log(`This is the previous operand: ${prevOperand}`)
    console.log(`This is prevClass: ${prevClass}`)
    console.log('__________________________________________________');
};

// Clear Screen On Clear Btn Press
function clearCalc() {
    bottomDiv.innerText = '';
    topDiv.innerText = '';
    bottomDivText, operandSymbol = '';
    num1, num2, result, operand = undefined; 
    operandPressed, num, prevOperand, decimalPresent, prevEqual = false;
    prevClass = 'num';
};

function reset() {
    num2 = undefined;
    result, operand, operandSymbol = '';
    operandPressed, num, prevOperand, decimalPresent = false;
    prevClass = 'num';
}

function backspaceEvent() {
    if (bottomDiv.innerText.length > 0) {
    bottomDiv.innerText = bottomDiv.innerText.slice(0, -1);
    }
}

function function1(e) {
    console.log(e);
};

function equalHandler(e) {
    if (e.target.id === 'equals' && bottomDiv.innerText.length === 0 || e.key === 'Enter' && bottomDiv.innerText.length === 0) {
        return;
    } else if (e.target.id && bottomDiv.innerText.length === 0 || e.key === '+' && bottomDiv.innerText.length === 0 || e.key === '-' && bottomDiv.innerText.length === 0 || e.key === '*' && bottomDiv.innerText.length === 0 || e.key === '/' && bottomDiv.innerText.length === 0) {
        // If prevOperand ==False
        if (num1 === undefined && !prevOperand) {
            return;
        }
    } else {
        recordEvent(e); 
    }
};

// Event Listeners
clearBtn.addEventListener('click', clearCalc);
calcBtns.addEventListener('click', equalHandler);
backspaceBtn.addEventListener('click', backspaceEvent);
document.addEventListener('keyup', equalHandler);
