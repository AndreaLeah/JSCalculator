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
decimalPresent = false;
let calculation = {
    'add': function(num1, num2){return num1 + num2},
    'subtract': function(num1, num2){return num1 - num2},
    'divide': function(num1, num2){return num1 / num2},
    'multiply': function(num1, num2){return num1 * num2},
    'exponent': function(num1, num2){return num1 ** num2}
 }

function recordEvent(e) {
    if (e.type === 'click') {
        // Button Pressed Variables
        btnText = e.target.innerText;
        class_ = e.target.className;
        id_ = e.target.id;
    } else {
        btnText = e.key;
        console.log(`This is btnText: ${btnText}`)
        console.log(e);
        if (e.key === "0", "1", "2", "3", "4", "5", "6", "7", "8", "9") {
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
            else if (e.key = "*") {
                id_ = "multiply";
            }
            else if (e.key === 'Backspace') {
                id_ === 'delete';
                backspaceEvent();
            }}
    }
    bottomDivText = document.createTextNode(btnText);
    console.log(`This is btnText after: ${btnText}`);
    console.log(`This is the current class: ${class_}`)
    console.log(e.target);
    console.log(e);
    console.log(class_);
    console.log(id_)

    if (class_ === 'clear' || id_ === 'delete') {
        return;
    }

    if (id_) {
        operandPressed = true;
        operand = id_;
        operandSymbol = e.target.innerText;
        num = false;
    }

    if (class_ === 'num') {
        num = true;
        operandPressed = false;
    }

    if (num && !operand) {
        if (e.target.innerText === '.' && decimalPresent){
            return;
        } else {
        console.log('Num && No Operand')
        bottomDiv.innerText += btnText;
    }}

    else if (operandPressed && !prevOperand) {
        console.log('Operand Pressed')
        topDiv.innerText = `${bottomDiv.innerText} ${operandSymbol} `;
        num1 = parseFloat(bottomDiv.innerText);
        decimalPresent = false;
    }

    else if (num && operand) {
        console.log('Num pressed & operand present')
        if (e.target.innerText === '.' && decimalPresent){
            return;
        } else {
            if (prevClass === 'divi' && e.target.innerText === '0') {
                clearCalc();
                alert("Yeah no. You're done. No dividing by 0. (You're not about to crash my calculator)");
                return;
            }
            console.log('Num pressed & have an operand');
            if (!prevClass) {
                bottomDiv.innerText = ''
            }
            bottomDiv.innerText += btnText;
        }}

    else if (operandPressed && prevOperand && id_ !== 'equals') {
        console.log('Operand Pressed & Previous Operand')
        // Set num2
        num2 = parseFloat(bottomDiv.innerText);
        result = calculation[prevOperand](num1, num2);
        topDiv.appendChild(document.createTextNode(`${num2} ${btnText} `));
        bottomDiv.innerText = result;
        num1 = result;
        prevOperand = false;
        decimalPresent = false;
    }

    else if (id_ === 'equals') {
        console.log('Equals/operand+pressing operator has been triggered');
        // Set num2
        num2 = parseFloat(bottomDiv.innerText);
        // Do the function
        if (id_ === 'equals') {
            result = calculation[prevOperand](num1, num2);
            topDiv.appendChild(document.createTextNode(`${bottomDiv.innerText} =`));
            bottomDiv.innerText = '';
            bottomDiv.innerText = result;
        } 
        decimalPresent = false;
        prevEqual = true;
        num1 = result;
    }

    if (e.target.innerText === '.') {
        decimalPresent = true;
        
    }

    console.log(`This is num1: ${num1}`);
    console.log(`This is num2: ${num2}`);
    console.log(`This is the result: ${result}`)
    console.log(`This is the operand: ${operand}`);

    prevClass = class_;
    if (prevEqual) {
        prevOperand = false;
    } else {
        prevOperand = operand;
    }

    console.log(`This is prevClass: ${prevClass}`)
};

// Clear Screen On Clear Btn Press
function clearCalc() {
    bottomDiv.innerText = '';
    topDiv.innerText = '';
    bottomDivText, operandSymbol = '';
    num1, num2, result, operand = '';
    operandPressed, num, prevOperand, decimalPresent. prevEqual = false;
    prevClass = 'num';
};

function backspaceEvent() {
    if (bottomDiv.innerText.length > 0) {
    bottomDiv.innerText = bottomDiv.innerText.slice(0, -1);
    }
}

function function1(e) {
    console.log(e);
};

// Event Listeners
clearBtn.addEventListener('click', clearCalc);
calcBtns.addEventListener('click', recordEvent);
backspaceBtn.addEventListener('click', backspaceEvent);
document.addEventListener('keypress', recordEvent);
document.addEventListener('keyup', function1);