export default class Api{
    constructor(options){
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res){
        if(res.ok){
            return res.json();
        } else {
            console.log(`${res.status}`);
        }
    }

    deleteCard(data){
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    getCards(){
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    postCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkResponse);
    }

    deleteLike(data) {
        return fetch(`${this._url}/cards/likes/${data._id}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(this._checkResponse);
    }
    
    setLike(data) {
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse);
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse);
    }
    
}