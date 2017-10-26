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

const photos = [
  `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/2_Ontario_Northland_Photos_from_Roger_Puta_%2827024572503%29.jpg/1024px-2_Ontario_Northland_Photos_from_Roger_Puta_%2827024572503%29.jpg`,
  `https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/2015-07-Life-of-Pix-free-stock-photos-green-parrot-nabeel.jpg/1024px-2015-07-Life-of-Pix-free-stock-photos-green-parrot-nabeel.jpg`,
  `https://c1.staticflickr.com/5/4102/4759634554_eae4f2d126_b.jpg`,
  `https://c1.staticflickr.com/6/5082/5352152549_9a82d1c011_b.jpg`,
  `https://media.defense.gov/2017/Aug/07/2001788736/655/438/0/170806-Z-GU920-002A.JPG`,
  `https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Leuchtturm_Keldsnor_Fyr_by_BORK.photos-1907.jpg/1024px-Leuchtturm_Keldsnor_Fyr_by_BORK.photos-1907.jpg`,
  `https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/MUNI_Double-Ended_PCC_Cars_--_3_Photos_%2826278928203%29.jpg/640px-MUNI_Double-Ended_PCC_Cars_--_3_Photos_%2826278928203%29.jpg`,
  `https://c1.staticflickr.com/8/7042/6831875658_6825074849_b.jpg`,
  `https://media.defense.gov/2017/Aug/04/2001787709/670/394/0/170713-F-VJ293-800.JPG`,
  `https://cdn.pixabay.com/photo/2016/10/27/14/23/poor-1775239_960_720.jpg`,
  `https://upload.wikimedia.org/wikipedia/commons/4/4e/Photos-of-Murree-Remnants-of-Murree-Brewery-Pictures-of-Murree.jpg`,
  `https://c1.staticflickr.com/1/419/18734141725_66bf9b385c_b.jpg`,
  `https://cdn.pixabay.com/photo/2016/10/17/10/52/wind-farm-1747331_960_720.jpg`,
  `https://c1.staticflickr.com/5/4001/4644123790_d6f6a1d31c_b.jpg`,
  `https://cdn.pixabay.com/photo/2013/10/17/20/59/horse-197199_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2014/08/22/18/47/photographer-424623_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2016/11/14/15/29/hummingbird-1823829_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2015/04/26/23/16/fruit-741172_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2015/11/07/11/30/phone-1031194_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2017/04/08/10/23/surfer-2212948_960_720.jpg`
];
const paints = [
  `http://i.telegraph.co.uk/multimedia/archive/01483/water-drops_1483794i.jpg`,
  `http://i.telegraph.co.uk/multimedia/archive/01483/steamy-window_1483792i.jpg`,
  `http://i.telegraph.co.uk/multimedia/archive/01483/man-in-goggles_1483788i.jpg`,
  `http://i.telegraph.co.uk/multimedia/archive/01483/woman-laughing_1483796i.jpg`,
  `http://i.telegraph.co.uk/multimedia/archive/01483/people-in-water_1483791i.jpg`,
  `http://i.telegraph.co.uk/multimedia/archive/01483/boy-swimming_1483786i.jpg`,
  `https://www.wired.com/wp-content/uploads/images_blogs/rawfile/2013/11/PhotorealismInTheDigitalAge_p117b.jpg`,
  `http://i.telegraph.co.uk/multimedia/archive/01483/boy-in-pool_1483785i.jpg`,
  `http://webneel.com/daily/sites/default/files/images/daily/03-2017/12-photorealistic-painting-by-ben-jeffery.jpg`,
  `http://media02.hongkiat.com/photorealistic-paintings/wayneforrest-1.jpg`,
  `http://media02.hongkiat.com/photorealistic-paintings/Painting-of-Tica.jpg`,
  `http://media02.hongkiat.com/photorealistic-paintings/clay_finished4.jpg`,
  `http://i.telegraph.co.uk/multimedia/archive/01483/bikini-underwater_1483782i.jpg`,
  `http://media02.hongkiat.com/photorealistic-paintings/robhefferan-6.jpg`,
  `https://www.wired.com/wp-content/uploads/images_blogs/rawfile/2013/11/PhotorealismInTheDigitalAge_p066a.jpg`,
  `http://media02.hongkiat.com/photorealistic-paintings/Saint-Jeremiah-Finally-Receives-Illumination.jpg`,
  `http://media02.hongkiat.com/photorealistic-paintings/70-commercial-street.jpg`,
  `http://media02.hongkiat.com/photorealistic-paintings/Harry_byMichael_Gaskell.jpg`,
  `https://www.wired.com/wp-content/uploads/images_blogs/rawfile/2013/11/PhotorealismInTheDigitalAge_p185c.jpg`,
  `https://www.wired.com/wp-content/uploads/images_blogs/rawfile/2013/11/PhotorealismInTheDigitalAge_p232b.jpg`
];

const generateQuestions = () => {
  const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
  let questions = [];
  const buildQuestion = () => {
    const getRandomGameType = () => {
      switch (getRandomNumber(1, 3)) {
        case 1:
          return `single`;
        case 2:
          return `double`;
        case 3:
          return `tripple`;
      }
      return ``;
    };
    const gameType = getRandomGameType();
    const getRandomImageType = () => {
      switch (getRandomNumber(1, 2)) {
        case 1:
          return `photos`;
        case 2:
          return `paints`;
      }
      return ``;
    };
    const getRandomImage = () => {
      const type = getRandomImageType();
      return {
        type,
        src: type === `photos` ? photos.pop() : paints.pop()
      };
    };
    const getPhotoImage = () => {
      return {
        type: `photos`,
        src: photos.pop()
      };
    };
    const getPaintImage = () => {
      return {
        type: `paints`,
        src: paints.pop()
      };
    };
    const question = {
      type: gameType,
      data: [getRandomImage()]
    };
    switch (gameType) {
      case `single`:
        break;
      case `double`:
        question.data.push(getRandomImage());
        break;
      case `tripple`:
        question.data.push(getRandomImage());
        if (question.data[0].type === question.data[1].type) {
          if (question.data[0].type === `photos`) {
            question.data.push(getPaintImage());
            question.task = {
              type: `paint`,
              text: `рисунок`
            };
          } else if (question.data[0].type === `paints`) {
            question.data.push(getPhotoImage());
            question.task = {
              type: `photo`,
              text: `фотографию`
            };
          }
        } else {
          question.data.push(getRandomImage());
          if (question.data[0].type === question.data[2].type) {
            question.task = {
              type: question.data[1].type,
              text: question.data[1].type === `photo` ? `фотографию` : `рисунок`
            };
          } else {
            question.task = {
              type: question.data[0].type,
              text: question.data[0].type === `photo` ? `фотографию` : `рисунок`
            };
          }
        }
        break;
    }
    return question;
  };
  for (let i = 0; i < QUESTIONS_LENGTH; i++) {
    buildQuestion();
    questions.push();
  }
};

export {QUESTIONS_LENGTH, Answer, Reward, countScores, createTimer, initialState, currentState, images, generateQuestions};
