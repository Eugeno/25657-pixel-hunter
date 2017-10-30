import IntroView from './intro-view';
import renderBlock from '../render-block';
import getGreeting from '../greeting/greeting';

const getIntro = () => {
  const introBlock = new IntroView();
  introBlock.onNextBtnClick = () => {
    getGreeting();
  };
  renderBlock(introBlock);
};

export default getIntro;
