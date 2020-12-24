import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(selectorPopup){
        super(selectorPopup);
        this._popupImage = this._popupElement.querySelector('.popup__img');
        this._popupDescription = this._popupElement.querySelector('.popup__place');
    }

    open(data){
        this._popupDescription.textContent = data.place;
        this._popupImage.src = data.link;
        this._popupImage.alt = data.place;
        super.open();
    }
}