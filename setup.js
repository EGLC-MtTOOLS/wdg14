const messages = [
  "Preparing installation...",
  "Checking hardware compatibility...",
  "Installing core drivers...",
  "Configuring device interfaces...",
  "Optimizing system resources...",
  "Installing AI assistant...",
  "Updating graphics engine...",
  "Defragmenting memory blocks...",
  "Synchronizing device controllers...",
  "Almost there...",
  "ERROR: KERNEL32.DLL NOT FOUND",
  "Attempting system recovery...",
  "Hardware unstable... rebooting...",
  "FATAL ERROR: BIOS CORRUPTED",
];

const statusElement = document.querySelector('.status');
const percentElement = document.querySelector('.percent');
const messagesElement = document.getElementById('messages');
const setupContainer = document.getElementById('setup-container');

let currentProgress = 0;
let messageIndex = 0;

const retryMessages = [
  "INITIATING RECOVERY MODE",
  "CHECKING BOOT SECTORS",
  "SCANNING HARDWARE COMPONENTS",
  "REBUILDING SYSTEM FILES",
  "EMERGENCY BIOS RECOVERY",
  "RECONSTRUCTING BOOT SEQUENCE",
  "CPU STATE UNSTABLE",
  "CHECKING MEMORY BLOCKS",
  "CRITICAL HARDWARE FAILURE",
  "PREPARING SAFE MODE"
];

let glitchContainer;

function updateProgress() {
  if (currentProgress < 100) {
    currentProgress += Math.random() * 2;
    if (currentProgress > 100) currentProgress = 100;
    
    percentElement.textContent = `${Math.floor(currentProgress)}%`;
    
    if (currentProgress > messageIndex * (100 / messages.length)) {
      showMessage(messages[messageIndex]);
      messageIndex++;
    }

    if (currentProgress >= 85) {
      startGlitching();
    }

    if (currentProgress < 100) {
      setTimeout(updateProgress, Math.random() * 500 + 200);
    }
  }
}

function showMessage(message) {
  messagesElement.textContent = message;
  if (messageIndex >= messages.length - 4) {
    messagesElement.style.color = '#ff0000';
  }
}

function startGlitching() {
  setupContainer.classList.add('glitch');
  
  // Create glitch container if it doesn't exist
  if (!glitchContainer) {
    glitchContainer = document.createElement('div');
    glitchContainer.className = 'glitch-container';
    document.body.appendChild(glitchContainer);
  }

  const glitchInterval = setInterval(() => {
    statusElement.textContent = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Add random glitch text elements
    if (Math.random() > 0.7) {
      addGlitchText();
    }
  }, 100);

  setTimeout(() => {
    clearInterval(glitchInterval);
    startRetrySequence();
  }, 5000);
}

function addGlitchText() {
  const glitchText = document.createElement('div');
  glitchText.className = 'glitch-text';
  
  // Random position
  glitchText.style.left = Math.random() * window.innerWidth + 'px';
  glitchText.style.top = Math.random() * window.innerHeight + 'px';
  
  // Random text content
  const possibleText = [
    'ERROR',
    'MEMORY_FAULT',
    'CRITICAL_FAILURE',
    'SYSTEM_CRASH',
    'FATAL_ERROR',
    'BIOS_CORRUPT',
    'KERNEL_PANIC',
    'STACK_OVERFLOW',
    Math.random().toString(16).substring(2, 8).toUpperCase(),
    '0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase(),
  ];
  
  glitchText.textContent = possibleText[Math.floor(Math.random() * possibleText.length)];
  
  glitchContainer.appendChild(glitchText);
  
  // Remove after animation
  setTimeout(() => {
    if (glitchContainer.contains(glitchText)) {
      glitchContainer.removeChild(glitchText);
    }
  }, 2000);
}

function startRetrySequence() {
  // Don't clear glitch container, just clear its contents
  if (glitchContainer) {
    glitchContainer.innerHTML = '';
  } else {
    glitchContainer = document.createElement('div');
    glitchContainer.className = 'glitch-container';
    document.body.appendChild(glitchContainer);
  }
  
  // Ensure glitch container stays in document
  const glitchContainerRef = glitchContainer;
  
  document.body.innerHTML = `
    <div id="retry-container" style="height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div style="text-align: center;">
        <h1 id="retry-status" style="font-size: 48px; color: #ff0000;">INITIATING RECOVERY SEQUENCE</h1>
        <p id="retry-message" style="font-size: 24px; color: #666;">System recovery in progress...</p>
      </div>
    </div>
  `;

  // Re-append glitch container to ensure it's on top
  document.body.appendChild(glitchContainerRef);

  let messageIndex = 0;
  const statusElement = document.getElementById('retry-status');
  const messageElement = document.getElementById('retry-message');

  let glitchInterval;
  
  // Start the glitch text interval
  glitchInterval = setInterval(() => {
    if (messageIndex < 5) { 
      if (Math.random() > 0.3) {
        addGlitchText();
      }
    }
  }, 50);

  const messageInterval = setInterval(() => {
    if (messageIndex < retryMessages.length) {
      statusElement.textContent = retryMessages[messageIndex];
      messageElement.textContent = `Recovery attempt ${messageIndex + 1} of ${retryMessages.length}`;
      
      // At sequence 5, transform all text
      if (messageIndex === 4) {
        clearInterval(glitchInterval); 
        
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(text => {
          text.style.animation = 'none'; 
          text.style.color = '#ff0000'; 
          
          // Force a reflow to ensure the color change is visible
          text.offsetHeight;
          
          setTimeout(() => {
            text.style.color = '#00ff00'; 
            text.classList.remove('glitching'); 
            
            setTimeout(() => {
              text.style.animation = 'glitchFadeOut 1s forwards';
            }, 800); 
          }, 0);
        });
      }
      
      messageIndex++;
    }
  }, 1500);

  setTimeout(() => {
    clearInterval(messageInterval);
    clearInterval(glitchInterval);
    
    // Wait for fade out before transition
    setTimeout(() => {
      if (glitchContainer) {
        glitchContainer.remove();
      }
      startTransition();
    }, 1000);
  }, 15000);
}

function startTransition() {
  // Create and append the transition circle
  const circle = document.createElement('div');
  circle.id = 'transition-circle';
  document.body.appendChild(circle);

  // Force a reflow to ensure the initial state is rendered
  circle.offsetHeight;

  // Start the circle animation
  requestAnimationFrame(() => {
    circle.classList.add('expand');
    
    // Redirect after the animation
    setTimeout(() => {
      window.location.href = 'https://eglc-mttools.github.io/DVT/';
    }, 1500);
  });
}

setTimeout(updateProgress, 1000);