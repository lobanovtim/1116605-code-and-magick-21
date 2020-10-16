'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLOR = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const QUANTITY_WIZZARDS = 4;

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = document.querySelector(`.setup-close`);
const setup = document.querySelector(`.setup`);

const setupWizardForm = document.querySelector(`.setup-wizard-form`);
const wizardCoat = document.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`);
const setupFireball = document.querySelector(`.setup-fireball-wrap`);
const setupInputUsername = setupWizardForm.querySelector(`input[name=username]`);

const similarListElement = setup.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
.content
.querySelector(`.setup-similar-item`);

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const renderWizard = function (name, coatColor, eyesColor) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = eyesColor;

  return wizardElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < QUANTITY_WIZZARDS; i++) {
  const firstNameIndex = getRandomInt(0, WIZARD_NAMES.length);
  const lastNameIndex = getRandomInt(0, WIZARD_SURNAMES.length);
  const coatColorIndex = getRandomInt(0, COAT_COLORS.length);
  const eyesColorIndex = getRandomInt(0, EYES_COLORS.length);
  fragment.appendChild(renderWizard(`${WIZARD_NAMES[firstNameIndex]} ${WIZARD_SURNAMES[lastNameIndex]}`, COAT_COLORS[coatColorIndex], EYES_COLORS[eyesColorIndex]));
}

similarListElement.appendChild(fragment);
setup.querySelector(`.setup-similar`).classList.remove(`hidden`);

// Открытие/закрытие окна настройки персонажа
const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const errorPopup = function (inputName, message) {
  inputName.setCustomValidity(message);
}

const openPopup = function () {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  let message = ``;
  if (document.activeElement == setupInputUsername) {
    message = `Кажется, Вы не закончили что-то вводить`;
  }
  else {
    setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
  }
  errorPopup(setupInputUsername, message)
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

// Меняет цвет мантии, глаз и фаербола

const wizardCoatClickHandler = function () {
  let newCoatColor = COAT_COLORS[getRandomInt(0, COAT_COLORS.length)];
  wizardCoat.style.fill = newCoatColor;
  setupWizardForm.querySelector(`input[name=coat-color]`).value = newCoatColor;
};

const wizardEyesClickHandler = function () {
  let newEyesColor = EYES_COLORS[getRandomInt(0, EYES_COLORS.length)];
  wizardEyes.style.fill = newEyesColor;
  setupWizardForm.querySelector(`input[name=eyes-color]`).value = newEyesColor;
};

const setupFireballClickHandler = function () {
  let newFireballColor = FIREBALL_COLOR[getRandomInt(0, FIREBALL_COLOR.length)];
  setupFireball.style.backgroundColor = newFireballColor;
  setupFireball.querySelector(`input`).value = newFireballColor;
};

wizardCoat.addEventListener(`click`, wizardCoatClickHandler);
wizardEyes.addEventListener(`click`, wizardEyesClickHandler);
setupFireball.addEventListener(`click`, setupFireballClickHandler);
