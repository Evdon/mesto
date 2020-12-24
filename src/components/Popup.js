import {popupList} from '../scripts/script.js';

export default class Popup{
    constructor(selectorPopup){
        this._selectorPopup = selectorPopup;
        this._popupElement = document.querySelector(this._selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    open(){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners(){
        this._popupElement.querySelector('.popup__close-button').addEventListener('click', (event) => this.close(event));
        popupList.forEach((popup) => {
            popup.addEventListener('click',  () => {
                this.close();
            });
        });
    }

}