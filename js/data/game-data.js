const QUESTIONS_LENGTH = 10;
const LIVES_LENGTH = 3;

const AnswerTime = {
  MAX: 30,
  FAST: 10,
  SLOW: 20
};

const AnswerType = {
  PHOTO: `photo`,
  PAINT: `paint`
};

const Answer = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};

const GameType = {
  SINGLE: `single`,
  DOUBLE: `double`,
  TRIPLE: `triple`
};

const Reward = {
  [Answer.CORRECT]: 100,
  [Answer.FAST]: 150,
  [Answer.SLOW]: 50,
  [Answer.WRONG]: 0,
  LIVE: 50
};

const initialState = {
  lives: LIVES_LENGTH,
  time: AnswerTime.MAX,
  answers: [],
  level: 0
};

const countScores = (state) => {
  const reward = {
    [Answer.CORRECT]: 0,
    [Answer.FAST]: 0,
    [Answer.SLOW]: 0,
    [Answer.WRONG]: 0,
    LIVE: 0
  };
  const answers = state.answers;
  const lives = state.lives;
  answers.forEach((a) => {
    reward[a] += Reward[a];
  });
  reward.LIVE = lives * Reward.LIVE;
  return (answers.length === QUESTIONS_LENGTH && lives >= 0) ? reward : -1;
};

const createTimer = (duration) => {
  return {
    value: duration,
    tick() {
      return duration > 0 ? createTimer(duration - 1) : `timer is over`;
    }
  };
};

export {
  QUESTIONS_LENGTH,
  LIVES_LENGTH,
  AnswerTime,
  AnswerType,
  Answer,
  GameType,
  Reward,
  initialState,
  countScores,
  createTimer
};
