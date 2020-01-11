const createCell = function(x, y) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.id = generateId({ colNo: x, rowNo: y });
  return cell;
};

const populateCells = function(grid) {
  for (let y = 0; y < rowNo; y++) {
    for (let x = 0; x < colNo; x++) {
      const cell = createCell(x, y);
      grid.appendChild(cell);
    }
  }
};

function getBox(content) {
  const position = content.getPosition;
  const id = generateId(position);
  const box = document.getElementById(id);
  return box;
}

const eraseAndMoveFruits = function(fruits) {
  fruits.forEach(fruit => {
    const box = getBox(fruit);
    const img = box.children[0];
    box.removeChild(img);
    fruit.move();
  });
};

const drawFruits = function(fruits) {
  fruits.forEach(fruit => {
    const box = getBox(fruit);
    const img = document.createElement("img");
    img.src = fruit.getImage;
    box.appendChild(img);
  });
};

const eraseBasket = function(basket) {
  const box = getBox(basket);
  const img = box.children[0];
  box.removeChild(img);
};

const handleKeyPress = function(basket) {
  eraseBasket(basket);
  const key = event.key;
  switch (key) {
    case "ArrowRight":
      basket.moveRight();
      break;
    case "ArrowLeft":
      basket.moveLeft();
      break;
  }
  drawBasket(basket);
};

const drawBasket = function(basket) {
  const box = getBox(basket);
  box.classList.add("zAxis");
  const img = document.createElement("img");
  img.classList.add("basket");
  img.src = basket.getImage;
  box.appendChild(img);
};

const attachEventListener = function(basket) {
  document.body.onkeydown = handleKeyPress.bind(null, basket);
};

const getRandomPositionOn1stRow = function() {
  const colNo = Math.floor(Math.random() * 12) % 12;
  return { colNo: colNo, rowNo: 0 };
};

const getRandomFruit = function() {
  const fruits = ["apple.png", "mango.png", "banana.png", "img1.png"];
  return fruits[Math.floor(Math.random() * 4)];
};

const generateId = function({ colNo, rowNo }) {
  return `${colNo}_${rowNo}`;
};

const rowNo = 12;
const colNo = 12;

class Fruit {
  constructor(position, fruit) {
    this.colNo = position.colNo;
    this.rowNo = position.rowNo;
    this.fruit = fruit;
  }

  get getPosition() {
    return { colNo: this.colNo, rowNo: this.rowNo };
  }

  get getImage() {
    return this.fruit;
  }

  move() {
    this.rowNo += 1;
  }
}

class Basket {
  constructor(position, basket) {
    this.colNo = position.colNo;
    this.rowNo = position.rowNo;
    this.basket = basket;
  }

  get getImage() {
    return this.basket;
  }

  get getPosition() {
    return { colNo: this.colNo, rowNo: this.rowNo };
  }

  moveLeft() {
    this.colNo--;
    if (this.colNo == -1) {
      this.colNo = 11;
    }
  }

  moveRight() {
    this.colNo = ++this.colNo % 12;
  }
}

class GameMaster {
  constructor(fruit, basket) {
    this.fruits = [fruit];
    this.basket = basket;
  }

  get getBasket() {
    return this.basket;
  }

  get getFruits() {
    return this.fruits.slice();
  }

  addFruits(fruit) {
    this.fruits.push(fruit);
  }
}

const initializeGameMaster = function() {
  const fruitImg = getRandomFruit();
  const position = getRandomPositionOn1stRow();
  const fruit = new Fruit(position, fruitImg);
  const basket = new Basket({ colNo: 5, rowNo: 11 }, "basket.png");
  const game = new GameMaster(fruit, basket);
  return game;
};

const main = function() {
  const grid = document.getElementById("grid");
  populateCells(grid);

  const game = initializeGameMaster();

  drawBasket(game.getBasket);
  attachEventListener(game.getBasket);
  drawFruits(game.getFruits);

  setInterval(() => {
    eraseAndMoveFruits(game.getFruits);
    const position = getRandomPositionOn1stRow();
    const fruit = getRandomFruit();
    game.addFruits(new Fruit(position, fruit));
    drawFruits(game.getFruits);
  }, 800);
};
