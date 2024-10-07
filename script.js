window.addEventListener("click", faqClicked1);
window.addEventListener("click", faqClicked2);
window.addEventListener("click", faqClicked3);

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
