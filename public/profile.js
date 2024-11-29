$(main);

function main() {
	loadUser();
	loadSavedPets();
}

function loadUser() {
	let userEmail = sessionStorage.getItem("email");
	let userString = localStorage.getItem(userEmail);
	let userObject = JSON.parse(userString);
	
	$("#name").html("Name: " + userObject.name);
	$("#email").html("Email: " + userObject.email);
	$("#username").html("Username: " + userObject.username);
}

// Only skeleton code at this point!
function loadSavedPets() {
	let savedString = localStorage.getItem("saved");
	let savedObject = JSON.parse(savedString);
}
