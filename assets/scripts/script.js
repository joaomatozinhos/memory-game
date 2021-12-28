let board = document.getElementById('board')
let cardList = document.getElementsByClassName('cards')

startGame()

function startGame() {
  cards = game.createCards()
  showCards(cards)
}

// função para exibir cartas na tela
function showCards(cards) {
  for (let card of cards) {
    board.innerHTML += `
      <div id="${card.id}" class="card" data-icon="${card.icon}" onclick="flipCard(${card.id})">
        <div class="card-front">
          <img src="assets/images/${card.icon}.png"/>
        </div>
        <div class="card-back">&lt/&gt</div>
      </div>
    `
  }
}

// função para virar a carta
function flipCard(card) {
  // se conseguir definir uma carta, coloca a class 'flip' nela
  if (game.setCard(card.id)) {
    card.classList.add('flip')

    // se a segunda carta estiver preenchida..
    if (game.secondCard) {
      // se as cartas derem match, elas ficam viradas e "outra rodada começa"
      if (game.checkMatch()) {
        game.clearCards()
      }
      // senão teve match...
      else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id)
          let secondCardView = document.getElementById(game.secondCard.id)

          firstCardView.classList.remove('flip')
          secondCardView.classList.remove('flip')
          game.unflipCards()
        }, 1000)
      }
    }
  }
}
