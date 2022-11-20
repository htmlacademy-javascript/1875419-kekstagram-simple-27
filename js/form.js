import { isEscKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect, onFormChange } from './effects.js';
import { sendData } from './api.js';


const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadElement = form.querySelector('#upload-file');
const closeButton = form.querySelector('#upload-cancel');
const submitButton = form.querySelector('.img-upload__submit');


const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  errorTextParent: 'img-upload__text',
}, true);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};
//сброс формы
const resetForm = () => {
  form.reset();
  resetScale();
  resetEffect();
};

// Удаление обработчиков событий
const removeEventListener = () => {
  form.removeEventListener('change', onFormChange);
};

const showPhotoEditor = () => {
  imgUploadOverlay.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const closePhotoEditor = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
  removeEventListener();
};


function onPhotoEditorKeydown (evt) {
  const errorPopup = document.querySelector('.error');
  if(errorPopup){
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
  const popup = document.querySelector('.popup');
  if (popup && (!target.closest('.error__inner') && !target.closest('.success__inner')
  || isBtnClick)) {

    popup.remove();
  }
};


const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const errorContainer = document.createElement('div');
errorContainer.classList.add('popup');

const errorAlert = () => {
  const error = errorTemplate.cloneNode(true);

  errorContainer.append(error);
  document.body.append(errorContainer);


  const hideError = () => {
    errorContainer.remove();
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
const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const successContainer = document.createElement('div');
successContainer.classList.add('popup');

const successAlert = () => {
  const success = successTemplate.cloneNode(true);

  successContainer.append(success);
  document.body.append(successContainer);


  const hideSuccess = () => {
    successContainer.remove();
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
  form.addEventListener('submit', (evt) => {
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
closeButton.addEventListener('click', ()=>{
  onPhotoEditorCloseClick();
  document.removeEventListener('keydown', onPhotoEditorKeydown);
});

export {setUserFormSubmit};
