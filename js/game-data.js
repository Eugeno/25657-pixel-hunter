const QUESTIONS_LENGTH = 10;
const Answer = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};
const Reward = {
  [Answer.CORRECT]: 100,
  [Answer.FAST]: 50,
  [Answer.SLOW]: -50,
  LIVE: 50
};
const countScores = (state) => {
  const reward = {};
  const answers = state.answers;
  const lives = state.lives;
  reward.correct = answers.filter((t) => t !== Answer.WRONG).length * Reward[Answer.CORRECT];
  reward.fast = answers.filter((t) => t === Answer.FAST).length * Reward[Answer.FAST];
  reward.slow = answers.filter((t) => t === Answer.SLOW).length * Reward[Answer.SLOW];
  reward.live = lives * Reward.LIVE;
  return reward;
};
const createTimer = (duration) => {
  return {
    value: duration,
    tick() {
      return duration > 0 ? createTimer(duration - 1) : `timer is over`;
    }
  };
};

export {QUESTIONS_LENGTH, Answer, Reward, countScores, createTimer};
