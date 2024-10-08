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
    breed : "Husky"
}


function evaluateScore(value  , Pet){
    let score = 0;
    if(Pet.animal.toLowerCase() == value.animal.toLowerCase()){
        score += 3;
    }
    if(value.animal.toLowerCase() in Pet.breed){
        score += 1;
    }
    if(value.trait.toLowerCase() in Pet.traits){
        score += 1;
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
	let questionOne = document.getElementById("question1");
	questionOne.addEventListener("click", faqClicked1);
	
	let questionTwo = document.getElementById("question2");
	questionTwo.addEventListener("click", faqClicked2);
	
	let questionThree = document.getElementById("question3");
	questionThree.addEventListener("click", faqClicked3);
}

function faqClicked1() {
	let answer = document.getElementById("faq1");
	answer.removeAttribute("hidden");
}

function faqClicked2() {
	let answer = document.getElementById("faq2");
	answer.removeAttribute("hidden");
}

function faqClicked3() {
	let answer = document.getElementById("faq3");
	answer.removeAttribute("hidden");
}
