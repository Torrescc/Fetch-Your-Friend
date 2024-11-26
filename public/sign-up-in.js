window.addEventListener("DOMContentLoaded", main);

function main() {
	console.log("sign in/sign up loaded");
	// Buttons clicked methods
	$("#createaccount").click(createClicked);
	$("#signin").click(signInClicked);
}

function createClicked(event) {
	console.log("Create account button clicked");
	localStorage.setItem("signed_in", FALSE);
	
	let name = document.getElementById("name").value;
	let email = document.getElementById("email").value;
	let username = document.getElementById("user").value;
	let pass = document.getElementById("pass").value;
	
	let user = {
		"email" : email,
		"name" : name,
		"username" : username,
		"pass" : pass
	};
	localStorage.setItem(email, JSON.stringify(user));
	
	// How to check if variables are valid size?
	
	localStorage.setItem("signed_in", TRUE);
	sessionStorage.setItem("email", email);
	window.location.replace("index-logged-in.html");
}

function signInClicked(event) {
	console.log("Sign in button clicked);
	localStorage.setItem("signed_in", FALSE);

	let username = document.getElementById("existuser").value;
	let userpass = document.getElementById("existpass").value;
	
	if (username === localStorage.getItem("user") && userpass === localStorage.getItem("password")) {
		document.getElementById("sign_error_msg").style.visibility = "hidden";
		localStorage.setItem("signed_in", TRUE);
		sessionStorage.setItem("email", email);
		window.location.replace("index-logged-in.html");
	} else {
		document.getElementById("sign_error_msg").style.visibility = "visible";
	}
}
