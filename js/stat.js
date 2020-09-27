'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_GAP = 10;
const BAR_GAP = 50;
const TEXT_WIDTH = 50;
const TEXT_HEIGHT = 20;
const BAR_HEIGHT = CLOUD_HEIGHT - BAR_GAP - TEXT_WIDTH - BAR_GAP;
const BAR_WIDTH = 40;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + CLOUD_GAP,
      CLOUD_Y + CLOUD_GAP,
      `rgba(0, 0, 0, 0.3)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  const MAX_TIME = getMaxElement(times);
  const randomHSL = function () {
    return `hsl(${240},${100 * Math.random()}%,${50}%)`;
  };

  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = `#000`;

    ctx.fillText(
        `Ура вы победили!`,
        CLOUD_X + CLOUD_GAP * 2,
        CLOUD_Y + TEXT_HEIGHT * 2
    );
    ctx.fillText(
        `Список результатов:`,
        CLOUD_X + CLOUD_GAP * 2,
        CLOUD_Y + TEXT_HEIGHT * 3
    );
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_HEIGHT - ((BAR_HEIGHT * times[i]) / MAX_TIME) - CLOUD_GAP * 4
    );
    ctx.fillText(
        players[i],
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT
    );
    if (players[i] === `Вы`) {
      ctx.fillStyle = `hsl(${0}, ${100}%,${50}%)`;
    } else {
      ctx.fillStyle = randomHSL();
    }
    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_HEIGHT - TEXT_HEIGHT - CLOUD_GAP,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / MAX_TIME
    );
  }
};
