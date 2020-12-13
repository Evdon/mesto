import openPopup from '../scripts/script.js';

export default class Card {
    constructor(data, cardSelector) {
        this._place = data.place;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate(){
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard(){
        this._element = this._getTemplate();
        this._element.querySelector('.element__img').src = this._link;
        this._element.querySelector('.element__img').alt =  this._place;
        this._element.querySelector('.element__description').textContent = this._place;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
            evt.target.closest('.element').remove();
        });

        this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like-button_active');
        });

        this._element.querySelector('img').addEventListener('click', () => {
            openPopup(this._element.querySelector('img'));
            document.querySelector('.popup__place').textContent = this._place;
            document.querySelector('.popup__img').setAttribute('src', this._link);
            document.querySelector('.popup__img').setAttribute('alt', this._place);
        });
    }
}
