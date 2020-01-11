const createCell = function(x, y) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = generateId({colNo: x, rowNo: y});
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

const rowNo = 12;
const colNo = 12;

const generateId = function({colNo, rowNo}) {
  return `${colNo}_${rowNo}`;
};

function getBox(fruit) {
  const positions = fruit.getPosition;
  const id = generateId(positions);
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
    const img = document.createElement('img');
    img.src = fruit.getImage;
    box.appendChild(img);
  });
};

const getRandomPosition = function() {
  const colNo = Math.floor(Math.random() * 12) % 12;
  return {colNo: colNo, rowNo: 0};
};

const getRandomFruit = function() {
  const fruits = ['apple.png', 'mango.png', 'banana.png', 'img1.png'];
  return fruits[Math.floor(Math.random() * 4)];
};

class Fruit {
  constructor(position, fruit) {
    this.colNo = position.colNo;
    this.rowNo = position.rowNo;
    this.fruit = fruit;
  }
  get getPosition() {
    return {colNo: this.colNo, rowNo: this.rowNo};
  }

  get getImage() {
    return this.fruit;
  }

  move() {
    this.rowNo += 1;
  }
}

const main = function() {
  const grid = document.getElementById('grid');
  populateCells(grid);
  const fruits = [];
  fruits.push(new Fruit(getRandomPosition(), getRandomFruit()));
  drawFruits(fruits);
  setInterval(() => {
    eraseAndMoveFruits(fruits);
    fruits.push(new Fruit(getRandomPosition(), getRandomFruit()));
    drawFruits(fruits);
  }, 500);
};
