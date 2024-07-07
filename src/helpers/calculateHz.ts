// const BANKER_PLAYER_ADVANTAGE_RANGE = {
//   LOW: [7, 8, 9],
//   MID: [0, 1, 6],
//   HIGH: [2, 3, 4, 5],
// };
import { getTotalPointByArray, getArrSum } from "./utils";

const BANKER_POINT_TYPE: { [key: string]: number[] } = {
  BEST: [7, 8, 9],
  OKAY: [0, 1, 3, 4, 6],
  WORST: [2, 5],
};

const BANKER_POINT_TYPE_OFFSET: { [key: string]: number } = {
  BEST: 3,
  OKAY: 2,
  WORST: -5,
};

const PLAYER_POINT_TYPE: { [key: string]: number[] } = {
  BEST: [7, 8, 9],
  OKAY: [0, 1, 3, 4],
  WORST: [2, 5, 6],
};

const PLAYER_POINT_TYPE_OFFSET: { [key: string]: number } = {
  BEST: 2,
  OKAY: 1,
  WORST: -5,
};

// For both banker and player
const ADVANTAGE_CARD_TYPE: { [key: string]: number[] } = {
  BEST: [1, 4, 5, 7, 8],
  OKAY: [2, 3],
  WORST: [6, 9],
};

const ADVANTAGE_CARD_TYPE_OFFSET: { [key: string]: number } = {
  BEST: 2,
  OKAY: -3,
  WORST: -5,
};

const getAdvantageCardTypeByPoint = (cardPoint: number) => {
  for (const TYPE in ADVANTAGE_CARD_TYPE) {
    if (ADVANTAGE_CARD_TYPE[TYPE].includes(cardPoint)) {
      return TYPE;
    }
  }
};

const getAdvantageCardTypeOffsetByCardTypeArr = (
  cardTypeArr: (string | undefined)[]
) => {
  return cardTypeArr.map((cardType) => {
    if (typeof cardType === "undefined") return 0;
    return ADVANTAGE_CARD_TYPE_OFFSET[cardType!];
  });
};

const getPlayerPointType = (playerPoint: number) => {
  for (const TYPE in PLAYER_POINT_TYPE) {
    if (PLAYER_POINT_TYPE[TYPE].includes(playerPoint)) {
      return TYPE;
    }
  }
  throw new Error(`No player point type found for ${playerPoint}`);
};

const getBankerPointType = (bankerPoint: number) => {
  for (const TYPE in BANKER_POINT_TYPE) {
    if (BANKER_POINT_TYPE[TYPE].includes(bankerPoint)) {
      return TYPE;
    }
  }
  throw new Error(`No banker point type found for ${bankerPoint}`);
};

const isFaceCard = (cardStr: string) => {
  const faceCards = ["J", "Q", "K"];
  return faceCards.includes(cardStr);
};

const getCardPoint = (cardStr: string) => {
  if (isFaceCard(cardStr)) return 0;
  const cardInt = parseInt(cardStr, 10);
  if (Number.isNaN(cardInt || cardInt >= 10)) {
    throw new Error(`cardStr ${cardStr} is not a valid card`);
  }
  return cardInt;
};

const padZero = (cards: string[]) => {
  const dump: string[] = [...cards];
  for (let i = 0; i <= 2; i++) {
    if (dump[i] === undefined || dump[i] === null || !dump[i]) {
      dump[i] = "0"; // Set to "0" if undefined or null
    }
  }
  return dump;
};

export const calculateHz = (playerCards: string[], bankerCards: string[]) => {
  // const playerCards = ["5", "J", "K"];

  const padZeroPlayerCards = padZero(playerCards);
  const padZeroBankerCards = padZero(bankerCards);

  console.log("🕸️🕸️🕸️DEBUG: padZeroPlayerCards", padZeroPlayerCards);

  const playerCardPoints = padZeroPlayerCards.map((cardStr) =>
    getCardPoint(cardStr)
  );
  console.log("playerCardPoints", playerCardPoints);
  const playerCardTypes = playerCardPoints.map((cardPoint) =>
    getAdvantageCardTypeByPoint(cardPoint)
  );
  const playerCardTypeOffsets =
    getAdvantageCardTypeOffsetByCardTypeArr(playerCardTypes);
  console.log("playerCardTypeOffsets", playerCardTypeOffsets);
  const playerTotalPoint = getTotalPointByArray(playerCardPoints);
  console.log("playerTotalPoint", playerTotalPoint);
  const playerPointType = getPlayerPointType(playerTotalPoint);
  console.log("playerPointType", playerPointType);
  const playerPointTypeOffset = PLAYER_POINT_TYPE_OFFSET[playerPointType];
  console.log("playerPointTypeOffset", playerPointTypeOffset);

  // const bankerCards = ["6", "5", "6"];
  const bankerCardPoints = padZeroBankerCards.map((cardStr) =>
    getCardPoint(cardStr)
  );
  console.log("bankerCardPoints", bankerCardPoints);
  const bankerCardTypes = bankerCardPoints.map((cardPoint) =>
    getAdvantageCardTypeByPoint(cardPoint)
  );
  console.log("bankerCardTypes", bankerCardTypes);
  const bankerCardTypeOffsets =
    getAdvantageCardTypeOffsetByCardTypeArr(bankerCardTypes);
  console.log("bankerCardTypeOffsets", bankerCardTypeOffsets);
  const bankerTotalPoint = getTotalPointByArray(bankerCardPoints);
  console.log("bankerTotalPoint", bankerTotalPoint);
  const bankerPointType = getBankerPointType(bankerTotalPoint);
  console.log("bankerPointType", bankerPointType);
  const bankerPointTypeOffset = BANKER_POINT_TYPE_OFFSET[bankerPointType];
  console.log("bankerPointTypeOffset", bankerPointTypeOffset);

  const sumHz =
    getArrSum(playerCardTypeOffsets) +
    getArrSum(bankerCardTypeOffsets) +
    playerPointTypeOffset +
    bankerPointTypeOffset;

  let next;
  console.log("sumHz", sumHz);
  if (sumHz < 0) {
    console.log("Play Banker Next Round!");
    next = "player";
  } else {
    console.log("Play Player Next Round!");
    next = "banker";
  }

  return {
    sumHz,
    next,
  };
};
