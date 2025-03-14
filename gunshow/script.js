// script.js

let maxWingdings = 50;  // You can change this to set the max number of Wingdings
let currentWingdings = 0; // To track the number of active Wingdings

function createWingding() {
  if (currentWingdings >= maxWingdings) return;  // Do not create more than the maximum

  const container = document.getElementById('container');
  
  // Create a new element for the Wingding
  const wingding = document.createElement('div');
  wingding.classList.add('wingding');
  
  // Randomly select a Wingdings character
  const wingdings = [ // Flower
   // Flower
  '🔫', // Star
  '💗', // Star
  '🥊', // Filled Star
  '💪', // Hollow Star // Diamond (often used as a heart in design)
   ]; // You can add more Wingdings characters
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
/*
        headers.forEach(header => {
          header.addEventListener('click', () => {
              const parent = header.parentElement;
              
              // Check if the clicked item is already active
              const isActive = parent.classList.contains('active');
              
              // Close all accordion items
              items.forEach(item => {
                  item.classList.remove('active');
              });
              
              // Toggle the clicked item based on its current state
              if (!isActive) {
                  parent.classList.add('active');
              }
          });
      });*/

  
   /* function createExplosion(element) {
      const explosionCount = 40; // Number of wingdings per explosion
      const wingdings = ['✿', '✸', '✪', '✦', '✱', '❄️', '✤', '✧', '✹', '✶']; // Use your desired characters
      
      for (let i = 0; i < explosionCount; i++) {
          const wingding = document.createElement('span');
          wingding.classList.add('explosion');
          wingding.textContent = wingdings[Math.floor(Math.random() * wingdings.length)];
          
          // Set random direction for each wingding
          const randomX = (Math.random() - 0.5) * 2; // Random value between -1 and 1
          const randomY = (Math.random() - 0.5) * 2;
          
          wingding.style.setProperty('--x', randomX);
          wingding.style.setProperty('--y', randomY);
          
          // Position the explosion element at the header's location
          const rect = element.getBoundingClientRect();
          wingding.style.left = `${rect.left + rect.width / 2}px`;
          wingding.style.top = `${rect.top + rect.height / 2}px`;
          
          document.body.appendChild(wingding);
          
          // Remove element after animation ends
          wingding.addEventListener('animationend', () => {
              wingding.remove();
          });
      }
  }*/

/*  function createExplosion(element) {
    const explosionCount = 10; // Number of wingdings per float
    const wingdings = ['✿', '✦', '✱', '✧', '✶']; // Choose characters

    // Get the #info container and ensure it has `position: relative;`
    const container = document.getElementById('info');
    container.style.position = 'relative';

    const wingdingElements = [];

    for (let i = 0; i < explosionCount; i++) {
        const wingding = document.createElement('span');
        wingding.classList.add('explosion');
        wingding.textContent = wingdings[Math.floor(Math.random() * wingdings.length)];

        // Position each wingding randomly within the header's area
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        wingding.style.left = `${rect.left - containerRect.left + Math.random() * rect.width}px`;
        wingding.style.top = `${rect.top - containerRect.top}px`;

        container.appendChild(wingding);
        wingdingElements.push({
            element: wingding,
            velocityY: Math.random() * 1 + 1, // Initial downward velocity
            velocityX: (Math.random() - 0.5) * 2, // Slight random horizontal movement
            height: wingding.offsetHeight,
            width: wingding.offsetWidth,
        });
    }

    // Function to check for overlap between wingdings
    function isOverlapping(wingdingA, wingdingB) {
        const rectA = wingdingA.element.getBoundingClientRect();
        const rectB = wingdingB.element.getBoundingClientRect();

        return !(
            rectA.right < rectB.left ||
            rectA.left > rectB.right ||
            rectA.bottom < rectB.top ||
            rectA.top > rectB.bottom
        );
    }

    // Animation loop
    function animateWingdings() {
        wingdingElements.forEach(wingdingObj => {
            const wingding = wingdingObj.element;
            let rect = wingding.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Apply gravity effect
            wingdingObj.velocityY += 0.1; // Increase downward speed over time (gravity)
            let newTop = rect.top + wingdingObj.velocityY;
            let newLeft = rect.left + wingdingObj.velocityX;

            // Check for collision with the bottom of the container
            if (newTop + wingding.offsetHeight >= containerRect.bottom) {
                newTop = containerRect.bottom - wingding.offsetHeight;
                wingdingObj.velocityY *= -0.5; // Bounce effect with reduced speed
            }

            // Check for overlap with other wingdings
            for (const otherWingding of wingdingElements) {
                if (otherWingding !== wingdingObj && isOverlapping(wingdingObj, otherWingding)) {
                    // Adjust position if overlapping
                    newTop = rect.top; // Reset to previous position
                    wingdingObj.velocityY = 0; // Stop moving down to prevent overlap
                }
            }

            // Check for collision with the sides of the container
            if (newLeft <= containerRect.left || newLeft + wingding.offsetWidth >= containerRect.right) {
                wingdingObj.velocityX *= -0.5; // Reverse horizontal direction on collision
            }

            // Set new position
            wingding.style.top = `${newTop - containerRect.top}px`;
            wingding.style.left = `${newLeft - containerRect.left}px`;

            // Reduce bounce velocity to "settle" at the bottom
            if (Math.abs(wingdingObj.velocityY) < 0.1) {
                wingdingObj.velocityY = 0;
            }
        });

        // Continue the animation until all wingdings settle
        if (wingdingElements.some(w => w.velocityY !== 0)) {
            requestAnimationFrame(animateWingdings);
        }
    }

    animateWingdings(); // Start the animation loop
}
*/