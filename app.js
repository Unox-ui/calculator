const buttons = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.operate');
const point = document.querySelector('.point');
const deleteBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');

const display = document.querySelector('.first-display');
const displayBuffer = document.querySelector('.second-display');

let number1 = '';
let operator = '';
let operationInProgress  = Boolean(false);
let displayValue = '';


buttons.forEach(button => button.addEventListener('click', updateDisplay))
operators.forEach(operator => operator.addEventListener('click', getOperator ))
deleteBtn.addEventListener('click', deleteDisplay);
clearBtn.addEventListener('click', clearAllDisplay);
equal.addEventListener('click', operate);
point.addEventListener('click', addpoint);


function updateDisplay(){
    displayValue = display.textContent + this.textContent;
    if (displayValue.length > 12){
        displayValue = displayValue.substring(0, 12);
    } 
    display.textContent = displayValue;
}

function addpoint(){
    if (display.textContent.includes('.')){
        return;
    } 
    else {
        display.textContent += '.';
    }
}

function getOperator(){

    if (operationInProgress) {
        operate();
        number1 = display.textContent;
        displayBuffer.textContent = display.textContent;
        display.textContent = "";
        operator = this.textContent;
        displayBuffer.textContent = truncateBufferDisplay(`${displayBuffer.textContent} ${operator} `);
    }
    else {
        displayBuffer.textContent = ""
        operator = this.textContent;
        number1 = display.textContent;
        displayBuffer.textContent = truncateBufferDisplay(displayBuffer.textContent + `${number1} ${operator} `);
        display.textContent = ""
    }
    
    operationInProgress = Boolean(true);
}


function operate(){
    operationInProgress = Boolean(false);
    displayBuffer.textContent = truncateBufferDisplay(displayBuffer.textContent + display.textContent);
    nb1 = Number(number1);
    let nb2 = Number(display.textContent);
    switch (operator){
        case '+':
            display.textContent = round(add(nb1,nb2));
            break;
        case '-':
            display.textContent = round(subtract(nb1,nb2));
            break;
        case '*':
            display.textContent = round(multiply(nb1,nb2));
            break;
        case '/':
            display.textContent = round(divide(nb1,nb2));
            break;
        default:
            console.log('OOPS: Unknow operator.')
    }
}

function round(number){
    return Math.round(number * 1000) /1000;
}

function truncateBufferDisplay(str){
    if (str.length > 14) {
        str = "..." + str.substring(str.length - 12);
    }
    return str;
}

function rickroll(){
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    let btn = document.createElement('button');
    let video = document.createElement('video');
    let main = document.getElementById('container');
    video.setAttribute('class', 'roll');
    video.setAttribute('type', 'video/mp4');
    video.setAttribute('src', 'img/zerodivision.mp4');
    video.autoplay = true;
    video.loop = true;
    btn.textContent='Never again.'
    btn.setAttribute('id', 'revert');
    div2.textContent = "DO NOT DIVIDE BY 0!"
    div.setAttribute('class', 'rick');
    div.setAttribute('id', 'roll');
    div.appendChild(div2);
    div.appendChild(video);
    div.appendChild(btn);
    main.appendChild(div);

    const clearBtn = document.querySelector('#revert');
    clearBtn.addEventListener('click', revert);
}

function revert(){
    let todelete = document.querySelector('#roll');
    console.log(todelete);
    todelete.remove();
}

function deleteDisplay(){
    display.textContent = display.textContent.split('').slice(0,-1).join('');
}

function clearAllDisplay() {
    number1 = ""
    display.textContent = ""
    displayBuffer.textContent = ""
    operationInProgress  = Boolean(false);
}

function add(nb1, nb2){
    return nb1 + nb2;
}

function subtract(nb1, nb2){
    return nb1 - nb2;
}

function multiply(nb1, nb2){
    return nb1 * nb2;
}

function divide(nb1, nb2){
    if (nb2 === 0) {
        rickroll();
        return 'GARBAGE';
    }
    return nb1 / nb2;
}
