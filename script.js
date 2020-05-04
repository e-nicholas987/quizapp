const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('score')
const questionCountElement = document.getElementById('question-count')
const finalScoreContainer = document.getElementById('final-score-container')
const finalScoreElement = document.getElementById('final-score')
const endQuizButton = document.getElementById('end-btn')

let currentQuestionIndex = 0
let score = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    console.log(currentQuestionIndex)
    questionCountElement.innerText = currentQuestionIndex+1
    setNextQuestion()
})
endQuizButton.addEventListener('click', endGame)

function endGame() {
        questionContainerElement.classList.add('hide')
        finalScoreContainer.classList.remove('hide')
        finalScoreElement.innerText = score
        endQuizButton.classList.add('hide')
        startButton.classList.remove('hide')
        
}

function startGame() {
    questionCountElement.innerText= 1
    scoreElement.innerText = 0
    finalScoreContainer.classList.add('hide')
    startButton.classList.add('hide')
    nextButton.classList.remove('hide')
    currentQuestionIndex = 0
    score = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    
    nextButton.setAttribute('disabled',true)
    
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(selectedButton, correct)
    
    
    if (questions.length > currentQuestionIndex + 1){
      nextButton.removeAttribute('disabled')
    } else {
        startButton.innerText = 'Restart'
        // startButton.classList.remove('hide')
        endQuizButton.classList.remove('hide')
        nextButton.classList.add('hide')
    }
    if (correct) {
        updateScore()
    return
    }
    Array.from(answerButtonsElement.children).forEach(button =>{
        if (button.dataset.correct)
        setStatusClass(button, button.dataset.correct)
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        
    } else {
        element.classList.add('wrong')
    }
}
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function updateScore() {
    score += 2 
    scoreElement.innerText = score
}

const questions = [
    {
        question: 'What is the capital of Edo State?',
        answers: [
            { text: 'Owerri', correct: false },
            { text: 'Benin City', correct: true },
            { text: 'Port Harcourt', correct: false },
            { text: 'Yenegoa', correct: false }
        ]
    },

    {
        question: 'What is the capital of Canada',
        answers: [
            { text: 'Ottawa', correct: true },
            { text: 'Washington', correct: false },
            { text: 'Toronto', correct: false },
            { text: 'Abuja', correct: false }
        ]
    },

    {
        question: 'Who is the president of Nigeria?',
        answers: [
            { text: 'Abba Kyari', correct: false },
            { text: 'Sani Abacha', correct: false },
            { text: 'Goodluck Jonathan', correct: false },
            { text: 'Muhammadu Buhari', correct: true }
        ]
    },

    {
        question: 'Which colour is not on the Ghanaian flag?',
        answers: [
            { text: 'Green', correct: false },
            { text: 'White', correct: true },
            { text: 'Red', correct: false },
            { text: 'Black', correct: false }
        ]
    },

    {
        question: 'Who was the 44th president of the USA?',
        answers: [
            { text: 'Abraham Lincoln', correct: false },
            { text: 'George W. Bush', correct: false },
            { text: 'Barrack Obama', correct: true },
            { text: 'Donald J. Trump', correct: false }
        ]
    }

]
