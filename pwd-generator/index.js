// prettier-ignore
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

// choose pwd length,
// copy on click,
// symbols or numbers in pwd

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
  console.log(pwdLength);
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
      lettersChecked = e.target.checked;
      console.log(lettersChecked);
      break;
    case 'numbers-box':
      numbersChecked = e.target.checked;
      console.log(numbersChecked);
      break;
    case 'symbols-box':
      symbolsChecked = e.target.checked;
      console.log('sym');
      break;
  }
});

pwdGenerateBtn.addEventListener('click', (e) => {
  if (
    numbersChecked === false &&
    lettersChecked === false &&
    symbolsChecked === false
  ) {
    alert('You must check at least one box.');
  }
  randomPwdOne = generateRandomPwd(pwdLength);
  randomPwdTwo = generateRandomPwd(pwdLength);
  pwdOneEl.textContent = randomPwdOne;
  pwdTwoEl.textContent = randomPwdTwo;
  e.preventDefault();
});

function generateRandomPwd(length) {
  let newPwd = '';
  while (newPwd.length < length) {
    let char = Math.floor(Math.random() * 91);
    newPwd += characters[char];
  }
  return newPwd;
}
