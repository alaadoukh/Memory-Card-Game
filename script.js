const cards = document.getElementsByClassName('card');
let level = document.getElementById('current-level');
let t = document.getElementById('time-remaining') ;
let cardIsFlipped = false ;
let locked = false ;
let firstCard , secondCard ;


function verify() {
    if (locked == true) return ;
    if ( this === firstCard ) return ;

    this.classList.add('flip');

    //Flip Counter
    let numberOfFlips = document.getElementById('flips') ;
    numberOfFlips.innerHTML++ ;

    //Countdown
    if(numberOfFlips.innerHTML == 1) {
        myInterval = setInterval(  () => {
        t.innerHTML-- ;
        //Running out of time
        if (t.innerHTML <= 10) { 
            t.style.color = "red" ;
            }
        //Game Over
        if (t.innerHTML == 0){
            clearInterval(myInterval) ;
            document.getElementById('game-over').classList.add('visible');
            } 
                 }, 1000 ) ;
    }

    if ( !cardIsFlipped ){
        cardIsFlipped = true ;
        firstCard = this ;
    } else {
        secondCard = this ;
        checkMatching();
    }
   

}

function checkMatching () {
    let isMatch = firstCard.dataset.content == secondCard.dataset.content ;
    console.log(isMatch);
    isMatch ? disableCards() : unflipCards() ;
}

function disableCards() {
    firstCard.removeEventListener('click',verify);
    secondCard.removeEventListener('click', verify);
    //Score Counter
    let score = document.getElementById('score') ;
    score.innerHTML++ ;
    //Win
    if ( score.innerHTML == parseInt(level.innerHTML) + 1 ) {
        //check for level five ( the last level )
        if( level.innerHTML == 5 ){
            document.getElementById('winner').classList.add('visible');
            clearInterval(myInterval) ;
        }
        else { nextLevel(); }
    }
    resetBoard();
}

function unflipCards() {
    locked = true ;
    setTimeout ( () => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1100 );
}

function resetBoard() {
    [cardIsFlipped, locked]=[false, false];
    [firstCard, secondCard]=[null, null];
}

function shuffleCards() {
    for (var i = 0; i < cards.length; i++) {
        let randomNumber = Math.floor(Math.random() * (parseInt(level.innerHTML) + 1)  * 2  )
        cards.item(i).style.order = randomNumber ; 
    }
}

function reloadPage() {
    window.location.reload() ;
}

function changeCursor() {
    document.body.style.cursor = "help";
}

function nextLevel() {
    level.innerHTML++ ;
    window.location.href = "index-level"+level.innerHTML+".html" ;
}

function restartGame() {
    window.location.href = "index-level1.html" ;
}

shuffleCards() ;
for (var i = 0; i < cards.length; i++) { 
        cards.item(i).addEventListener('click', verify ) ;
    }

