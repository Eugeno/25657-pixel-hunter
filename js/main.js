import getIntroBlock from './get-intro-block';
import {generateQuestions, preloadImages, loadableImages} from './data/game-data';

const questions = generateQuestions();
const imagesLoaded = () => {};
preloadImages(loadableImages, imagesLoaded);

const ready = () => {
  getIntroBlock();
};

document.addEventListener(`DOMContentLoaded`, ready);

export default questions;
