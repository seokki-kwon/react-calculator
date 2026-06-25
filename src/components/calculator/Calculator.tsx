import { useReducer, useState } from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";
import calculatorReducer, { type CalculatorState } from "../../context/CalculatorReducer";

const buttons = [
  "C",
  "(",
  ")",
  "/",

  "7",
  "8",
  "9",
  "*",

  "4",
  "5",
  "6",
  "-",

  "1",
  "2",
  "3",
  "+",

  "0",
  ".",
  "=",
  ""
];

export default function Calculator() {
  const initialState: CalculatorState = {
    result: 0,
    postfix: [],
    buffer: [],
    expression: ""
  }

  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  const handleClick = (value: string) => {    
    if (value == 'C') {
        dispatch(({ type: "RESET" }))
    } else if (value.length == 0 ) {
        dispatch(({ type: "DELETE" }))
    } else if (value == '=') {
        dispatch(({ type: "CALCULATE" }))
    } else {
        dispatch(({type: "INPUT", payload: value }))
    }    
  };

  return (
    <div className="w-full max-w-md p-6">
      <div className="rounded-2xl bg-slate-200 p-4 shadow-sm">
        <CalculatorDisplay value={state.expression} />

        <div className="mt-4 grid grid-cols-4 gap-3">
          {buttons.map((button) => (
            <CalculatorButton
              key={button}
              label={button}
              onClick={() => handleClick(button)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}