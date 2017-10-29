import getIntro from './intro';
import {generateQuestions, preloadImages, loadableImages} from './data/game-data';

generateQuestions();
const imagesLoaded = () => {};
preloadImages(loadableImages, imagesLoaded);

const ready = () => {
  getIntro();
};

document.addEventListener(`DOMContentLoaded`, ready);
