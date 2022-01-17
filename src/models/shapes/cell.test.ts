import Cell from './cell';

describe('cell creation tests', () => {
  it('should create valid cell', () => {
    const cell = new Cell(1, 1);
    expect(cell.x).toBe(1);
    expect(cell.y).toBe(1);
  });
});

describe('cell equality tests', () => {
  it('should return true, when two cells are equal', () => {
    const cell1 = new Cell(1, 1);
    const cell2 = new Cell(1, 1);
    const result = cell1.equals(cell2);
    expect(result).toBeTruthy();
  });

  it('should return false, when two cells are not equal', () => {
    const cell1 = new Cell(2, 2);
    const cell2 = new Cell(1, 1);
    const result = cell1.equals(cell2);
    expect(result).toBeFalsy();
  });
});
