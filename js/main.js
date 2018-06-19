'use strict';
console.log('Starting up');

var gCurrProj;

function initPage(){
    var elProtfolio = document.querySelector('.portfolio-items');
    var strHtml = '';
    for (var i = 0; i < gProjs.length; i++){
        strHtml += `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a id = "${gProjs[i].id}" class="portfolio-link" data-toggle="modal" href="#portfolioModal1"  onclick="updateProtfolioModal(this)">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${gProjs[i].id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${gProjs[i].name}</h4>
          <p class="text-muted">${gProjs[i].labels}</p>
        </div>
      </div>      
        `
    }
    elProtfolio.innerHTML = strHtml; 
}


function updateProtfolioModal(elProj){
    var proj = getProjById(elProj.id);
    gCurrProj = proj; //for opening the project itself

    var elModalComponent = document.querySelector('.modal-project-name');
    elModalComponent.innerText = proj.name;

    elModalComponent = document.querySelector('.modal-project-title');
    elModalComponent.innerText = proj.title;

    elModalComponent = document.querySelector('.modal-project-img');
    elModalComponent.src = `img/portfolio/${elProj.id}.jpg`;

    elModalComponent = document.querySelector('.modal-project-desc');
    elModalComponent.innerText = proj.desc;

    elModalComponent = document.querySelector('.modal-project-date');
    elModalComponent.innerText = 
    `Date: ${getMonthName(proj.publishedAt.getMonth())} ${proj.publishedAt.getYear()+ DATE_YEAR_PARSER}` 
}


function OnMessageSubmitted(){
    var mailStr = document.querySelector('.mail-massage-submition').value;
    var subjectStr = document.querySelector('.subject-massage-submition').value;
    var bodyStr = document.querySelector('.body-massage-submition').value;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=galsinay128@gmail.com&su=${subjectStr}&body=${bodyStr}`);
}

function openProject(){
  window.open(`projs/${gCurrProj.id}/index.html`);
}