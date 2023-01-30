const grid = document.getElementById("grid-container");

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  e.target.classList.add("change-color");
}

setupGrid(16);
