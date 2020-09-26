let editBtn = document.querySelector('.profile__edit-button');
let addBtn = document.querySelector('.profile__add-button');
let closeBtnAdd = document.querySelector('.popup__close-button_add');
let closeBtnEdit = document.querySelector('.popup__close-button_edit');
let closeBtnImg = document.querySelector('.popup__close-button_img');
let popup = document.querySelector('.popup');
let popupAdd = document.querySelector('.popup-add');
let popupEdit = document.querySelector('.popup-edit');
let popupImg = document.querySelector('.popup-img');
let popupImage = document.querySelector('.popup__img');
let popupPlace = document.querySelector('.popup__place');
let submitBtn= document.querySelector('.popup__submit-button_type_add');
let name = document.getElementById('name');
let job = document.getElementById('job');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let formElementEdit = document.querySelector('.popup__form_type_edit');
let formElementAdd = document.querySelector('.popup__form_type_add');
let cardContainer = document.querySelector('.elements');
const place = document.querySelector('.popup__input_type_place');
const link = document.querySelector('.popup__input_type_link');
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

function popEditSwitch(){
    popupEdit.classList.toggle('popup_opened');

    if (popup.classList.contains('popup_opened')){
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    }
}

function popAddSwitch(){
    popupAdd.classList.toggle('popup_opened');
}

function popImgSwitch(){
    popupImg.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popEditSwitch();
}


function mainCards(){
    for(let i = 0; i < initialCards.length; i++){
    addCard(initialCards[i].place, initialCards[i].link);
    }
}

function addCard(placeValue, linkValue){
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardImg = cardElement.querySelector('img');

    cardElement.querySelector('.element__description').textContent = placeValue;
    cardImg.setAttribute('src', linkValue);
    cardImg.setAttribute('alt', placeValue);
    
    cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt){
        evt.target.closest('.element').remove();
    });

    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__like-button_active');
    });

    cardImg.addEventListener('click', function(evt){
        popImgSwitch();
        popupPlace.textContent = placeValue
        popupImage.setAttribute('src', linkValue);
        popupImage.setAttribute('alt', placeValue);
    });

    cardContainer.append(cardElement);
}

mainCards();
addBtn.addEventListener('click', popAddSwitch)
closeBtnAdd.addEventListener('click', popAddSwitch);
editBtn.addEventListener('click', popEditSwitch);
closeBtnEdit.addEventListener('click', popEditSwitch);
formElementEdit.addEventListener('submit', formSubmitHandler);
closeBtnImg.addEventListener('click',  popImgSwitch);
formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addCard(place.value, link.value);
    
    place.value = '';
    link.value = '';
    popAddSwitch();
});



