import { isEscKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect, onFormChange } from './effects.js';
import { sendData } from './api.js';


const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const formElement = document.querySelector('.img-upload__form');
const uploadElement = formElement.querySelector('#upload-file');
const closeButtonElement = formElement.querySelector('#upload-cancel');
const submitButtonElement = formElement.querySelector('.img-upload__submit');


const pristine = new Pristine(formElement, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  errorTextParent: 'img-upload__text',
}, true);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};
//сброс формы
const resetForm = () => {
  formElement.reset();
  resetScale();
  resetEffect();
};

// Удаление обработчиков событий
const removeEventListener = () => {
  formElement.removeEventListener('change', onFormChange);
};

const showPhotoEditor = () => {
  imgUploadOverlayElement.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const closePhotoEditor = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
  removeEventListener();
};


function onPhotoEditorKeydown (evt) {
  const errorPopupElement = document.querySelector('.error');
  if(errorPopupElement){
    return;
  }
  if (isEscKey(evt)) {
    closePhotoEditor();
  }
}

const onPhotoEditorCloseClick = () => {
  closePhotoEditor();
};

// Закрытие по клику на область вне модального окна

const onBackdropClick = ({target})=> {
  const isBtnClick = target.closest('.error__button') || target.closest('.success__button');
  const popupElement = document.querySelector('.popup');
  if (popupElement && (!target.closest('.error__inner') && !target.closest('.success__inner')
  || isBtnClick)) {

    popupElement.remove();
  }
};


const errorTemplateElement = document
  .querySelector('#error')
  .content.querySelector('.error');

const errorContainerElement = document.createElement('div');
errorContainerElement.classList.add('popup');

const errorAlert = () => {
  const errorElement = errorTemplateElement.cloneNode(true);

  errorContainerElement.append(errorElement);
  document.body.append(errorContainerElement);


  const hideError = () => {
    errorContainerElement.remove();
  };

  function onEscHideError(evt) {
    if (isEscKey) {
      evt.preventDefault();
      hideError ();
    }
  }

  document.addEventListener('keydown', onEscHideError, { once: true });
  document.body.addEventListener('click', onBackdropClick, { once: true });
};


//Соощение о успешной отправке фото
const successTemplateElement = document
  .querySelector('#success')
  .content.querySelector('.success');

const successContainerElement = document.createElement('div');
successContainerElement.classList.add('popup');

const successAlert = () => {
  const successElement = successTemplateElement.cloneNode(true);

  successContainerElement.append(successElement);
  document.body.append(successContainerElement);


  const hideSuccess = () => {
    successContainerElement.remove();
    closePhotoEditor();
  };

  function onEscHideSuccess(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      hideSuccess ();
    }
  }

  document.addEventListener('keydown', onEscHideSuccess, { once: true });
  document.body.addEventListener('click', onBackdropClick, { once: true });
};


const onSendSuccess = () => {
  successAlert();
  closePhotoEditor();
  unblockSubmitButton();
};

const onSendError = () => {
  errorAlert();
  unblockSubmitButton();
};


const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData (
        onSendSuccess,
        onSendError,
        new FormData(evt.target));
    }
  });
};


const onUploadButton = () => {
  showPhotoEditor();
  document.body.addEventListener('keydown', onPhotoEditorKeydown);
};

uploadElement.addEventListener('input', onUploadButton);
closeButtonElement.addEventListener('click', ()=>{
  onPhotoEditorCloseClick();
  document.removeEventListener('keydown', onPhotoEditorKeydown);
});

export {setUserFormSubmit};
