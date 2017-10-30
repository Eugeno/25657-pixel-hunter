import GreetingsView from './greeting-view';
import renderBlock from '../render-block';
import getRules from '../rules/rules';

const getGreeting = () => {
  const greetingsBlock = new GreetingsView();
  greetingsBlock.onNextBtnClick = () => {
    getRules();
  };
  renderBlock(greetingsBlock);
};

export default getGreeting;
