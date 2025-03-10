const sizeButton = document.querySelector(".select");
const template = document.querySelector(".boxes");
const blackButton = document.querySelector(".black");
const toggle = document.querySelector(".drawing");
const randomButton = document.querySelector(".random");

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
      toggle.textContent = "Now You Can draw!";
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
    cell.style.border = "1px solid black";
    template.appendChild(cell);
  }
};

const drawCells = () => {
  let isDrawing = false;
  let isBlackMode = false;
  let isRandomMode = false;

  blackButton.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");
    isBlackMode = !isBlackMode;
    isDrawing = !isDrawing;
    blackButton.textContent = isBlackMode ? "Black Mode (On)" : "Black";
    console.log(isDrawing, isBlackMode);
    if (isBlackMode || isDrawing) {
      cells.forEach((cell) => {
        cell.addEventListener("mouseup", () => {
          cell.style.backgroundColor = "black";
        });
      });
    }
    if (isBlackMode || isDrawing) {
      cells.forEach((cell) => {
        cell.addEventListener("mousemove", (e) => {
          if (isDrawing && e.buttons === 1) {
            // mouse'un sol tuşu basılı mı onu kontrol et.
            cell.style.backgroundColor = "black";
          }
        });
      });
    }
  });

  randomButton.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");
    isRandomMode = !isRandomMode;
    isDrawing = !isDrawing;
    randomButton.textContent = isRandomMode ? "Random Mode (On)" : "Random";
    console.log(isDrawing, isRandomMode);
    if (isRandomMode || isDrawing) {
      cells.forEach((cell) => {
        cell.addEventListener("mouseup", () => {
          cell.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        });
      });
    }
    if (isBlackMode || isDrawing) {
      cells.forEach((cell) => {
        cell.addEventListener("mousemove", (e) => {
          if (isDrawing && e.buttons === 1) {
            // mouse'un sol tuşu basılı mı onu kontrol et.
            cell.style.backgroundColor = `hsl(${
              Math.random() * 360
            }, 100%, 50%)`;
          }
        });
      });
    }
  });
};

drawCells();
