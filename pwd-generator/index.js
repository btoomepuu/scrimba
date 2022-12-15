// prettier-ignore
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

// choose pwd length,
// copy on click,
// symbols or numbers in pwd

const displayPwdLength = document.querySelector('#display-length');
const slider = document.querySelector('#slider');
const pwdGenerateBtn = document.querySelector('#pwd-generate-btn');
const headColorText = document.querySelector('#head-color-text');
const pwdOneEl = document.querySelector('#pwd-one');
const pwdTwoEl = document.querySelector('#pwd-two');
const pwdOptions = document.querySelector('#pwd-options');
const pwdSection = document.querySelector('#pwd-section');

let options = {
  letters: true,
  numbers: true,
  symbols: false,
};

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
    randomPwdOne = generateRandomPwd(slider.value);
    randomPwdTwo = generateRandomPwd(slider.value);
    displayPwd(randomPwdOne, randomPwdTwo);
  } else {
    alert('You must check at least one box.');
  }
  e.preventDefault();
});

pwdOneEl.addEventListener('click', (e) => {
  pwdGenerated = true;
  copyToClipboard(e.target);
});

pwdTwoEl.addEventListener('click', (e) => {
  pwdGenerated = true;
  copyToClipboard(e.target);
});

function copyToClipboard(target) {
  let text = target.textContent;
  if (pwdGenerated)
    if (target.id === 'copy-img-one' || target.id === 'copy-img-two') {
      text = target.previousSibling.textContent;
    }
  const type = 'text/plain';
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  navigator.clipboard.write(data).then(() => {
    text,
      () => {
        '';
      };
  });
}

function displayPwd(pwd1, pwd2) {
  pwdOneEl.textContent = pwd1;
  addCopyImg(pwdOneEl);
  pwdOneEl.classList.add('pointer');
  pwdTwoEl.textContent = pwd2;
  addCopyImg(pwdTwoEl);
  pwdTwoEl.classList.add('pointer');
}

function addCopyImg(pwdEl) {
  const copyImg = document.createElement('img');
  copyImg.src = 'imgs/copy-solid.svg';
  copyImg.classList.add('copy-img');
  if (pwdEl.id === 'pwd-one') {
    copyImg.setAttribute('id', 'copy-img-one');
  } else {
    copyImg.setAttribute('id', 'copy-img-two');
  }
  pwdEl.appendChild(copyImg);
}

function checkBoxes() {
  for (const key in options) {
    if (options[key]) {
      return true;
    }
  }
  return false;
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
