let fighters = [
  '🐉',
  '🐥',
  '🐊',
  '💩',
  '🦍',
  '🐢',
  '🐩',
  '🦭',
  '🦀',
  '🐝',
  '🤖',
  '🐘',
  '🐸',
  '🕷',
  '🐆',
  '🦕',
  '🦁',
];

let stageEl = document.querySelector('#stage');
let fightBtn = document.querySelector('#fight-btn');

let emoji1;
let emoji2;

fightBtn.addEventListener('click', (e) => {
  emoji1 = randomIndex();
  emoji2 = randomIndex();
  displyEmojis();
});

function randomIndex() {
  let emojiIndex = Math.floor(Math.random() * 17);
  return emojiIndex;
}

function displyEmojis() {
  stageEl.textContent = `${fighters[emoji1]} vs ${fighters[emoji2]}`;
}
