import {images} from './data';

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomImage = () => {
  const types = Object.keys(images);
  const type = types[getRandomNumber(0, types.length - 1)];
  const imageUrl = images[type][getRandomNumber(0, images[type].length - 1)];
  return {
    type,
    imageUrl
  };
};

export default getRandomImage;
