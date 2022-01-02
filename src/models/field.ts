import _ from 'lodash';
import { ICell, OccupationType } from '../types';
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

    constructor(width: number, height: number, snake: Snake) {
        this._snake = snake;
        this._width = width;
        this._height = height;
    }

    private clear() {
        this._rows = _.range(0, this._height).map(() => {
            return new FieldRow(this._width);
        });
    }

    get rows() {
        return this._rows;
    }

    makeStep() {
        this._snake.makeStep(this.calculateNextSnakeCellLimits);
        this.clear();
        this.projectSnake();
    }

    private calculateNextSnakeCellLimits = (next: ICell): [ICell, boolean] => {
        if (next.x > this._width - 1) {
            next.x = 0;
        } else if (next.x < 0) {
            next.x = this._width - 1;
        } else if (next.y > this._height - 1) {
            next.y = 0;
        } else if (next.y < 0) {
            next.y = this._height - 1;
        }
        return [next, false];
    };

    private projectSnake() {
        this._snake.getCells().forEach(cell => {
            if (cell.y >= this.rows.length) throw new Error("snake can't be mapped to field");
            const row = this._rows[cell.y];
            if (cell.x >= row.cells.length) throw new Error("snake can't be mapped to field");
            const fieldCell = row.cells[cell.x];
            fieldCell.occupation = OccupationType.Snake;
        });
    }
}