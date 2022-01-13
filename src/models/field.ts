import _ from 'lodash';
import { GameStatus, ICell, OccupationType } from '../types';
import { Snake } from './snake';

export class FieldCell {
  private _occupation: OccupationType;

  constructor() {
    this._occupation = OccupationType.None;
  }

  get occupation(): OccupationType {
    return this._occupation;
  }

  set occupation(value: OccupationType) {
    this._occupation = value;
  }
}

export class FieldRow {
  private _cells: FieldCell[];

  constructor(length: number) {
    this._cells = _.range(0, length).map(() => new FieldCell());
  }

  get cells() {
    return this._cells;
  }
}

export class Field {
  private _rows: FieldRow[] = [];
  private _snake: Snake;
  private _width: number;
  private _height: number;
  private _dots: ICell[];

  constructor(width: number, height: number, snake: Snake, dots: ICell[]) {
    this._snake = snake;
    this._width = width;
    this._height = height;
    this._dots = dots;
  }

  private clear() {
    this._rows = _.range(0, this._height).map(() => {
      return new FieldRow(this._width);
    });
  }

  get rows() {
    return this._rows;
  }

  makeStep(): GameStatus {
    const moveStatus = this._snake.makeStep(this.adjustNextSnakeCellPosition);
    this.clear();
    this.projectSnake();
    this.projectDots();
    if (this._checkWin()) {
      return GameStatus.Win;
    }
    return moveStatus;
  }

  private _checkWin(): boolean {
    if (this._dots.length < 1) {
      return true;
    }
    return false;
  }

  private adjustNextSnakeCellPosition = (next: ICell): [ICell, boolean] => {
    if (next.x > this._width - 1) {
      next.x = 0;
    } else if (next.x < 0) {
      next.x = this._width - 1;
    } else if (next.y > this._height - 1) {
      next.y = 0;
    } else if (next.y < 0) {
      next.y = this._height - 1;
    }

    const mergingDotIndex = this._dots.findIndex(
      (dot) => dot.x === next.x && dot.y === next.y
    );
    if (mergingDotIndex > -1) {
      this._dots.splice(mergingDotIndex, 1);
      return [next, true];
    }

    return [next, false];
  };

  private projectDots() {
    this._dots.forEach((dot) => {
      const row = this._rows[dot.y];
      const fieldCell = row.cells[dot.x];
      fieldCell.occupation = OccupationType.Target;
    });
  }

  private projectSnake() {
    this._snake.getCells().forEach((cell) => {
      if (cell.y >= this.rows.length)
        throw new Error("snake can't be mapped to field");
      const row = this._rows[cell.y];
      if (cell.x >= row.cells.length)
        throw new Error("snake can't be mapped to field");
      const fieldCell = row.cells[cell.x];
      fieldCell.occupation = OccupationType.Snake;
    });
  }
}
