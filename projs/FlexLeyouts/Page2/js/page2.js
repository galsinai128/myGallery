var isSideMenuOpen = false;

function displaySideMenu(){
    var elSideMenu = document.querySelector('.side-menu');
    if (isSideMenuOpen){    
        elSideMenu.style.display = 'none';
    }
    else {
        elSideMenu.style.display = 'flex';
    }
    isSideMenuOpen = !isSideMenuOpen;
}