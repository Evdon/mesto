export default class Card {
  constructor(cardSelector, data, userId, { handleCardClick, handleDeleteClick, setLike, deleteLike}) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
  }

  _removeElement(elem) {
    elem.remove();
  }

  deleteCard() {
    this._removeElement(this._element);
  }

  _checkBelongCard() {
    if(this._data.owner._id !== this._userId){
      this._removeElement(this._deleteButton);
    } 
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  setLikeCount(data) {
    this._photoLikesCount.textContent = data.likes.length
  }

  _dislike(data) {
    this._removeLikedClass();
    this._deleteLike(data);
  }

  _like(data) {
    this._addLikedClass();
    this._setLike(data);
  }

  _removeLikedClass() {
    this._likeButton.classList.remove("element__like-button_active");
  }

  _addLikedClass() {
    this._likeButton.classList.add("element__like-button_active");
  }

  _checkLike() {
    this._data.likes.forEach((element) => {
      if(this._userId == element._id){
        this._addLikedClass();
      }
    });
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });

    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._data);
      });

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like-button_active")) {
        this._dislike(this._data);
      } else {
        this._like(this._data);
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._photoLikesCount = this._element.querySelector(".element__likes-count");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._cardImg = this._element.querySelector(".element__img");
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._element.querySelector(".element__description").textContent = this._name;
    this._setEventListeners();
    this._checkBelongCard();
    this._checkLike();

    return this._element;
  }
  
}