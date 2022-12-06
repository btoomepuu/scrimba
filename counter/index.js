const countEl = document.getElementById('count-el');
const saveEl = document.getElementById('save-el');
let count = 0;

console.log(saveEl);

function increment() {
  count++;
  countEl.textContent = count;
}

function save() {
  saveEl.textContent += ` ${count} -`;
  countEl.textContent = 0;
  count = 0;
}
