export default class FormValidator  {
    constructor(settings, formElement) {
        this._formElement = formElement;
        this._settings = settings;
      }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    }

    _showError(inputElement, errorMessage) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add('popup__input_type_error');
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add('popup__input-error_active');
    }
    
    _hideError(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove('popup__input_type_error');
        this._errorElement.classList.remove('popup__input-error_active');
        this._errorElement.textContent = '';
    }
    
    enableValidation() {
        this._setEventListeners();
        }
    
    
    _toggleButtonState(inputList, buttonElement)  {
        if(this._hasInvalidInput(inputList)){
            buttonElement.classList.add('popup__submit-button_inactive');
            buttonElement.setAttribute('disabled', 'disabled');
        } else {
            buttonElement.classList.remove('popup__submit-button_inactive');
            buttonElement.removeAttribute('disabled', 'disabled');
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector('.popup__submit-button');
      
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input',  () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement);
            });
        });
    }
    
}