// START FUNCTION
let startInterval;
let i = 0;
function startIntervalRun() {
  document.querySelector('.speech-bubble').innerText = startRandomText[i];
  i !== 5 ? i++ : i = 0;
}
const startRandomText = [
  'Czy prawda cię zatrwoży?',
  'Me słowo krew ci zmrozi?',
  'Czy Slytherin?  Czy Gryffindor?',
  'Czy Hufflepuff? Czy Ravenclaw?',
  'Ciesz się, dziecino, fach swój znam.',
  'Nawet gdy smutek najpierw dam.'
];

startInterval = setInterval(startIntervalRun, 2000);


// ASSIGN FUNCTION
let persons = [
  {name: 'Kamil1', points: 10},
  {name: 'Kamil2', points: 20},
  {name: 'Kamil3', points: 30},
  {name: 'Kamil4', points: 40},
  {name: 'Kamil5', points: 50},
  {name: 'Kamil6', points: 60},
  {name: 'Kamil7', points: 70},
  {name: 'Kamil8', points: 80},
  {name: 'Kamil9', points: 90},
  {name: 'Kamil10', points: 100},
  {name: 'Kamil11', points: 90},
  {name: 'Kamil12', points: 80},
  {name: 'Kamil13', points: 70},
  {name: 'Kamil14', points: 60},
  {name: 'Kamil15', points: 50},
  {name: 'Kamil16', points: 40}
];
(function () {
  const inverseNumber = (number) => {
    if (number === 1) {return 4}
    if (number === 2) {return 3}
    if (number === 3) {return 2}
    if (number === 4) {return 1}
  };

  const sortedPersons = persons.sort((a,b) => {
    const pointsA = a.points;
    const pointsB = b.points;
    if (pointsA > pointsB) {
      return -1;
    }
    if (pointsB > pointsA) {
      return 1;
    }
    return 0;
  });

  let j = 1;
  sortedPersons.forEach((person, index) => {
    let number = j;
    if (index > 7) {
      number = inverseNumber(j);
    }

    switch (number) {
      case 1:
        person.house = "gryfindor";
        break;
      case 2:
        person.house = "slytherin";
        break;
      case 3:
        person.house = "hufflepuff";
        break;
      case 4:
        person.house = "ravenclaw";
        break;
    }
    j !== 4 ? j++ : j = 1;
  });

  persons = sortedPersons;
})();


// CLICK HANDLER
const randomText = [
  'Hmmmmm ...',
  'Ale fryzura ...',
  'Dziwny kształt głowy ...',
  'Ciekawe co dzisiaj na obiad ...',
  'Co by tu by ...',
  'Ence pence ...',
  'Ene due rabe ...'
];

document.querySelector('#submit').addEventListener('click', event => {
  event.preventDefault();
  const inputValue = document.querySelector('input').value;
  const person = persons.find(person => person.name.toLowerCase() === inputValue.toLowerCase());
  document.querySelector('input').value = '';
  document.querySelector('input').disabled = true;

  if (!person) {
    alert('On(a) nie ma tak na imię!')
  }

  randomText.push(`${person.name} ${person.name} ${person.name}...`);
  randomText.push(`Co by tu z Tobą zrobić ${person.name}?`);
  clearInterval(startInterval);

  const assignInterval = setInterval(() => {
    document.querySelector('.speech-bubble').innerText = randomText[(Math.random()*8).toFixed()];
  }, 2000);

  setTimeout(() => {
    clearInterval(assignInterval);
    document.querySelector('.speech-bubble').innerText = `${person.house.toUpperCase()}!`;
    document.querySelector(`.${person.house}`).style.display = 'block';

    const music = document.createElement('embed');
    music.setAttribute('src', `${person.house}.ogg`);
    music.setAttribute('autostart', `true`);
    music.setAttribute('loop', `false`);
    music.setAttribute('width', `0`);
    music.setAttribute('height', `0`);

    document.querySelector('body').appendChild(music);
  }, 10000);

  setTimeout(() => {
    startInterval = setInterval(startIntervalRun, 2000);
    document.querySelectorAll('.house').forEach(el => el.style.display = 'none');
    document.querySelector('input').disabled = false;
    document.querySelector('.speech-bubble').innerText = '';
    document.querySelector('embed').remove();
  }, 15000);

});

