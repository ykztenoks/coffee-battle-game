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
const player1Box = document.querySelector(".player1Box");
const player2Box = document.querySelector(".player2Box");
const buttons = document.querySelectorAll(".btn");

let player1;
let player2;

function setPlayer(character) {
  player1 = character;
  if (player1 === chemex) {
    player2 = setPlayer(espresso);
  }
}

function lightAttack(attacker, receiver) {
  let damage = attacker.strength;
  receiver.hp -= damage;
  printAttack(`${receiver.name} took ${damage} points of damage!`);
  setTimeout(() => {
    opponentAttack();
  }, 2000);
}

function heavyAttack(attacker, receiver) {
  let dmgMultiplier = Math.random() * 3;
  let damage = Math.floor(attacker.strength * dmgMultiplier);
  receiver.hp -= damage;
  printAttack(`${receiver.name} took ${damage} point of damage!`);
  setTimeout(() => {
    opponentAttack();
  }, 2000);
}

function opponentAttack() {
  let rng = Math.floor(Math.random() * 3);
  if (rng === 0 || rng === 1) {
    let damage = player2.strength;
    player1.hp -= damage;
    printAttack(`${player1.name} took ${damage} point of damage!`);
  }
  if (rng === 2) {
    let dmgMultiplier = Math.random() * 3;
    let damage = Math.floor(player2.strength * dmgMultiplier);
    player1.hp -= damage;
    printAttack(`${player1.name} took ${damage} points of damage!`);
  }
}

function printAttack(text) {
  consoleText.textContent = text;
  player2Box.textContent = `${player2.name}: ${player2.hp}HP`;
  player1Box.textContent = `${player1.name}: ${player1.hp}HP`;
  if (player2.hp <= 0) {
    player2Box.textContent = `${player2.name}: 0HP`;
  }
  if (player1.hp <= 0) {
    player1Box.textContent = 0;
  }
}

// player2Box.textContent = `${player2.name}: ${player2.hp}HP`;
// player1Box.textContent = `${player1.name}: ${player1.hp}HP`;

frenchbtn.addEventListener("click", () => setPlayer(french));
turkishbtn.addEventListener("click", () => setPlayer(turkishcezve));
espressobtn.addEventListener("click", () => setPlayer(espresso));
chemexbtn.addEventListener("click", () => setPlayer(chemex));
lightAttackBtn.addEventListener("click", () => lightAttack(player1, player2));
heavyAttackBtn.addEventListener("click", () => heavyAttack(player1, player2));
