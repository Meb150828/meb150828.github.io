function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
    var gameData = {
        ["Started"]: false,
        ["Team1Score"]: 0,
        ["Team2Score"]: 0,
        ["AlreadyPlayedWords"]: {}
    }
    const playButton = document.getElementById("play-btn")

    const home = document.getElementById("home")
    const game = document.getElementById("game")

    playButton.addEventListener("click", async () => {
        home.style.display = "none"
        game.style.display = "block"
    })
})