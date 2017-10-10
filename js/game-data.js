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
  const summary = () => {
    return answers.reduce((sum, current) => {
      return sum + Reward[current];
    }, lives * Reward.LIVE);
  };
  return answers.length === QUESTIONS_LENGTH ? summary() : -1;
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
