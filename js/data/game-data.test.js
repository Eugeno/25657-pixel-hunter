import assert from 'assert';
import gameData from '../game-data';

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
      gameData.answer.NORMAL,
      gameData.answer.WRONG,
      gameData.answer.WRONG,
      gameData.answer.NORMAL,
      gameData.answer.NORMAL,
      gameData.answer.SLOW,
      gameData.answer.NORMAL,
      gameData.answer.NORMAL,
      gameData.answer.WRONG
    ];
    const lives = 0;
    assert.equal(-1, gameData.countScores(answers, lives));
  });
  it(`should return -1 when user didn't answer to all questions`, () => {
    const answers = [
      gameData.answer.WRONG,
      gameData.answer.WRONG,
      gameData.answer.WRONG
    ];
    const lives = 0;
    assert.equal(-1, gameData.countScores(answers, lives));
  });
  it(`should return 1150 when user answered to all questions in normal speed, and got all lives`, () => {
    const answers = new Array(gameData.QUESTIONS_LENGTH).fill(gameData.answer.NORMAL);
    const lives = 3;
    assert.equal(1150, gameData.countScores(answers, lives));
  });
  it(`should return 750 when user answered 2 times right, 3 times wrong, 3 times fast and 2 times slow`, () => {
    const answers = [
      gameData.answer.FAST,
      gameData.answer.WRONG,
      gameData.answer.NORMAL,
      gameData.answer.SLOW,
      gameData.answer.FAST,
      gameData.answer.WRONG,
      gameData.answer.NORMAL,
      gameData.answer.SLOW,
      gameData.answer.FAST,
      gameData.answer.WRONG
    ];
    const lives = 0;
    assert.equal(750, gameData.countScores(answers, lives));
  });
  it(`should return 1650 when user answered fast for all questions`, () => {
    const answers = new Array(gameData.QUESTIONS_LENGTH).fill(gameData.answer.FAST);
    const lives = 3;
    assert.equal(1650, gameData.countScores(answers, lives));
  });
  it(`should return 350 when user answered slow 7 times and had 3 mistakes`, () => {
    const answers = [
      gameData.answer.SLOW,
      gameData.answer.SLOW,
      gameData.answer.SLOW,
      gameData.answer.SLOW,
      gameData.answer.SLOW,
      gameData.answer.SLOW,
      gameData.answer.SLOW,
      gameData.answer.WRONG,
      gameData.answer.WRONG,
      gameData.answer.WRONG
    ];
    const lives = 0;
    assert.equal(350, gameData.countScores(answers, lives));
  });
});

describe(`Timer`, () => {
  it(`should create object`, () => {
    assert.equal(typeof gameData.createTimer(10), `object`);
  });
  it(`should has initial value as duration`, () => {
    assert.equal(gameData.createTimer(20).value, 20);
  });
  it(`should decrease time by 1 when tick`, () => {
    assert.equal(gameData.createTimer(10).tick(), 9);
  });
  it(`should say something, when it's over`, () => {
    assert.equal(typeof gameData.createTimer(0).tick(), `string`);
  });
});
