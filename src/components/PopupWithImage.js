import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._popupElement.querySelector(".popup__img");
    this._popupDescription = this._popupElement.querySelector(".popup__place");
  }

  open(place, link) {
    this._popupDescription.textContent = place;
    this._popupImage.src = link;
    this._popupImage.alt = place;
    super.open();
  }
}