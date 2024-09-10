import { matrixAmountLimit } from "../constants";
import { Cell } from "../types";
import { generateId } from "./generateId";

export const generateMatrixRow = ({
  N,
  rowIndex,
}: {
  N: number;
  rowIndex?: number;
}) => {
  const row: Cell[] = [];

  for (let i = 0; i < N; i++) {
    const cellValue = Math.floor(Math.random() * matrixAmountLimit) + 1;
    row.push({
      id: generateId({ rowIndex: rowIndex, cellIndex: i }),
      amount: cellValue,
    });
  }

  return row;
};
