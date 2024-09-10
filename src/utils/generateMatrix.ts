import { Matrix } from "../types";
import { generateMatrixRow } from "./generateMatrixRow";

export const generateMatrix = ({ M, N }: { M: number; N: number }) => {
  const newMatrix: Matrix = [];

  for (let i = 0; i < M; i++) {
    newMatrix.push(generateMatrixRow({ N, rowIndex: i }));
  }
  return newMatrix;
};
