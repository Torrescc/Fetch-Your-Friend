window.addEventListener("DOMContentLoaded", connect);



function connect(){
    document.getElementById("pageTurner").children[0].addEventListener("click" , pageDown);
    document.getElementById("pageTurner").children[2].addEventListener("click" , pageUp);

}
function pageUp(){
    document.getElementById("pageNumber").textContent =  Number(document.getElementById("pageNumber").textContent) + 1;
}
function pageDown(){
    if(Number(document.getElementById("pageNumber").textContent) > 1){
        document.getElementById("pageNumber").textContent =  Number(document.getElementById("pageNumber").textContent) - 1;
    }
}

