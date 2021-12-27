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
  console.log(card)
  card.classList.add('flip')
}
