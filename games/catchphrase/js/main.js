function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getRandomWord(AlreadyPlayedWords) {
    let response = await fetch("json/word-list.json");
    let data = await response.json();
    let AllWords = data["Everyday Life"];

    let AvailableWords = AllWords.filter(Word => !AlreadyPlayedWords.includes(Word));

    if (AvailableWords.length === 0) {
        console.log("No words left to play.");
        return null;
    }

    let RandomWord = AvailableWords[Math.floor(Math.random() * AvailableWords.length)];
    return RandomWord;
}

document.addEventListener("DOMContentLoaded", () => {
    var gameData = {
        ["Started"]: false,
        ["AlreadyPlayedWords"]: []
    }
    const playButton = document.getElementById("play-btn")

    const home = document.getElementById("home")
    const game = document.getElementById("game")

    const gameWord = document.getElementById("game-word")
    const skip = document.getElementById("skip-btn")
    const correct = document.getElementById("correct-btn")

    var hasClicked = false
    playButton.addEventListener("click", async () => {
        home.style.display = "none"
        game.style.display = "block"
        gameData["Started"] = true

        while(true) {
            let randomWord = await getRandomWord(gameData["AlreadyPlayedWords"])
            if (randomWord) {
                gameWord.innerText = randomWord
            }
            console.log(hasClicked)
            while(hasClicked == false) {
                if (hasClicked) {
                    hasClicked = false
                    break
                }
                await sleep(50)
            }
            hasClicked = false
            await sleep(50)
        }
    })

    skip.addEventListener("click", () => {
        hasClicked = true
    })

    correct.addEventListener("click", () => {
        hasClicked = true
    })
})