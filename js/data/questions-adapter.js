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
  return data.map((question) => {
    return {
      type: QuestionTypesAdapter[question.type],
      text: question.question,
      data: question.answers.map((item) => {
        return {
          src: item.image.url,
          type: AnswerTypesAdapter[item.type]
        };
      })
    };
  });
};

export default adapt;
