let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-button')
let popup = document.querySelector('.popup');
let submitBtn= document.querySelector('.popup__submit-button')
let name = document.getElementById('name');
let job = document.getElementById('job');
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_job')
let formElement = document.querySelector('.popup__form');


function popupOpen(){
    popup.classList.toggle('popup_opened')

    if (popup.classList.contains('popup_opened')){
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault();  
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupOpen();
}



editBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupOpen);
formElement.addEventListener('submit', formSubmitHandler); 


