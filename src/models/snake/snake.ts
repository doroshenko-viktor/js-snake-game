import _ from 'lodash';
import Cell from '../shapes/cell';
import { ICell, IShape } from '../../interfaces/shape-interfaces';
import SnakeDirection from './snake-direction';
import GameStatus from '../../enums/game-status';
import Queue from '../../util/queue';
import snakeUtils from './snake-utils';

/**
 * Snake business logic
 */
export class Snake implements IShape {
  private _direction: SnakeDirection;
  private _body: Queue<ICell>;

  constructor(body: ICell[], direction: SnakeDirection) {
    this._direction = direction;
    this._body = new Queue(body);
  }

  /**
   * Create Snake with given parameters or with default values.
   * Initial body length is 1.
   * Initial direction is to the right.
   * @returns Snake
   */
  static create(length = 1, direction = SnakeDirection.Right) {
    const cells = getCellsVector(length);
    return new Snake(cells, direction);
  }

  get direction(): SnakeDirection {
    return this._direction;
  }

  /**
   *
   * @param direction SnakeDirection
   * @returns `true` if direction has been changed and `false` if not
   */
  changeDirection(direction: SnakeDirection): boolean {
    if (snakeUtils.isOppositeDirection(this._direction, direction)) {
      return false;
    }
    this._direction = direction;
    return true;
  }

  makeStep(cb: SnakeEnvironmentVerificationCallback): GameStatus {
    const makeStepWhenNotEmptySnake = (snakeTail: ICell): GameStatus => {
      const stepRight = () =>
        this._makeStepToCoordinates(snakeTail.x + 1, snakeTail.y, cb);
      const stepLeft = () =>
        this._makeStepToCoordinates(snakeTail.x - 1, snakeTail.y, cb);
      const stepUp = () =>
        this._makeStepToCoordinates(snakeTail.x, snakeTail.y - 1, cb);
      const stepDown = () =>
        this._makeStepToCoordinates(snakeTail.x, snakeTail.y + 1, cb);

      if (snakeUtils.isMoveRight(this._direction)) {
        return stepRight();
      } else if (snakeUtils.isMoveDown(this._direction)) {
        return stepDown();
      } else if (snakeUtils.isMoveLeft(this._direction)) {
        return stepLeft();
      } else if (snakeUtils.isMoveUp(this._direction)) {
        return stepUp();
      } else {
        throw new Error('unknown snake move');
      }
    };

    const tail = this._body.getTail();
    if (tail) {
      return makeStepWhenNotEmptySnake(tail);
    }
    throw new Error('Cannot make step - snake is empty');
  }

  /**
   * Get all snake cells as an array
   * @returns ICell[]
   */
  getCells(): ICell[] {
    return this._body.toArray();
  }

  private _makeStepToCoordinates(
    x: number,
    y: number,
    environmentVerificationCallback: SnakeEnvironmentVerificationCallback
  ) {
    const isIntersectionHappen = (newCell: ICell) =>
      this._body.contains((cell) => cell.equals(newCell));

    const nextCell = new Cell(x, y);
    if (isIntersectionHappen(nextCell)) {
      return GameStatus.SnakeIntersection;
    }
    const verificationResult = environmentVerificationCallback(nextCell);
    this._body.enqueue(verificationResult.cell);
    if (!verificationResult.isExtendSize) {
      this._body.dequeue();
    }
    return GameStatus.Continue;
  }
}

/**
 * This callback allow snake to know what happens in the external environment, when next step happens.
 * e.g. snake knows it's position, so it is possible to know, when it will bite itself on the next step, but snake does not know about other external obstacles on the outer environment.
 * This callback allows environment, where snake is placed to tell back if external event happens, when snake makes a step.
 * Examples of such events are: snake overlaps a board or snake eats an apple.
 */
type SnakeEnvironmentVerificationCallback = (
  nextCell: ICell
) => SnakeVerificationResult;

type SnakeVerificationResult = {
  cell: ICell;
  isExtendSize: boolean;
};

function getCellsVector(length: number) {
  return _.range(0, length).map((ind) => {
    return new Cell(ind, 0);
  });
}
