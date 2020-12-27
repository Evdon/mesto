export default class Card {
  constructor({ handleCardClick }, cardSelector, data) {
    this._place = data.place;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__img").src = this._link;
    this._element.querySelector(".element__img").alt = this._place;
    this._element.querySelector(
      ".element__description"
    ).textContent = this._place;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._handleCardClick(this._place, this._link);
      });

    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", (evt) => {
        evt.target.closest(".element").remove();
      });

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like-button_active");
      });
  }
}