const QUESTIONS_LENGTH = 10;
const ANSWER = {
  NORMAL: `normal`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};
const REWARD = {
  [ANSWER.NORMAL]: 100,
  [ANSWER.FAST]: 150,
  [ANSWER.SLOW]: 50,
  [ANSWER.WRONG]: 0,
  LIVE: 50
};
const countScores = (answers, lives) => {
  let scores = -1;
  if (answers.length === QUESTIONS_LENGTH) {
    scores = answers.reduce((sum, current) => {
      return sum + REWARD[current];
    }, lives * REWARD.LIVE);
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

export {QUESTIONS_LENGTH, ANSWER, countScores, createTimer};
