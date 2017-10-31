import Application from './application';
import {generateQuestions, preloadImages, loadableImages} from './data/game-data';

generateQuestions();
const imagesLoaded = () => {};
preloadImages(loadableImages, imagesLoaded);
// getIntro();

Application.showIntro();
