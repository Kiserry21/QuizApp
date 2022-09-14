console.log('page-linked')
var highScoresArray=[]
highScoreArray=JSON.parse(localStorage.getItem('highscores'))
console.log(highScoreArray)
const scoresBoxElement = document.getElementById('scores-box')
console.log(scoresBoxElement)
for(let i=0;i<highScoresArray.length;i++)
{
    var highscore=highScoreArray[i]
    const item= document.createElement('span')
item.textContent=highscore
console.log(item)
scoresBoxElement.appendChild(item)
    
}
