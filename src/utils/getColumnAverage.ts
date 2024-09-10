import { Matrix } from "../types";

export const getColumnsHalfAmount = (column: number, matrix: Matrix) =>
  matrix.map((row) => row[column].amount).reduce((acc, cur) => acc + cur, 0) *
  0.5;
