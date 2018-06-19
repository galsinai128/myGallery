'use strict';

var gProjs = [{
    "id": "book-shop",
    "name": "Book-shop",
    "title": "Book shop manager",
    "desc": "the book shop manager will help you to mange the books in your store",
    "url": "projs/book-shop",
    "publishedAt": new Date(2018, 6, 11),
    "labels": ["Bootstrap", "UI"],
},
{
    "id": "FlexLeyouts",
    "name": "FlexLeyouts",
    "title": "Flex and Media Queries",
    "desc": "introduction to responsive design",
    "url": "projs/FlexLeyouts",
    "publishedAt": new Date(2018, 6, 11),
    "labels": ["Flex", "Media Queries"],
},
{
    "id": "minesweeper",
    "name": "Minesweeper",
    "title": "Classic Minesweeper",
    "desc": "implementation of the nostalgic minesweeper",
    "url": "projs/minesweeper",
    "publishedAt": new Date(2018, 5, 30),
    "labels": ["Javascript", "Html", "css"],
},
{
    "id": "calc",
    "name": "Calculator",
    "title": "Pocket calculator",
    "desc": "pocket infix calculator application",
    "url": "projs/calc",
    "publishedAt": new Date(2018, 5, 29),
    "labels": ["Javascript", "Html", "css"],
},
{
    "id": "ball-board",
    "name": "Ball-Board",
    "title": "Ball-Board Game",
    "desc": "dinamic and graphic ball board game",
    "url": "projs/ball-board",
    "publishedAt": new Date(2018, 5, 27),
    "labels": ["Javascript", "Html", "css"],
},

];

function getProjById(projId) {
    return gProjs.find(function (proj) { return proj.id === projId });
}

