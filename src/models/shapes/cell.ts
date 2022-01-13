import { Item } from 'linked-list';
import { ICell } from '../../interfaces/shape-interfaces';

class Cell extends Item implements ICell {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    super();
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

export default Cell;
