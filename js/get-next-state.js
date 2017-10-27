import {Answer} from './data/game-data';

const getNextState = (state, answer) => {
  const nextState = Object.assign({}, state);
  nextState.answers.push(answer);
  nextState.level++;
  if (answer === Answer.WRONG) {
    nextState.lives--;
  }
  return nextState;
};

export default getNextState;
