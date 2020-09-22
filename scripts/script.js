let editBtn = document.querySelector('.profile__edit-button');
let addBtn = document.querySelector('.profile__add-button');
let closeBtnAdd = document.querySelector('.popup__close-button_add');
let closeBtnEdit = document.querySelector('.popup__close-button_edit');
let popup = document.querySelector('.popup');
let popupAdd = document.querySelector('.popup__add');
let popupEdit = document.querySelector('.popup__edit');
let submitBtn= document.querySelector('.popup__submit-button');
let name = document.getElementById('name');
let job = document.getElementById('job');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let formElement = document.querySelector('.popup__form');


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

function formSubmitHandler (evt) {
    evt.preventDefault();  
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popEditSwitch();
}


addBtn.addEventListener('click', popAddSwitch)
closeBtnAdd.addEventListener('click', popAddSwitch);
editBtn.addEventListener('click', popEditSwitch);
closeBtnEdit.addEventListener('click', popEditSwitch);
formElement.addEventListener('submit', formSubmitHandler); 


