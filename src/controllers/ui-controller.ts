import { APP_ID } from '../configuration/constants';
import GameStatus from '../enums/game-status';
import OccupationType from '../enums/occupation-type';
import { FieldCell, FieldRow, Field } from '../models/field/field';

const getAppElement = () => {
  return document.getElementById(APP_ID) as HTMLDivElement;
};

const createCell = (gameCell: FieldCell) => {
  const cell = document.createElement('div');
  if (gameCell.occupation === OccupationType.Snake) {
    cell.classList.add('snake-selected');
  } else if (gameCell.occupation === OccupationType.Target) {
    cell.classList.add('target-selected');
  }
  return cell;
};

const createRow = (gameRow: FieldRow) => {
  const rowElement = document.createElement('div');
  gameRow.cells.forEach((cell) => {
    const cellElement = createCell(cell);
    rowElement.appendChild(cellElement);
  });
  rowElement.classList.add('field-row');
  return rowElement;
};

const renderField = (app: HTMLDivElement, gameField: Field) => {
  app.innerHTML = '';
  const fieldElement = document.createElement('div');
  fieldElement.classList.add('field');

  gameField.rows.forEach((row) => {
    const rowElement = createRow(row);
    fieldElement.appendChild(rowElement);
  });

  app.appendChild(fieldElement);
};

const renderStatus = (app: HTMLDivElement, status: GameStatus) => {
  app.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.innerText = status === GameStatus.Win ? 'Win' : 'Lose';
  app.appendChild(h2);
};

export default { getAppElement, renderField, renderStatus };
