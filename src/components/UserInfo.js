export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector, avatarSelector }) {
      this._name = document.querySelector(userNameSelector);
      this._about = document.querySelector(userInfoSelector);
      this._avatar = document.querySelector(avatarSelector);
    }  getUserInfo() {
      const data = {
        name: this._name.textContent,
        about: this._about.textContent,
      };
      return data;
    }
    
    setUserAvatar(data) {
      this._avatar.src = data.avatar;
      this._avatar.alt = `${data.name}`;
    }

    setUserInfo(data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this.setUserAvatar(data);
    }
  }
  