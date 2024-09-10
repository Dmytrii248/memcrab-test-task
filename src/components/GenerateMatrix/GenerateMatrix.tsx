import { ChangeEvent, FC, FormEvent, useContext } from "react";
import { StoreContext } from "../../store";
import { lowerMatrixLimit, upperMatrixLimit } from "../../constants";
import { generateMatrix } from "../../utils";

import "./styles.css";

export const GenerateMatrix: FC = () => {
  const { M, N, setM, setN, setX, setMatrix } = useContext(StoreContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = parseInt(value);

    if (!newValue) return;

    if (name === "M") {
      setM(newValue);
    } else if (name === "N") {
      setN(newValue);
    }
  };

  return (
    <div>
      <h2>Generate Matrix</h2>
      <form
        className="generate-matrix-form"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const X = parseInt(formData.get("X") as string);

          setX(X);
          setMatrix(generateMatrix({ M, N }));
        }}
      >
        <div className="generate-matrix-form__input-section">
          <label className="generate-matrix-form__label">Enter M:</label>
          <input
            className="generate-matrix-form__input"
            type="number"
            name="M"
            value={M}
            required
            onChange={handleChange}
            min={lowerMatrixLimit}
            max={upperMatrixLimit}
          />
        </div>
        <div className="generate-matrix-form__input-section">
          <label className="generate-matrix-form__label">Enter N:</label>
          <input
            className="generate-matrix-form__input"
            type="number"
            name="N"
            value={N}
            required
            onChange={handleChange}
            min={lowerMatrixLimit}
            max={upperMatrixLimit}
          />
        </div>
        <div className="generate-matrix-form__input-section">
          <label className="generate-matrix-form__label">Enter X:</label>
          <input
            className="generate-matrix-form__input"
            type="number"
            name="X"
            required
            defaultValue={0}
            min={0}
            max={M * N - 1}
          />
        </div>

        <button className="generate-matrix-form__submit-button" type="submit">
          Generate
        </button>
      </form>
    </div>
  );
};
