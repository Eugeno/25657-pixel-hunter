import GameTripleView from './game-triple-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {MAX_ANSWER_TIME, FAST_ANSWER_TIME, SLOW_ANSWER_TIME, Answer, getNextState, createTimer} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameTriple = (state, question) => {
  const gameTripleBlock = new GameTripleView(state, question);
  let timer = createTimer(MAX_ANSWER_TIME);
  let timeouter;
  gameTripleBlock.tick = () => {
    timer = timer.tick();
    if (typeof timer === `object`) {
      gameTripleBlock.state.time = timer.value;
      gameTripleBlock.onTick();
      timeouter = setTimeout(() => {
        gameTripleBlock.tick();
      }, 1000);
    } else {
      gameTripleBlock.timeExceed();
    }
  };
  setTimeout(() => {
    gameTripleBlock.tick();
  }, 1000);

  gameTripleBlock.onAnswer = (answers) => {
    clearTimeout(timeouter);
    let answer = Answer.CORRECT;
    const isWrongAnswer = () => {
      return question.data.some((t, i) => {
        return t.type !== answers[i];
      });
    };
    if (answers.length !== question.data.length || isWrongAnswer()) {
      answer = Answer.WRONG;
    } else {
      if (MAX_ANSWER_TIME - gameTripleBlock.state.time < FAST_ANSWER_TIME) {
        answer = Answer.FAST;
      } else if (MAX_ANSWER_TIME - gameTripleBlock.state.time > SLOW_ANSWER_TIME) {
        answer = Answer.SLOW;
      }
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  };
  gameTripleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(gameTripleBlock);
};

export default getGameTriple;
