var swipePointer1;
var swipePointer2;
var swipePointer3;
var entryPoint;
var number = 1;


// checks which function we are using
let url = window.location.href.slice(window.location.href.lastIndexOf("/")+1 , window.location.href.lastIndexOf("?"));
if(url == "catalog.html" || url == "catalog.htm"){
    window.addEventListener("DOMContentLoaded", connect);
}
if(url ==  "swipe.htm" || url == "swipe.html"){
    window.addEventListener("DOMContentLoaded" , startAndConnectSwipe);
}
var Pet = {
    name : "smelly" ,
    age : "37" ,
    pounds : 60 ,
    animal : "dog" ,
    breed : ["germanshepard" ,"husky"] ,
    traits : ["smelly" , "smart" , "playful" , "white" , "loyal"],
    link : "https://example.org",
    image : "Dog.jpeg",
    gender : "boy",
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
        let s =createPetObject();
       addPetToCatalog(JSON.parse(s));
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
    if(window.screen.width < 600){
    swipePointer1.addEventListener("touchstart" , touchStart);

    swipePointer1.addEventListener("touchmove" , moveSwipeCard);
    swipePointer1.addEventListener("touchend" , touchEnd);
    }
    entryPoint = null;
    resetZaxis();
}

//happens after a regection and a keep to show new canitdates
function cycle(){
    swipePointer1.remove();
    swipePointer1 = swipePointer2;
    swipePointer2 = swipePointer3;
    swipePointer3 = addPetToSwipe(getNextPetSwipe());
    resetZaxis();
    if(window.screen.width < 600){
        swipePointer1.addEventListener("touchstart" , touchStart);

    swipePointer1.addEventListener("touchmove" , moveSwipeCard);
    swipePointer1.addEventListener("touchend" , touchEnd);
    touchEnd(); 
    }
}
function resetZaxis(){
    swipePointer1.setAttribute("style" , "z-index: 3;");
    swipePointer2.setAttribute("style" , "z-index: 2;");
    swipePointer3.setAttribute("style" , "z-index: 1;");

}
var originalStyle;
function moveSwipeCard( event){
    
    if(entryPoint !=  null){
        
        //console.log((event.screenX - entryPoint.x) + " " + (event.screenY - entryPoint.y));
        swipePointer1.setAttribute("style" , originalStyle +"left : " + (-0.025 * window.screen.width - entryPoint.x + event.touches[0].screenX) + "px;")
        if(entryPoint.x -event.touches[0].screenX <  window.screen.width * -.2){
            saveAndCycle();
        }   
        else if(entryPoint.x -event.touches[0].screenX >  window.screen.width * .2){
            cycle();
        }
        
    }
}
function touchStart(event){
    hasTouched = false;
    entryPoint = { 
        x : event.touches[0].screenX,
        y : event.touches[0].screenY
        
    }
    originalStyle = swipePointer1.getAttribute("style")
}
function touchEnd(){
    swipePointer1.setAttribute("style" ,  originalStyle);
    entryPoint = null;
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
    addAge(swipeInfo , pet.age);
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
    addAge(newPet , pet.age);
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
    addAge(newPet , pet.age);
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
function addAge(container , age){
    let ageDiv = document.createElement("div");
    ageDiv.setAttribute("class" , "age");
    
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
    bioDiv.innerHTML = bio;
    container.appendChild(bioDiv);
}
function generateBio(pet){
    let trait = pet.traits[Math.floor(Math.random() * pet.traits.length)];
    
    return funnyBio(pet);
}

//for generating bios returns a string that matches the description
function thingsYouCanDoWithPets(pet){
    thingsYouCanDoWithPetsList = ["pets" , "snuggles" , "cuddles" , "playing" ];
    if(pet.animal == "dog"){
        thingsYouCanDoWithPetsList.push("kisses");
    }
    
    return thingsYouCanDoWithPetsList[Math.floor(Math.random() * thingsYouCanDoWithPetsList.length)];
}
function impressiveHumanThing(pet){
    things = ["greatest treats"];
    if(pet.animal == "cat"){
        things.push("biggest cat towers");
    }
    else if(pet.animal == "dog"){
        things.push("largest yard");
        things.push("largest stick");
    }
    return things[Math.floor(Math.random() * things.length)];
}
function noiseMade(pet){
    if(pet.animal == "dog"){
        return "bark";
    }
    if(pet.animal == "cat"){
        return "meow";
    }
    return "growl";

}
function funnyBio(pet){
    let numberOfFunnyBios = 8; 
    switch(Math.floor((Math.random() * numberOfFunnyBios) )){
        case 0:
            return "pros and cons of adopting of me. Pro: you will own a" + pet.animal + "Cons: you will be adoptiong me with all my " + pet.traits[Math.floor((Math.random() * pet.traits.length))] + "ness";
        case 1:
            
            return "Just looking for something super casual, like "+ thingsYouCanDoWithPets(pet)+ " all day and being your bestfriend. Nothing serious!";
        case 2:
            petAchievments = "I have won a beauty pageant";
            return "Two truths and a lie: "+ petAchievments + ", I am an " +  pet.traits[Math.floor((Math.random() * pet.traits.length))] + " " + pet.animal + " , one of these is a lie.";
        case 3:
            let scaryAnimal = "spiders";
            return "Minimum requirements: must get rid of the " + scaryAnimal + ". ";
        case 4:
            return " Looking for that special someone to help me steal the Declaration of Independence.";
        case 5:
            return "Costco hot dog enthusiast.";
        case 6:
            return "Swipe right if you go to therapy";
        case 7:
        
            return "must have the world's " + impressiveHumanThing(pet);
        case 8:
            return "I am not asking for much , only that you feed me water me and, entertain me";
        default:
            return "";
    } 
}
function flirtyBio(pet){
    let numberOfFlirtyBios = 4;
    switch(Math.floor((Math.random() * numberOfFlirtyBios) )){
        case 0:
            return "looking for a reason to no longer be on this website and hopefully you're it";
        case 1:
            return "On a scale from one to food dropped on the ground: how free are you tonight?";
        case 2:
            "if you like my profile that means I have to be adopted. Right?"
        case 3:
            return "Swipe right if you can handle impromptu adventures and toys in silly places";
        default:
            return "";
    }
}
function activeBio(pet){
    let numberOfActiveBios = 4;
    switch(Math.floor((Math.random() * numberOfActiveBios) )){
        case 0:
            return "I like long walks on the beach and other fun activities!";
        case 1:
            return "Looking for an adventurous human";
        case 2:
            return "Fitness enthusiast who enjoys running outside and the occasional sniffing session";
        case 3:
            return "my special talent is that my tail can wag at mach 5";
        
        default:
            return "";
    }
}
function confidentBio(pet){
    let numberOfConfidentBios = 5;
    switch(Math.floor((Math.random() * numberOfConfidentBios) )){
        case 0:
            return "you deserve good things I am one of them";
        case 1:
            return "I am here now what are your other two wishes?";
        case 2:
            return "I love me and you should too";
        case 3:
            return "adopting me is like adopting the most fun " + pet.animal + " and the most humble too";
        case 4:
            return "let me know when your picking me up" ;
        default:
            return "";
        
    }
}
function miscleanousBios(pet){
    return "Hi i am " + pet.name + " and I need a parent";
}
function cleverBios(pet){
    let numofcleverBios = 3
    switch(Math.floor((Math.random() * numofcleverBios) )){
    case 0:
        return 'Trying Fetch Your Friends out because '+ noiseMade(pet) + 'ing "I love you" to strangers does not seem to be working.'
    case 1:
        return "do you like my fur? it's made of adoptable " + pet.animal + " materials"
    case 2:
        return  "I'm all about good vibes and even better cuddles. Care to join?"
    case 3:
        return "Now taking applications for a human. Must be certified in cuddling and telling me I’m a good " + pet.gender + ". Swipe right to inquire within."
    default:
        return "";
    }
}
function foodRelatedBios(pet){
    let numoffoodBios = 4;
    switch(Math.floor((Math.random() * numoffoodBios) )){
        case 0: 
            return "Looking for the pepperoni to my pizza, the peanut butter to my jelly, the cheese to my crackers. Oh dang… now I’m hungry.";
        case 1: 
            return "I am not asking for much , only that you feed me and, entertain me";
        case 2:
            return "Costco hot dog enthusiast.";
        case 3:
            return "I am searching for someone to share snacks with";
        default:
            return "";

    }
}
function sillyBios(pet){
    let numofBios = 2;
    switch(Math.floor(Math.random() * numofBios)){
        case 0:
            return "I'm not a photographer, but I can pretty much picture us together... in matching halloween costumes";
        case 1:
            return "I'm just a small-town " + pet.gender + ", living in a lonely world. let's take a midnight train going to adoption";
        default:
            return "";
    }
}
function lowEnergyBios(pet){
    let numofBios = 1;
    switch(Math.floor(Math.random() * numofBios)){
        case 0:
            return "passionate about sleeping and days with zero plans";
        default:
            return "";
    }
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

// helper functions for getting the JSON from a Class
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

