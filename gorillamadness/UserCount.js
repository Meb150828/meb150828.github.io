document.addEventListener('DOMContentLoaded', function () {
    fetch('https://discord.com/api/guilds/1151326034373914636/widget.json')
        .then(response => response.json())
        .then(data => {
            if (data.members) {
                const memberCount = data.members.length;
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
