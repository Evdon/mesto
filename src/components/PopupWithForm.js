import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ selectorPopup, handleFormSubmit }) {
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
    }
    
    _getInputValues(){
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}