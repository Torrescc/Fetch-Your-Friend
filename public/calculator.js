window.addEventListener("DOMContentLoaded", main);

function main() {
	let submitButton = document.getElementById("submitbutton");
    submitButton.addEventListener("click", submitClicked);
}

function submitClicked(event) {
	let species = document.getElementById("species").value;
	let size = document.getElementById("size").value;
	let age = document.getElementById("age").value;
	
	let answer = calculateAge(species, size, age);
	
	let calculation += "Your pet's age in " + species + " years is " + answer;
	
	document.getElementById("calculated-age").innerHTML += calculation;
}

/* I got the calculations from this website: https://www.akc.org/expert-advice/health/how-to-calculate-dog-years-to-human-years/ */
function calculateAge(species, size, age) {
	if (species === "dog") {
		if (size === "small") {
			if (age === 1) {
				return 15;
			}
		}
	}		
}
