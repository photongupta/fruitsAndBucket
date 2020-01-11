const createCell = function(x, y) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = generateId(x, y);
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

const rowNo = 15;
const colNo = 12;

const generateId = function(x, y) {
  return `${x}_${y}`;
};

const getNextId = function(id) {
  const dim = id.split('_');
  const colNo = +dim[0];
  const rowNo = +dim[1] + 1;
  return generateId(colNo, rowNo);
};

const getFruitDetail = function() {
  const id = getRandomId();
  const fruit = getRandomFruit();
  return {id: id, image: fruit};
};

const drawFruits = function(fruits) {
  fruits.forEach(fruit => {
    const box = document.getElementById(fruit.id);
    const img = document.createElement('img');
    img.src = fruit.image;
    box.appendChild(img);
  });
};

const eraseFruits = function(fruits) {
  fruits.forEach(fruit => {
    const box = document.getElementById(fruit.id);
    const img = box.children[0];
    box.removeChild(img);
  });
};

const updatePosition = function(fruit) {
  const nextId = getNextId(fruit.id);
  return {id: nextId, image: fruit.image};
};

const moveFruit = function(fruits) {
  return fruits.map(updatePosition);
};

// const initializeGame = function() {
//   // let prevFruitDetail = [];
//   // let newFruitDetail = [];
//   return function() {
//     // eraseFruits(prevFruitDetail);
//     // const newFruit = getFruitDetail();
//     // newFruitDetail.push(newFruit);
//     // drawFruits(newFruitDetail);
//     // prevFruitDetail = newFruitDetail.slice();
//     // newFruitDetail = moveFruit(newFruitDetail);
//   };
// };

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
  get position() {
    return {colNo: this.colNo, rowNo: this.rowNo};
  }

  get image() {
    return this.fruit;
  }

  move() {
    this.rowNo++;
  }
}

const main = function() {
  const grid = document.getElementById('grid');
  populateCells(grid);
  const fruits = [];
  fruits.push(new Fruit(getRandomPosition(), getRandomFruit()));
  setInterval(() => {
    fruits.push(new Fruit(getRandomPosition(), getRandomFruit()));
  }, 1000);
};
