let score = 0;
let timer = 60;
let intervalId;
let currentQuestion;

function getRandomAmount() {
    const baseAmount = Math.floor(Math.random() * 100);
    const higherAmount = Math.floor(Math.random() * 50) * 1000;

    return baseAmount + higherAmount;
}

const questions = [
    "Hello, can I get $" + getRandomAmount() + "?",
    "I'd like to withdraw $" + getRandomAmount() + ".",
    "Could you provide me with change for $" + getRandomAmount() + "?",
    "I need to deposit $" + getRandomAmount() + ". Can you help?",
    "Can I get $" + getRandomAmount() + " in $10 bills?",
    "I'd like to transfer $" + getRandomAmount() + " to another account.",
    "Can you help me with a withdrawal of $" + getRandomAmount() + "?",
    "I need to pay $" + getRandomAmount() + " to someone. Can you assist?",
    "I'd like to open a new account with an initial deposit of $" + getRandomAmount() + ".",
    "Can you help me with a loan application for $" + getRandomAmount() + "?",
    "I'd like to close my account. Can I withdraw $" + getRandomAmount() + "?",
    "Can I get a cashier's check for $" + getRandomAmount() + "?",
    "I'd like to dispute a charge of $" + getRandomAmount() + " on my account.",
    "Can you help me activate my new credit card with a limit of $" + getRandomAmount() + "?",
    "Can I withdraw $" + getRandomAmount() + " using my mobile banking app?",
    "Can you help me with a loan for $" + getRandomAmount() + " with a repayment plan?",
    "Can you provide me with change for $" + getRandomAmount() + "?",
    "I'd like to inquire about the terms of a personal loan for $" + getRandomAmount() + ".",
    "Can you assist me with a transaction of $" + getRandomAmount() + "?",
    "Can I get a loan for $" + getRandomAmount() + " with a fixed interest rate?",
    "Can you assist me with a balance inquiry of $" + getRandomAmount() + "?",
    "Can I get a loan for $" + getRandomAmount() + " with a variable interest rate?",
    "I'd like to increase my daily withdrawal limit to $" + getRandomAmount() + ".",
    "Can I get a loan for $" + getRandomAmount() + " with no interest for the first six months?",
];

function startGame() {
    document.getElementById('start-game-btn').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    document.getElementById('answer').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    document.getElementById('timer').style.display = 'block';

    showQuestion();
    intervalId = setInterval(updateTimer, 1000);
}

function showQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    
    const formattedQuestion = question.replace(/\$(\d+)/, (_, amount) => `$<strong>${amount}</strong>?`);
    
    document.getElementById('question').innerHTML = formattedQuestion;

    currentQuestion = question;
}

function incrementScore() {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
}

document.getElementById('answer').addEventListener('input', function(event) {
    const userAnswer = event.target.value;
    const currentQuestionInfo = extractAmountAndQuestion(currentQuestion);
    if (userAnswer && parseInt(userAnswer) === currentQuestionInfo.amount) {
        incrementScore();
        showQuestion();
        event.target.value = '';
    }
});

function extractAmountAndQuestion(question) {
    const match = question.match(/\$([\d,]+)(.*)/);

    if (match) {
        const amount = parseFloat(match[1].replace(',', ''));
        const questionText = match[2].trim();
        return { amount, questionText };
    } else {
        return { amount: 0, questionText: '' };
    }
}

function updateTimer() {
    timer--;

    if (timer <= 0) {
        clearInterval(intervalId);
        showGameOver();
    }

    document.getElementById('timer').textContent = `Time: ${timer}s`;
}

function showGameOver() {
    document.getElementById('start-game-btn').style.display = 'none';
    document.getElementById('game-over-box').style.display = 'block';
    document.getElementById('final-score').textContent = `Your score: ${score}`;
    document.getElementsByTagName('button')[1].style.display = 'block';
}

function retryGame() {
    document.getElementById('start-game-btn').style.display = 'none';
    document.getElementById('score').textContent = 'Score: 0';
    document.getElementById('game-over-box').style.display = 'none';
    score = 0;
    timer = 60;
    startGame();
}