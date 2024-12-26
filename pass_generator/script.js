const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

// Character sets
const lowerCaseStr = "abcdefghijklmnopqrstuvwxyz";
const upperCaseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberStr = "0123456789";
const symbolStr = "~`!@#$%^&*()_-+={[}]|:;\"<,>.?/";

// Initially
let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();
setIndicator("#ccc"); // Set strength indicator to grey

// Set slider and length display
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

// Set strength indicator color
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// Generate a random lowercase letter
function generateLowerCase() {
  const index = Math.floor(Math.random() * lowerCaseStr.length);
  return lowerCaseStr[index];
}

// Generate a random uppercase letter
function generateUpperCase() {
  const index = Math.floor(Math.random() * upperCaseStr.length);
  return upperCaseStr[index];
}

// Generate a random number
function generateRandomNumber() {
  const index = Math.floor(Math.random() * numberStr.length);
  return numberStr[index];
}

// Generate a random symbol
function generateSymbol() {
  const index = Math.floor(Math.random() * symbolStr.length);
  return symbolStr[index];
}

// Calculate password strength
function calcStrength() {
  let hasUpper = uppercaseCheck.checked;
  let hasLower = lowercaseCheck.checked;
  let hasNum = numbersCheck.checked;
  let hasSym = symbolsCheck.checked;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0"); // Strong
  } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
    setIndicator("#ff0"); // Medium
  } else {
    setIndicator("#f00"); // Weak
  }
}

// Copy password to clipboard
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    alert("Password copied to clipboard");
  } catch (e) {
    copyMsg.innerText = "Failed to copy";
  }
  copyMsg.classList.add("active");
  setTimeout(() => copyMsg.classList.remove("active"), 2000);
}

// Shuffle password using Fisher-Yates algorithm
function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
  return array.join('');
}

// Handle checkbox state changes
function handleCheckBoxChange() {
  checkCount = Array.from(allCheckBox).filter(checkbox => checkbox.checked).length;

  // Adjust password length if less than the number of active checks
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

// Event listeners
allCheckBox.forEach(checkbox => {
  checkbox.addEventListener('change', handleCheckBoxChange);
});

inputSlider.addEventListener('input', e => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener('click', () => {
  if (passwordDisplay.value) copyContent();
});

generateBtn.addEventListener('click', () => {
  if (checkCount === 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";

  const funcArr = [];
  if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
  if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
  if (numbersCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolsCheck.checked) funcArr.push(generateSymbol);

  // Add at least one of each selected type
  funcArr.forEach(func => (password += func()));

  // Fill remaining characters
  for (let i = password.length; i < passwordLength; i++) {
    const randomFunc = funcArr[Math.floor(Math.random() * funcArr.length)];
    password += randomFunc();
  }

  // Shuffle and display password
  password = shufflePassword(password.split(''));
  passwordDisplay.value = password;

  calcStrength();
});
