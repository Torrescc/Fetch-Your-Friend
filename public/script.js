var Pet = {
    name : "smelly" ,
    months : 37 ,
    pounds : 60 ,
    animal : "dog" ,
    breed : ["germanshepard" ,"husky"] ,
    traits : ["smelly" , "smart" , "playful" , "white" , "loyal"]
};

var value = {
    age : "puppy" ,
    size : "small",
    animal : "dog",
    trait : "smelly",
    breed : "husky"
};





window.addEventListener("DOMContentLoaded", main);

function main() {
	let questions = document.getElementsByClassName("question");
	for (let q of questions) {
		q.addEventListener("click", qClicked);
	}
}

function qClicked() {
	let a = this.nextElementSibling;
	let arrow = this.getElementsByClassName("arrow up");
	
	if (a.hasAttribute("hidden")) {
		a.removeAttribute("hidden");
		arrow.classList.remove("up");
		arrow.classList.add("down");
	} else {
		a.setAttribute("hidden", "");
		arrow.classList.remove("down");
		arrow.classList.add("up");
	}
}
