window.addEventListener("DOMContentLoaded", main);

function main() {
	console.log("sign in/sign up loaded");
	// Buttons clicked methods
	$("#createaccount").click(createClicked);
	$("#signin").click(signInClicked);
}

function createClicked(event) {
	console.log("Create account button clicked");
	localStorage.setItem("user ID", 0);
	let name = document.getElementById("name").value;
	localStorage.setItem("name", name);
	let email = document.getElementById("email").value;
	localStorage.setItem("email address", email);
	let username = document.getElementById("user").value;
	localStorage.setItem("username", username);
	let pass = document.getElementById("pass").value;
	localStorage.setItem("password", pass);
	
	// How to check if variables are valid size?
	
	localStorage.setItem("signed_in", TRUE);
	window.location.replace("index-logged-in.html");
}

function signInClicked(event) {
	console.log("Sign in button clicked);
	let username = document.getElementById("existuser").value;
	let userpass = document.getElementById("existpass").value;
	
	if (username === localStorage.getItem("user") && userpass === localStorage.getItem("password")) {
		document.getElementById("sign_error_msg").style.visibility = "hidden";
		localStorage.setItem("signed_in", TRUE);
		window.location.replace("index-logged-in.html");
	} else {
		document.getElementById("sign_error_msg").style.visibility = "visible";
}
