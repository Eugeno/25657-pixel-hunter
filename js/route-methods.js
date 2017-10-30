import {QUESTIONS_LENGTH, AnswerTime, GameType, questions} from './data/game-data';
import GameSingleView from './games/game-single-view';
import GameDoubleView from './games/game-double-view';
import GameTripleView from './games/game-triple-view';
import getGame from './games/game';
import getStats from './stats/stats';

const getGameModule = (state) => {
  const GameModules = {
    [GameType.SINGLE]: GameSingleView,
    [GameType.DOUBLE]: GameDoubleView,
    [GameType.TRIPLE]: GameTripleView,
  };
  const gameModule = new GameModules[questions[state.level].type](state, questions[state.level]);
  getGame(state, questions[state.level], gameModule);
};

const getNextScreen = (state) => {
  const nextState = Object.assign({}, state);
  nextState.time = AnswerTime.MAX;
  if (state.level < QUESTIONS_LENGTH && state.lives >= 0) {
    getGameModule(state);
  } else {
    if (nextState.lives < 0) {
      nextState.lives = 0;
    }
    getStats(nextState);
  }
};

export {getGameModule, getNextScreen};
