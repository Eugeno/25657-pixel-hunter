import assert from 'assert';
import {QUESTIONS_LENGTH, Answer, countScores, createTimer} from '../game-data';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe(`Counting total scores`, () => {
  it(`should return -1 when user didn't answer to all questions`, () => {
    const state = {
      answers: [
        Answer.CORRECT,
        Answer.WRONG,
        Answer.WRONG,
        Answer.CORRECT,
        Answer.CORRECT,
        Answer.SLOW,
        Answer.CORRECT,
        Answer.CORRECT,
        Answer.WRONG
      ],
      lives: 0
    };
    assert.equal(-1, countScores(state));
  });
  it(`should return -1 when user didn't answer to all questions`, () => {
    const state = {
      answers: [
        Answer.WRONG,
        Answer.WRONG,
        Answer.WRONG
      ],
      lives: 0
    };
    assert.equal(-1, countScores(state));
  });
  it(`should return 1150 when user answered to all questions in normal speed, and got all lives`, () => {
    const state = {
      answers: new Array(QUESTIONS_LENGTH).fill(Answer.CORRECT),
      lives: 3
    };
    assert.equal(1150, Object.keys(countScores(state)).reduce((sum, key) => sum + parseInt(countScores(state)[key], 10), 0));
  });
  it(`should return 750 when user answered 2 times right, 3 times wrong, 3 times fast and 2 times slow`, () => {
    const state = {
      answers: [
        Answer.FAST,
        Answer.WRONG,
        Answer.CORRECT,
        Answer.SLOW,
        Answer.FAST,
        Answer.WRONG,
        Answer.CORRECT,
        Answer.SLOW,
        Answer.FAST,
        Answer.WRONG
      ],
      lives: 0
    };
    assert.equal(750, Object.keys(countScores(state)).reduce((sum, key) => sum + parseInt(countScores(state)[key], 10), 0));
  });
  it(`should return 1650 when user answered fast for all questions`, () => {
    const state = {
      answers: new Array(QUESTIONS_LENGTH).fill(Answer.FAST),
      lives: 3
    };
    assert.equal(1650, Object.keys(countScores(state)).reduce((sum, key) => sum + parseInt(countScores(state)[key], 10), 0));
  });
  it(`should return 350 when user answered slow 7 times and had 3 mistakes`, () => {
    const state = {
      answers: [
        Answer.SLOW,
        Answer.SLOW,
        Answer.SLOW,
        Answer.SLOW,
        Answer.SLOW,
        Answer.SLOW,
        Answer.SLOW,
        Answer.WRONG,
        Answer.WRONG,
        Answer.WRONG
      ],
      lives: 0
    };
    assert.equal(350, Object.keys(countScores(state)).reduce((sum, key) => sum + parseInt(countScores(state)[key], 10), 0));
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
