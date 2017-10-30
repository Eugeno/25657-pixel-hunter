import GameSingleView from './game-single-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameSingle = (state, question) => {
  const gameSingleBlock = new GameSingleView(state, question);
  setTimeout(() => {
    gameSingleBlock.tick();
  }, 1000);
  gameSingleBlock.onAnswer = () => {
    gameSingleBlock.stopTimer();
    const gameOptions = [...gameSingleBlock.element.querySelectorAll(`.game__option`)];
    let answer = Answer.CORRECT;
    const hasAnswer = gameOptions[0].querySelector(`input[type="radio"]:checked`);
    if (!hasAnswer || question.data[0].type !== gameOptions[0].querySelector(`input[type="radio"]:checked`).value) {
      answer = Answer.WRONG;
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  };
  gameSingleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(gameSingleBlock);
};

export default getGameSingle;
