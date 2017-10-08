import assert from 'assert';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

const countAnswer = (answers, type) => {
  let count = 0;
  for (const answer of answers) {
    if (answer === type) {
      count++;
    }
  }
  return count;
};

const countScores = (answers, lives) => {
  const questionsLength = 10;
  if (answers.length === questionsLength) {
    const liveCost = 50;
    const rightAnswerCost = 100;
    const fastAnswerIncrement = 50;
    const slowAnswerIncrement = -50;
    let scores = lives * liveCost;
    let wrongAnswersLength = countAnswer(answers, `wrong`);
    let rightAnswersLength = questionsLength - wrongAnswersLength;
    scores += rightAnswerCost * rightAnswersLength;
    scores += fastAnswerIncrement * countAnswer(answers, `fast`);
    scores += slowAnswerIncrement * countAnswer(answers, `slow`);
    return scores;
  } else {
    return -1;
  }
};

describe(`Counting right answers`, () => {
  it(`should return -1 when user didsn't answer to all questions`, () => {
    const answers = [`normal`];
    const lives = 1;
    assert.equal(-1, countScores(answers, lives));
  });
  it(`should return 1150 when user answered to all questions in normal speed, and got all lives`, () => {
    const answers = [`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`];
    const lives = 3;
    assert.equal(1150, countScores(answers, lives));
  });
  it(`should return 750 when user answered 2 times right, 3 times wrong, 3 times fast and 2 times slow`, () => {
    const answers = [`fast`, `wrong`, `normal`, `slow`, `fast`, `wrong`, `normal`, `slow`, `fast`, `wrong`];
    const lives = 0;
    assert.equal(750, countScores(answers, lives));
  });
  it(`should return 1650 when user answered fast for all questions`, () => {
    const answers = [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`];
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
