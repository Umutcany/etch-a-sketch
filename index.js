const sizeButton = document.querySelector(".select");
const template = document.querySelector(".boxes");

sizeButton.addEventListener("click", () => {
  while (true) {
    const size = parseInt(
      prompt(
        "Please enter the grid size: (for example : (16x16) için 16, (32x32) için 32"
      )
    );
    if (isNaN(size) || size <= 0 || size > 100) {
      alert("Please enter a valid number between 1 and 100.");
    } else {
      sizeCalculator(size);
      break;
    }
  }
});

const sizeCalculator = (size) => {
  const totalCells = size * size; // Toplam hücre sayısı
  const cellWidth = 500 / size;
  const cellHeight = 500 / size;

  console.log(`Grid size: ${size}x${size}, Total Cells: ${totalCells}`);

  template.innerHTML = "";

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${cellWidth}px`;
    cell.style.height = `${cellHeight}px`;
    cell.style.backgroundColor = "black";
    template.appendChild(cell);
  }
};
