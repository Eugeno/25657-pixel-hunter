import getGameDouble from './get-game-double';
import getGameSingle from './get-game-single';
import getGameTripple from './get-game-tripple';

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const renderRandomGame = () => {
  const gameModule = getRandomNumber(1, 3);
  switch (gameModule) {
    case 1:
      getGameSingle();
      break;
    case 2:
      getGameDouble();
      break;
    case 3:
      getGameTripple();
      break;
  }
};

export default renderRandomGame;
