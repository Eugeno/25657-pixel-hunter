import RulesView from './rules-view';
import renderBlock from '../render-block';
import {initialState} from '../data/game-data';
import {getGameModule} from '../route-methods';
import repeatGame from '../repeat-game';

const getRules = () => {
  const rulesBlock = new RulesView();
  rulesBlock.onNextBtnClick = () => {
    const nextState = Object.assign({}, initialState);
    nextState.answers = initialState.answers.slice(0);
    getGameModule(nextState);
  };
  rulesBlock.onInputNameField = ({target}) => {
    rulesBlock.element.querySelector(`.rules__button`).disabled = !target.value.trim();
  };
  rulesBlock.onBackBtnClick = () => {
    repeatGame();
  };
  renderBlock(rulesBlock);
};

export default getRules;