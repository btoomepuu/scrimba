// prettier-ignore
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

// choose pwd length,
// copy on click,
// symbols or numbers in pwd
let options = {
  letters: true,
  numbers: true,
  symbols: false,
};

const container = document.querySelector('#container');
const displayPwdLength = document.querySelector('#display-length');
const slider = document.querySelector('#slider');
const pwdGenerateBtn = document.querySelector('#pwd-generate-btn');
const pwdOneEl = document.querySelector('#pwd-one');
const pwdTwoEl = document.querySelector('#pwd-two');
const pwdOptions = document.querySelector('#pwd-options');

let randomPwdOne = '';
let randomPwdTwo = '';
let lettersChecked = true;
let numbersChecked = true;
let symbolsChecked = false;
let pwdLength = slider.value;

slider.addEventListener('input', (e) => {
  pwdLength = slider.value;
  displayPwdLength.textContent = `Length (${slider.value})`;

  if (slider.value >= 16) {
    pwdGenerateBtn.style = 'background-color:#10b981';
  } else if (slider.value < 9) {
    pwdGenerateBtn.style = 'background-color:rgba(242, 193, 78, 1)';
  } else {
    pwdGenerateBtn.style = 'background-color:rgba(247, 129, 84, 1)';
  }
});

pwdOptions.addEventListener('change', (e) => {
  switch (e.target.id) {
    case 'letters-box':
      options.letters = e.target.checked;
      break;
    case 'numbers-box':
      options.numbers = e.target.checked;
      break;
    case 'symbols-box':
      options.symbols = e.target.checked;
      break;
  }
});

pwdGenerateBtn.addEventListener('click', (e) => {
  let validOption = checkBoxes();
  if (validOption) {
    randomPwdOne = generateRandomPwd(pwdLength);
    randomPwdTwo = generateRandomPwd(pwdLength);
    pwdOneEl.textContent = randomPwdOne;
    pwdTwoEl.textContent = randomPwdTwo;
  } else {
    alert('You must check at least one box.');
  }
  e.preventDefault();
});

function checkBoxes() {
  for (const key in options) {
    if (options[key]) {
      return true;
    }
  }
}

function generateRandomPwd(length) {
  let newPwd = '';
  let pwdChars = charsIncluded();
  while (newPwd.length < length) {
    let charIndex = Math.floor(Math.random() * pwdChars.length);
    newPwd += pwdChars[charIndex];
  }
  return newPwd;
}

function charsIncluded() {
  let chars = [];
  if (options.letters) {
    chars = chars.concat(characters.slice(0, 52));
  }

  if (options.numbers) {
    chars = chars.concat(characters.slice(52, 62));
  }

  if (options.symbols) {
    chars = chars.concat(characters.slice(62, 91));
  }

  return chars;
}
