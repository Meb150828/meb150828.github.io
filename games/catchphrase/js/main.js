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
var redBgVar = false
async function startTimer(progressBar, Body) {
    if (timerStarted) {
        return
    }
    timerStarted = true
    timeUp = false
    const maxTime = 90 // default 90
    var time = 0

    while(time < maxTime) {
        time += 1
        let barPercentage = (time / maxTime) * 100
        progressBar.style.width = `${barPercentage}%`

        if (maxTime-time <= 15) {
            if (redBgVar) {
                Body.className = "red-bg"
                redBgVar = false
            } else {
                Body.className = ""
                redBgVar = true
            }
        }
        await sleep(1000)
    }
    timeUp = true
    timerStarted = false
    redBgVar = false
    Body.className = ""
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
    const Body = document.body

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
                gameData["AlreadyPlayedWords"] = []
                correct.innerText = "Correct"
                startTimer(progressBar, Body)
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
            while(true) {
                if (timeUp) {
                    break
                }
                if (hasClicked) {
                    if (correctClicked == true) {
                        console.log(gameData["AlreadyPlayedWords"], "Wow")
                        gameData["AlreadyPlayedWords"].push(randomWord)
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