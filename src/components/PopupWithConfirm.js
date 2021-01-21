import Popup from "./Popup.js";

export default class PopupWithconfirm extends Popup {
    constructor(selectorPopup, { submit }) {
        super(selectorPopup);
        this._form = this._popupElement.querySelector(".popup__form");
        this._submit = submit;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(this._data);
          });
        super.setEventListeners();
      }

    open(data) {
        this._data = data;
        super.open();
    }

}