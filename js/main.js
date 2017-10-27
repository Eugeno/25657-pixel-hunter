import getIntroBlock from './get-intro-block';
import {generateQuestions, preloadImages, loadableImages} from './data/game-data';

generateQuestions();
const imagesLoaded = () => {};
preloadImages(loadableImages, imagesLoaded);

const ready = () => {
  getIntroBlock();
};

document.addEventListener(`DOMContentLoaded`, ready);
