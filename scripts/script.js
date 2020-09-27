const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtnAdd = document.querySelector('.popup__close-button_add');
const closeBtnEdit = document.querySelector('.popup__close-button_edit');
const closeBtnImg = document.querySelector('.popup__close-button_img');
const popup = document.querySelector('.popup');
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


function initCards(){
    for(let i = 0; i < initialCards.length; i++){
        const cardElement = getCardElement(initialCards[i].place, initialCards[i].link);
        cardContainer.prepend(cardElement);
    }
}

function addCard(){
    const cardElement = getCardElement(place.value, link.value);
    cardContainer.prepend(cardElement);
}

function getCardElement(placeValue, linkValue){
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
    
    return cardElement;
}

initCards();
addBtn.addEventListener('click', popAddSwitch)
closeBtnAdd.addEventListener('click', popAddSwitch);
editBtn.addEventListener('click', popEditSwitch);
closeBtnEdit.addEventListener('click', popEditSwitch);
formElementEdit.addEventListener('submit', formSubmitHandler);
closeBtnImg.addEventListener('click',  popImgSwitch);
formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addCard();
    
    place.value = '';
    link.value = '';
    popAddSwitch();
});



