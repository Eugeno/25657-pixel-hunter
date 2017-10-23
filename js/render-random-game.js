import getGame1 from './module_game-1';
import getGame2 from './module_game-2';
import getGame3 from './module_game-3';

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const renderRandomGame = () => {
  const gameModule = getRandomNumber(1, 3);
  switch (gameModule) {
    case 1:
      getGame1();
      break;
    case 2:
      getGame2();
      break;
    case 3:
      getGame3();
      break;
  }
};

export default renderRandomGame;
