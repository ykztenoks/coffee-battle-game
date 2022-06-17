const french = new FrenchPress("French Press");
const espresso = new Espresso("Espresso");
const turkishcezve = new TurkishCezve("Turkish Cezve");
const chemex = new Chemex("Chemex");

const frenchbtn = document.querySelector("#french");
const espressobtn = document.querySelector("#espresso");
const turkishbtn = document.querySelector("#turkish");
const chemexbtn = document.querySelector("#chemex");
const lightAttackBtn = document.querySelector("#lightAttack");
const consoleText = document.querySelector("#console");
const heavyAttackBtn = document.querySelector("#heavyAttack");
const player1Box = document.querySelector("#player1Box");
const player2Box = document.querySelector("#player2Box");
const atkButton = document.querySelector("#atkBtn");
const startScreen = document.querySelector("#startScreen");
const battleScreen = document.querySelector("#battleScreen");
const startButton = document.querySelector("#startBtn");
const nextButton = document.querySelector("#next");
const tryAgainBtn = document.querySelector("#tryAgain");
const content = document.querySelector("#content");
const winScreen = document.querySelector("#winScreen");
const player1Sprite = document.querySelector("#player1Sprite");
const player2Sprite = document.querySelector("#player2Sprite");

let player1;
let player2;
const charArr = [chemex, espresso, turkishcezve, french];
let round = 0;
const frenchHP = 120;
const espressoHP = 100;
const chemexHP = 110;
const turkishHP = 150;
const espressoSprite = "./images/espressoBattle.png";
const frenchSprite = "./images/frenchBattle";
const turkishSprite = "./images/turkishBattle";
const chemexSprite = "./images/chemexBattle";

function startGame() {
  startScreen.setAttribute("class", "hidden");
  battleScreen.setAttribute("class", "show");
  player2Box.textContent = `${player2.name}: ${player2.hp}HP`;
  player1Box.textContent = `${player1.name}: ${player1.hp}HP`;
}

function endGame(loser, winner) {
  consoleText.textContent = `${loser.name} has gone cold! ${winner.name} makes the best coffee!`;
  atkButton.setAttribute("class", "hidden");
  nextButton.removeAttribute("class", "hidden");
  round += 1;
  player2 = charArr[round];
  if (round === 3) {
    content.setAttribute("class", "hidden");
    winScreen.setAttribute("class", "show");
  }
}

function endTurn() {
  atkButton.removeAttribute("class", "hidden");
  nextButton.setAttribute("class", "hidden");

  if (player1 === espresso) {
    player1.hp = espressoHP;
  }
  if (player1 === chemex) {
    player1.hp = chemexHP;
  }
  if (player1 === turkishcezve) {
    player1.hp = turkishHP;
  }
  if (player1 === french) {
    player1.hp = frenchHP;
  }
  player2Box.textContent = `${player2.name}: ${player2.hp}HP`;
  player1Box.textContent = `${player1.name}: ${player1.hp}HP`;
}

// set player1 char based on clicked button, setting also random char for player2
function setPlayer(character) {
  player1 = character;
  startButton.addEventListener("click", () => startGame());
  if (character === chemex) {
    charArr.splice(0, 1);
  }
  if (character === espresso) {
    charArr.splice(1, 1);
  }
  if (character === turkishcezve) {
    charArr.splice(2, 1);
  }
  if (character === french) {
    charArr.splice(3, 1);
  }
  player2 = charArr[0];
}

// lightAttack button activates the func, giving damage equal to char strength, also calls opponent attack and prints info on screen
function lightAttack(attacker, receiver) {
  let damage = attacker.strength;
  receiver.hp -= damage;
  printStatus(`${receiver.name} took ${damage} points of damage!`);
  lightAttackBtn.disabled = true;
  heavyAttackBtn.disabled = true;
  setTimeout(() => {
    if (receiver.hp > 0) {
      opponentAttack();
    }
    lightAttackBtn.disabled = false;
    heavyAttackBtn.disabled = false;
  }, 2000);
}

//heavyAttack button activates the func, giving damage equal to char strength multiplied by RNG,
//also calls opponent attack and prints attack info on screen
function heavyAttack(attacker, receiver) {
  let dmgMultiplier = Math.random() * 3;
  let damage = Math.floor(attacker.strength * dmgMultiplier);
  receiver.hp -= damage;
  lightAttackBtn.disabled = true;
  heavyAttackBtn.disabled = true;
  printStatus(`${receiver.name} took ${damage} points of damage!`);
  setTimeout(() => {
    if (receiver.hp > 0) {
      opponentAttack();
    }
    lightAttackBtn.disabled = false;
    heavyAttackBtn.disabled = false;
  }, 2000);
}

//called when player1 attacks using RNG to choose attack type
function opponentAttack() {
  let rng = Math.floor(Math.random() * 3);
  if (rng === 0 || rng === 1) {
    let damage = player2.strength;
    player1.hp -= damage;
    printStatus(`${player1.name} took ${damage} points of damage!`);
  }
  if (rng === 2) {
    let dmgMultiplier = Math.random() * 3;
    let damage = Math.floor(player2.strength * dmgMultiplier);
    player1.hp -= damage;
    printStatus(`${player1.name} took ${damage} points of damage!`);
  }
}

//called when attack occurs for turn info
function printStatus(text) {
  consoleText.textContent = text;
  player2Box.textContent = `${player2.name}: ${player2.hp}HP`;
  player1Box.textContent = `${player1.name}: ${player1.hp}HP`;
  if (player2.hp <= 0) {
    player2Box.textContent = `${player2.name}: 0HP`;
    endGame(player2, player1);
  }
  if (player1.hp <= 0) {
    player1Box.textContent = `${player1.name}: 0HP`;
    consoleText.textContent = "You lose! Try again!";
    tryAgainBtn.setAttribute("class", "show");
  }
}

nextButton.addEventListener("click", () => endTurn());
frenchbtn.addEventListener("click", () => setPlayer(french));
turkishbtn.addEventListener("click", () => setPlayer(turkishcezve));
espressobtn.addEventListener("click", () => setPlayer(espresso));
chemexbtn.addEventListener("click", () => setPlayer(chemex));
lightAttackBtn.addEventListener("click", () => lightAttack(player1, player2));
heavyAttackBtn.addEventListener("click", () => heavyAttack(player1, player2));
