import assert from 'assert';
import {QUESTIONS_LENGTH, answer, countScores, createTimer} from '../game-data';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe(`Counting total scores`, () => {
  it(`should return -1 when user didn't answer to all questions`, () => {
    const answers = [
      answer.NORMAL,
      answer.WRONG,
      answer.WRONG,
      answer.NORMAL,
      answer.NORMAL,
      answer.SLOW,
      answer.NORMAL,
      answer.NORMAL,
      answer.WRONG
    ];
    const lives = 0;
    assert.equal(-1, countScores(answers, lives));
  });
  it(`should return -1 when user didn't answer to all questions`, () => {
    const answers = [
      answer.WRONG,
      answer.WRONG,
      answer.WRONG
    ];
    const lives = 0;
    assert.equal(-1, countScores(answers, lives));
  });
  it(`should return 1150 when user answered to all questions in normal speed, and got all lives`, () => {
    const answers = new Array(QUESTIONS_LENGTH).fill(answer.NORMAL);
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
    const answers = new Array(QUESTIONS_LENGTH).fill(answer.FAST);
    const lives = 3;
    assert.equal(1650, countScores(answers, lives));
  });
  it(`should return 350 when user answered slow 7 times and had 3 mistakes`, () => {
    const answers = [
      answer.SLOW,
      answer.SLOW,
      answer.SLOW,
      answer.SLOW,
      answer.SLOW,
      answer.SLOW,
      answer.SLOW,
      answer.WRONG,
      answer.WRONG,
      answer.WRONG
    ];
    const lives = 0;
    assert.equal(350, countScores(answers, lives));
  });
});

describe(`Timer`, () => {
  it(`should create object`, () => {
    assert.equal(typeof createTimer(10), `object`);
  });
  it(`should has initial value as duration`, () => {
    assert.equal(createTimer(20).value, 20);
  });
  it(`should decrease time by 1 when tick`, () => {
    assert.equal(createTimer(10).tick().value, 9);
  });
  it(`should say something, when it's over`, () => {
    assert.equal(typeof createTimer(0).tick(), `string`);
  });
});
