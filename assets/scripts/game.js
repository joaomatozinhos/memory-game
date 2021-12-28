// LÓGICA DO JOGO

/* OBSERVAÇÕES SOBRE O JOGO DA MEMÓRIA

  1ª: é preciso virar duas cartas e checar se elas são iguais. Se forem iguais, permanecem no tabuleiro viradas para cima, senão são viradas para baixo.

  2ª: ao clicar em uma carta, deve-se marcar qual é o ID dela e, ao clicar na segunda carta, deve-se comparar o seu ID com o da primeira.

  3ª: a segunda carta não pode ser a primeira carta. Dessa forma, se uma carta estiver virada, ela não pode receber o clique novamente.

  4ª: após selecionar a segunda carta, enquanto faz a verificação, não pode selecionar uma terceira -> por isso que criou o "lockMode"
*/

// OBS.: o "this" faz referência ao objeto game, ou seja, toda vez que tiver "this" é como se tivesse "game".

let game = {
  techs: [
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
  ],

  cards: null,

  // método para criar as cartas
  createCards: function () {
    this.cards = []

    for (let tech of this.techs) {
      this.cards.push(this.createPairCards(tech))
    }

    // console.log(cards)
    // o código da linha acima retorna um array com os pares, porém precisamos de um array com todas as cartas. Por isso, usaremos o código abaixo:
    this.cards = this.cards.flatMap(card => card)
    // a função flatMap é semelhante à função map, ou seja, retorna um array, mas se cada elemento do array tiver um outro array dentro (que é o nosso caso), ela desmembra isso
    this.shuffleCards()
    // console.log(this.cards)
    return this.cards
  },

  // método para criar os pares das cartas
  createPairCards: function (tech) {
    let pairCard = [
      {
        id: this.createID(tech),
        icon: tech,
        flipped: false
      },
      {
        id: this.createID(tech),
        icon: tech,
        flipped: false
      }
    ]
    return pairCard
  },

  // método para criar o ID de cada carta
  createID: function (tech) {
    return tech + parseInt(Math.random() * 1000)
  },

  // método para embaralhar as cartas
  shuffleCards: function () {
    let currentIndex = this.cards.length
    let randomIndex = 0

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex]
      ]
    }
  },

  // "lockMode" é uma propriedade que será usada para impedir que o usuário selecione uma terceira carta quando estiver ocorrendo a verificação. Após selecionar a segunda carta, entrará em "lockMode" e não poderá selecionar a terceira.
  lockMode: false,

  // armazena a primeira carta selecionada
  firstCard: null,
  // armazena a segunda carta selecionada
  secondCard: null,

  // método para definir uma carta -> retorna true ou false para saber se a carta pode ser usada ou não. Por exemplo, se ela já está virada, não pode ser usada, logo retornará false.
  setCard: function (id) {
    // pega todas as cartas e faz a filtragem para pegar apenas a carta que tiver o ID em questão.
    let card = this.cards.filter(card => card.id === id)[0]
    console.log(card)

    // se a carta já foi virada ou estiver em lockMode, retorna false
    if (card.flipped || this.lockMode) {
      return false
    }

    // se a primeira carta estiver vazia (null), define ela como card e retorna true. Senão, define a segunda carta como card e retorna true
    if (!this.firstCard) {
      this.firstCard = card
      this.firstCard.flipped = true
      return true
    } else {
      this.secondCard = card
      this.secondCard.flipped = true

      // se colocou uma carta na segunda carta, automaticamente entra em lockMode, pois não se pode selecionar uma terceira carta
      this.lockMode = true
      return true
    }
  },

  // método que verifica se as cartas deram match -> retorna true se o ícone da primeira carta for igual ao da segunda carta
  checkMatch: function () {
    // se uma das cartas estiverem vazias (null) não faz a verificação e retorna false
    if (!this.firstCard || !this.secondCard) {
      return false
    }
    return this.firstCard.icon === this.secondCard.icon
  },

  // método para liberar as cartas
  clearCards: function () {
    this.firstCard = null
    this.secondCard = null
    this.lockMode = false
  },

  // método para desvirar a carta
  unflipCards: function () {
    this.firstCard.flipped = false
    this.secondCard.flipped = false
    this.clearCards()
  }
}
