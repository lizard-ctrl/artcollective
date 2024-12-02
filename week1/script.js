

let maxWingdings = 50;  // You can change this to set the max number of Wingdings
let currentWingdings = 0; // To track the number of active Wingdings

function createWingding() {
  if (currentWingdings >= maxWingdings) return;  // Do not create more than the maximum

  const container = document.getElementById('container');
  
  // Create a new element for the Wingding
  const wingding = document.createElement('div');
  wingding.classList.add('wingding');
  
  // Randomly select a Wingdings character
  const wingdings = ['✿', // Flower
  '✽', // Flower
  '❀', // Flower
  '✦', // Star
  '✧', // Star
  '★', // Filled Star
  '☆', // Hollow Star // Diamond (often used as a heart in design)
  '♡', // Hollow Heart
  '❥' ]; // You can add more Wingdings characters
  wingding.innerText = wingdings[Math.floor(Math.random() * wingdings.length)];
  
  // Randomly position it at the top
  wingding.style.left = `${Math.random() * window.innerWidth}px`;
  wingding.style.top = '-50px'; // Start from just above the visible area
  
  container.appendChild(wingding);
  currentWingdings++; // Increment the active Wingdings count

  let speedY = Math.random() * 1 + 1; // Random speed for falling
  let speedX = Math.random() * 2 - 1; // Random horizontal movement
  let posX = parseInt(wingding.style.left);
  let posY = 10;
  
  function moveWingding() {
    posY += speedY;
    posX += speedX;

    if (posX <= 0 || posX >= window.innerWidth - wingding.clientWidth) {
      speedX = -speedX; // Bounce horizontally
    }

    if (posY <= 0 || posY >= window.innerHeight - wingding.clientHeight) {
      speedY = -speedY; // Bounce vertically
    }

    posY += speedY;
    
    // Apply the movement
    wingding.style.left = `${posX}px`;
    wingding.style.top = `${posY}px`;

    if (posY < window.innerHeight) {
      requestAnimationFrame(moveWingding); // Keep moving
    } else {
      wingding.remove(); // Remove once it leaves the screen
      currentWingdings--; // Decrease the counter when Wingding is removed
    }
  }

  moveWingding();
}

// Create a new Wingding every 500ms, but only if we haven't hit the max
setInterval(createWingding, 500);

const headers = document.querySelectorAll('.accordion-header');
        const items = document.querySelectorAll('.accordion-item');


        const folderPath = "imgs/"; // Path to the folder containing images
const imageFiles = ["Taylor.png", "Pax.png", "Margot.png", "Hayes.png","CassH.png", "Cyd.png", "grace1.png", "mad1.png", "maria1.png", "miri1.png"]; // Replace with actual file names

const gridContainer = document.querySelector(".grid-container");
const hoverDisplay = document.querySelector(".hover-display");
const hoveredImage = document.querySelector("#hovered-image");

// Load images dynamically
imageFiles.forEach((file, index) => {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");

  const img = document.createElement("img");
  img.src = `${folderPath}${file}`;
  img.alt = `Image ${index + 1}`;
  gridItem.appendChild(img);

  // Add hover effect
  gridItem.addEventListener("mouseenter", () => {
    hoveredImage.src = img.src;
    hoverDisplay.style.display = "block";
  });

  gridItem.addEventListener("mouseleave", () => {
    hoverDisplay.style.display = "none";
  });

  gridContainer.appendChild(gridItem);
});