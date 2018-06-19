'use strict';

var gBoard = [];
var gLevel = { size: null, mines: null };
var gState = { isGameOn: true, shownCount: 0, markedCount: 0, secsPassed: 0 };
var isFirstClick = true;
var gCurrLevel = undefined;
var gWinLoseMode = false;
var gameInterval;


function initGame() {
    if (gCurrLevel === undefined) {
        gCurrLevel = 'BEGGINER';
    }
    setLevel(gCurrLevel);
    bulidBoard();
    isFirstClick = true;
    var winSmileyEl = document.querySelector('.smiley');
    var strHTML = '<img src="img/smiley.jpg" onclick="restart()">';
    winSmileyEl.innerHTML = strHTML;
    setBestScore(localStorage.getItem(gCurrLevel));
}

// CR: setTimer, runClock, etc... play is not the right name for this func
function play() {
    if (!gState.isGameOn) {
        clearInterval(gameInterval);
    }
    gState.secsPassed += 0.01;
    var elTime = document.querySelector('.timer');
    elTime.innerText = gState.secsPassed.toFixed(3);
    // CR: This should be handled elsewhere
    var elMarked = document.querySelector('.cells-left-to-mark');
    elMarked.innerText = gLevel.mines - gState.markedCount;
}

function restart() {
    clearInterval(gameInterval);
    gState.isGameOn = false;
    gState.shownCount = 0;
    gState.markedCount = 0;
    gState.secsPassed = 0;
    gWinLoseMode = false;
    var elTime = document.querySelector('.timer');
    elTime.innerText = 0;
    var elMarked = document.querySelector('.cells-left-to-mark');
    elMarked.innerText = 0;
    initGame();
}

function setLevelClick(elLevel) {
    var level = elLevel.textContent;
    gCurrLevel = level;
    restart();
}

function setLevel(level) {
    if (level === 'BEGGINER') {
        gLevel.size = 4;
        gLevel.mines = 2;
    }
    if (level === 'MEDIUM') {
        gLevel.size = 6;
        gLevel.mines = 5;
    }
    if (level === 'EXPERT') {
        gLevel.size = 8;
        gLevel.mines = 15;
    }
}


// CR: All rendering belongs in a seperate function
function bulidBoard() {
    gBoard = [];
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = '';
    var strHTML = '';
    for (var i = 0; i < gLevel.size; i++) {
        strHTML += '<tr>';
        gBoard[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                id: i + '-' + j,
                bombsAroundCount: 0,
                isShown: false,
                isBomb: false,
                isMarked: false
            };
            gBoard[i][j] = cell;
            strHTML += ' <td id =" ' + cell.id + '" class = "cell cell' + '-' + cell.id + ' unshown" onclick="cellClicked(this)">' + '</td> ';
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML;
}


function lostGame(el) {
    gState.isGameOn = false;
    gWinLoseMode = true;
    var strHTML = '<img src="img/boom.jpg">';
    el.innerHTML = strHTML;
    var elSmiley = document.querySelector('.smiley');
    strHTML = '<img src="img/sad.jpg" onclick="restart()">';
    elSmiley.innerHTML = strHTML;
    var elCells = document.querySelectorAll(".cell");
    for (var i = 0; i < elCells.length; i++) {
        if (elCells[i].childNodes[0] === undefined) {
            elCells[i].classList.remove('unshown');
        }
        else {
            var child = elCells[i].childNodes[0];
            if (child.nodeName === 'IMG') {
                child.style.display = 'block';
            }
        }

    }
}

function winGame() {
    gState.isGameOn = false;
    gWinLoseMode = true;
    var winSmileyEl = document.querySelector('.smiley');
    var strHTML = '<img src="img/glass.jpg" onclick="restart()">';
    winSmileyEl.innerHTML = strHTML;
    handleLocalStorage();

}

function handleLocalStorage() {
    var bestScore = localStorage.getItem(gCurrLevel);
    if (bestScore === null) {
        localStorage.setItem(gCurrLevel, gState.secsPassed);
        setBestScore(localStorage.getItem(gCurrLevel, gState.secsPassed));
    }
    else {
        if (gState.secsPassed < bestScore) {
            localStorage.setItem(gCurrLevel, gState.secsPassed);
            setBestScore(localStorage.getItem(gCurrLevel));
        }
    }
}

function setBestScore(bestScore) {
    var elBestScore = document.querySelector('.best');
    if (bestScore === null) elBestScore.innerText = 'Best score: ' + 0;
    else {
        bestScore = parseFloat(bestScore).toFixed(3);
        elBestScore.innerText = 'Best score: ' + bestScore;
    }

}

function cellClicked(el) {
    gState.isGameOn = true;
    var i = +el.id.toString().charAt(1);
    var j = +el.id.toString().charAt(3);
    // CR: Is this necessary?
    if (gWinLoseMode
    ) return;
    if (gBoard[i][j].isMarked) return;
    if (gBoard[i][j].isBomb) {
        lostGame(el);
    }
    // CR: `if (gBoard[i][j].isShown) return` would be better
    //      the current code advances the shownCount when clicking
    //      an already shown cell
    var clickedTwice = gBoard[i][j].isShown;
    gBoard[i][j].isShown = true;
    gState.shownCount++;
    el.classList.remove('unshown');
    if (isFirstClick) {
        // CR: Too short a delay, clock runs too fast 
        gameInterval = setInterval(play, 1);
        placeMines(el);
        countNieghboursMatrix();
        isFirstClick = false;
    }

    var child = el.childNodes[0];
    // CR: Better to check the model (gBoard[i][j].bombsAroundCount === 0)
    if (child === undefined && !clickedTwice) {
        expandShownBonus(i, j);
    }
    else if (child !== undefined && child.nodeName === 'IMG') {
        child.style.display = 'block';
    }
    if (gState.markedCount === gLevel.mines && gState.shownCount + gState.markedCount === gLevel.size * gLevel.size && !gBoard[i][j].isBomb) {
        winGame();
    }
    // console.log(gBoard);
}


//not in use, using expandShowBonus(i,j)!!!
function expandShown(idxI, idxJ) {
    for (var i = idxI - 2; i <= idxI + 2; i++) {
        for (var j = idxJ - 2; j <= idxJ + 2; j++) {
            if (i === idxI && j === idxJ) { continue; }
            if (i >= 0 && i <= gBoard.length - 1 && j >= 0 && j <= gBoard[0].length - 1) {
                var elCell = document.getElementById(' ' + i + '-' + j);
                if (!gBoard[i][j].isBomb && !gBoard[i][j].isMarked) {
                    gBoard[i][j].isShown = true;
                    if (elCell.classList.contains('unshown')) {
                        gState.shownCount++;
                        elCell.classList.remove('unshown');
                    }
                    var child = elCell.childNodes[0];
                    if (child !== undefined) {
                        child.style.display = 'block';
                    }
                }
            }
        }
    }
}


function expandShownBonus(idxI, idxJ) {
    var elThisCell = document.getElementById(' ' + idxI + '-' + idxJ);
    for (var i = idxI - 1; i <= idxI + 1; i++) {
        for (var j = idxJ - 1; j <= idxJ + 1; j++) {
            if (i === idxI && j === idxJ) { continue; }
            if (i >= 0 && i <= gBoard.length - 1 && j >= 0 && j <= gBoard[0].length - 1) {
                var elCell = document.getElementById(' ' + i + '-' + j);
                if (!gBoard[i][j].isBomb && !gBoard[i][j].isMarked) {
                    gBoard[i][j].isShown = true;
                    var shownNow = false;
                    if (elCell.classList.contains('unshown')) {
                        gState.shownCount++;
                        elCell.classList.remove('unshown');
                        shownNow = true;
                    }
                    var child = elCell.childNodes[0];
                    if (child !== undefined) {
                        child.style.display = 'block';
                    }
                    else if (shownNow) expandShownBonus(i, j);
                }
            }
        }
    }
}

//this is right click implementation!
/*************************************************************************************************************** */
// CR: Way over complicated
window.oncontextmenu = function (event) {
    if (gWinLoseMode) return;
    var rightClickedCellEl = event.srcElement;
    var i = +rightClickedCellEl.id.toString().charAt(1);
    var j = +rightClickedCellEl.id.toString().charAt(3);
    if (rightClickedCellEl.classList.contains('unshown')) {
        if (!rightClickedCellEl.classList.contains('flaged')) {
            var strHTML = '<img src="img/flag.jpg">';
            rightClickedCellEl.innerHTML = strHTML;
            rightClickedCellEl.classList.add('flaged');
            gBoard[i][j].isMarked = true;
            gState.markedCount++;
            var child = rightClickedCellEl.childNodes[0];
            if (child.nodeName === 'IMG') {
                child.style.display = 'block';
            }
        }
        else {
            var strHTML = '';
            rightClickedCellEl.innerHTML = strHTML;
            rightClickedCellEl.classList.remove('flaged');
            gBoard[i][j].isMarked = false;
            gState.markedCount--;
        }
    }
    else {
        //when i press right click on flag it takes the img element and not the cell element -PROBLEM
        if (rightClickedCellEl.nodeName === 'IMG' && rightClickedCellEl.src.toString().includes('flag.jpg')) {
            var cellEl = rightClickedCellEl.parentElement;
            i = +cellEl.id.toString().charAt(1);
            j = +cellEl.id.toString().charAt(3);
            var strHTML = '';
            cellEl.innerHTML = strHTML;
            cellEl.classList.remove('flaged');
            gBoard[i][j].isMarked = false;
            gState.markedCount--;
        }
    }
    if (gState.markedCount === gLevel.mines && gState.shownCount + gState.markedCount === gLevel.size * gLevel.size) {
        winGame();
    }
    return false;     // cancel default menu of right click
}
/*************************************************************************************************************** */


function placeMines(clickedElCell) {
    var minesToPut = gLevel.mines;
    while (minesToPut > 0) {
        var i = getRandomInt(0, gBoard.length);
        var j = getRandomInt(0, gBoard[0].length);
        var chosenElCell = document.querySelector('.cell-' + i + '-' + j);
        if ((clickedElCell !== chosenElCell) && (!chosenElCell.classList.contains('mine-cell'))) {
            gBoard[i][j].isBomb = true;
            chosenElCell.classList.add('mine-cell');
            var strHTML = '<img src="img/mine.jpg">';
            chosenElCell.innerHTML = strHTML;
            minesToPut--;
        }
    }
}

// CR: DOM manipulation does not belong in this function
function countNieghboursMatrix() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var numOfMinesNieghbours = countNieghbours(i, j);
            gBoard[i][j].bombsAroundCount = numOfMinesNieghbours;
            var elCell = document.querySelector('.cell-' + i + '-' + j);
            if (!elCell.classList.contains('mine-cell') && numOfMinesNieghbours > 0) {
                var strHTML = '<img src="img/' + numOfMinesNieghbours + '.jpg">';
                elCell.innerHTML = strHTML;
            }
        }
    }
}

// CR: DOM manipulation...
function countNieghbours(idxI, idxJ) {
    var numOfMinesNieghbours = 0;
    for (var i = idxI - 1; i <= idxI + 1; i++) {
        for (var j = idxJ - 1; j <= idxJ + 1; j++) {
            if (i === idxI && j === idxJ) { continue; }
            if (i >= 0 && i <= gBoard.length - 1 && j >= 0 && j <= gBoard[0].length - 1) {
                var cellToCheckEl = document.querySelector('.cell-' + i + '-' + j);
                if (cellToCheckEl.classList.contains('mine-cell')) {
                    numOfMinesNieghbours++;
                }
            }
        }
    }
    return numOfMinesNieghbours;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}