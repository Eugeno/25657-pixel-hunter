import AbstractView from '../abstract-view';
import headerTemplate from '../components/header';
import footerTemplate from '../components/footer';
import {initialState} from '../data/game-data';

class RulesView extends AbstractView {
  get template() {
    return `${headerTemplate(initialState)}
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button continue" type="submit" disabled>Go!</button>
    </form>
  </div>
${footerTemplate}`;
  }

  bind() {
    const el = this.element;
    const input = el.querySelector(`.rules__input`);
    const nextBtn = el.querySelector(`.rules__button`);
    const backBtn = el.querySelector(`.back`);
    input.addEventListener(`input`, this.onInputNameField);
    nextBtn.addEventListener(`click`, this.onNextBtnClick);
    backBtn.addEventListener(`click`, this.onBackBtnClick);
  }

  onNextBtnClick() {

  }

  onInputNameField() {

  }

  onBackBtnClick() {

  }
}

export default RulesView;