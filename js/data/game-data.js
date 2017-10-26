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
  return answers.length === 10 ? reward : -1;
};

const createTimer = (duration) => {
  return {
    value: duration,
    tick() {
      return duration > 0 ? createTimer(duration - 1) : `timer is over`;
    }
  };
};

const initialState = {
  lives: 3,
  time: 0,
  answers: [],
  level: 0
};

const currentState = Object.assign({}, initialState);

const images = {
  paint: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photo: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export {QUESTIONS_LENGTH, Answer, Reward, countScores, createTimer, initialState, currentState, images};
