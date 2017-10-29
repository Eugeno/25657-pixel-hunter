import IntroView from './intro-view';
import renderBlock from '../render-block';
import getGreetingBlock from '../get-greeting-block';

const getIntro = () => {
  const introBlock = new IntroView();
  introBlock.onAsteriskClick = () => {
    getGreetingBlock();
  };
  renderBlock(introBlock.element);
};

export default getIntro;
