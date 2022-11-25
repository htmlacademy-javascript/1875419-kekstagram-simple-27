const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();


const renderMiniature = (pictures) => {
  pictures.forEach(({url, comments, likes}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const pictureAddress = pictureElement.querySelector('.picture__img');
    const pictureComments = pictureElement.querySelector('.picture__comments');
    const pictureLikes = pictureElement.querySelector('.picture__likes');

    pictureAddress.src = url;
    pictureComments.textContent = comments;
    pictureLikes.textContent = likes;

    pictureListFragment.appendChild(pictureElement);

  });
  pictureListElement.appendChild(pictureListFragment);
};


export {renderMiniature};
