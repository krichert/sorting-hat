// START FUNCTION
let startInterval;
let i = 0;
startInterval = setInterval(startIntervalRun, 2000);

// ASSIGN FUNCTION
(function () {
  const sortedPersons = persons.sort((a, b) => {
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
        person.house = "gryffindor";
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

    if (NUMBER_OF_TEAMS === 2) {
        j !== 2 ? j++ : j = 1;
    } else {
        j !== 4 ? j++ : j = 1;
    }
  });

  persons = sortedPersons;
})();

// CLICK HANDLER


document.querySelector('#submit').addEventListener('click', event => {
  event.preventDefault();
  const randomTextPerson = [...randomText];
  const inputValue = document.querySelector('input').value;
  const person = persons.find(person => person.name.toLowerCase() === inputValue.toLowerCase());

  if (!person) {
    return alert('On(a) nie ma tak na imię!')
  }

  document.querySelector('input').value = '';
  document.querySelector('input').disabled = true;

  randomTextPerson.push(`${person.name} ${person.name} ${person.name}...`);
  randomTextPerson.push(`Co by tu z Tobą zrobić ${person.name}?`);
  clearInterval(startInterval);

  const assignInterval = setInterval(() => {
    document.querySelector('.speech-bubble').innerText = randomTextPerson[(Math.random() * 11).toFixed()];
  }, 2000);

  startSortingHatSpeech(person.house);

  setTimeout(() => {
    clearInterval(assignInterval);
    document.querySelector('.speech-bubble').innerText = `${person.house.toUpperCase()}!`;
    document.querySelector(`.${person.house}`).style.display = 'block';

  }, getTimeoutDuration(person.house));

  setTimeout(() => {
    startInterval = setInterval(startIntervalRun, 2000);
    document.querySelectorAll('.house').forEach(el => el.style.display = 'none');
    document.querySelector('input').disabled = false;
    document.querySelector('.speech-bubble').innerText = '';
    document.querySelector('#hat-speech').remove();
    document.querySelector('#theme').muted = false;
    document.querySelector('#theme').play();
  }, getTimeoutDuration(person.house) + 5000);

});

// FUNCTIONS

function inverseNumber(number) {
  if (number === 1) {
    return NUMBER_OF_TEAMS === 2 ? 2 : 4
  }
  if (number === 2) {
    return NUMBER_OF_TEAMS === 1 ? 2 : 3
  }
  if (number === 3) {
    return 2
  }
  if (number === 4) {
    return 1
  }
}

function startIntervalRun() {
  document.querySelector('.speech-bubble').innerText = sortingHatDefaultSong[i];
  i !== 5 ? i++ : i = 0;
}

function startSortingHatSpeech(house) {
  document.querySelector('#theme').muted = true;
  document.querySelector('#theme').pause();
  const music = document.createElement('audio');
  music.setAttribute('src', `./audio/${house}.mp3`);
  music.setAttribute('autoplay', `true`);
  music.setAttribute('id', `hat-speech`);
  document.querySelector('body').appendChild(music);
}

function getTimeoutDuration(house) {
  switch (house) {
    case "gryffindor":
      return 20000;
    case "slytherin":
      return 20000;
    case "hufflepuff":
      return 18000;
    case "ravenclaw":
      return 24000;
  }
}