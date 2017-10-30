import GameSingleView from './game-single-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameSingle = (state, question) => {
  const GameSingleBlock = new GameSingleView(state, question);
  GameSingleBlock.onChangeAnswerInput = () => {
    const gameOptions = [...GameSingleBlock.element.querySelectorAll(`.game__option`)];
    let answer = Answer.CORRECT;
    if (question.data[0].type !== gameOptions[0].querySelector(`input[type="radio"]:checked`).value) {
      answer = Answer.WRONG;
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  };
  GameSingleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(GameSingleBlock);
};

export default getGameSingle;
