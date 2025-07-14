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

var timeUp = false
var timerStarted = false
async function startTimer(progressBar) {
    if (timerStarted) {
        return
    }
    timerStarted = true
    timeUp = false
    const maxTime = 10
    var time = 0

    while(time < maxTime) {
        time += 1
        let barPercentage = (time / maxTime) * 100
        progressBar.style.width = `${barPercentage}%`
        await sleep(1000)
    }
    timeUp = true
    timerStarted = false
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

    const progressBar = document.getElementById("progress-bar")

    const loseContainer = document.getElementById("lose-container")
    const loseContainerDarken = document.getElementById("lose-container-darken")

    var hasClicked = false
    var correctClicked = false

    async function runGame() {
        correct.innerText = "Start"
        while(true) {
            if (hasClicked && correctClicked == true) {
                console.log("Yes")
                hasClicked = false
                gameData["Started"] = true
                correct.innerText = "Correct"
                startTimer(progressBar)
                break
            }
            await sleep(50)
        }
        while(true) {
            if (timeUp) {
                runGame()
                loseContainer.style.display = "block"
                loseContainerDarken.style.display = "block"
                break
            }
            let randomWord = await getRandomWord(gameData["AlreadyPlayedWords"])
            if (randomWord) {
                gameWord.innerText = randomWord
            }
            console.log(hasClicked)
            while(hasClicked == false) {
                if (timeUp) {
                    break
                }
                if (hasClicked) {
                    if (correctClicked) {
                        gameData["AlreadyPlayedWords"][randomWord]
                        console.log(gameData["AlreadyPlayedWords"])
                        correctClicked = false
                    }
                    hasClicked = false
                    break
                }
                await sleep(50)
            }
            hasClicked = false
            await sleep(50)
        }
    }

    playButton.addEventListener("click", async () => {
        home.style.display = "none"
        game.style.display = "block"

        runGame()
    })

    var skipDebounce = false
    skip.addEventListener("touchstart", async () => {
        if (skipDebounce) {
            return
        }
        skipDebounce = true
        skip.style.pointerEvents = "none"
        hasClicked = true
        await sleep(750)
        skipDebounce = false
        skip.style.pointerEvents = "auto"
    }, {passive: true})

    var correctDebounce = false
    correct.addEventListener("touchstart", async () => {
        if (correctDebounce) {
            return
        }
        correctDebounce = true
        correct.style.pointerEvents = "none"
        correctClicked = true
        hasClicked = true
        await sleep(2000)
        correctDebounce = false
        correct.style.pointerEvents = "auto"
    }, {passive: true})
})