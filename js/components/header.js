import {LIVES_LENGTH} from '../data/game-data';

const getHearts = (lives) => {
  if (lives > 0) {
    return new Array(LIVES_LENGTH - lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
        .join(``)
        .concat(new Array(lives)
            .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
            .join(``));
  }
  return new Array(LIVES_LENGTH)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``);
};

const headerTemplate = (state) => `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">${state.time}</h1>
    <div class="game__lives">
      ${getHearts(state.lives)}
    </div>
  </header>`;

export default headerTemplate;
