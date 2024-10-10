<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f29f8286ae58d984ac0d8154d56223889d5defee
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
<<<<<<< HEAD
    breed : "Husky"
=======
    breed : "husky"
>>>>>>> f29f8286ae58d984ac0d8154d56223889d5defee
}


function evaluateScore(value  , Pet){
    let score = 0;
    if(Pet.animal.toLowerCase() == value.animal.toLowerCase()){
        score += 3;
    }
<<<<<<< HEAD
    if(value.animal.toLowerCase() in Pet.breed){
        score += 1;
    }
    if(value.trait.toLowerCase() in Pet.traits){
        score += 1;
    }

=======
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
>>>>>>> f29f8286ae58d984ac0d8154d56223889d5defee
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
<<<<<<< HEAD
=======
=======
>>>>>>> f29f8286ae58d984ac0d8154d56223889d5defee
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
<<<<<<< HEAD
>>>>>>> design_contacts
=======
>>>>>>> f29f8286ae58d984ac0d8154d56223889d5defee
