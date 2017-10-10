const QUESTIONS_LENGTH = 10;
const Answer = {
  NORMAL: `normal`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};
const Reward = {
  [Answer.NORMAL]: 100,
  [Answer.FAST]: 150,
  [Answer.SLOW]: 50,
  [Answer.WRONG]: 0,
  LIVE: 50
};
const countScores = (answers, lives) => {
  let scores = -1;
  if (answers.length === QUESTIONS_LENGTH) {
    scores = answers.reduce((sum, current) => {
      return sum + Reward[current];
    }, lives * Reward.LIVE);
  }
  return scores;
};
const createTimer = (duration) => {
  return {
    value: duration,
    tick() {
      return duration > 0 ? createTimer(duration - 1) : `timer is over`;
    }
  };
};

export {QUESTIONS_LENGTH, Answer, countScores, createTimer};
