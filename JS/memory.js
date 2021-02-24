let cards = document.querySelectorAll(".card");
const resetButton = document.getElementById("reset-button");
const revealedCards = document.getElementById("found");
const userMessage = document.getElementById("user-message");
console.log("cards: ", cards);

let firstCard;
let secondCard;
let isCardFlipped = false;
let score = 0;
let time = 0;
let blockMoves = false;
let moves = 0;

cards.forEach((card) => {
  card.addEventListener("click", () => {
    startRound(card);
  });
});

reRenderCards();

resetButton.addEventListener("click", () => {
  resetGame();
});

function startRound(card) {
  if (blockMoves) return;
  initCounter();
  card.classList.add("flip");

  if (!isCardFlipped) {
    moves++;
    updateTraysScore();
    isCardFlipped = true;
    firstCard = card;
    return;
  }
  secondCard = card;
  blockMoves = true;
  checkCards(firstCard, secondCard);
}
function resetGame() {
  time = 0;
  score = 0;
  moves = 0;
  blockMoves = false;
  reRenderCards();
  updateDisplayScore();
  updateTraysScore();
  clearRevealedCards();
  clearUserMessage();
}

function reRenderCards() {
  shuffle();
  cards.forEach((card) => {
    card.classList.remove("flip");
    setTimeout(() => {
      card.classList.remove("invisible");
    }, 200);
  });
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function checkCards(firstCard, secondCard) {
  isCardFlipped = false;
  let isCardMatching = firstCard.dataset.muppet === secondCard.dataset.muppet;
  if (isCardMatching) {
    score++;
    updateRevealedCards(firstCard);
    updateDisplayScore();
    setTimeout(() => {
      disableCards(firstCard, secondCard);
    }, 1000);
  }
  if (!isCardMatching) unFlip(firstCard, secondCard);
  isCardMatching = false;
  blockMoves = checkForFailure();
  checkForWining();
}

function disableCards(firstCard, secondCard) {
  blockMoves = false;

  firstCard.classList.add("invisible");
  secondCard.classList.add("invisible");
}

function unFlip(firstCard, secondCard) {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    blockMoves = checkForFailure();
  }, 1000);
}

function updateDisplayScore() {
  document.getElementById("score").innerHTML = score;
}

function updateTraysScore() {
  document.getElementById("moves").innerHTML = moves;
}

function updateRevealedCards(firstCard) {
  const revealedImage = document.createElement("img");
  revealedImage.src = firstCard.children[0].src;
  revealedImage.classList.add("revealed-image");
  setTimeout(() => {
    revealedCards.appendChild(revealedImage);
  }, 1500);
}

function clearRevealedCards() {
  while (revealedCards.firstChild) {
    revealedCards.firstChild.remove();
  }
}

function checkForFailure() {
  if (moves > 15) {
    userMessage.innerHTML = "So sad... You lost!";
    return true;
  }
  return false;
}

function checkForWining() {
  console.log("score", score);
  if (score == 6) userMessage.innerHTML = "Congratulations! You won!";
}

function clearUserMessage() {
  userMessage.innerHTML = "";
}

function initCounter(val) {
  return val > 9 ? val : "0" + val;
}
setInterval(function () {
  document.getElementById("seconds").innerHTML = initCounter(++time % 60);
  document.getElementById("minutes").innerHTML = initCounter(
    parseInt(time / 60, 10)
  );
}, 1000);
