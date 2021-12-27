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
  shuffleCards: function (cards) {
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
  }
}
