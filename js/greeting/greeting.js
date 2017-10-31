import GreetingsView from './greeting-view';
import {changeView} from '../utilities';
import getRules from '../rules/rules';

const getGreeting = () => {
  const greetingsBlock = new GreetingsView();
  greetingsBlock.onNextBtnClick = () => {
    getRules();
  };
  changeView(greetingsBlock);
};

export default getGreeting;
