/*version 2:
add length key to options to dynamically create boxes for multiple passwords
querySelectAll created boxes to call generateRandomPwd and displayPwd for value of length
*/
// prettier-ignore
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//prettier-ignore
const symbols = ['~','`','!','@','#','$','%','^','&','*','(',')','_','-','+','=','{','[','}',']',',','|',':',';','<','>','.','?','/'];

const displayPwdLength = document.querySelector('#display-length');
const slider = document.querySelector('#slider');
const pwdGenerateBtn = document.querySelector('#pwd-generate-btn');
const headColorText = document.querySelector('#head-color-text');
const pwdOneEl = document.querySelector('#pwd-one');
const pwdTwoEl = document.querySelector('#pwd-two');
const pwdOptions = document.querySelector('#pwd-options');
const pwdSection = document.querySelector('#pwd-section');

let randomPwdOne = '';
let randomPwdTwo = '';

let pwdGenerated = false;

slider.addEventListener('input', (e) => {
  displayPwdLength.textContent = `Length (${slider.value})`;

  if (slider.value >= 16) {
    headColorText.style = 'color:#10b981';
  } else if (slider.value < 9) {
    headColorText.style = 'color:rgba(227, 23, 10, 1)';
  } else {
    headColorText.style = 'color:rgba(247, 179, 43, 1)';
  }
});

pwdGenerateBtn.addEventListener('click', (e) => {
  let pwdChars = charsIncluded();

  if (pwdChars.length > 0) {
    randomPwdOne = generateRandomPwd(slider.value, pwdChars);
    randomPwdTwo = generateRandomPwd(slider.value, pwdChars);
    displayPwd(randomPwdOne, pwdOneEl);
    displayPwd(randomPwdTwo, pwdTwoEl);
  } else {
    alert('You must check at least one box.');
  }

  e.preventDefault();
});

pwdOneEl.addEventListener('click', (e) => {
  pwdGenerated = true;
  copy(e.target);
});

pwdTwoEl.addEventListener('click', (e) => {
  pwdGenerated = true;
  copy(e.target);
});

function displayPwd(pwd, pwdEl) {
  pwdEl.textContent = pwd;
  addCopyImg(pwdEl);
  pwdEl.classList.add('pointer');
}

function addCopyImg(pwdEl) {
  const copyImg = document.createElement('img');
  copyImg.src = 'imgs/copy-solid.svg';
  copyImg.classList.add('copy-img');
  pwdEl.append(copyImg);
}

function generateRandomPwd(length, charsArray) {
  let newPwd = '';
  while (newPwd.length < length) {
    let charIndex = Math.floor(Math.random() * charsArray.length);
    newPwd += charsArray[charIndex];
  }
  return newPwd;
}
function charsIncluded() {
  let chars = [];
  if (document.getElementById('letters-box').checked) {
    chars = chars.concat(letters);
  }

  if (document.getElementById('numbers-box').checked) {
    chars = chars.concat(numbers);
    chars = [...chars];
  }

  if (document.getElementById('symbols-box').checked) {
    chars = chars.concat(symbols);
    chars = [...chars];
  }

  return chars;
}

function copy(target) {
  let text = target.textContent;
  if (target.classList.contains('copy-img')) {
    text = target.previousSibling.textContent;
  }
  navigator.clipboard.writeText(text);
}
