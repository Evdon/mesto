import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupContent = document.querySelector(".popup__content");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const cardContainer = document.querySelector(".elements");
const place = document.querySelector(".popup__input_type_place");
const link = document.querySelector(".popup__input_type_link");
const cardSelector = ".element-template";
const photoListSelector = ".elements";
const popupSubmitBtnAdd = document.querySelector(
  ".popup__submit-button_type_add"
);
const initialCards = [
  {
    place: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    place: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    place: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    place: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    place: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    place: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const formsList = Array.from(document.forms);
export const popupList = Array.from(document.querySelectorAll(".popup"));
const popupTypeImg = new PopupWithImage(".popup-img");
popupTypeImg.setEventListeners();

function handleCardClick(place, link) {
  popupTypeImg.open(place, link);
}

const userInfo = new UserInfo({ userNameElement: name, userInfoElement: job });

const validSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function callback(evt) {
  evt.stopPropagation();
}

function stopProp() {
  formsList[formsList.length + 1] = popupContent;

  formsList.forEach((form) => {
    form.addEventListener("click", callback);
  });
}

stopProp();

const addCard = () => {
  const card = new Card(
    { handleCardClick, place: place.value, link: link.value },
    cardSelector
  );
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        { handleCardClick, place: item.place, link: item.link },
        cardSelector
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  photoListSelector
);

cardList.renderItems(initialCards.reverse());

const setFormValidation = (formElement) => {
  const formValidator = new FormValidator(validSettings, formElement);
  formValidator.enableValidation();
};

formsList.forEach((form) => {
  setFormValidation(form);
});

const popupTypeAdd = new PopupWithForm({
  selectorPopup: ".popup-add",
  handleFormSubmit: (item) => {
    addCard();
    
    popupSubmitBtnAdd.classList.add(validSettings.inactiveButtonClass);
    popupSubmitBtnAdd.setAttribute("disabled", "disabled");
    popupTypeAdd.close();
  },
});

popupTypeAdd.setEventListeners();

addBtn.addEventListener("click", () => {
  popupSubmitBtnAdd.classList.add;
  popupTypeAdd.open();
});

const popupTypeEdit = new PopupWithForm({
  selectorPopup: ".popup-edit",
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item)
    popupTypeEdit.close();
  },
});

popupTypeEdit.setEventListeners();

editBtn.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  popupTypeEdit.open();
});