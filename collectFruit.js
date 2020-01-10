const rowNo = 15;
const colNo = 12;

const createId = function(x, y) {
  return `${x}_${y}`;
};

const createCell = function(x, y) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = createId(x, y);
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

const createRandomId = function() {
  const colId = Math.floor(Math.random() * 12) % 12;
  return createId(colId, 0);
};
const getFruit = function() {
  const fruits = ['apple.png', 'mango.png', 'banana.png', 'img1.png'];
  return fruits[Math.floor(Math.random() * 4)];
};

const setFruit = function(id, fruit) {
  const box = document.getElementById(id);
  const img = document.createElement('img');
  img.src = fruit;
  box.appendChild(img);
  const cell = {id: id, image: img};
  fruitDetail.push(cell);
};

const getNextId = function(id) {
  const dim = id.split('_');
  const colNo = +dim[0];
  const rowNo = +dim[1] + 1;
  return `${colNo}_${rowNo}`;
};

const updateFruitPosition = function(cell) {
  const box = document.getElementById(cell.id);
  box.innerHTML = '';
  const nextId = getNextId(cell.id);
  const nextBox = document.getElementById(nextId);
  nextBox.appendChild(cell.image);
  return {id: nextId, image: cell.image};
};

let fruitDetail = [];

const moveFruit = function() {
  fruitDetail = fruitDetail.map(updateFruitPosition);
};

const main = function() {
  const grid = document.getElementById('grid');
  populateCells(grid);
  setFruit('0_0', 'apple.png');
  setInterval(() => {
    moveFruit();
    setFruit(createRandomId(), getFruit());
  }, 1000);
};
