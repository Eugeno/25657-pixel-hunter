import assert from 'assert';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

const questionsLength = 10;
const answer = {
  NORMAL: `normal`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`
};
const reward = {
  RIGHT_ANSWER: 100,
  FAST_ANSWER: 150,
  SLOW_ANSWER: 50,
  LIVE: 50
};
const countScores = (answers, lives) => {
  let scores = -1;
  if (answers.length === questionsLength) {
    scores = answers.reduce(function (sum, current) {
      let increment = 0;
      switch (current) {
        case answer.NORMAL:
          increment = reward.RIGHT_ANSWER;
          break;
        case answer.FAST:
          increment = reward.FAST_ANSWER;
          break;
        case answer.SLOW:
          increment = reward.SLOW_ANSWER;
          break;
      }
      return sum + increment;
    }, 0);
    scores += lives * reward.LIVE;
  }
  return scores;
};

describe(`Counting total scores`, () => {
  it(`should return -1 when user didn't answer to all questions`, () => {
    const answers = [
      answer.NORMAL,
      answer.WRONG,
      answer.WRONG,
      answer.NORMAL,
      answer.SLOW,
      answer.WRONG
    ];
    const lives = 0;
    assert.equal(-1, countScores(answers, lives));
  });
  it(`should return 1150 when user answered to all questions in normal speed, and got all lives`, () => {
    const answers = new Array(questionsLength).fill(answer.NORMAL);
    const lives = 3;
    assert.equal(1150, countScores(answers, lives));
  });
  it(`should return 750 when user answered 2 times right, 3 times wrong, 3 times fast and 2 times slow`, () => {
    const answers = [
      answer.FAST,
      answer.WRONG,
      answer.NORMAL,
      answer.SLOW,
      answer.FAST,
      answer.WRONG,
      answer.NORMAL,
      answer.SLOW,
      answer.FAST,
      answer.WRONG
    ];
    const lives = 0;
    assert.equal(750, countScores(answers, lives));
  });
  it(`should return 1650 when user answered fast for all questions`, () => {
    const answers = new Array(questionsLength).fill(answer.FAST);
    const lives = 3;
    assert.equal(1650, countScores(answers, lives));
  });
});

const createTimer = (duration) => {
  return {
    tick: () => {
      let currentTime = duration;
      if (currentTime > 0) {
        return currentTime - 1;
      } else {
        return `timer is over`;
      }
    }
  };
};

describe(`Timer`, () => {
  it(`should create object`, () => {
    assert.equal(typeof createTimer(10), `object`);
  });
  it(`should decrease time by 1 when tick`, () => {
    assert.equal(createTimer(10).tick(), 9);
  });
  it(`should say something, when it's over`, () => {
    assert.equal(typeof createTimer(0).tick(), `string`);
  });
});
