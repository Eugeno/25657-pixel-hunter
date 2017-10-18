const statsTemplate = (state) => `<ul class="stats">
${state.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
</ul>`;

export default statsTemplate;
