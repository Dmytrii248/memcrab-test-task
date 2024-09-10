import { FC, useContext, useState } from "react";
import { StoreContext } from "../../store";
import { generateMatrixRow, getColumnsHalfAmount } from "../../utils";
import { MatrixCell } from "../MatrixCell/MatrixCell";
import { MatrixRow } from "../MatrixRow/MatrixRow";
import { upperMatrixLimit } from "../../constants";

import "./styles.css";

export const RenderMatrix: FC = () => {
  const { setMatrix, setM, setN, setX, N, X, matrix } =
    useContext(StoreContext);

  const [highlightedCells, setHighlightedCells] = useState<number[]>([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const regenerateMatrix = () => {
    setMatrix([]);
    setM(1);
    setN(1);
    setX(1);
  };

  const addNewMatrixRow = () => {
    setMatrix((prev) => [
      ...prev,
      generateMatrixRow({ N, rowIndex: matrix.length }),
    ]);
  };

  const handleMouseEnterCell = (hoveredCellAmount: number) => {
    const sortedByClosest = matrix
      .flat()
      .map((cell) => ({
        ...cell,
        distance: Math.abs(cell.amount - hoveredCellAmount),
      }))
      .sort((a, b) => a.distance - b.distance);

    const closestCells = sortedByClosest.slice(1, X + 1).map((cell) => cell.id);

    setHighlightedCells(closestCells);
  };

  const handleMouseLeaveCell = () => {
    setHighlightedCells([]);
  };

  const handleMouseEnterSumCell = (rowIndex: number) => {
    setHoveredRowIndex(rowIndex);
  };

  const handleMouseLeaveSumCell = () => {
    setHoveredRowIndex(null);
  };

  const getIsHoveredCell = (id: number) => highlightedCells.includes(id);

  return (
    <div>
      <div>X = {X}</div>
      <button className="action-button" onClick={regenerateMatrix}>
        Regenerate matrix
      </button>
      <button
        className="action-button"
        onClick={addNewMatrixRow}
        disabled={matrix.length >= upperMatrixLimit}
      >
        Add new row
      </button>
      <table className="matrix-table">
        <thead>
          <tr>
            <th className="matrix-table__header">-</th>
            {Array.from({ length: N }).map((_, index) => (
              <th className="matrix-table__header" key={index}>
                Cell Values N = {index + 1}
              </th>
            ))}
            <th className="matrix-table__header">Sum Values</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => {
            const rowSum = row.reduce(
              (acc, current) => acc + current.amount,
              0
            );
            return (
              <MatrixRow
                key={rowIndex}
                rowIndex={rowIndex}
                rowSum={rowSum}
                onMouseEnterSumColumn={() => handleMouseEnterSumCell(rowIndex)}
                onMouseLeaveSumColumn={handleMouseLeaveSumCell}
              >
                {row.map((cell) => (
                  <MatrixCell
                    cell={cell}
                    key={cell.id}
                    rowSum={rowSum}
                    isPercentageMode={hoveredRowIndex === rowIndex}
                    isHovered={getIsHoveredCell(cell.id)}
                    onMouseLeave={handleMouseLeaveCell}
                    onMouseEnter={() => handleMouseEnterCell(cell.amount)}
                  />
                ))}
              </MatrixRow>
            );
          })}
          <tr>
            <td className="matrix-cell bold custom-header">50 percentile</td>
            {Array.from({ length: N }).map((_, index) => (
              <td className="matrix-cell" key={index}>
                {getColumnsHalfAmount(index, matrix)}
              </td>
            ))}
            <td className="matrix-cell">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
