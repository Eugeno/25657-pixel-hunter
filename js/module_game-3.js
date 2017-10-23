import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import getRandomGameModule from './get-random-game-module';
import getStats from './module_stats';
import moduleIntro from './module_intro';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import getRandomImage from './get-random-image';
import {initialState, currentState} from './data';

const moduleGame3 = () => getElementFromTemplate(`${headerTemplate(currentState)}
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
    </form>
    <div class="stats">
      ${statsTemplate(currentState)}
    </div>
  </div>
${footerTemplate}`);

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getGame3 = () => {
  renderBlock(moduleGame3());

  const options = [...document.querySelectorAll(`.game__option`)];
  options.forEach((option) => {
    option.addEventListener(`click`, () => {
      let answer = `correct`;
      if (option.querySelector(`img`).dataset.type !== `paint`) {
        answer = `wrong`;
        currentState.lives--;
      }
      currentState.answers[currentState.level - 1] = answer;
      if (currentState.level < 10 && currentState.lives > 0) {
        currentState.level++;
        getRandomGameModule();
      } else {
        getStats();
      }
    });
  });

  const img1 = options[0].querySelector(`img`);
  const img2 = options[1].querySelector(`img`);
  const img3 = options[2].querySelector(`img`);
  const imgData1 = getRandomImage();
  let imgData2 = getRandomImage();
  let imgData3 = getRandomImage();
  img1.src = imgData1.imageUrl;
  img1.dataset.type = imgData1.type;
  while (imgData1.imageUrl === imgData2.imageUrl) {
    imgData2 = getRandomImage();
  }
  img2.src = imgData2.imageUrl;
  img2.dataset.type = imgData2.type;
  while (imgData1.imageUrl === imgData3.imageUrl || imgData2.imageUrl === imgData3.imageUrl) {
    imgData3 = getRandomImage();
  }
  img3.src = imgData3.imageUrl;
  img3.dataset.type = imgData3.type;
  while (imgData1.type === `photo` && imgData2.imageUrl === `photo` && imgData3.imageUrl === `photo`) {
    const imgDataX = getRandomImage();
    const imgX = options[getRandomNumber(0, 2)].querySelector(`img`);
    imgX.src = imgDataX.imageUrl;
    imgX.dataset.type = imgDataX.type;
  }

  document.querySelector(`.back`).addEventListener(`click`, () => {
    currentState.lives = initialState.lives;
    currentState.time = initialState.time;
    currentState.answers = [];
    currentState.level = initialState.level;
    renderBlock(moduleIntro);
  });
};

export default getGame3;
