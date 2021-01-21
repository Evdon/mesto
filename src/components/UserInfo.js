export default class UserInfo {
    constructor({ userNameElement, userInfoElement, avatarSelector }) {
      this._userNameElement = userNameElement;
      this._userInfoElement = userInfoElement;
      this._avatarSelector = avatarSelector;
      this._name = document.querySelector(this._userNameElement);
      this._about = document.querySelector(this._userInfoElement);
      this._avatar = document.querySelector(this._avatarSelector);
    }
  
    getUserInfo() {
      const data = {
        name: this._name.textContent,
        about: this._about.textContent,
      };
      return data;
    }
    
    setUserAvatar(data) {
      this._avatar.src = data.avatar;
    }

    setUserInfo(data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this.setUserAvatar(data);
      this._avatar.alt = `${data.name}`;
    }
  }
  