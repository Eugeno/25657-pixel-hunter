import renderBlock from './render-block';
import moduleIntro from './module_intro';
import {initialState, currentState} from './data/game-data';

const startNewGame = () => {
  currentState.lives = initialState.lives;
  currentState.time = initialState.time;
  currentState.answers = [];
  currentState.level = initialState.level;
  renderBlock(moduleIntro);
};

export default startNewGame;
