import { getRandomPositiveInteger} from './util.js';

const OBJECTS_TO_GENERATE = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 200;


const createObject = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: 'описание фото',
  likes: getRandomPositiveInteger(LIKES_MIN, LIKES_MAX),
  comments: getRandomPositiveInteger(COMMENTS_MIN, COMMENTS_MAX)
});

const generateObjects = (number) => {
  const objects = [];
  for (let i = 0; i < number; i++) {
    objects.push(createObject(i));
  }
  return objects;
};

export {generateObjects, OBJECTS_TO_GENERATE};
