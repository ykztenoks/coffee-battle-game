const french = new FrenchPress("frenchie");
const espressito = new Espresso("espressito");

const lightAttackBtn = document.querySelector("#lightAttack");
const consoleText = document.querySelector("#console");

function lightAttack(attacker, receiver, damage) {
  damage = attacker.strength;
  receiver.hp -= damage;
  console.log(`${receiver.name} HP is now: ${receiver.hp}`);
  if (receiver.hp === 0) {
    return `${receiver.name} has gone cold.`;
  }
}

function printStatus() {
  consoleText.textContent = `${this.name} HP is now: ${this.hp}`;
}

lightAttackBtn.addEventListener("click", () => {
  lightAttack(french, espressito);
  printStatus();
});
