import { FC, ReactNode, useContext } from "react";
import { StoreContext } from "../../store";

import "./styles.css";

interface IProps {
  children: ReactNode;
  rowIndex: number;
  rowSum: number;
  onMouseEnterSumColumn: VoidFunction;
  onMouseLeaveSumColumn: VoidFunction;
}

export const MatrixRow: FC<IProps> = ({
  children,
  rowIndex,
  rowSum,
  onMouseEnterSumColumn,
  onMouseLeaveSumColumn,
}) => {
  const { setMatrix } = useContext(StoreContext);

  const removeRow = () => {
    setMatrix((prev) => prev.filter((_, i) => i !== rowIndex));
  };

  return (
    <tr>
      <td className="matrix-cell bold custom-header">
        Cell Value M = {rowIndex + 1}
      </td>
      {children}
      <td
        className="matrix-cell"
        onMouseEnter={onMouseEnterSumColumn}
        onMouseLeave={onMouseLeaveSumColumn}
      >
        {rowSum}
      </td>
      <td>
        <button className="matrix-table__remove-row-button" onClick={removeRow}>
          Remove row
        </button>
      </td>
    </tr>
  );
};
