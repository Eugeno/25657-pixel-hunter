import GameTripleView from './game-triple-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameTriple = (state, question) => {
  const gameTripleBlock = new GameTripleView(state, question);
  setTimeout(() => {
    gameTripleBlock.tick();
  }, 1000);
  gameTripleBlock.onAnswer = (option, i) => {
    gameTripleBlock.stopTimer();
    let answer = Answer.CORRECT;
    if (!option || question.data[i].type !== question.task.type) {
      answer = Answer.WRONG;
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  };
  gameTripleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(gameTripleBlock);
};

export default getGameTriple;
