import {QUESTIONS_LENGTH} from '../data/game-data';

const statsTemplate = (answers) => `<ul class="stats">
${answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
${new Array(QUESTIONS_LENGTH - answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
</ul>`;

export default statsTemplate;
