const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "color";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

const grid = document.getElementById("grid-container");
const setSizeBtn = document.getElementById("set-size-btn");
const clearBtn = document.getElementById("clear-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const colorBtn = document.getElementById("color-btn");
const grayBtn = document.getElementById("gray-btn");

setSizeBtn.addEventListener("click", getSizePrompt);
clearBtn.addEventListener("click", reloadGrid);
rainbowBtn.addEventListener("click", () => setCurrentMode("rainbow"));
colorBtn.addEventListener("click", () => setCurrentMode("color"));
grayBtn.addEventListener("click", () => setCurrentMode("gray"));
grid.addEventListener("mouseover", changeColor);

function changeColor(e) {
  switch (currentMode) {
    default:
      e.target.style.backgroundColor = currentColor;
      break;
    case "rainbow":
      e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      break;
    case "gray":
      if (e.target.style.backgroundColor === "rgb(0, 0, 0)") {
        return;
      }
      if (e.target.style.backgroundColor.match(/rgba/)) {
        e.target.style.backgroundColor = getGray(
          e.target.style.backgroundColor
        );
      } else {
        e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      }
      break;
  }
}

function getGray(color) {
  let currentOpacity = Number(color.slice(-4, -1));
  if (currentOpacity <= 0.9) {
    color = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
  }
  return color;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function clearGrid() {
  grid.innerHTML = "";
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function getSizePrompt() {
  let size = "";
  while (size === "" || size === null || size > 100) {
    size = prompt("Please enter a grid size. The maximum is 100");
  }
  setCurrentSize(size);
  reloadGrid();
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    grid.appendChild(gridElement);
  }
}

window.onload = () => {
  setupGrid(currentSize);
};
