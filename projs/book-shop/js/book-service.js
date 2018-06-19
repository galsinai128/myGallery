'use strict'

var gBooks = [];
var gIdGen = 1;
var gSortFlag = true;


function addBook(title,price,photo){
    gBooks.push({
        id : gIdGen++,
        title : title,
        price : price,
        photo : photo,
        rate : 0
    })
}


function deleteBook(bookId){
    for (var i = 0; i < gBooks.length; i++){
        if (gBooks[i].id === +bookId){
            gBooks.splice(i,1);
            break;
        }
    }
}


function updateBook(bookId,newPrice){
    for (var i = 0; i < gBooks.length; i++){
        if (gBooks[i].id === +bookId){
            gBooks[i].price = newPrice;
            break;
        }
    }
}

function getTitle(bookId){
    for (var i = 0; i < gBooks.length; i++){
        if (gBooks[i].id === +bookId){
            return gBooks[i].title;
            break;
        }
    }
}

function getPhoto(bookId){
    for (var i = 0; i < gBooks.length; i++){
        if (gBooks[i].id === +bookId){
            return gBooks[i].photo;
            break;
        }
    }    
}

function  getBookPrice(bookId){
    for (var i = 0; i < gBooks.length; i++){
        if (gBooks[i].id === +bookId){
            return gBooks[i].price;
            break;
        }
    }
}

function  getBookRate(bookId){
    for (var i = 0; i < gBooks.length; i++){
        if (gBooks[i].id === +bookId){
            return gBooks[i].rate;
            break;
        }
    }
}

function setRate(bookId,isPlus){
    for (var i = 0; i < gBooks.length; i++){
        if (gBooks[i].id === +bookId){
            if (isPlus){
                if (gBooks[i].rate<10) gBooks[i].rate++;
            }
            else {
                if (gBooks[i].rate>0) gBooks[i].rate--;
            }
        }
    }
}


function sortBooks(){
    if (gSortFlag) sortByName();
    else sortByPrice();
    gSortFlag = !gSortFlag;    
}

function sortByName(){
    gBooks.sort(function(bookA,bookB){
        if (bookA.title > bookB.title) return 1
        else return -1;
    })
}

function sortByPrice(){
    gBooks.sort(function(bookA,bookB){
        if (bookA.price > bookB.price) return 1
        else return -1;
    })
}