import SnakeDirection from './snake-direction';

/**
 * Check if two directions are opposite
 * @param direction1
 * @param direction2
 * @returns boolean
 */
function isOppositeDirection(
  direction1: SnakeDirection,
  direction2: SnakeDirection
) {
  return (
    (direction1 === SnakeDirection.Up && direction2 === SnakeDirection.Down) ||
    (direction1 === SnakeDirection.Down && direction2 === SnakeDirection.Up) ||
    (direction1 === SnakeDirection.Left &&
      direction2 === SnakeDirection.Right) ||
    (direction1 === SnakeDirection.Right && direction2 === SnakeDirection.Left)
  );
}

/**
 * Check if move is to the right
 * @param direction
 * @returns
 */
function isMoveRight(direction: SnakeDirection) {
  return direction === SnakeDirection.Right;
}

/**
 * Check if move is to the left
 * @param direction
 * @returns
 */
function isMoveLeft(direction: SnakeDirection) {
  return direction === SnakeDirection.Left;
}

/**
 * Check if move is up
 * @param direction
 * @returns
 */
function isMoveUp(direction: SnakeDirection) {
  return direction === SnakeDirection.Up;
}

/**
 * Check if move down
 * @param direction
 * @returns
 */
function isMoveDown(direction: SnakeDirection) {
  return direction === SnakeDirection.Down;
}

export default {
  isOppositeDirection,
  isMoveDown,
  isMoveLeft,
  isMoveRight,
  isMoveUp
};
