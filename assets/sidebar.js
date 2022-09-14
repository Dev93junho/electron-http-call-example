const home = document.getElementById("home");
const tgl = document.getElementById("tgl");
let menuClosed = true;

function menu() {
    if(menuClosed) {
        home.classList.add("menu-opened"); 
        tgl.textContent = ">>>";
    }
    else {
        home.classList.remove("menu-opened"); 
        tgl.textContent = "<<<";
    }


    menuClosed = !menuClosed;
}