export enum OccupationType {
  None,
  Snake,
  Target
}

export interface ICell {
  get x(): number;
  set x(value: number);
  get y(): number;
  set y(value: number);
}

export interface IShape {
  getCells(): ICell[];
}

export enum GameStatus {
  Continue,
  SnakeIntersection,
  Win
}
