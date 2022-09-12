const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerDivElement = document.querySelector('.timer')
let shuffledQuestions, currentQuestionIndex


const questions = [
  {
    question: 'What is 30 + 2?',
    answers: [
      { text: '32', correct: true },
      { text: '22', correct: false },
      { text: '28', correct: false },
      { text: '60', correct: false }
    ]
  },
  {
    question: 'What is the biggest country in the world?',
    answers: [
      { text: 'china', correct: false },
      { text: 'Thailand', correct: false },
      { text: 'United State of America', correct: false },
      { text: 'Russia', correct: true }
    ]
  },
  {
    question: 'What is the most popular programming language?',
    answers: [
      { text: 'Phyton', correct: false },
      { text: 'JavaScript', correct: true },
      { text: 'Java', correct: false },
      { text: 'CSS', correct: false }
    ]
  },
  {
    question: 'What is 10 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '20', correct: true },
      { text: '12', correct: false },
      { text: '8', correct: false }
    ]
  },
  { 
    question: 'How many stars are in American flag?',
    answers: [
      { text: '62', correct: false },
      { text: '50', correct: true },
      { text: '32', correct: false },
      { text: '12', correct: false } 
    ]
  },
  {
    question: 'Who is the richest person in the world?',
    answers: [
      { text: 'Bill Gates', correct: false },
      { text: 'Obama', correct: false },
      { text: 'Elon Musk', correct: true },
      { text: 'Jeff Bezos', correct: false }
    ]
  },
  {
    question: 'What country has the highest life expectancy?',
    answers: [
      { text: 'China', correct: false },
      { text: 'Hong Kong', correct: true },
      { text: 'Canada', correct: false },
      { text: 'Italy', correct: false }
    ]
  }

]
var gameTime = 90
var gameTimeid

function startGame() {
  timerDivElement.textContent = gameTime;
gameTimeid = setInterval(setGameTime, 1000)
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
function setGameTime(){
  // decrease game time and update ui
  gameTime--
  timerDivElement.textContent = gameTime;
   
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
var penalty = 10 

function showQuestion(question) {
  gameTime = gameTime - penalty
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
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    currentQuestionIndex++
    setNextQuestion()
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
 
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
  //  element.classList.remove('correct')
  //  element.classList.remove('wrong')
}
startButton.addEventListener('click', startGame)



