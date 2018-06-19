'use strict'

var gBookIdForUpdate;

function init(){
    addBook('Jinji',10,'img/jinji.jpg');
    addBook('Child 44',20,'img/child44.jpg');
    addBook('The litigators',15,'img/the-litigators.jpg');
    
    renderBooks();
    // renderPages();
}

function renderBooks(){
    var elBooksTable = document.querySelector('.books-table');
    var htmlStr = ''; 
    for (var i = 0; i < gBooks.length; i++){
        htmlStr+=
        `<tr id="${gBooks[i].id}">
            <th scope="row">${gBooks[i].id}</th>
                <td>${gBooks[i].title}</td>
                <td>${gBooks[i].price}</td>
                <td>
                    <button type="button" class="btn btn-primary" onClick="readBookClicked(this)" data-toggle="modal" data-target="#readBookModal">Read</button>
                    <button type="button" class="btn btn-success"  onClick="updateClicked(this)" data-toggle="modal" data-target="#update-modal">Update</button>
                    <button type="button" class="btn btn-danger" onClick="deleteBookClicked(this)">Delete</button>
                </td>
        </tr>`
    }
    elBooksTable.innerHTML = htmlStr;

}

function addBookCliked(){
    var bookTitle = document.querySelector('.new-book-title').value;
    var bookPrice = document.querySelector('.new-book-price').value;
    addBook(bookTitle,bookPrice);
    renderBooks();
    // renderPages();
}

function deleteBookClicked(elDelete){
    var bookId = getIdForButton(elDelete);
    deleteBook(bookId);
    renderBooks();
    // renderPages();
}

function updateClicked(elUpdate){
    gBookIdForUpdate = getIdForButton(elUpdate);
}


function updateBookClicked(elUpdate){
    var bookPrice = document.querySelector('.new-book-update').value;
    updateBook(gBookIdForUpdate,bookPrice);
    renderBooks();
    // renderPages();
    document.querySelector('.new-book-update').value='';
}

function getIdForButton(el){
    return el.parentElement.parentElement.id;
}

function readBookClicked(elRead){
    var bookId = getIdForButton(elRead);
    updateReadModal(bookId);
}

function updateReadModal(bookId){

    var elModalTitle = document.querySelector('.read-book-modal-title');
    var elModalBody = document.querySelector('.read-book-modal-body');

    var bookTitle = getTitle(bookId);
    elModalTitle.innerText = bookTitle;
    
    var bookPhoto = getPhoto(bookId);
    var bookPrice = getBookPrice(bookId);
    var bookRate = getBookRate(bookId);
    elModalBody.innerHTML = 
                            `
                                <div class="d-flex flex-row bd-highlight mb-3">
                                    <div class="p-2 bd-highlight">
                                        <img src=${bookPhoto} class="img-thumbnail"> 
                                    </div>
                                    <div class="p-2 bd-highlight">
                                    <div class="d-flex flex-column bd-highlight mb-3">
                                    <div class="p-2 bd-highlight in-modal-book-id">Book Id: ${bookId}</div>
                                    <div class="p-2 bd-highlight">Book Price: ${bookPrice}</div>
                                    <div class="p-2 bd-highlight">Book Rate: ${bookRate}</div>
                                  </div>
                                    </div>
                                </div>
                            `
    
}

function setRatePlusClicked(){
    var bookId = getIdForRate();
    setRate(bookId,true);
    updateReadModal(bookId);
}

function setRateMinusClicked(){
    var bookId = getIdForRate();
    setRate(bookId,false);
    updateReadModal(bookId);
}


function getIdForRate(){
    var elIdOfBook = document.querySelector('.in-modal-book-id');
    var strId = elIdOfBook.textContent;
    return +strId[strId.length-1];
}

function toggleSortClicked(){
    sortBooks();
    renderBooks();
}


// function renderPages(){
//     var elPaging = document.querySelector('.paging-manager')
//     var strHtml =  `
//                     <li class="page-item disabled">
//                     <a class="page-link" href="#" tabindex="-1">Previous</a>
//                     </li>
//                     `
//     for (var i = 0; i <= Math.ceil(gBoard.length/6); i++){
//         strHtml+= `
//         <li class="page-item">
//         <a class="page-link" href="#">${i}</a>
//         </li>
//         `
//     }
//     strHtml+= `
//                 <li class="page-item">
//                 <a class="page-link" href="#">Next</a>
//                 </li>
//             `
//     elPaging.innerHTML = strHtml;
// }