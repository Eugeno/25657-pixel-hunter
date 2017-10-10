const QUESTIONS_LENGTH = 10;
const answer = {
  NORMAL: `normal`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};
const reward = {
  NORMAL: 100,
  FAST: 150,
  SLOW: 50,
  LIVE: 50
};
const countScores = (answers, lives) => {
  let scores = -1;
  if (answers.length === QUESTIONS_LENGTH) {
    scores = answers.reduce((sum, current) => {
      let increment = 0;
      switch (current) {
        case answer.NORMAL:
          increment = reward.NORMAL;
          break;
        case answer.FAST:
          increment = reward.FAST;
          break;
        case answer.SLOW:
          increment = reward.SLOW;
          break;
      }
      return sum + increment;
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
