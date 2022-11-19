import { isEscKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { sendData } from './api.js';


const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadElement = form.querySelector('#upload-file');
const closeButton = form.querySelector('#upload-cancel');
const submitButton = form.querySelector('.img-upload__submit');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const successPopup = document.querySelector('#success').content.querySelector('.success');


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

const resetForm = () => {
  form.reset();
  resetScale();
  resetEffect();
};

const showPhotoEditor = () => {
  imgUploadOverlay.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const closePhotoEditor = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
};


const onPhotoEditorKeydown = (evt) => {
  if (isEscKey(evt)) {
    closePhotoEditor();
  }
};
const onPhotoEditorCloseClick = () => {
  closePhotoEditor();
};

const renderMessage = (text) => {
  document.body.append(text);

  const onDocumentKeydown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      closeUserModal();
    }
  };

  const onPopupCloseClick = () => {
    closeUserModal();
  };
  //тут декларативное объявление, так как она нужна выше
  function closeUserModal() {
    text.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
  const onCloseAlertOutside = () => {
    const blockInner = text.querySelector('div');
    document.addEventListener('click', (e) => {
      //метод .composedPath() возвращает путь события, представляющий собой массив объектов, на которых будут вызваны обработчики событий.
      //с помощью метода массивов .includes возвращаем true для определения, что событие произошло на элементе div
      const withinBoundaries = e.composedPath().includes(blockInner);
      if (!withinBoundaries) {
        text.remove();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    }, {once: true});
  };

  document.addEventListener('keydown', onDocumentKeydown);
  text.addEventListener('click', onPopupCloseClick);
  document.addEventListener('click', onCloseAlertOutside);
};

const showErrorMessage = () => {
  const errorMessage = errorPopup.cloneNode(true);
  renderMessage(errorMessage);
};

const showSuccessMessage = () => {
  const successMessage = successPopup.cloneNode(true);
  renderMessage(successMessage);
};

const onSendSuccess = () => {
  showSuccessMessage();
  closePhotoEditor();
  unblockSubmitButton();
};

const onSendError = () => {
  showErrorMessage();
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
