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

var savedPets = [];


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

// on load creates all the pets availble to see in catalog
function addAllPets(){
    for(let i = 0; i < 40; i++){
        
        Pet.name = "smelly" + i; // for testing
       addPetToCatalog(Pet);
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

// funtions that add pets to display ->

// adds a pet to the catalog based on the pet object it's handed
function addPetToSwipe(pet){
    var swipe = document.getElementByID("swipedisplay")[0];
    var newPet = document.createElement("div");
    catalog.appendChild(newPet);
    newPet.setAttribute("class" , "swipe");
    

    
    addImage(newPet , pet.image , pet.link);
    addName(newPet , pet.name );
    addAge(newPet , pet.months);
    addBio(newPet , generateBio(pet));
    addBreeds(newPet , pet.breed);
    addTraits(newPet , pet.traits);
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

