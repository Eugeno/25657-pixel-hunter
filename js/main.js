import getIntroBlock from './get-intro-block';
import {generateQuestions, preloadImages, photos, paints} from './data/game-data';

const questions = generateQuestions();

const ready = () => {
  getIntroBlock();
  const imagesLoaded = () => console.log(`images loaded`);
  console.log(photos);
  console.log(paints);
  preloadImages(photos.concat(paints), imagesLoaded);
};

document.addEventListener(`DOMContentLoaded`, ready);

export default questions;
