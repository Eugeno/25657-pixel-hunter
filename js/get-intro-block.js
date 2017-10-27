import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import getGreetingBlock from './get-greeting-block';
import footerTemplate from './footer-template';

const moduleIntro = getElementFromTemplate(`<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
${footerTemplate}`);

moduleIntro.querySelector(`.intro__asterisk`).addEventListener(`click`, () => getGreetingBlock());

const getIntroBlock = () => renderBlock(moduleIntro);

export default getIntroBlock;
