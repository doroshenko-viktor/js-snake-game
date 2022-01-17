import SnakeDirection from './snake-direction';
import snakeUtils from './snake-utils';

describe('isOppositeDirection tests', () => {
  it('should return true when directions are opposite', () => {
    const result = snakeUtils.isOppositeDirection(
      SnakeDirection.Down,
      SnakeDirection.Up
    );
    expect(result).toBeTruthy();
  });

  it('should return false when directions are not opposite', () => {
    const result = snakeUtils.isOppositeDirection(
      SnakeDirection.Left,
      SnakeDirection.Up
    );
    expect(result).toBeFalsy();
  });
});

describe('direction check tests', () => {
  it('should return true when direction right', () => {
    const result = snakeUtils.isMoveRight(SnakeDirection.Right);
    expect(result).toBeTruthy();
  });
  it('should return true when direction left', () => {
    const result = snakeUtils.isMoveLeft(SnakeDirection.Left);
    expect(result).toBeTruthy();
  });
  it('should return true when direction up', () => {
    const result = snakeUtils.isMoveUp(SnakeDirection.Up);
    expect(result).toBeTruthy();
  });
  it('should return true when direction down', () => {
    const result = snakeUtils.isMoveDown(SnakeDirection.Down);
    expect(result).toBeTruthy();
  });

  it('should return false when direction is not right', () => {
    const result = snakeUtils.isMoveRight(SnakeDirection.Left);
    expect(result).toBeFalsy();
  });
  it('should return false when direction is not left', () => {
    const result = snakeUtils.isMoveLeft(SnakeDirection.Up);
    expect(result).toBeFalsy();
  });
  it('should return false when direction is not up', () => {
    const result = snakeUtils.isMoveUp(SnakeDirection.Down);
    expect(result).toBeFalsy();
  });
  it('should return false when direction is not down', () => {
    const result = snakeUtils.isMoveDown(SnakeDirection.Up);
    expect(result).toBeFalsy();
  });
});
