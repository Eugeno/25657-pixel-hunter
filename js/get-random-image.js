import {images} from './data/game-data';

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const types = Object.keys(images);
const getRandomImage = () => {
  const type = types[getRandomNumber(0, types.length - 1)];
  const imageUrl = images[type][getRandomNumber(0, images[type].length - 1)];
  return {
    type,
    imageUrl
  };
};

export default getRandomImage;
