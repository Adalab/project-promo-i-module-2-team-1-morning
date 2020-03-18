'use strict';

// JS del formulario

const formObject = {
  name: document.querySelector('.js-form-input-name'),
  job: document.querySelector('.js-form-input-job'),
  email: document.querySelector('.js-form-input-email'),
  tel: document.querySelector('.js-form-input-tel'),
  linkedin: document.querySelector('.js-form-input-linkedin'),
  github: document.querySelector('.js-form-input-github')
};

formObject.name.addEventListener('keyup', form);
formObject.job.addEventListener('keyup', form);
formObject.email.addEventListener('keyup', form);
formObject.tel.addEventListener('keyup', form);
formObject.linkedin.addEventListener('keyup', form);
formObject.github.addEventListener('keyup', form);

const cardObject = {
  name: document.querySelector('.js-card-title-first'),
  job: document.querySelector('.js-card-title-second'),
  tel: document.querySelector('.js-a-mobile'),
  email: document.querySelector('.js-a-mail'),
  linkedin: document.querySelector('.js-a-linkedin'),
  github: document.querySelector('.js-a-github'),
  image: document.querySelector('.js-card-img')
};

function form(event) {
  if (event.currentTarget.classList.contains('js-form-input-name')) {
    cardObject.name.innerHTML = event.currentTarget.value;
  } else if (event.currentTarget.classList.contains('js-form-input-job')) {
    cardObject.job.innerHTML = event.currentTarget.value;
  } else if (event.currentTarget.classList.contains('js-form-input-email')) {
    cardObject.email.setAttribute('href', `mailto: ${formObject.email.value}`);
  } else if (event.currentTarget.classList.contains('js-form-input-tel')) {
    cardObject.tel.setAttribute('href', formObject.tel.value);
  } else if (event.currentTarget.classList.contains('js-form-input-linkedin')) {
    cardObject.linkedin.setAttribute('href', formObject.linkedin.value);
  } else if (event.currentTarget.classList.contains('js-form-input-github')) {
    cardObject.github.setAttribute('href', formObject.github.value);
  }
}

// cambiar los colores

let card = document.querySelector('.js-card');
let pallete = document.querySelector('.design__form');

function changePallete(ev) {
  if (ev.target.id === 'green') {
    card.classList.add('card--theme1');
    card.classList.remove('card--theme2');
    card.classList.remove('card--theme3');

  } else if (ev.target.id === 'red') {
    card.classList.add('card--theme2');
    card.classList.remove('card--theme3');
    card.classList.remove('card--theme1');

  } else {
    card.classList.add('card--theme3');
    card.classList.remove('card--theme2');
    card.classList.remove('card--theme1');
  }
}


pallete.addEventListener('change', changePallete);


// boton reset

const btnReset = document.querySelector('.js-btn-reset');

function reset() {
  document.location.reload();
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
  button.classList.remove('share__button__enabled');
  button.classList.add('share__button__unabled');
  myCard.classList.remove('hidden');
}

button.addEventListener('click', createCard);

// prueba archivo
const invisibleInput = document.querySelector('.js-input-invisible');
const divPicture = document.querySelector('.js-divPicture');

function previewFile() {
  var preview = document.querySelector('.js-img');
  var file = document.querySelector('.js-input-invisible').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    cardObject.image.src = preview.src;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
}

function toggleBtnStyle() {
  const label = document.querySelector('.complete__form__image-fields__image-button-label');
  label.classList.toggle('hover');
}
invisibleInput.addEventListener('onchange', previewFile);
invisibleInput.addEventListener('mouseover', toggleBtnStyle);
invisibleInput.addEventListener('mouseout', toggleBtnStyle);
