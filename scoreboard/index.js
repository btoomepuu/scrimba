const homeTeam = document.getElementById('home-team');
const homePoints = document.getElementById('home-points');
const homeBonus1 = document.getElementById('home-bonus1');
const homeBonus2 = document.getElementById('home-bonus2');
const homeFouls = document.getElementById('home-fouls');

const guestTeam = document.getElementById('guest-team');
const guestPoints = document.getElementById('guest-points');
const guestBonus1 = document.getElementById('guest-bonus1');
const guestBonus2 = document.getElementById('guest-bonus2');
const guestFouls = document.getElementById('guest-fouls');

const period = document.getElementById('period-number');

const timeBtns = document.getElementById('time-btns');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

const timer = document.getElementById('timer');
let inPlay = false;

let time = 720;
let counter;

homeTeam.addEventListener('click', (e) => {
  const target = e.target.id;
  if (inPlay)
    switch (target) {
      case 'home1-point':
        addPoints('home', 1);
        break;
      case 'home2-point':
        addPoints('home', 2);
        break;
      case 'home3-point':
        addPoints('home', 3);
        break;
      case 'home-add-foul':
        addFoul('home');
        break;
    }

  checkWinner();
});

guestTeam.addEventListener('click', (e) => {
  const target = e.target.id;
  if (inPlay)
    switch (target) {
      case 'guest1-point':
        addPoints('guest', 1);
        break;
      case 'guest2-point':
        addPoints('guest', 2);
        break;
      case 'guest3-point':
        addPoints('guest', 3);
        break;
      case 'guest-add-foul':
        addFoul('guest');
        break;
    }
  checkWinner();
});

timeBtns.addEventListener('click', (e) => {
  if (e.target.id === 'start-btn') {
    inPlay = true;
    startBtn.style = 'display: none';
    pauseBtn.style = 'display: block';
    counter = setInterval(() => {
      countDown();
    }, 1000);
  } else if (e.target.id === 'pause-btn') {
    inPlay = false;
    pauseBtn.style = 'display: none';
    startBtn.style = 'display: block';
    clearInterval(counter);
  } else reset();
});

function countDown() {
  time--;
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  let currentPeriod = parseInt(period.textContent);
  if (minutes >= 10) {
    timer.textContent = `${minutes}:${seconds}`;
  } else if (2 <= minutes <= 9 && seconds >= 10) {
    timer.textContent = `0${minutes}:${seconds}`;
  } else {
    timer.textContent = `00:0${seconds}`;
    if (seconds === 0) {
      console.log;
      setPeriod(seconds);
    }
  }
}

function setPeriod() {
  let currentPeriod = parseInt(period.textContent);
  currentPeriod++;

  if (currentPeriod > 4) {
    clearInterval(counter);
    period.textContent = 4;
  } else {
    period.textContent = currentPeriod;
    resetTime();
  }
}

function addPoints(targetTeam, points) {
  let score;
  if (targetTeam === 'home') {
    score = parseInt(homePoints.textContent);
    score += points;
    homePoints.textContent = score;
  } else {
    score = parseInt(guestPoints.textContent);
    score += points;
    guestPoints.textContent = score;
  }
}

function addFoul(targetTeam) {
  let fouls;
  if (targetTeam === 'home') {
    fouls = parseInt(homeFouls.textContent);
    fouls++;
    homeFouls.textContent = fouls;
  } else {
    fouls = parseInt(guestFouls.textContent);
    fouls++;
    guestFouls.textContent = fouls;
  }

  if (fouls === 7 || fouls === 14) {
    bonusCheck(targetTeam, fouls);
  }
}

function checkWinner() {
  let home = parseInt(homePoints.textContent);
  let guest = parseInt(guestPoints.textContent);
  if (home > guest) {
    homePoints.style = 'color: #419d78';
    guestPoints.style = 'color: #e0a458';
  } else if (guest > home) {
    guestPoints.style = 'color: #419d78';
    homePoints.style = 'color: #e0a458';
  } else {
    guestPoints.style = 'color: #e0a458';
    homePoints.style = 'color: #e0a458';
  }
}

function bonusCheck(targetTeam, fouls) {
  if (targetTeam === 'home') {
    if (fouls === 7) {
      homeBonus1.style = 'color: #e0a458';
    } else homeBonus2.style = 'color: #e0a458';
  } else {
    if (fouls === 7) {
      guestBonus1.style = 'color: #e0a458';
    } else guestBonus2.style = 'color: #e0a458';
  }
}

function reset() {
  inPlay = false;
  homePoints.textContent = 0;
  homeFouls.textContent = 0;
  homeBonus1.style.color = null;
  homeBonus2.style.color = null;

  guestPoints.textContent = 0;
  guestFouls.textContent = 0;
  guestBonus1.style.color = null;
  guestBonus2.style.color = null;

  period.textContent = 1;

  pauseBtn.style = 'display: none';
  startBtn.style = 'display: block';

  checkWinner();
  clearInterval(counter);
  resetTime();
}

function resetTime() {
  time = 720;
  timer.textContent = '12:00';
}
