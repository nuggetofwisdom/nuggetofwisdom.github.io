// Character object with properties and methods
const character = {
  name: "Gumball Watterson",
  class: "Mischief Maker",
  level: 12,
  health: 100,
  image: "images/gumball.webp",

  // Subtract 20 health; announce death when health hits 0
  attacked() {
    if (this.health <= 0) {
      return `${this.name} has already died.`;
    }
    this.health -= 20;
    if (this.health <= 0) {
      this.health = 0;
      return `${this.name} has died!`;
    }
    return `${this.name} was attacked and lost 20 health.`;
  },

  // Add 1 to level
  levelUp() {
    if (this.health <= 0) {
      return `${this.name} can't level up after dying.`;
    }
    this.level += 1;
    return `${this.name} leveled up to level ${this.level}!`;
  }
};

// DOM references
const nameEl = document.querySelector("#char-name");
const classEl = document.querySelector("#char-class");
const levelEl = document.querySelector("#char-level");
const healthEl = document.querySelector("#char-health");
const imageEl = document.querySelector("#char-image");
const logEl = document.querySelector("#log");
const attackBtn = document.querySelector("#attackBtn");
const levelBtn = document.querySelector("#levelBtn");

// Show the object's current values on the card
function render() {
  nameEl.textContent = character.name;
  classEl.textContent = character.class;
  levelEl.textContent = character.level;
  healthEl.textContent = character.health;
  imageEl.src = character.image;
  imageEl.alt = `${character.name}, a ${character.class}`;
}

attackBtn.addEventListener("click", () => {
  logEl.textContent = character.attacked();
  render();
  if (character.health === 0) {
    attackBtn.disabled = true;
    levelBtn.disabled = true;
    alert(`${character.name} has died!`);
  }
});

levelBtn.addEventListener("click", () => {
  logEl.textContent = character.levelUp();
  render();
});

render();
