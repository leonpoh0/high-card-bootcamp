// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const suits = ["♥️", "♦️", "♣️", "♠️"];

let cardSection = document.createElement("div");

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suitCSS", cardInfo.colour);
  suit.innerText = cardInfo.suit;

  const name = document.createElement("div");
  name.classList.add("nameCSS", cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement("div");
  card.classList.add("cardCSS");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const createDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    let cardColour = "black";
    if (suitIndex === 0 || suitIndex === 1) {
      cardColour = "red";
    }
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        cardDisplayName = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        cardDisplayName = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        cardDisplayName = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        cardDisplayName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        displayName: cardDisplayName,
        colour: cardColour,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(createDeck());

let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const gameInfo = document.createElement("div");

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const player1Click = () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();
    cardSection.appendChild(createCard(player1Card));
    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    player2Card = deck.pop();
    cardSection.appendChild(createCard(player2Card));
    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output("player 1 wins");
    } else if (player1Card.rank < player2Card.rank) {
      output("player 2 wins");
    } else {
      output("tie");
    }
  }
};

document.body.appendChild(cardSection);

const initGame = () => {
  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
  document.body.appendChild(gameInfo);

  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);
};

initGame();
