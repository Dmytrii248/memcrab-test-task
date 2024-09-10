import { FC, useContext } from "react";
import { Cell } from "../../types";
import { StoreContext } from "../../store";
import { getHeatmapColor } from "../../utils";

import "./styles.css";

interface IProps {
  cell: Cell;
  isHovered: boolean;
  isPercentageMode: boolean;
  rowSum: number;
  onMouseLeave: VoidFunction;
  onMouseEnter: VoidFunction;
}

export const MatrixCell: FC<IProps> = ({
  cell,
  isHovered,
  isPercentageMode,
  rowSum,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { setMatrix } = useContext(StoreContext);

  const increaseAmount = (id: number) => {
    setMatrix((prev) =>
      prev.map((row) =>
        row.map((cell) =>
          cell.id === id ? { ...cell, amount: cell.amount + 1 } : cell
        )
      )
    );
  };

  const percentage = (cell.amount / rowSum) * 100;

  return (
    <td
      className="matrix-cell pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => increaseAmount(cell.id)}
      style={{
        backgroundColor: isHovered
          ? "#9de99e"
          : isPercentageMode
          ? getHeatmapColor(percentage)
          : "transparent",
        color: isPercentageMode && percentage > 50 ? "#fff" : "#000",
      }}
    >
      {isPercentageMode ? `${percentage.toFixed(1)}%` : cell.amount}
    </td>
  );
};
