$(document).ready(function () {
    const apiKey = '4VxhkxM5';
    const endpoint = 'https://api.rescuegroups.org/v5/public/animals/search/';

    // Define parameters for the API call
    const requestData = {
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": apiKey
        },
        data: JSON.stringify({
            data: {
                type: "animals",
                attributes: {
                    species: "dog", // Filter for dogs; change as needed
                    status: "Available"
                }
            }
        }),
        method: "POST"
    };

    // Function to render pet data in the HTML
    function displayPets(pets) {
        $('#pet-list').empty();
        pets.forEach(pet => {
            const petHtml = `
                <div class="pet">
                    <h3>${pet.attributes.name}</h3>
                    <p>Breed: ${pet.attributes.breedPrimary}</p>
                    <p>Age: ${pet.attributes.ageGroup}</p>
                    <p>Gender: ${pet.attributes.sex}</p>
                    <img src="${pet.attributes.pictureThumbnailUrl}" alt="${pet.attributes.name}">
                </div>
            `;
            $('#pet-list').append(petHtml);
        });
    }

    // Call the API and handle the response
    $.ajax(endpoint, requestData)
        .done(response => {
            const pets = response.data;
            console.log(pets);
            displayPets(pets);
        })
        .fail(error => {
            console.error("API request failed: ", error);
            $('#pet-list').append("<p>Sorry, we couldn't load the pets right now.</p>");
        });
});
