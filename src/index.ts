import _ from 'lodash';
import ui from './controllers/ui-controller';
import {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  SNAKE_INIT_LENGTH,
  GAME_SPEED_MS
} from './configuration/constants';
import { Field } from './models/field';
import { Snake } from './models/snake';
import events from './controllers/keyboard-events-controller';
import { GameStatus, ICell } from './types';

class DotCell implements ICell {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
  }
}

function getRandomWithin(width: number, height: number): DotCell {
  const x = _.random(0, width);
  const y = _.random(0, height);
  return new DotCell(x, y);
}

const app = ui.getAppElement();
const snake = new Snake(SNAKE_INIT_LENGTH);
const dots = _.range(0, 10).map(() =>
  getRandomWithin(FIELD_WIDTH - 1, FIELD_HEIGHT - 1)
);
const field = new Field(FIELD_WIDTH, FIELD_HEIGHT, snake, dots);

events.addDirectionKeyPressedEventHandler(
  'snakeHandler',
  snake.changeDirection.bind(snake)
);

run();

const isGameOverStatus = (status: GameStatus) =>
  status === GameStatus.SnakeIntersection || status === GameStatus.Win;

async function run() {
  const x = true;
  while (x) {
    await delay(GAME_SPEED_MS);
    const stepStatus = field.makeStep();
    if (isGameOverStatus(stepStatus)) {
      ui.renderStatus(app, stepStatus);
      break;
    }
    ui.renderField(app, field);
  }
}

async function delay(periodMs: number): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, periodMs);
  });
}
