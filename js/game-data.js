const gameData = {
  QUESTIONS_LENGTH: 10,
  answer: {
    NORMAL: `normal`,
    FAST: `fast`,
    SLOW: `slow`,
    WRONG: `wrong`
  },
  reward: {
    NORMAL: 100,
    FAST: 150,
    SLOW: 50,
    LIVE: 50
  },
  countScores(answers, lives) {
    let scores = -1;
    if (answers.length === this.QUESTIONS_LENGTH) {
      scores = answers.reduce((sum, current) => {
        let increment = 0;
        switch (current) {
          case this.answer.NORMAL:
            increment = this.reward.NORMAL;
            break;
          case this.answer.FAST:
            increment = this.reward.FAST;
            break;
          case this.answer.SLOW:
            increment = this.reward.SLOW;
            break;
        }
        return sum + increment;
      }, lives * this.reward.LIVE);
    }
    return scores;
  },
  createTimer(duration) {
    return {
      value: duration,
      tick() {
        if (this.value > 0) {
          this.value--;
        }
        return this.value > 0 ? this.value : `timer is over`;
      }
    };
  }
};

export default gameData;
