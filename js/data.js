const initialState = {
  lives: 3,
  time: 0,
  answers: new Array(10).fill(`unknown`)
};

let currentState = {
  lives: 3,
  time: 0,
  answers: [],
  level: 0
};

export {initialState, currentState};
