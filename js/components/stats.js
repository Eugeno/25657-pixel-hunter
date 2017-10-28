const statsTemplate = (state) => `<ul class="stats">
${state.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
${new Array(10 - state.answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
</ul>`;

export default statsTemplate;
