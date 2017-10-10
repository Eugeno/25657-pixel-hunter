const QUESTIONS_LENGTH = 10;
const answer = {
  NORMAL: `normal`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};
const reward = {
  [answer.NORMAL]: 100,
  [answer.FAST]: 150,
  [answer.SLOW]: 50,
  [answer.WRONG]: 0,
  LIVE: 50
};
const countScores = (answers, lives) => {
  let scores = -1;
  if (answers.length === QUESTIONS_LENGTH) {
    scores = answers.reduce((sum, current) => {
      return sum + reward[current];
    }, lives * reward.LIVE);
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

export {QUESTIONS_LENGTH, answer, countScores, createTimer};
