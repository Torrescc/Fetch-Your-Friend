window.addEventListener("DOMContentLoaded", connect);
window.addEventListener("DOMContentLoaded" , addAllPets);
var Pet = {
    name : "smelly" ,
    months : 37 ,
    pounds : 60 ,
    animal : "dog" ,
    breed : ["germanshepard" ,"husky"] ,
    traits : ["smelly" , "smart" , "playful" , "white" , "loyal"],
    link : "https://example.org",
    image : "Dog.jpeg",
};


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
function addAllPets(){
    addPet(Pet);
}

function addPet(pet){
    var catalog = document.getElementsByClassName("Catalog")[0];
    var newPet = document.createElement("div");
    catalog.appendChild(newPet);
    newPet.setAttribute("class" , "pet");
    addCheckButton(newPet);
    addImage(newPet , pet.image , pet.link);
    addName(newPet , pet.name );
    addAge(newPet , pet.months);
}
function addCheckButton(container){
    let button = document.createElement("button");
    container.appendChild(button);
    let checkMark = document.createElement("img");
    checkMark.setAttribute("src" , "checkmark.png");
    checkMark.setAttribute("alt" , "a green checkmark");
    button.appendChild(checkMark);
}
function addImage(container , image , link){
    let a = document.createElement("a");
    a.setAttribute("href" , link);
    container.appendChild(a);
    let img = document.createElement("img");
    img.setAttribute("src" , image);
    img.setAttribute("alt" , "adoptable animal");
    a.appendChild(img);
}
function addName(container , name){
    let nameDiv = document.createElement("div");
    nameDiv.setAttribute("class" , "name");
    nameDiv.textContent = name;
    container.appendChild(nameDiv);
}
function addAge(container , months){
    let ageDiv = document.createElement("div");
    ageDiv.setAttribute("class" , "age");
    let age = "";
    if(months > 18){
        age = Math.floor(months / 12) +" years";
    }
    else{
        age = months +" months"
    }
    ageDiv.textContent = age;
    container.appendChild(ageDiv);
}

