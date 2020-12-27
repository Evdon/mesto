import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {editBtn, addBtn, popupContent, name, job, nameInput, jobInput, cardSelector, photoListSelector, popupSubmitBtnAdd, initialCards} from "../utils/constants.js";


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

function newCard(data){
  const card = new Card(
    { handleCardClick }, 
    cardSelector, data
  ); 
    const cardElement = card.generateCard();
    cardList.addItem(cardElement); 
  };

const addCard = (data) => {
    newCard(data);
};

const cardList = new Section(
  {
    renderer: (data) => {
        newCard(data);
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
    addCard(item);
    
    popupSubmitBtnAdd.classList.add(validSettings.inactiveButtonClass);
    popupSubmitBtnAdd.setAttribute("disabled", "disabled");
    popupTypeAdd.close();
  },
});

popupTypeAdd.setEventListeners();

addBtn.addEventListener("click", () => {
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
  const user = userInfo.getUserInfo();
  nameInput.value = user.name;
  jobInput.value = user.job;
  popupTypeEdit.open();
});