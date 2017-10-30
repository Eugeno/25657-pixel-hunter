import GameDoubleView from './game-double-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameDouble = (state, question) => {
  const GameDoubleBlock = new GameDoubleView(state, question);
  GameDoubleBlock.onChangeAnswerInput = () => {
    const form = GameDoubleBlock.element.querySelector(`.game__content`);
    const countChecked = () => form.querySelectorAll(`input[type="radio"]:checked`).length;
    const gameOptions = [...form.querySelectorAll(`.game__option`)];
    const tasks = gameOptions.length;
    if (countChecked() === tasks) {
      const answer = gameOptions.some((el, i) => question.data[i].type !== el.querySelector(`input[type="radio"]:checked`).value) ? Answer.WRONG : Answer.CORRECT;
      const nextState = getNextState(state, answer);
      getNextScreen(nextState);
    }
  };
  GameDoubleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(GameDoubleBlock);
};

export default getGameDouble;
