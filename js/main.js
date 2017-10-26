import getIntroBlock from './get-intro-block';
import {generateQuestions} from './data/game-data';

const ready = () => {
  generateQuestions();
  getIntroBlock();
};

document.addEventListener(`DOMContentLoaded`, ready);
