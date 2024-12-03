$(main);

function main() {
	loadUser();
	loadSavedPets();
}

function loadUser() {
	let username = sessionStorage.getItem("username");
	let userString = localStorage.getItem(username);
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
