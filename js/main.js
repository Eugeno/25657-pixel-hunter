import renderBlock from './render-block';
import moduleIntro from './module_intro';
import moduleGreeting from './module_greeting';
import moduleRules from './module_rules';
import moduleGame1 from './module_game-1';
import moduleGame2 from './module_game-2';
import moduleGame3 from './module_game-3';
import moduleStats from './module_stats';

const ready = () => {
  renderBlock(moduleIntro);
  document.querySelector(`.intro__asterisk`).addEventListener(`click`, function () {
    renderBlock(moduleGreeting);
    document.querySelector(`.greeting__continue`).addEventListener(`click`, function () {
      renderBlock(moduleRules);
      document.querySelector(`.back`).addEventListener(`click`, function () {
        renderBlock(moduleIntro);
      });
      const rulesBtn = document.querySelector(`.rules__button`);
      document.querySelector(`.rules__input`).addEventListener(`input`, function () {
        this.value.replace(/\s/g, ``) === `` ? rulesBtn.setAttribute(`disabled`, `disabled`) : rulesBtn.removeAttribute(`disabled`);
      });
      rulesBtn.addEventListener(`click`, function () {
        renderBlock(moduleGame1);
        document.querySelector(`.back`).addEventListener(`click`, function () {
          renderBlock(moduleIntro);
        });
        const game1Inputs = document.querySelectorAll(`input[type="radio"]`);
        game1Inputs.forEach(function (t) {
          t.addEventListener(`change`, function () {
            if (document.querySelectorAll(`input[type="radio"]:checked`).length === 2) {
              renderBlock(moduleGame2);
              document.querySelector(`.back`).addEventListener(`click`, function () {
                renderBlock(moduleIntro);
              });
              const game2Inputs = document.querySelectorAll(`.game__answer`);
              game2Inputs.forEach(function (t) {
                t.addEventListener(`click`, function () {
                  renderBlock(moduleGame3);
                  document.querySelector(`.back`).addEventListener(`click`, function () {
                    renderBlock(moduleIntro);
                  });
                  const game3Inputs = document.querySelectorAll(`.game__option`);
                  game3Inputs.forEach(function (t) {
                    t.addEventListener(`click`, function () {
                      renderBlock(moduleStats);
                      document.querySelector(`.back`).addEventListener(`click`, function () {
                        renderBlock(moduleIntro);
                      });
                    });
                  });
                });
              });
            }
          });
        });
      });
    });
  });
};

document.addEventListener(`DOMContentLoaded`, ready);

