import GameTripleView from './game-triple-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameTriple = (state, question) => {
  const GameTripleBlock = new GameTripleView(state, question);
  GameTripleBlock.onClickAnswer = (option, i) => {
    let answer = Answer.CORRECT;
    if (question.data[i].type !== question.task.type) {
      answer = Answer.WRONG;
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  };
  GameTripleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(GameTripleBlock);
};

export default getGameTriple;
