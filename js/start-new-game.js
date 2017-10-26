import getIntroBlock from './get-intro-block';
import {initialState, currentState} from './data/game-data';

const startNewGame = () => {
  currentState.lives = initialState.lives;
  currentState.time = initialState.time;
  currentState.answers = [];
  currentState.level = initialState.level;
  getIntroBlock();
};

export default startNewGame;
