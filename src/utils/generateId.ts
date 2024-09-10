export const generateId = ({
  rowIndex,
  cellIndex,
}: {
  rowIndex?: number;
  cellIndex?: number;
}) =>
  Number(
    `${Date.now().toString().slice(-6)}${rowIndex ?? ""}${cellIndex ?? ""}`
  );
