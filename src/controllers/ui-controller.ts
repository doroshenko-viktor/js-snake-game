import { OccupationType } from "../types";
import { APP_ID } from "../configuration/constants";
import { FieldCell, FieldRow, Field } from "../models/field";


const getAppElement = () => {
    return document.getElementById(APP_ID) as HTMLDivElement;
};

const createCell = (gameCell: FieldCell) => {
    const cell = document.createElement('div');
    if (gameCell.occupation === OccupationType.Snake) {
        cell.classList.add("snake-selected");
    } else if (gameCell.occupation === OccupationType.Target) {
        cell.classList.add("target-selected");
    }
    return cell;
};

const createRow = (gameRow: FieldRow) => {
    const rowElement = document.createElement('div');
    gameRow.cells.forEach(cell => {
        const cellElement = createCell(cell);
        rowElement.appendChild(cellElement);
    });
    rowElement.classList.add("field-row");
    return rowElement;
};

const renderField = (app: HTMLDivElement, gameField: Field) => {
    app.innerHTML = '';
    const fieldElement = document.createElement('div');
    fieldElement.classList.add('field');

    gameField.rows.forEach(row => {
        const rowElement = createRow(row);
        fieldElement.appendChild(rowElement);
    });

    app.appendChild(fieldElement);
};

export default { getAppElement, renderField };