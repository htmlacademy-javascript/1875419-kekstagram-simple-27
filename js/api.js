import { renderMiniature } from './miniatures.js';
import { showAlertMessage } from './util.js';


const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/kekstagram-simple',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Невозможно отправить форму! Попробуйте ещё раз.');
      }
    })
    .catch((error) => {
      onFail(error.message);
    });
};

const onDataLoad = (pictures) => {
  renderMiniature(pictures);
};

const onDataFailed = () => {
  showAlertMessage('Ошибка:( Не удалось загрузить фотографии с сервера');
};

getData(onDataLoad, onDataFailed);


export {sendData};
