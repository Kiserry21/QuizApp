console.log('page-linked')
var highScoreArray=[]
highScoreArray=JSON.parse(localStorage.getItem('highscores'))
console.log(highScoreArray)
const scoresBoxElement = document.getElementById('scores-box')
console.log(scoresBoxElement)
for(let i=0;i<highScoreArray.length;i++)
{
    var highscore=highScoreArray[i]
    console.log(highscore)
    const item= document.createElement('span')
item.textContent=JSON.stringify(highscore)
console.log(item)
scoresBoxElement.appendChild(item)
    
}
