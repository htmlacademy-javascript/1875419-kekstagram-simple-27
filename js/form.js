import { isEscKey } from './util.js';

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


const onKeyClosePhotoEditor = (evt) => {
  if (isEscKey(evt)) {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    form.reset();
  }
};
const closePhotoEditor = () => {
  imgUploadOverlay.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
  form.reset();

};

const onSubmitButton = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

const showPhotoEditor = () => {
  imgUploadOverlay.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
  document.body.addEventListener('keydown', onKeyClosePhotoEditor);
  closeButton.addEventListener('click', ()=>{
    closePhotoEditor();
    document.removeEventListener(onKeyClosePhotoEditor);
  });
  submitButton.addEventListener('click', onSubmitButton);
};


uploadElement.addEventListener('click', showPhotoEditor);

