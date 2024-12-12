$(main);

function main() {
	loadUser();
	loadSavedPets();
}

/* Loads the user's info into the profile page */
function loadUser() {
	let username = sessionStorage.getItem("username");
	let userString = localStorage.getItem(username);
	let userObject = JSON.parse(userString);
	
	$("#name").html("Name: " + userObject.name);
	$("#email").html("Email: " + userObject.email);
	$("#username").html("Username: " + userObject.username);
}

/* Loads the user's saved pets into the profile page */
function loadSavedPets() {
	let savedString = localStorage.getItem("savedPets");
	let savedObject = JSON.parse(savedString);
	addAllSavedPetsToCatalog(savedObject);
}
