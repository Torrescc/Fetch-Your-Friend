window.addEventListener("DOMContentLoaded", main);

function main() {
    console.log("sign in/sign up loaded");
    // Buttons clicked methods
    $("#createaccount").click(createClicked);
    $("#signin").click(signInClicked);
}

function createClicked(event) {
    console.log("Create account button clicked");
    event.preventDefault(); // Prevent the default form submission behavior

    // Gather user input
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let confirmPassword = document.getElementById("confirm").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Hash the password before sending it to the server
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        if (err) {
            console.error('Error hashing password:', err);
            alert("An error occurred. Please try again.");
            return;
        }

        // Send data to the backend
        $.ajax({
            url: "http://augwebapps.com:3809/create-account",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                email: email,
                username: username,
                password_hash: hashedPassword, // Send hashed password
            }),
            success: function (response) {
                console.log(response.message);
                alert("Account created successfully!");
                localStorage.setItem("signed_in", "FALSE");
                localStorage.setItem("user_id", 0);
                localStorage.setItem("username", username);
            },
            error: function (xhr) {
                console.error(xhr.responseText);
                alert("Error creating account: " + xhr.responseText);
            }
        });

        // Clear input fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
        document.getElementById("confirm").value = "";
    });
}

function signInClicked(event) {
    console.log("Sign in button clicked");

    event.preventDefault();

    let credential = document.getElementById("credential").value; // Can be email or username
    let userpass = document.getElementById("existpass").value;

    if (!credential || !userpass) {
        document.getElementById("sign_error_msg").textContent = "Please enter your email/username and password.";
        document.getElementById("sign_error_msg").style.visibility = "visible";
        return;
    }

    // Send login request with raw password for server-side comparison
    $.ajax({
        url: "http://augwebapps.com:3809/validate-login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ credential, password: userpass }),
        success: (response) => {
            console.log(response.message);
            // Handle successful login
            localStorage.setItem("signed_in", "TRUE");
            localStorage.setItem("user_id", response.user_id);
            window.location.replace("profile.html");
        },
        error: (xhr) => {
            const errorMessage = xhr.responseJSON?.message || "An unknown error occurred.";
            document.getElementById("sign_error_msg").textContent = errorMessage;
            document.getElementById("sign_error_msg").style.visibility = "visible";
        }        
    });
}



/*
function createClicked(event) {
	console.log("Create account button clicked");

	//Prevent the default behavior
	event.preventDefault();

	localStorage.setItem("signed_in", "FALSE");
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

	} else {
		document.getElementById("sign_error_msg").textContent = "Incorrect username or password.";
		document.getElementById("sign_error_msg").style.visibility = "visible";
	}
}
*/