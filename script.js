var Pet = {
    name : "smelly" ,
    months : 37 ,
    pounds : 60 ,
    animal : "dog" ,
    breed : ["germanshepard" ,"husky"] ,
    traits : ["smelly" , "smart" , "playful" , "white" , "loyal"]
};
var Pets =[Pet];
var value = {
    age : "puppy" ,
    size : "small",
    animal : "dog",
    trait : "smelly",
    breed : "husky"
};


function evaluateScore(value  , Pet){
    let score = 0;
    if(Pet.animal.toLowerCase() == value.animal.toLowerCase()){
        score += 3;
    }
    for(let i =0; i < Pet.breed.length; i++){
        if(value.breed.toLowerCase() == Pet.breed[i]){
            score += 1;
        }
    }
    for(let i =0; i < Pet.traits.length; i++){
        if(value.trait.toLowerCase() == Pet.traits[i]){
            score += 1;
        }
    }

    // check age
    if("puppy" == value.age && Pet.months < 9){
        score += 1;
    }
    if("adult" == value.age && Pet.months > 8){
        score += 1;
    }

    // check size
    if("small" == value.size && Pet.pounds < 20){
        score += 1;
    }
    if("medium" == value.size && Pet.pounds < 50 && Pet.pounds > 20){
        score +=1;
    }
    if("large" == value.size && Pet.pounds > 50){
        score +=1;
    }
    return score;
}

console.log(evaluateScore(value , Pet));

window.addEventListener("DOMContentLoaded", main);

function main() {
	let questions = document.getElementsByClassName("question");
	for (let q of questions) {
		q.addEventListener("click", qClicked);
	}
}

function qClicked() {
	let a = this.nextElementSibling;
	a.removeAttribute("hidden");
}
