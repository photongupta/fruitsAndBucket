const createCell = function(x, y) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = generateId(x, y);
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

const getRandomId = function() {
  const colId = Math.floor(Math.random() * 12) % 12;
  return generateId(colId, 0);
};

const getFruit = function() {
  const fruits = ['apple.png', 'mango.png', 'banana.png', 'img1.png'];
  return fruits[Math.floor(Math.random() * 4)];
};

const getNextId = function(id) {
  const dim = id.split('_');
  const colNo = +dim[0];
  const rowNo = +dim[1] + 1;
  return generateId(colNo, rowNo);
};

const getFruitDetail = function() {
  const id = getRandomId();
  const fruit = getFruit();
  return {id: id, image: fruit};
};

const drawFruit = function(fruits) {
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

const increasePosition = function(fruit) {
  const nextId = getNextId(fruit.id);
  return {id: nextId, image: fruit.image};
};

const moveFruit = function(Fruits) {
  return Fruits.map(increasePosition);
};

const main = function() {
  const grid = document.getElementById('grid');
  populateCells(grid);
  let prevFruitDetail = [];
  let newFruitDetail = [];
  setInterval(() => {
    eraseFruits(prevFruitDetail);
    const newFruit = getFruitDetail();
    newFruitDetail.push(newFruit);
    drawFruit(newFruitDetail);
    prevFruitDetail = newFruitDetail.slice();
    newFruitDetail = moveFruit(newFruitDetail);
  }, 1000);
};
