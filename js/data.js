const initialState = {
  lives: 3,
  time: 0,
  answers: [],
  level: 0
};

let currentState = {
  lives: initialState.lives,
  time: initialState.time,
  answers: initialState.answers,
  level: initialState.level
};

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

export {initialState, currentState, images};
