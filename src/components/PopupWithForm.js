import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selectorPopup, handleFormSubmit }) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__submit-button");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, massage) {
    if(isLoading) {
      this._submitButton.textContent = massage;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
