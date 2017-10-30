import getIntro from './intro/intro';
import {generateQuestions, preloadImages, loadableImages} from './data/game-data';

generateQuestions();
const imagesLoaded = () => {};
preloadImages(loadableImages, imagesLoaded);
getIntro();
