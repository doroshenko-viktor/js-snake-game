import Cell from '../shapes/cell';
import { Snake } from './snake';
import SnakeDirection from './snake-direction';

describe('snake creation tests', () => {
  it('should create snake with zero length', () => {
    const snake = Snake.create(0);
    expect(snake.getCells().length).toBe(0);
  });

  it('should create snake with singular length', () => {
    const snake = Snake.create(1);
    expect(snake.getCells().length).toBe(1);
  });

  it('should create snake with big length', () => {
    const snake = Snake.create(5);
    expect(snake.getCells().length).toBe(5);
  });
});

describe('snake change direction tests', () => {
  it('should change direction, when new direction is not opposite', () => {
    const snake = Snake.create(1, SnakeDirection.Right);
    snake.changeDirection(SnakeDirection.Up);
    expect(snake.direction).toBe(SnakeDirection.Up);
  });

  it('should return true, when change direction and new direction is not opposite', () => {
    const snake = Snake.create(1, SnakeDirection.Right);
    const result = snake.changeDirection(SnakeDirection.Up);
    expect(result).toBeTruthy();
  });

  it('should not change direction, when new direction is opposite', () => {
    const snake = Snake.create(1, SnakeDirection.Right);
    snake.changeDirection(SnakeDirection.Left);
    expect(snake.direction).toBe(SnakeDirection.Right);
  });
  it('should return false when change direction and new direction is opposite', () => {
    const snake = Snake.create(1, SnakeDirection.Right);
    const result = snake.changeDirection(SnakeDirection.Left);
    expect(result).toBeFalsy();
  });

  it('should remain direction, when new direction is same', () => {
    const snake = Snake.create(1, SnakeDirection.Right);
    snake.changeDirection(SnakeDirection.Right);
    expect(snake.direction).toBe(SnakeDirection.Right);
  });

  it('should return true, when change direction and new direction is same', () => {
    const snake = Snake.create(1, SnakeDirection.Right);
    const result = snake.changeDirection(SnakeDirection.Right);
    expect(result).toBeTruthy();
  });
});

describe('make move tests', () => {
  it('should add new cell when no obstacles on the field', () => {
    const snake = new Snake(
      [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0)],
      SnakeDirection.Right
    );
    snake.makeStep((nextCell) => ({ cell: nextCell, isExtendSize: false }));
    const cells = snake.getCells();
    expect(cells.find((x) => x.equals(new Cell(3, 0)))).toBeTruthy();
  });

  it('should remove tail when no obstacles on the field', () => {
    const snake = new Snake(
      [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0)],
      SnakeDirection.Right
    );
    snake.makeStep((nextCell) => ({ cell: nextCell, isExtendSize: false }));
    const cells = snake.getCells();
    expect(cells.find((x) => x.equals(new Cell(0, 0)))).toBeFalsy();
  });

  it('should add new cell, when apple on the path', () => {
    const snake = new Snake(
      [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0)],
      SnakeDirection.Right
    );
    snake.makeStep((nextCell) => ({ cell: nextCell, isExtendSize: true }));
    const cells = snake.getCells();
    expect(cells.find((x) => x.equals(new Cell(3, 0)))).toBeTruthy();
  });

  it('should remain old cells, when apple on the path', () => {
    const snake = new Snake(
      [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0)],
      SnakeDirection.Right
    );
    snake.makeStep((nextCell) => ({ cell: nextCell, isExtendSize: true }));
    const cells = snake.getCells();
    expect(cells.find((x) => x.equals(new Cell(0, 0)))).toBeTruthy();
  });

  it('should contain collision, when it ocurred', () => {
    const snake = new Snake(
      [new Cell(0, 0), new Cell(1, 0), new Cell(1, 1), new Cell(0, 1)],
      SnakeDirection.Up
    );
    snake.makeStep((nextCell) => ({ cell: nextCell, isExtendSize: false }));

    expect(snake.state.hasCollisions).toBeTruthy();
  });
});
