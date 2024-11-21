$(document).ready(function () {
    // Profile button click event
    $('#profile-btn').on('click', function (e) {
        e.preventDefault();  // Prevent default anchor behavior

        // Check if "signed-in" exists in localStorage and its value
        var isSignedIn = localStorage.getItem('signed-in');

        // Redirect based on the "signed-in" value
        if (isSignedIn === 'true') {
            window.location.href = './profile.html';  // Redirect to profile page
        } else {
            window.location.href = './sign-up-in.html';  // Redirect to sign-up/in page
        }
    });
});
