// Get references to the HTML elements
const paragraphContainer = document.getElementById("wordContainer");
const inputField = document.getElementById("inputField");
const startButton = document.getElementById("startButton");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");


let paragraph = ""; // The paragraph to type
let correctKeystrokes = 0; // Number of correctly typed characters
let totalKeystrokes = 0; // Total number of keystrokes
let timeLeft = 60; // Timer starts from 60 seconds
let timerInterval = null; // Interval ID for the timer

// List of sample paragraphs for the typing test
const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests are great for improving speed and accuracy.",
  "JavaScript is a popular language for web development.",
  "Coding helps you solve real-world problems creatively.",
  "Practice typing daily to boost your skills effectively."
];


function startTest() {
  // Select a random paragraph from the list
  paragraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];

  // Reset variables and update UI
  correctKeystrokes = 0;
  totalKeystrokes = 0;
  timeLeft = 60;
  inputField.value = ""; // Clear input field
  inputField.disabled = false; // Enable input field
  timerElement.textContent = "Time: 60s"; // Reset timer display
  wpmElement.textContent = "WPM: 0"; // Reset WPM display
  accuracyElement.textContent = "Accuracy: 100%"; // Reset accuracy display

  // Display the paragraph with each character as a span
  paragraphContainer.innerHTML = "";
  for (let char of paragraph) {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("text-gray-400"); // Initial gray color for text
    paragraphContainer.appendChild(span);
  }

  // Start the timer
  timerInterval = setInterval(() => {
    timeLeft--; // Decrease the time
    timerElement.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endTest(false); // End test when time is up
    }
  }, 1000);
}

// Function to handle typing input
function handleTyping() {
  const typedText = inputField.value; // Get text typed by the user
  totalKeystrokes++; // Increment total keystrokes
  correctKeystrokes = 0; // Reset correct keystrokes for recalculation

  // Compare typed text with the paragraph
  for (let i = 0; i < paragraph.length; i++) {
    const charElement = paragraphContainer.children[i]; // Get the corresponding span
    const typedChar = typedText[i];

    if (typedChar == null) {
      // If the user hasn't typed this character yet
      charElement.className = "text-gray-400"; // Reset to gray
    } else if (typedChar === paragraph[i]) {
      // If the typed character is correct
      charElement.className = "text-green-500"; // Set to green
      correctKeystrokes++; // Count as a correct keystroke
    } else {
      // If the typed character is incorrect
      charElement.className = "text-red-500"; // Set to red
    }
  }

  // Update stats (WPM and Accuracy)
  updateStats();

  // If the entire paragraph is correctly typed
  if (typedText === paragraph) {
    endTest(true); // End the test early
  }
}

// Function to update stats (WPM and Accuracy)
function updateStats() {
  const elapsedTime = 60 - timeLeft; // Calculate elapsed time
  const wordsTyped = correctKeystrokes / 5; // Assume 5 characters per word
  const wpm = Math.round(wordsTyped / (elapsedTime / 60)) || 0; // Calculate WPM
  const accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100) || 100; // Calculate accuracy

  wpmElement.textContent = `WPM: ${wpm}`;
  accuracyElement.textContent = `Accuracy: ${accuracy}%`;
}

// Function to end the test
function endTest(completed) {
  clearInterval(timerInterval); // Stop the timer
  inputField.disabled = true; // Disable input field

  // Show a message based on whether the test was completed or not
  if (completed) {
    alert("Congratulations! You completed the paragraph.");
  } else {
    alert("Time's up! Test completed.");
  }
}

// Add event listeners
startButton.addEventListener("click", startTest); 
inputField.addEventListener("input", handleTyping);
