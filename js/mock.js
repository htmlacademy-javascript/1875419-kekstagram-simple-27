import { getRandomPositiveInteger} from './util.js';

const OBJECTS_TO_GENERATE = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 200;


const createObject = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: 'описание фото',
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS)
});

const generateObjects = (number) => {
  const objects = [];
  for (let i = 1; i <= number; i++) {
    objects.push(createObject(i));
  }
  return objects;
};

export {generateObjects, OBJECTS_TO_GENERATE};
