const startButton = document.getElementById('start-btn')
// const nextButton = document.getElementById('next-btn')
const scorePageElement = document.querySelector('#score')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerDivElement = document.querySelector('.timer')
const countdownElement = document.querySelector('#countdown')
const scoreAreaElement = document.querySelector('#scoreArea')
const inNameElement = document.querySelector('#inName')
const buttonDivElement = document.querySelector('#saveButton')
const highScoreElement = document.querySelector('#highScores')

let shuffledQuestions, currentQuestionIndex

var gameTime = 70
var gameTimeid
var runningTimer
var score = 0


function startGame() {
  
  timerDivElement.textContent = gameTime;
gameTimeid = setInterval(setGameTime, 1000)
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.replace('hide','show')
  document.querySelector('#quiz-code').textContent=""
  setNextQuestion()
}

function setGameTime(){
  // decrease game time and update ui
  gameTime--
  timerDivElement.textContent = gameTime;
    if (gameTime <= 0){
      gameOver();
    }  
}



 function setNextQuestion() {
  
  if (currentQuestionIndex == 0) {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    return;
  }

  setTimeout(() => {
    console.log("Delayed for 1 second.");
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }, "1000")
 

}
let finalScore;

function gameOver() {
  questionContainerElement.classList.remove('show')
  questionContainerElement.classList.add('hide')
  scorePageElement.classList.replace('hide','show')
  document.querySelector('#scoreArea').textContent="Your High Score is "+score
 //console.log(score)
  finalScore=score
  clearInterval(gameTimeid)

  

}

   var penalty = 10

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
   clearStatusClass(document.body)
  // nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  if(correct) {
    score += 5;
    document.body.style.backgroundColor = "green"
  } else {
    gameTime = gameTime - penalty
    document.body.style.backgroundColor = "red"
  }
  
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
   // nextButton.classList.remove('hide')
    currentQuestionIndex++
    setNextQuestion()
  } else {
    gameOver()
  }
}


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    element.classList.remove('wrong')
    console.log(element)

  } 
  else {
    console.log("incorrect")

    element.classList.add('wrong')
    element.classList.remove('correct')
  }
}

  const questions = [
  {
    question: 'Which of the following scoping type does JavaScript use?',
    answers: [
      { text: 'lexical', correct: true },
      { text: 'segmental', correct: false },
      { text: 'sequential', correct: false },
      { text: 'literal', correct: false }
    ]
  },
  {
    question: 'Which of the following is not framework?',
    answers: [
      { text: 'JavaScript.NET', correct: false },
      { text: 'Cocoa JS', correct: false },
      { text: 'JQuery', correct: false },
      { text: 'JavaSript', correct: true }
    ]
  },
  {
    question: 'What is the most popular programming language?',
    answers: [
      { text: 'Python', correct: false },
      { text: 'JavaScript', correct: true },
      { text: 'Java', correct: false },
      { text: 'CSS', correct: false }
    ]
  },
  {
    question: 'Which of the following is not programming language?',
    answers: [
      { text: 'JavaScript', correct: false },
      { text: 'HTML', correct: true },
      { text: 'Java', correct: false },
      { text: 'C#', correct: false }
    ]
  },
  {
    question: 'The “function” and ” var” are known as?',
    answers: [
      { text: 'Keywords', correct: false },
      { text: 'Declaration statements', correct: true },
      { text: 'Data types', correct: false },
      { text: 'Prototypes', correct: false }
    ]
  },
  {
    question: 'Which of the following variables takes precedence over the others if the names are the same?',
    answers: [
      { text: 'Global variable', correct: false },
      { text: 'The local element ', correct: true },
      { text: 'None of the above', correct: false },
      { text: 'The two of the above', correct: false }
    ]
  },
  {
    question: 'Which type of JavaScript language is _?',
    answers: [
      { text: 'Object-Oriented', correct: false },
      { text: 'Object-Based', correct: true },
      { text: 'Assembly-language', correct: false },
      { text: 'High-level', correct: false }
    ]
  }
  
 ]
  
 function clearStatusClass(element) {
  //  element.classList.remove('correct')
  //  element.classList.remove('wrong')
 }
 let highScoreArray=[]
 startButton.addEventListener('click', startGame)
 buttonDivElement.addEventListener('click',()=>{
  const userInput=inNameElement.value
  console.log(userInput,finalScore)
  if(userInput !=="") {
    highScoreArray=JSON.parse(localStorage.getItem('highscores'))||[]
    const userScore={
      initials:userInput,
      score:finalScore
    }
    highScoreArray.push(userScore)
    localStorage.setItem('highscores',JSON.stringify(highScoreArray))
    location.href ="scores.html"
  }
 })
