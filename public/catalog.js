var swipePointer1;
var swipePointer2;
var swipePointer3;
var number = 1;


// checks which function we are using
let url = window.location.href.slice(window.location.href.lastIndexOf("/")+1 , window.location.href.lastIndexOf("?"));
if(url == "catalog.html" || url == "catalog.htm"){
    window.addEventListener("DOMContentLoaded" , addAllPets);
    window.addEventListener("DOMContentLoaded", connect);
}
if(url ==  "swipe.htm" || url == "swipe.html"){
    window.addEventListener("DOMContentLoaded" , startAndConnectSwipe);
}
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

var savedPets = [];

//page turner functions
function connect(){
    document.getElementById("pageTurner").children[0].addEventListener("click" , pageDown);
    document.getElementById("pageTurner").children[2].addEventListener("click" , pageUp);
    document.getElementById("filterbutton").addEventListener("click" , toggleFilters);

}
function pageUp(){
    document.getElementById("pageNumber").textContent =  Number(document.getElementById("pageNumber").textContent) + 1;
    addAllPets();
}
function pageDown(){
    if(Number(document.getElementById("pageNumber").textContent) > 1){
        document.getElementById("pageNumber").textContent =  Number(document.getElementById("pageNumber").textContent) - 1;
        addAllPets();
    }

}


// end of page turner


//functions for catalog
// on load creates all the pets availble to see in catalog
// to do: work with api
function addAllPets(){
    var catalog = document.getElementsByClassName("Catalog")[0];
    // remove all privous entries
    while(catalog.children.length > 0){
        catalog.children[0].remove();
    }
    // add them back in based on page number
    for(let i = 0; i < 40; i++){
        Pet.name = "smelly" + (i + 40 * (Number(document.getElementById("pageNumber").textContent) - 1)); // for testing
       addPetToCatalog(Pet);
    }
}
var filtersEnabled = true;
function toggleFilters(){
    if(filtersEnabled){
        filtersEnabled = false;
        this.textContent = "enable";
        document.getElementsByClassName("filters")[0].setAttribute("style" , "height : 0pt; width : 0pt; overflow: hidden;padding : 0pt; margin : 0pt;");
        document.getElementById("topofCatalog").setAttribute("style" , "height : 150px");
    }
    else{
        filtersEnabled = true;
        this.textContent = "disable";
        document.getElementsByClassName("filters")[0].setAttribute("style" , "");
        document.getElementById("topofCatalog").setAttribute("style" , "");

    }
}

// saves pets from catalog
// the checkmarks are listening for this event
function savePetFromButtonOnCatalog(){
   for(let i = 0; i < this.parentElement.classList.length; i++){
      if(isJsonString(this.parentElement.classList[i])){
        savedPets.push(JSON.parse(this.parentElement.classList[1]));
      }
    }
    this.parentElement.remove();
   
}
// test print all the SavedPets
function printSaved(){
    
    for(let i =0; i < savedPets.length; i++){
        console.log(savedPets[i].name);
    }
}
//end of catalog

//fucntions for swipe

function startAndConnectSwipe(){
    document.getElementById("deny").addEventListener("click" , cycle);
    document.getElementById("accept").addEventListener("click" , saveAndCycle);
    swipePointer1 = addPetToSwipe(getNextPetSwipe());
    swipePointer2 = addPetToSwipe(getNextPetSwipe());
    swipePointer3 = addPetToSwipe(getNextPetSwipe());
    swipePointer1.addEventListener("mousemove" , moveSwipeCard);

    resetZaxis();
}

//happens after a regection and a keep to show new canitdates
function cycle(){
    swipePointer1.remove();
    swipePointer1 = swipePointer2;
    swipePointer2 = swipePointer3;
    swipePointer3 = addPetToSwipe(getNextPetSwipe());
    resetZaxis();
    swipePointer1.addEventListener("touchmove" , moveSwipeCard);
}
function resetZaxis(){
    swipePointer1.setAttribute("style" , "z-index: 3;");
    swipePointer2.setAttribute("style" , "z-index: 2;");
    swipePointer3.setAttribute("style" , "z-index: 1;");

}
function moveSwipeCard( event){
    console.log(event);
    console.log("hello");
}

// save then cycle happens when accept
function saveAndCycle(){
    savedPets.push(JSON.parse(jsonFromList(swipePointer1.classList)));
    cycle();
}
// get next swipe
function getNextPetSwipe(){
    Pet.name = "smelly" + number++;
    return Pet;
}

// end of swipe

// funtions that add pets to display ->

// adds a pet to the catalog based on the pet object it's handed
function addPetToSwipe(pet){
    var swipe = document.getElementById("swipebody");
    var newPet = document.createElement("div");
    swipe.appendChild(newPet);
    newPet.classList.add("swipe");
    newPet.classList.add(JSON.stringify(pet));

    
    addImage(newPet , pet.image , pet.link);
    var swipeInfo = addSwipeInfo(newPet);

    addName(swipeInfo , pet.name );
    addAge(swipeInfo , pet.months);
    addBio(swipeInfo , generateBio(pet));
    addBreeds(swipeInfo , pet.breed);
    addTraits(newPet , pet.traits);
    return newPet;
}
function addPetToCatalog(pet){
    var catalog = document.getElementsByClassName("Catalog")[0];
    var newPet = document.createElement("div");
    catalog.appendChild(newPet);
    
    newPet.classList.add("pet");
    newPet.classList.add(JSON.stringify(pet));
    
    
    addCheckButton(newPet);
    addImage(newPet , pet.image , pet.link);
    addName(newPet , pet.name );
    addAge(newPet , pet.months);
    addBio(newPet , generateBio(pet));
    addBreeds(newPet , pet.breed);
    addTraits(newPet , pet.traits);
}
function addPetToSavedPets(pet){
    var catalog = document.getElementsByClassName("Catalog")[0];
    var newPet = document.createElement("div");
    catalog.appendChild(newPet);
    newPet.setAttribute("class" , "pet");
    
    addImage(newPet , pet.image , pet.link);
    addName(newPet , pet.name );
    addAge(newPet , pet.months);
    addBio(newPet , generateBio(pet));
    addBreeds(newPet , pet.breed);
    addTraits(newPet , pet.traits);
}

// end of functions that add pets to display







// different elements to be added when creating a pet display
function addSwipeInfo(container){
    let div = document.createElement("div");
    container.appendChild(div);
    div.setAttribute("class" , "swipeinfo");
    return div;
}

function addCheckButton(container){
    let button = document.createElement("button");
    container.appendChild(button);
    let checkMark = document.createElement("img");
    checkMark.setAttribute("src" , "checkmark.png");
    checkMark.setAttribute("alt" , "a green checkmark");
    button.appendChild(checkMark);
    button.addEventListener("click" , savePetFromButtonOnCatalog);
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
function addBreeds(container , breeds){
    let len = breeds.length;
    let text = "";
    for(let i = 0; i < len ; i++){
        if(i == len-1 && i != 0){
            text += " & "
        }
        
        text += breeds[i]
        
    }
    let breedDiv = document.createElement("div");
    breedDiv.setAttribute('class' , "breed");
    breedDiv.textContent = text;
    container.appendChild(breedDiv);
}
function addBio(container , bio){
    let bioDiv = document.createElement("div");
    bioDiv.setAttribute('class' , 'bio');
    bioDiv.textContent = bio;
    container.appendChild(bioDiv);
}
function generateBio(pet){
    let trait = pet.traits[Math.floor(Math.random() * pet.traits.length)];
    
    return "hi am " + pet.name + " and I am " + trait;
}

function addTraits(container , traits){
    let divTraitList = document.createElement("div");
    divTraitList.setAttribute("class" , "character");
    container.appendChild(divTraitList);

    for(let i = 0; i < traits.length; i++){
        let divTrait = document.createElement("div");
        divTrait.setAttribute("class" , "trait");
        divTrait.textContent = traits[i];
        divTraitList.appendChild(divTrait);
    }
    

}
// end of pet elements

// helper function
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function jsonFromList(lis){
    for(let i = 0; i < lis.length; i++){
        if(isJsonString(lis[i])){
            return lis[i];
        }
    }
    return "{}";
}

