import _ from 'lodash';
import { List } from 'linked-list';
import Cell from '../shapes/cell';
import { ICell, IShape } from '../../interfaces/shape-interfaces';
import SnakeDirection from './snake-direction';
import GameStatus from '../../enums/game-status';

export class Snake implements IShape {
  private _direction: SnakeDirection;
  private _body: List<Cell>;

  constructor(initLength: number) {
    this._direction = SnakeDirection.Right;
    const cells = _.range(0, initLength).map((ind) => {
      return new Cell(ind, 0);
    });
    this._body = List.from(cells);
  }

  changeDirection(direction: SnakeDirection): boolean {
    if (
      (this._direction === SnakeDirection.Up &&
        direction === SnakeDirection.Down) ||
      (this._direction === SnakeDirection.Down &&
        direction === SnakeDirection.Up) ||
      (this._direction === SnakeDirection.Left &&
        direction === SnakeDirection.Right) ||
      (this._direction === SnakeDirection.Right &&
        direction === SnakeDirection.Left)
    ) {
      return false;
    }
    this._direction = direction;
    return true;
  }

  makeStep(cb: SnakeMakeStepCallback): GameStatus {
    const isMoveRight = () => this._direction === SnakeDirection.Right;
    const isMoveLeft = () => this._direction === SnakeDirection.Left;
    const isMoveUp = () => this._direction === SnakeDirection.Up;
    const isMoveDown = () => this._direction === SnakeDirection.Down;

    const makeStepWhenNotEmptySnake = (snakeTail: ICell): GameStatus => {
      const stepRight = () =>
        this._makeStepToCoordinates(snakeTail.x + 1, snakeTail.y, cb);
      const stepLeft = () =>
        this._makeStepToCoordinates(snakeTail.x - 1, snakeTail.y, cb);
      const stepUp = () =>
        this._makeStepToCoordinates(snakeTail.x, snakeTail.y - 1, cb);
      const stepDown = () =>
        this._makeStepToCoordinates(snakeTail.x, snakeTail.y + 1, cb);

      if (isMoveRight()) {
        return stepRight();
      } else if (isMoveDown()) {
        return stepDown();
      } else if (isMoveLeft()) {
        return stepLeft();
      } else if (isMoveUp()) {
        return stepUp();
      } else {
        throw new Error('unknown snake move');
      }
    };

    if (this._body.tail !== null) {
      return makeStepWhenNotEmptySnake(this._body.tail);
    }
    throw new Error('Cannot make step - snake is empty');
  }

  private _makeStepToCoordinates(
    x: number,
    y: number,
    cb: SnakeMakeStepCallback
  ) {
    const isIntersectionHappen = (newCell: ICell) => {
      const intersectionIndex = this._body
        .toArray()
        .findIndex((cell) => cell.x === newCell.x && cell.y === newCell.y);
      return intersectionIndex > -1;
    };
    const nextCell = new Cell(x, y);
    const [normalizedCell, isExtendSize] = cb(nextCell);
    if (isIntersectionHappen(normalizedCell)) {
      return GameStatus.SnakeIntersection;
    }
    this._body.append(normalizedCell);
    if (!isExtendSize) {
      this._body.head?.detach();
    }
    return GameStatus.Continue;
  }

  getCells(): ICell[] {
    return this._body.toArray();
  }
}

type SnakeMakeStepCallback = (nextCell: ICell) => [ICell, boolean];
