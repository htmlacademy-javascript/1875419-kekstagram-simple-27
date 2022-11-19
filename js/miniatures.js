const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();


const renderMiniature = (pictures) => {
  pictures.forEach(({url, comments, likes}) => {
    const picture = pictureTemplate.cloneNode(true);
    const pictureAddress = picture.querySelector('.picture__img');
    const pictureComments = picture.querySelector('.picture__comments');
    const pictureLikes = picture.querySelector('.picture__likes');

    pictureAddress.src = url;
    pictureComments.textContent = comments;
    pictureLikes.textContent = likes;

    pictureListFragment.appendChild(picture);

  });
  pictureListElement.appendChild(pictureListFragment);
};


export {renderMiniature};
