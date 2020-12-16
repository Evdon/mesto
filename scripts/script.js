import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const forms = document.querySelectorAll('.popup__form');
const addPopup = document.querySelector('.popup-add');
const addForm = addPopup.querySelector('.popup__form');
const editPopup = document.querySelector('.popup-edit');
const editForm = editPopup.querySelector('.popup__form');
export const imgPopup = document.querySelector('.popup-img');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtnAdd = document.querySelector('.popup__close-button_add');
const closeBtnEdit = document.querySelector('.popup__close-button_edit');
const closeBtnImg = document.querySelector('.popup__close-button_img');
const popupContent = document.querySelector('.popup__content');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const formElementAdd = document.querySelector('.popup__form_type_add');
const cardContainer = document.querySelector('.elements');
const place = document.querySelector('.popup__input_type_place');
const link = document.querySelector('.popup__input_type_link');
const cardSelector = '.element-template';
const popupSubmitBtnAdd = document.querySelector('.popup__submit-button_type_add');
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
const popupList = Array.from(document.querySelectorAll('.popup'));

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
    formsList[formsList.length + 1] = popupContent;

    formsList.forEach((form) => {
        form.addEventListener('click',  callback);
    });
};

stopProp ();

function closeByLayout () {
    popupList.forEach((popup) => {
        popup.addEventListener('click',  function(){
            closePopup(popup);
        });
    });
};

closeByLayout();

export function openPopup (popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup (popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc (event){
    if(event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

editBtn.addEventListener('click', () => {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    openPopup(editPopup);
});
closeBtnEdit.addEventListener('click', () => {
    closePopup(editPopup);
});
closeBtnAdd.addEventListener('click', () => {
    closePopup(addPopup);
});
addBtn.addEventListener('click', () => {
    popupSubmitBtnAdd.classList.add 
    openPopup(addPopup);
});
closeBtnImg.addEventListener('click', () => {
    closePopup(imgPopup);
});

function submitFormHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(editPopup);
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

formElementEdit.addEventListener('submit', submitFormHandler);

formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addCard();
    
    place.value = '';
    link.value = '';
    popupSubmitBtnAdd.classList.add('popup__submit-button_inactive');
    closePopup(addPopup);
});

const setFormValidation = (formElement) => {
    const formValidator = new FormValidator(validSettings, formElement);
    formValidator.enableValidation();
  }
  
  formsList.forEach(form => {
    setFormValidation(form);
  })
  
