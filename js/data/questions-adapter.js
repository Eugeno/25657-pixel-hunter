const QuestionTypesAdapter = {
  "tinder-like": `single`,
  "two-of-two": `double`,
  "one-of-three": `triple`
};

const AnswerTypesAdapter = {
  "photo": `photo`,
  "painting": `paint`
};

const adapt = (data) => {
  const adapted = [];
  data.forEach((q, i) => {
    adapted[i] = {};
    adapted[i].type = QuestionTypesAdapter[q.type];
    adapted[i].data = [];
    q.answers.forEach((p, j) => {
      adapted[i].data[j] = {};
      adapted[i].data[j].src = p.image.url;
      adapted[i].data[j].type = AnswerTypesAdapter[p.type];
    });
    adapted[i].text = q.question;
  });
  return adapted;
};

export default adapt;
