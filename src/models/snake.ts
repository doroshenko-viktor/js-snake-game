import _ from 'lodash';
import { List, Item } from 'linked-list';
import { ICell, IShape } from '../types';

export enum SnakeDirection { Up, Down, Left, Right }

class Cell extends Item implements ICell {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}

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

    changeDirection(direction: SnakeDirection) {
        console.log(`handled in snake.ts`);
        console.log(direction);
        this._direction = direction;
    }

    makeStep(cb: (nextCell: Cell) => [Cell, boolean]): void {
        if (this._direction === SnakeDirection.Right && this._body.tail !== null) {
            const nextCell = new Cell(this._body.tail.x + 1, this._body.tail.y);
            const [normalizedCell, isExtendSize] = cb(nextCell);
            this._body.append(normalizedCell);
            if (!isExtendSize) {
                this._body.head?.detach();
            }
        } else if (this._direction === SnakeDirection.Down && this._body.tail !== null) {
            const nextCell = new Cell(this._body.tail.x, this._body.tail.y + 1);
            const [normalizedCell, isExtendSize] = cb(nextCell);
            this._body.append(normalizedCell);
            if (!isExtendSize) {
                this._body.head?.detach();
            }
        } else if (this._direction === SnakeDirection.Left && this._body.tail !== null) {
            const nextCell = new Cell(this._body.tail.x - 1, this._body.tail.y);
            const [normalizedCell, isExtendSize] = cb(nextCell);
            this._body.append(normalizedCell);
            if (!isExtendSize) {
                this._body.head?.detach();
            }
        } else if (this._direction === SnakeDirection.Up && this._body.tail !== null) {
            const nextCell = new Cell(this._body.tail.x, this._body.tail.y - 1);
            const [normalizedCell, isExtendSize] = cb(nextCell);
            this._body.append(normalizedCell);
            if (!isExtendSize) {
                this._body.head?.detach();
            }
        }
    }

    getCells(): ICell[] {
        return this._body.toArray();
    }
}