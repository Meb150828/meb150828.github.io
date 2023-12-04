document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API
    fetch('https://discord.com/api/guilds/1151326034373914636/widget.json')
        .then(response => response.json())
        .then(data => {
            // Check if the "members" property exists in the data
            if (data.members) {
                // Get the number of members in the list
                const memberCount = data.members.length;

                // Update the member count in the HTML
                const memberCountElement = document.getElementById('memberCount');
                memberCountElement.textContent = `🟢 Members Online: ${memberCount}`;
            } else {
                console.error('No "members" property found in the API response.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
