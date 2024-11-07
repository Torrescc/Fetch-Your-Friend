window.addEventListener("DOMContentLoaded", main);

function main() {
	let calculateButton = document.getElementById("calculatebutton");
    calculateButton.addEventListener("click", calculateClicked);
}

function calculateClicked(event) {
	document.getElementById("calculated-age").innerHTML = "";
	
	let species = document.getElementById("species").value;
	let size = document.getElementById("size").value;
	let age = document.getElementById("age").value;
	
	let answer = calculateAge(species, size, age);
	
	if (answer == 0) {
		answer = "not in this database";
	}
	
	let calculation = "Your " + species + "'s age in " + species + " years is " + answer;
	
	document.getElementById("calculated-age").innerHTML += calculation;
}

/* I got the calculations for dogs from this website: https://www.akc.org/expert-advice/health/how-to-calculate-dog-years-to-human-years/ */
/* I got the calculations for cats from this website: https://www.almanac.com/cat-age-chart-cat-years-human-years */
/* I used linear regression via Desmos to get these equations */
function calculateAge(species, size, age) {
	if (species == "dog") {
		if (size == "small") {
			if (age == 1) {
				return 15;
			} else if ((age > 1) && (age < 17)) {
				return Math.ceil(4.11 * age + 14.75);
			}
		} else if (size == "medium") {
			if (age == 1) {
				return 15;
			} else if ((age > 1) && (age < 17)) {
				return Math.ceil(4.654 * age + 13.375);
			}
		} else if (size == "large") {
			if (age == 1) {
				return 15;
			} else if ((age > 1) && (age < 17)) {
				return Math.ceil(5.504 * age + 10.9);
			}
		}
	} else if (species == "cat") {
		if (age == 1) {
			return 15;
		} else if ((age > 1) && (age < 26)) {
			return Math.ceil(4.046 * age + 15.2);
		}
	}
	return 0;
}
