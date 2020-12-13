import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtnAdd = document.querySelector('.popup__close-button_add');
const closeBtnEdit = document.querySelector('.popup__close-button_edit');
const closeBtnImg = document.querySelector('.popup__close-button_img');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const popupInput = document.querySelector('.popup__input');
const popupContent = document.querySelector('.popup__content');
const popupAdd = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');
const popupImg = document.querySelector('.popup-img');
const popupImage = document.querySelector('.popup__img');
const popupPlace = document.querySelector('.popup__place');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const formElementAdd = document.querySelector('.popup__form_type_add');
const cardContainer = document.querySelector('.elements');
const place = document.querySelector('.popup__input_type_place');
const link = document.querySelector('.popup__input_type_link');
const overlay = document.querySelector('.popup__container');
const cardSelector = '.element-template';
const initialCards = [
    {
        place: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        place: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        place: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        place: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        place: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        place: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const formsList = Array.from(document.forms);

const validSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}  

function callback(evt) {
    evt.stopPropagation();
}

function stopProp () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList[formList.length + 1] = popupContent;

    formList.forEach((form) => {
        form.addEventListener('click',  callback);
    });
};

stopProp ();

function popupTarget () {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    
    popupList.forEach((popup) => {
        popup.addEventListener('click',  function(){
            popup.classList.toggle('popup_opened');
        });
    });
};

popupTarget();

function escClose (popupClass){
    return function esc (evt) {
        if(evt.key === 'Escape'){
            popupClass.classList.remove('popup_opened');
        }
    }
}


export default function openPopup (popup){
    const popupClass = document.querySelector(`#popup-${popup.id}`);
    popup.addEventListener('keydown', escClose(popupClass));
    if(popup.id === 'img'){
        popupClass.classList.add('popup_opened');
    } else {
        popup.addEventListener('click', function (){
            popupClass.classList.add('popup_opened');
            if(popup.id === 'edit'){
                if (popupClass.classList.contains('popup_opened')){
                    nameInput.value = name.textContent;
                    jobInput.value = job.textContent;
                }
            }
        });
    }
}

function closePopup (popup){
    const popupClass = document.querySelector(`#popup-${popup.id}`);
    popup.removeEventListener('keydown', escClose(popupClass));
    popup.addEventListener('click', function (){   
        popupClass.classList.remove('popup_opened');
    });
}

editBtn.addEventListener('click', openPopup (editBtn));
closeBtnEdit.addEventListener('click', closePopup (closeBtnEdit));
closeBtnAdd.addEventListener('click', closePopup (closeBtnAdd));
addBtn.addEventListener('click', openPopup (addBtn));
closeBtnImg.addEventListener('click', closePopup (closeBtnImg));

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupEdit.classList.remove('popup_opened');
}

initialCards.forEach((item) => {
	const card = new Card(item, cardSelector);
	const cardElement = card.generateCard();

	cardContainer.append(cardElement);
});


function addCard(){
    const card =  new Card({ place: place.value, link: link.value}, cardSelector);
    const cardElement = card.generateCard();
    
    cardContainer.prepend(cardElement);
}

formElementEdit.addEventListener('submit', formSubmitHandler);

formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addCard();
    
    place.value = '';
    link.value = '';
    popupAdd.classList.remove('popup_opened');
});

popupForm.addEventListener('click', callback);

const setFormValidation = (formElement) => {
    const formValidator = new FormValidator(validSettings, formElement);
    formValidator.enableValidation();
  }
  
  formsList.forEach(form => {
    setFormValidation(form);
  })
  