import assert from 'assert';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

const scores = () => {
  return false;
};

describe(`Counting right answers`, () => {
  it(`should return -1 when user didsn't answer to all questions`, () => {
    const answers = [`normal`];
    const lives = 1;
    assert.equal(-1, scores(answers, lives));
  });
  it(`should return 1150 when user answered to all questions in normal speed, and got all lives`, () => {
    const answers = [`normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`, `normal`];
    const lives = 3;
    assert.equal(1150, scores(answers, lives));
  });
  it(`should return 750 when user answered 2 times right, 3 times wrong, 3 times fast and 2 times slow`, () => {
    const answers = [`fast`, `wrong`, `normal`, `slow`, `fast`, `wrong`, `normal`, `slow`, `fast`, `wrong`];
    const lives = 0;
    assert.equal(750, scores(answers, lives));
  });
  it(`should return 1650 when user answered fast for all questions`, () => {
    const answers = [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`];
    const lives = 3;
    assert.equal(1650, scores(answers, lives));
  });
});


