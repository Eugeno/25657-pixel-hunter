import {GameType, AnswerType} from './game-data';

const QuestionTypesAdapter = {
  "tinder-like": GameType.SINGLE,
  "two-of-two": GameType.DOUBLE,
  "one-of-three": GameType.TRIPLE
};

const AnswerTypesAdapter = {
  "photo": AnswerType.PHOTO,
  "painting": AnswerType.PAINT
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
