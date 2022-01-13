/**
 *Interfaces, which define behavior of objects, which may be
 *placed on the field
 */

/**
 * Represents behavior of 2D cell
 */
export interface ICell {
  /**
   * Get current `x` coordinate value
   */
  get x(): number;
  /**
   * Set `x` coordinate value
   */
  set x(value: number);
  /**
   * Get current `y` coordinate value
   */
  get y(): number;
  /**
   * Set `y` coordinate value
   */
  set y(value: number);
}

/**
 * Represents behavior of multidimensional object,
 * which may be represented as a collection of cells
 * with coordinates
 */
export interface IShape {
  /**
   * Get all shape cells as an array
   */
  getCells(): ICell[];
}
