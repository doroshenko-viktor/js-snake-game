/**
 * Shows current state of the game
 */
enum GameStatus {
  /**
   * No game status changes since last step
   */
  Continue,
  /**
   * Snake head has a collision with any other snake body cell
   */
  SnakeIntersection,
  /**
   * Game win state
   */
  Win
}

export default GameStatus;
