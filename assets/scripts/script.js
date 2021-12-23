let board = document.getElementById('board')
let cardList = document.getElementsByClassName('cards')

let techs = [
  'html',
  'css',
  'javascript',
  'bootstrap',
  'react',
  'node',
  'firebase',
  'mongo',
  'jquery',
  'electron'
]

let cards = null
startGame()

function startGame() {
  cards = createCards(techs)
  shuffleCards(cards)
  showCards(cards)
}

// função para criar as cartas
function createCards(techs) {
  let cards = []

  for (let tech of techs) {
    cards.push(createPairCards(tech))
  }

  // console.log(cards)
  // o código da linha acima retorna um array com os pares, porém precisamos de um array com todas as cartas. Por isso, usaremos o código abaixo:
  return cards.flatMap(card => card)
  // a função flatMap é semelhante à função map, ou seja, retorna um array, mas se cada elemento do array tiver um outro array dentro (que é o nosso caso), ela desmembra isso
}

// função para criar os pares das cartas
function createPairCards(tech) {
  let pairCard = [
    {
      id: createID(tech),
      icon: tech,
      flipped: false
    },
    {
      id: createID(tech),
      icon: tech,
      flipped: false
    }
  ]
  return pairCard
}

// função para criar o ID de cada carta
function createID(tech) {
  return tech + parseInt(Math.random() * 1000)
}

// função para embaralhar as cartas
function shuffleCards(cards) {
  let currentIndex = cards.length
  let randomIndex = 0

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[cards[randomIndex], cards[currentIndex]] = [
      cards[currentIndex],
      cards[randomIndex]
    ]
  }
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
