'use strict';

// JS del formulario
const formComplete = document.querySelector('.complete__form');

const formObject = {
  name: document.querySelector('.js-form-input-name'),
  job: document.querySelector('.js-form-input-job'),
  email: document.querySelector('.js-form-input-email'),
  tel: document.querySelector('.js-form-input-tel'),
  linkedin: document.querySelector('.js-form-input-linkedin'),
  github: document.querySelector('.js-form-input-github'),
  palette: document.querySelectorAll('.js-input-color')
};

formComplete.addEventListener('keyup', ensureData);

const cardObject = {
  name: document.querySelector('.js-card-title-first'),
  job: document.querySelector('.js-card-title-second'),
  tel: document.querySelector('.js-a-mobile'),
  email: document.querySelector('.js-a-mail'),
  linkedin: document.querySelector('.js-a-linkedin'),
  github: document.querySelector('.js-a-github'),
  image: document.querySelector('.js-card-img'),
  palette: document.querySelectorAll('.js-input-color')
};
let card = document.querySelector('.js-card');

let photo;

getLocalStorage();

function setLocalStorage() {
  const data = {};
  for (const input in formObject) {
    data[input] = formObject[input].value;
  }
  localStorage.setItem('data', JSON.stringify(data));
  // falta la mandanga de la paleta y la foto
}

function getLocalStorage() {
  if (localStorage.getItem('datapalette')) {
    card.classList = localStorage.getItem('datapalette');
  }
  const data = JSON.parse(localStorage.getItem('data'));
  if (data !== null) {
    for (const input in formObject) {
      formObject[input].value = data[input];
    }
  }

  ensureData();
}

function ensureData() {
  cardObject.name.innerHTML = formObject.name.value || 'Nombre Apellido';
  cardObject.job.innerHTML = formObject.job.value || 'Puesto de trabajo';
  cardObject.tel.href = 'tel:' + formObject.tel.value;
  cardObject.email.href = 'mailto:' + formObject.email.value;
  cardObject.linkedin.href = formObject.linkedin.value;
  cardObject.github.href = formObject.github.value;
  setLocalStorage();
}

// cambiar los colores

let palette = document.querySelector('.design__form');

function changePalette(ev) {
  const defaultClasses = 'card js-card';
  if (ev.target.value === 'green') {
    card.classList = defaultClasses + ' card--theme1';
    // card.classList.add('card--theme1');
    // card.classList.remove('card--theme2');
    // card.classList.remove('card--theme3');
  } else if (ev.target.value === 'red') {
    card.classList = defaultClasses + ' card--theme2';
    // card.classList.add('card--theme2');
    // card.classList.remove('card--theme3');
    // card.classList.remove('card--theme1');
  } else {
    card.classList = defaultClasses + ' card--theme3';
    // card.classList.add('card--theme3');
    // card.classList.remove('card--theme2');
    // card.classList.remove('card--theme1');
  }
  localStorage.setItem('datapalette', card.classList);
}
palette.addEventListener('change', changePalette);

// boton reset

const btnReset = document.querySelector('.js-btn-reset');

function reset() {
  for (const input in formObject) {
    formObject[input].value = '';
  }
  ensureData();
}
btnReset.addEventListener('click', reset);

// Share section Javascript

const shareButtonDiv = document.querySelector('.js-share__button');
const button = document.querySelector('.js-button');
const divList = document.querySelectorAll('.js-title-collapse');
const myCard = document.querySelector('.js-share__card');

function unCollapse() {
  shareButtonDiv.classList.toggle('hidden');
}
divList[2].addEventListener('click', unCollapse);

/////////////////

function createCard() {
  const json = {
    palette: getRadioValue(),
    name: document.querySelector('.js-form-input-name').value,
    job: document.querySelector('.js-form-input-job').value,
    tel: document.querySelector('.js-form-input-tel').value,
    email: document.querySelector('.js-form-input-email').value,
    linkedin: document.querySelector('.js-form-input-linkedin').value,
    github: document.querySelector('.js-form-input-github').value,
    photo: photo
  };

  console.log(json);

  fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (result) {
      showURL(result);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showURL(result) {
  let cardUrl = result.cardURL;
  console.log(cardUrl);
  const twitter = document.querySelector('.js-share-button');
  const link = document.querySelector('.js-share-link');
  link.innerHTML = cardUrl;
  link.href = cardUrl;
  twitter.href = `https://twitter.com/intent/tweet?text=Mi+tarjeta+se+ha+creado+${cardUrl}`;

  button.classList.remove('share__button__enabled');
  button.classList.add('share__button__unabled');
  myCard.classList.remove('hidden');
}

button.addEventListener('click', createCard);

// prueba archivo
const invisibleInput = document.querySelector('.js-input-invisible');
/* const divPicture = document.querySelector('.js-divPicture');
 */
function previewFile() {
  var preview = document.querySelector('.js-img');
  var file = document.querySelector('.js-input-invisible').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    photo = reader.result;
    cardObject.image.src = preview.src;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
}

function toggleBtnStyle() {
  const label = document.querySelector(
    '.complete__form__image-fields__image-button-label'
  );
  label.classList.toggle('hover');
}

function getRadioValue() {
  let radios = document.getElementsByName('color');

  for (let radio of radios) {
    if (radio.checked) {
      if (radio.value === 'green') {
        return 1;
      } else if (radio.value === 'red') {
        return 2;
      } else {
        return 3;
      }
    }
  }
  return 1;
}

invisibleInput.addEventListener('onchange', previewFile);
invisibleInput.addEventListener('mouseover', toggleBtnStyle);
invisibleInput.addEventListener('mouseout', toggleBtnStyle);
