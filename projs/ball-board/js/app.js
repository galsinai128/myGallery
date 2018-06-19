var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';

var gGamerPos = { i: 2, j: 9 };
var gBoard = buildBoard();
var gBallsCollected = 0;
var gBallsOnScreen;
var gameInterval;

renderBoard(gBoard);
gameInterval = setInterval(function () { renderBoard(gBoard) }, 5000);

function buildBoard() {
	// Create the Matrix
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if (i == 0 || i == board.length - 1 || j == 0 || j == board[0].length - 1) {
				cell.type = WALL;

			}
			if ((i == 0 && j == Math.round((board.length - 1) / 2)) ||
				(i == board.length - 1 && j == Math.round((board.length - 1) / 2)) ||
				(i == Math.round((board.length - 1) / 2) && j == 0) ||
				(i == Math.round((board.length - 1) / 2) && (j == board[0].length - 1))) {
				var cell = { type: FLOOR, gameElement: null };
			}
			board[i][j] = cell;
		}
	}
	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;
	gBallsOnScreen = 2;

	//console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {
	addBalls();
	var elH2 = document.querySelector('h2');
	elH2.innerText = 'score: ' + gBallsCollected;
	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	//console.log('strHTML is:');
	//console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	//circle pass 1
	if (i === -1) {
		var targetCell = gBoard[gBoard.length - 1][j];
		i = gBoard.length - 1;
	}
	//circle pass 2
	if (i === gBoard.length) {
		var targetCell = gBoard[0][j];
		i = 0;
	}
	//circle pass 3
	if (j === -1) {
		var targetCell = gBoard[i][gBoard[0].length - 1];
		j = gBoard[0].length - 1
	}
	//circle pass 4
	if (j === gBoard[0].length) {
		var targetCell = gBoard[i][0];
		j = 0;
	}
	else var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	var jMiddle = Math.round((gBoard.length - 1) / 2);
	var iMidle = Math.round((gBoard.length - 1) / 2);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) ||
	 (jAbsDiff === 1 && iAbsDiff === 0) ||
	 //conditions for the circle passess 
	 (j === jMiddle && i === gBoard.length - 1) || 
	 (j === jMiddle && i === 0)|| 
	 (j === gBoard[0].length-1 && i === iMidle)|| 
	 (j === 0  && i === iMidle)) {

		if (targetCell.gameElement === BALL) {
			gBallsCollected++;
			var elH2 = document.querySelector('h2');
			elH2.innerText = 'score: ' + gBallsCollected;
			gBallsOnScreen--;
			if (gBallsOnScreen === 0) finishGame();
		}

		// MOVING
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function addBalls() {
	console.log('adding ball')
	var emptyCells = [];
	for (var i = 1; i < gBoard.length - 1; i++) {
		for (var j = 1; j < gBoard[i].length - 1; j++) {
			if (gBoard[i][j].gameElement === null) {
				emptyCells.push({ i: i, j: j });
			}
		}
	}

	var cellToPutBall = emptyCells[getRandomInt(0, emptyCells.length)];
	gBoard[cellToPutBall.i][cellToPutBall.j].gameElement = BALL;
	gBallsOnScreen++;

}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function finishGame() {
	clearInterval(gameInterval);
	var elH3 = document.querySelector('h3');
	elH3.style.display = 'inline';
}

function handleRestart() {
	gBallsCollected = 0;
	var elH3 = document.querySelector('h3');
	elH3.style.display = 'none';
	addBalls();
	renderBoard(gBoard);
	gameInterval = setInterval(function () { renderBoard(gBoard) }, 5000);
}