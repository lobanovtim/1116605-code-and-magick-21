'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const QUANTITY_WIZZARDS = 4;

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);
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
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
