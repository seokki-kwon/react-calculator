import { useReducer } from "react";

const initialState = { 
    result: 0, // 계산 결과값 저장
    postfix: [] as string[], // 후위표현식으로 변환된 결과를 저장할 임시 배열
    buffer: [] as string[], // 연산자를 저장할 임시 버퍼
    expression: "" // 계산 결과를 보여주기 위한 공간
};

export interface CalculatorState {
    result: number
    postfix: string[]
    buffer: string[]
    expression: string
}

export type CalulatorPayload = {}

export type CalculatorAction = 
    |    {type: "INPUT", payload: string}
    |    {type: "DELETE"}
    |    {type: "CALCULATE"}
    |    {type: "RESET"}

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
    switch (action.type) {
        case "CALCULATE":            
            return { ...state, expression: "err" } 
        case "DELETE":
            return { ...state, expression: state.expression.slice(0, -1) }
        case "INPUT":
            return { ...state, expression: state.expression + action.payload }
        case "RESET":
            return { ...state, result: 0 }
    }
}

// 결과를 계산하고 반환하는 함수
function calculate(expression: string[]): number {
    return 0;
} 

// 중위표현식을 후위표현식으로 변환하는 함수
function convertToPostfilxExpression(expression:string[]): string[] {
    return [];
}

export const calculatorActions = {
    add: (payload: string) => ({ type: "INPUT", payload: payload}),
    delete: () => ({ type: "DELETE" }),
    reset: () => ({ type: "RESET" }),
    calculate: () => ({ type: "CALCULATE" })
}

export default calculatorReducer;