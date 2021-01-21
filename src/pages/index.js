import "./index.css";
//console.log(data);
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithconfirm from "../components/PopupWithConfirm";
import {editBtn, addBtn, avatarBtn, popupContent, userNameElement, userInfoElement, nameInput, aboutInput, cardSelector, photoListSelector, popupSubmitBtnAdd, validSettings, formsList, avatarSelector, addForm, editForm, avatarForm} from "../utils/constants.js";



let thisCard = null;
let userId = null;

const popupTypeImg = new PopupWithImage(".popup-img");
popupTypeImg.setEventListeners();

const popupTypeConfirm = new PopupWithconfirm(".popup-delete", {
  submit: (data) => {
    api.deleteCard(data)
      .then(() => {
        thisCard.deleteCard();
      })
      .then(() => {
        popupTypeConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
popupTypeConfirm.setEventListeners();

const userInfo = new UserInfo({ userNameElement, userInfoElement, avatarSelector });

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '9730b618-634d-4a3b-845c-24dfe20e1b88',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((data) => {
    console.log(data);
    userInfo.setUserInfo(data);
    userId = data._id;
  })
  .catch((err) => {
    console.log(err);
  });

api.getCards()
  .then((data) => {
    const cardSet = data;
    cardList.renderItems(cardSet.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

function callback(evt) {
  evt.stopPropagation();
}

function stopProp() {
  formsList[formsList.length + 1] = popupContent;

  formsList.forEach((form) => {
    form.addEventListener("click", callback);
  });
}

stopProp();

function handleCardClick(place, link) {
  popupTypeImg.open(place, link);
}

function createCard(data){
  const card = new Card( 
    cardSelector, data, userId, {
      handleCardClick,
      handleDeleteClick: (data) => {
        thisCard = card;
        popupTypeConfirm.open(data);
      },
      setLike: (data) => {
        api.setLike(data)
          .then((data) => {
            card.setLikeCount(data);
          })
          .catch((err) => {
            console.log(err);
          })
      },
      deleteLike: (data) => {
        api.deleteLike(data)
          .then((data) => {
            card.setLikeCount(data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  );
  const cardElement = card.generateCard();
  card.setLikeCount(data);
  return cardElement;
}

function newCard(data){
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    renderer: (data) => {
        newCard(data);
    },
  },
  photoListSelector
);

const addValidator = new FormValidator(validSettings, addForm);
addValidator.enableValidation();

const editValidator = new FormValidator(validSettings, editForm);
editValidator.enableValidation();

const avatarValidator = new FormValidator(validSettings, avatarForm);
avatarValidator.enableValidation();


const popupTypeAdd = new PopupWithForm({
  selectorPopup: ".popup-add",
  handleFormSubmit: (data) => {
    popupTypeAdd.renderLoading(true, 'Загрузка...');
    api.postCard(data)
      .then((res) => {
        newCard(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        popupTypeAdd.renderLoading(false);
        popupTypeAdd.close();
      })
  },
});

popupTypeAdd.setEventListeners();

addBtn.addEventListener("click", () => {
  addForm.reset();
  addValidator.resetValidation();
  popupTypeAdd.open();
});

const popupTypeEdit = new PopupWithForm({
  selectorPopup: ".popup-edit",
  handleFormSubmit: (data) => {
    popupTypeEdit.renderLoading(true, 'Сохранение...');
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupTypeEdit.renderLoading(false);
        popupTypeEdit.close();
      })
  },
});

popupTypeEdit.setEventListeners();

editBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  editValidator.resetValidation();
  popupTypeEdit.open();
});

const popupTypeAvatar = new PopupWithForm({
  selectorPopup: ".popup-avatar",
  handleFormSubmit: (data) => {
    popupTypeAvatar.renderLoading(true, 'Сохранение...');
    api.setUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupTypeAvatar.renderLoading(false);
        popupTypeAvatar.close();
      })
  },
});

popupTypeAvatar.setEventListeners();

avatarBtn.addEventListener("click", () => {
  avatarForm.reset();
  avatarValidator.resetValidation();
  popupTypeAvatar.open();
});