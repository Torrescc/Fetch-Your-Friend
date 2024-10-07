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
