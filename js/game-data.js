const QUESTIONS_LENGTH = 10;
const Answer = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`
};
const Reward = {
  [Answer.CORRECT]: 100,
  [Answer.FAST]: 150,
  [Answer.SLOW]: 50,
  [Answer.WRONG]: 0,
  [Answer.UNKNOWN]: 0,
  LIVE: 50
};
const countScores = (answers, lives) => answers.length === QUESTIONS_LENGTH ? answers.reduce((sum, current) => sum + Reward[current], lives * Reward.LIVE) : -1;
const createTimer = (duration) => {
  return {
    value: duration,
    tick() {
      return duration > 0 ? createTimer(duration - 1) : `timer is over`;
    }
  };
};

export {QUESTIONS_LENGTH, Answer, Reward, countScores, createTimer};
