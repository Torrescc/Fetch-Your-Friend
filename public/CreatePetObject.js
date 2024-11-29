var pets = [];
var currentPet =0;
var pageAPINumber = 1;
var Pet = {
    name : "smelly" ,
    age : "37 months" ,
    pounds : 60 ,
    animal : "dog" ,
    breed : ["germanshepard" ,"husky"] ,
    traits : ["smelly" , "smart" , "playful" , "white" , "loyal"],
    link : "https://example.org",
    image : "Dog.jpeg",
    gender : "boy",
};

function catalogDisplayingNewPets(){
    if(pets.length > pageNumber * 40){
        addAllPets();
    }
    else{
        addMorePetsFromAPI();
    }
}
function startSwipeDisplayingNewPets(){
    const apiKey = '4VxhkxM5';
    const endpoint = 'https://api.rescuegroups.org/v5/public/animals/search/';
    let requestData = {
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": apiKey
        },
        
            data: {
                type: "animals",
                page : pageAPINumber,
                attributes: {
                    species: "dog", // Filter for dogs; change as needed
                    status: "Available",

                }
            },
        
    };
    pageAPINumber += 1;
    $.ajax(endpoint, requestData)
    .done(response => {
        pets = pets.concat(createListPetObjects(response.data));
        console.log(pets);
        startAndConnectSwipe();
        })
    .fail(error => {
        console.error("API request failed: ", error);
    });
}

function SwipeDisplayingNewPets(){
    if(pets.length < numberOfPetsSwiped + 20){
        addMorePetsFromAPI();
    }
}
function addMorePetsFromAPI(){
    const apiKey = '4VxhkxM5';
    const endpoint = 'https://api.rescuegroups.org/v5/public/animals/search/';
    let requestData = {
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": apiKey
        },
        data: {
                type: "animals",
                page : pageAPINumber,
                attributes: {
                    status: "Available",

            }
        },
        
        
    };
    pageAPINumber += 1;


    $.ajax(endpoint, requestData)
    .done(response => {
        pets = pets.concat(createListPetObjects(response.data));
        if((url == "catalog.html" || url == "catalog.htm")){ 
            if(pets.length > pageNumber * 40){
                addAllPets();
            }else{
                addMorePetsFromAPI();
            }
        console.log(response);
        }
        if(url ==  "swipe.htm" || url == "swipe.html"){
            if(pets.length < numberOfPetsSwiped + 20){
                addMorePetsFromAPI();
            }
        }

    })
    .fail(error => {
        console.error("API request failed: ", error);
    });
}

var lovelyWords = [ "lovely" , "loving" , "care" , "caring" , "friends" , "friend" , "friendly" ,"lover" , "kiss" , "kisses" , "cu"];
var lovelysynonyms = [ "loving" , "caring" , "friendly" , "kind" , "warmhearted"];

var activeWords = ["adventurous" , "adventure" , "active" , "play" , "playful" ,"playing" , "played" , "yard" , "high" , "energy" , "high-energy"];
var activesynonyms = ["adventurous" , "active" , "playful" , "high-energy"];

var funnyWords = ["silly" , "funny" , "goofy" , "toy" , "toys" , "goof" , "fun"];
var funnysynonyms = ["silly" , "funny" , "goofy" , "humorous" , "amusing"];

var confidentWords = ["confident" , "hard-working" , "protective" , "proud" , "courageous" , "pride" , "courage" , "protect" , "protected" ,"protected" ,"work" , "working" , "worked"];

var confidentsynonyms = ["confident" , "hard-working" , "protective" , "proud" , "courageous"];

var foodieWords = ["dinnertime" , "dinner" , "food" , "foodie" , "dogfood" , "hungry" , "appetite" , "gourmet" , "catfood"]
var foodiesynonyms = ["gluttonous" , "foodie" ,"food_lover" , "food_enjoyer" , "gourmet"];


function createListPetObjects(array){
    returnedArray =[];
    for(let i = 0; i < array.length; i++ ){
        returnedArray.push(createPetObjectFrom(array[i]))
    }
    return returnedArray;

}
function createPetObjectFrom(newPetfromAPI){
    
   
    let newGender;
    if(newPetfromAPI.attributes.sex = "Male"){
        newGender = "boy"
    }
    else{
        newGender = "girl"
    }
    let newAnimal = "";
    let animalId = newPetfromAPI.relationships.species.data[0].id
    if(animalId == "8"){
        newAnimal = "dog";
    }
    else if(animalId == "3"){
        newAnimal = "cat";
    }
    else{
        newAnimal = "other";
    }
    
    let returnedPet = {
        name : newPetfromAPI.attributes.name, 
        gender : newGender , 
        breed : [newPetfromAPI.attributes.breedPrimary , newPetfromAPI.attributes.breedSecondary],
        age : newPetfromAPI.attributes.ageString , 
        image : newPetfromAPI.attributes.pictureThumbnailUrl , 
        pounds : newPetfromAPI.sizeCurrent ,
        traits : GetTraits(makeAllLower(newPetfromAPI.attributes.descriptionText)),
        link : newPetfromAPI.attributes.url ,
        animal : newAnimal,
    }
    for(var propt in returnedPet){
        if(returnedPet[propt] != undefined && propt != "traits" && propt != "breed"){
            returnedPet[propt] = returnedPet[propt].replaceAll(" " , "_").toLowerCase();
        }
        
        
    }
    for(let i = 0; i < returnedPet["breed"].length; i++){
        if(returnedPet["breed"][i] != undefined){
            returnedPet["breed"][i] = returnedPet["breed"][i].replaceAll(" " , "_").toLowerCase();
        }else{
            if(i =1){
                returnedPet["breed"] = returnedPet["breed"].slice(0 , 1);
            }
            else{
                returnedPet["breed"][i] = "";
            }
        }
    }

    return JSON.stringify(returnedPet);

}





function createPetObject(){
    var newPetfromAPI;
    if(currentPet < pets.length){
        newPetfromAPI = pets[currentPet++];
    }
    else{
        return JSON.stringify(Pet);
    }
    let newGender;
    if(newPetfromAPI.attributes.sex = "Male"){
        newGender = "boy"
    }
    else{
        newGender = "girl"
    }
    let newAnimal = "";
    let animalId = newPetfromAPI.relationships.species.data[0].id
    if(animalId == "8"){
        newAnimal = "dog";
    }
    else if(animalId == "3"){
        newAnimal = "cat";
    }
    else{
        newAnimal = "other";
    }
    
    let returnedPet = {
        name : newPetfromAPI.attributes.name, 
        gender : newGender , 
        breed : [newPetfromAPI.attributes.breedPrimary , newPetfromAPI.attributes.breedSecondary],
        age : newPetfromAPI.attributes.ageString , 
        image : newPetfromAPI.attributes.pictureThumbnailUrl , 
        pounds : newPetfromAPI.sizeCurrent ,
        traits : GetTraits(makeAllLower(newPetfromAPI.attributes.descriptionText)),
        link : newPetfromAPI.attributes.url ,
        animal : newAnimal,
    }
    for(var propt in returnedPet){
        if(returnedPet[propt] != undefined && propt != "traits" && propt != "breed"){
            returnedPet[propt] = returnedPet[propt].replaceAll(" " , "_").toLowerCase();
        }
        
        
    }
    for(let i = 0; i < returnedPet["breed"].length; i++){
        if(returnedPet["breed"][i] != undefined){
            returnedPet["breed"][i] = returnedPet["breed"][i].replaceAll(" " , "_").toLowerCase();
        }else{
            if(i =1){
                returnedPet["breed"] = returnedPet["breed"].slice(0 , 1);
            }
            else{
                returnedPet["breed"][i] = "";
            }
        }
    }

    return JSON.stringify(returnedPet);

}
function GetTraits(description){
    var lovelyPoints = 0;
    var confidentPoints = 0;
    var funnyPoints = 0;
    var activePoints = 0;
    var foodiePoints = 0;
    if(description == undefined){
        return [];
    }
    let wordsfound = description.split(" " , 100);

    

    var traits = [];

    for(let i =0 ; i < wordsfound.length; i++){
       if(lovelyWords.includes(wordsfound[i])){
        lovelyPoints += 1;
       }
       else if(confidentWords.includes(wordsfound[i])){
        confidentPoints += 1;
       }
       else if(funnyWords.includes(wordsfound[i])){
        funnyPoints += 1;
       }
       else if(activeWords.includes(wordsfound[i])){
            activePoints += 1;
       }
       else if(foodieWords.includes(wordsfound[i])){
            foodiePoints +=1;
       }
    }

    //deep copy the arrays synomns and randomize those arrays
    var lovely = randomizeArray(JSON.parse(JSON.stringify(lovelysynonyms)));
    var funny = randomizeArray(JSON.parse(JSON.stringify(funnysynonyms)));
    var confident = randomizeArray(JSON.parse(JSON.stringify(confidentsynonyms)));
    var active = randomizeArray(JSON.parse(JSON.stringify(activesynonyms)));
    var foodie = randomizeArray(JSON.parse(JSON.stringify(foodiesynonyms)));


    for(let i = 0; i < 5; i++){

        // find the maximum amount of points
        let max = confidentPoints;
        let trait = "confident";


        if(max < foodiePoints){
            max = foodiePoints;
            trait = "foodie";
        }
        if(max < activePoints){
            max = activePoints;
            trait = "active";
        }
        if(max < funnyPoints){
            max = funnyPoints;
            trait = "funny";
        }
        if(max < lovelyPoints){
            max = lovelyPoints;
            trait = "lovely";
        }
        if(max == 0){
            return traits;
        }
        if(trait == "lovely"){
            lovelyPoints -= 1;
            traits.push(lovely.pop());
        }else if(trait == "funny"){
            funnyPoints -= 1;
            traits.push(funny.pop());
        }else if(trait  == "confident"){
            confidentPoints -= 1;
            traits.push(confident.pop());
        }
        else if(trait == "active"){
            activePoints -= 1;
            traits.push(active.pop());
        }else{
            foodiePoints -= 1;
            traits.push(foodie.pop());
        }
    }
    return traits;
}

function makeAllLower(str) {
    if(str == undefined){
        return undefined;
    }
       return str.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
}
function randomizeArray(array){
    array.sort(function (a , b) {Math.random() - 0.5});
    return array;
}