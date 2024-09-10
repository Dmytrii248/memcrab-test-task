import { Dispatch, SetStateAction } from "react";
import { Matrix } from "./matrix";

export type TStore = {
  M: number;
  N: number;
  X: number;
  matrix: Matrix;
  setM: Dispatch<SetStateAction<number>> | VoidFunction;
  setN: Dispatch<SetStateAction<number>> | VoidFunction;
  setX: Dispatch<SetStateAction<number>> | VoidFunction;
  setMatrix: Dispatch<SetStateAction<Matrix>> | VoidFunction;
};
