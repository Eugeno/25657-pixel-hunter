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
  return data.map(({type, question, answers}) => {
    return {
      type: QuestionTypesAdapter[type],
      text: question,
      data: answers.map(({image, type: imageType}) => {
        return {
          src: image.url,
          type: AnswerTypesAdapter[imageType]
        };
      })
    };
  });
};

export default adapt;
