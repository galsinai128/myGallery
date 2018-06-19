'use strict';

var gNumOnScrean = '';
var gOp = '';
var gCurrRes = null;
var gMemoryNum = 0;

runScreen();


function runScreen() {
    var elInputScreen = document.querySelector('.input-screen');
    elInputScreen.textContent = gNumOnScrean;
    var elOpInput = document.querySelector('.op-on-screen');
    elOpInput.textContent = gOp;

}

function handleDigit(el) {
    var numberClicked = el.textContent;
    gNumOnScrean += numberClicked;
    runScreen();
}

function handleOp(el) {
    var opClicked = el.textContent;
    if (gCurrRes === null) {
        if (!parseInt(gNumOnScrean)) return;
        gCurrRes = parseInt(gNumOnScrean);
    }
    else {
        calculate();
    }
    gOp = opClicked;
    runScreen();
    gNumOnScrean = '';
}

function calculate() {
    if (gOp === '+') calcSum();
    if (gOp === '-') calcSub();
    if (gOp === '*') calcMult();
    if (gOp === '/') calcDiv();
}

function screenAfterCalculation() {
    var elInputScreen = document.querySelector('.input-screen');
    elInputScreen.textContent = gCurrRes;
    var elOpInput = document.querySelector('.op-on-screen');
    elOpInput.textContent = gOp;
    gOp = '';
    gNumOnScrean = '';
}

function handleEqual() {
    if (gCurrRes === null) {
        if (!parseInt(gNumOnScrean)) return;
        gCurrRes = parseInt(gNumOnScrean);
        screenAfterCalculation();
    }
    calculate();
    runScreen();
    screenAfterCalculation();
}

function calcSum() {
    gCurrRes = gCurrRes + parseInt(gNumOnScrean);
    gNumOnScrean = '';
}

function calcSub() {
    gCurrRes = gCurrRes - parseInt(gNumOnScrean);
    gNumOnScrean = '';
}

function calcMult() {
    gCurrRes = gCurrRes * parseInt(gNumOnScrean);
    gNumOnScrean = '';
}

function calcDiv() {
    gCurrRes = gCurrRes / parseInt(gNumOnScrean);
    gNumOnScrean = '';
}

function handleSqrt() {
    if (gCurrRes === null) {
        if (!parseInt(gNumOnScrean)) return;
        gCurrRes = parseInt(gNumOnScrean);
        gCurrRes = Math.sqrt(gCurrRes);
        screenAfterCalculation();
    }
    else {
        calculate();
        gCurrRes = Math.sqrt(gCurrRes);
        screenAfterCalculation();
    }
}

function handleNot() {
    if (gCurrRes === null) {
        if (!parseInt(gNumOnScrean)) return;
        gCurrRes = parseInt(gNumOnScrean);
        gCurrRes = gCurrRes * (-1);
        screenAfterCalculation();
    }
    else {
        calculate();
        gCurrRes = gCurrRes * (-1);
        screenAfterCalculation();
    }
}

function handleDeletion() {
    gNumOnScrean = gNumOnScrean.substring(0, gNumOnScrean.length - 1);
    runScreen();
}

function handleClearance() {
    gNumOnScrean = '';
    gOp = '';
    gCurrRes = null;
    runScreen();
}

function handleInverse(){
    if (gCurrRes === null) {
        if (!parseInt(gNumOnScrean)) return;
        gCurrRes = parseInt(gNumOnScrean);
        gCurrRes = 1/gCurrRes;
        screenAfterCalculation();
    }
    else {
        calculate();
        gCurrRes = 1/gCurrRes;
        screenAfterCalculation();
    }
}

function handlePrecent(){
    if (gCurrRes === null) {
        gCurrRes = 0;
        screenAfterCalculation();
    }
    else {
        gNumOnScrean = parseInt(gNumOnScrean)*0.01*gCurrRes;
        calculate();
        screenAfterCalculation();

    }
}

function handleDot(el){
    if (gNumOnScrean.includes('.')) return;
    else handleDigit(el);
}

function memoryClear(){
    gMemoryNum = 0;
}

function memoryRecall(){
    gNumOnScrean = gMemoryNum;
    runScreen();
}

function memoryStore(){
    var elInputScreen = document.querySelector('.input-screen');
    gMemoryNum =parseInt(elInputScreen.textContent);
    screenAfterCalculation();
}

function memoryAdd(){
    var elInputScreen = document.querySelector('.input-screen');
    var toAdd = parseInt(elInputScreen.textContent);
    gMemoryNum += toAdd;
    screenAfterCalculation();
}

function memorySub(){
    var elInputScreen = document.querySelector('.input-screen');
    var toSub = parseInt(elInputScreen.textContent);
    gMemoryNum -= toSub;
    screenAfterCalculation();
}