const cards = document.querySelectorAll(".card");
console.log("cards: ", cards);

let firstCard;
let secondCard;
let isCardFlipped = false;
let score = 0;
let time = 0;
let blockMoves = false;

function flipCard(card) {
  console.log(blockMoves);
  if (blockMoves) return;
  console.log("card: ", card);
  initCounter();
  card.classList.add("flip");

  if (!isCardFlipped) {
    isCardFlipped = true;
    firstCard = card;
    return;
  }
  secondCard = card;
  blockMoves = true;
  checkCards(firstCard, secondCard);
}

function checkCards(firstCard, secondCard) {
  isCardFlipped = false;
  let isCardMatching = firstCard.dataset.muppet === secondCard.dataset.muppet;
  if (isCardMatching) {
      score++;
    setTimeout(() => {
      disableCards(firstCard, secondCard);
    }, 1000);
  }
  if (!isCardMatching) unFlipCards(firstCard, secondCard);
  isCardMatching = false;
  console.log("score: ", score);
}

function disableCards(firstCard, secondCard) {
  console.log("invisible");
  blockMoves = false;

  firstCard.classList.add("invisible");
  secondCard.classList.add("invisible");
}

function unFlipCards(firstCard, secondCard) {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    blockMoves = false;
  }, 1000);
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    flipCard(card);
  });
});

function initCounter(val) {
  return val > 9 ? val : "0" + val;
}
setInterval(function () {
  document.getElementById("seconds").innerHTML = initCounter(++time % 60);
  document.getElementById("minutes").innerHTML = initCounter(
    parseInt(time / 60, 10)
  );
}, 1000);
