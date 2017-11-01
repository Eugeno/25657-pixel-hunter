import Application from './application';
import {generateQuestions, loadableImages} from './data/game-data';
import {preloadImages} from './loader';

generateQuestions();
const imagesLoaded = () => {};
preloadImages(loadableImages, imagesLoaded);

Application.prepareData();
