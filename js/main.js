import getIntroBlock from './get-intro-block';
import {generateQuestions} from './data/game-data';

const questions = generateQuestions();

const ready = () => {
  getIntroBlock();
};

document.addEventListener(`DOMContentLoaded`, ready);

export default questions;
