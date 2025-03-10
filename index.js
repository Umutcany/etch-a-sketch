const sizeButton = document.querySelector(".select");
const template = document.querySelector(".boxes");
const blackButton = document.querySelector(".black");
const toggle = document.querySelector(".drawing");
const randomButton = document.querySelector(".random");
const resetButton = document.querySelector(".reset");

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
  let isBlackMode = false;
  let isRandomMode = false;
  const cells = document.querySelectorAll(".cell");

  // Function to remove all existing event listeners
  const removeAllListeners = () => {
    cells.forEach((cell) => {
      // Using cloneNode(true) and replacing the original element removes all event listeners
      const newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);
    });
  };

  // Function to add appropriate event listeners based on current mode
  const updateEventListeners = () => {
    removeAllListeners();

    // Get fresh references after cloning
    const updatedCells = document.querySelectorAll(".cell");

    updatedCells.forEach((cell) => {
      cell.addEventListener("mousedown", () => {
        if (isBlackMode) {
          cell.style.backgroundColor = "black";
        } else if (isRandomMode) {
          cell.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
      });

      cell.addEventListener("mousemove", (e) => {
        if (e.buttons === 1) {
          // Left mouse button is pressed
          if (isBlackMode) {
            cell.style.backgroundColor = "black";
          } else if (isRandomMode) {
            cell.style.backgroundColor = `hsl(${
              Math.random() * 360
            }, 100%, 50%)`;
          }
        }
      });
    });
  };

  blackButton.addEventListener("click", () => {
    isBlackMode = !isBlackMode;

    if (isBlackMode) {
      isRandomMode = false;
      randomButton.textContent = "Random";
      blackButton.textContent = "Black Mode (On)";
    } else {
      blackButton.textContent = "Black";
    }

    updateEventListeners();
  });

  randomButton.addEventListener("click", () => {
    isRandomMode = !isRandomMode;

    if (isRandomMode) {
      isBlackMode = false;
      blackButton.textContent = "Black";
      randomButton.textContent = "Random Mode (On)";
    } else {
      randomButton.textContent = "Random";
    }

    updateEventListeners();
  });
};

// Add this to your existing code
resetButton.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");

  // Reset the background color of all cells
  cells.forEach((cell) => {
    cell.style.backgroundColor = ""; // Set to default (transparent)
  });

  console.log("Drawing reset");
});

drawCells();
