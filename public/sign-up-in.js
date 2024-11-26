window.addEventListener("DOMContentLoaded", main);

function main() {
	console.log("sign in/sign up loaded");
	// Buttons clicked methods
	$("#createaccount").click(createClicked);
	$("#signin").click(signInClicked);
}

function createClicked(event) {
	console.log("Create account button clicked");

	//Prevent the default behavior
	event.preventDefault();

	localStorage.setItem("signed_in", "FALSE");
	localStorage.setItem("user ID", 0);

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

	// Success message
	const createMessage = document.createElement("div");
	createMessage.textContent = "You have successfully created an account!";
	createMessage.style.color = "green";
	createMessage.style.fontSize = "16px";
	createMessage.style.marginTop = "10px";
	document.body.appendChild(createMessage); // Append it to the body or a specific container
	

	document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("user").value = "";
    document.getElementById("pass").value = "";

}

function signInClicked(event) {
	console.log("Sign in button clicked");

	// Prevent the default action (page reload or navigation)
	event.preventDefault();

	let username = document.getElementById("existuser").value;
	let userpass = document.getElementById("existpass").value;

	// Validation checks for empty fields
	if (!username || !userpass) {
		document.getElementById("sign_error_msg").textContent = "Please enter both username and password.";
		document.getElementById("sign_error_msg").style.visibility = "visible";
		return;
	}

	if (username === localStorage.getItem("username") && userpass === localStorage.getItem("password")) {
		document.getElementById("sign_error_msg").style.visibility = "hidden";

		localStorage.setItem("signed_in", "TRUE");

		// Success message
		const successMessage = document.createElement("div");
		successMessage.textContent = "You have successfully signed in!";
		successMessage.style.color = "green";
		successMessage.style.fontSize = "16px";
		successMessage.style.marginTop = "10px";
		document.body.appendChild(successMessage); // Append it to the body or a specific container

		// Optionally, you can redirect the user after a delay
		setTimeout(() => {
			window.location.replace("index.html");
		}, 2000); // Delay before redirection (in milliseconds)

		sessionStorage.setItem("email", email);

	} else {
		document.getElementById("sign_error_msg").textContent = "Incorrect username or password.";
		document.getElementById("sign_error_msg").style.visibility = "visible";
	}
}