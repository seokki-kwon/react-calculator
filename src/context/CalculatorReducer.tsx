import { useReducer } from "react";

export interface CalculatorState {
    result: number
    postfix: string[]
    buffer: string[]
    expression: string
    description: string
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
        const result = calculate([...state.buffer]);     
            return { 
                ...state, 
                result: result, 
                expression: result.toString(), 
                buffer: [result.toString()], 
                postfix: [result.toString()]
                } 
        case "DELETE":            
            return { 
                ...state, 
                expression: state.expression.slice(0, -1)                
                }
        case "INPUT":                                 
        const mergeTokens = mergeNumberTokens((state.expression + action.payload).split(''))     
        console.log(mergeTokens, "Merge")
            return { 
                ...state, 
                expression: mergeTokens.join(''), 
                buffer: convertToPostfilxExpression(mergeTokens),
                description: `postfix: ${state.buffer}`
            }
        case "RESET":
            return { 
                ...state, 
                result: 0, 
                buffer: [], 
                expression: "", 
                postfix: [] }
    }
}

// 결과를 계산하고 반환하는 함수
function calculate(tokens: string[]): number {    
    let stackBuffer: string[] = []

    while (tokens.length != 0) {
        let token = tokens.shift() as string        

        if (isDigit(token)) {
            stackBuffer.push(token)
        } else if (stackBuffer.length >= 2) {
            let l = Number(stackBuffer.pop())
            let r = Number(stackBuffer.pop())

            switch (token) {
                case "+":
                    stackBuffer.push((r+l).toString())
                    break
                case "*":
                    stackBuffer.push((r*l).toString())
                    break
                case "/":
                    stackBuffer.push((r/l).toString())
                    break
                case "-":
                    stackBuffer.push((r-l).toString())
                    break
            }
        }                
    } 
    
    return Number(stackBuffer[0])
} 

// 중위표현식을 후위표현식으로 변환하는 함수
function convertToPostfilxExpression(tokens: string[]): string[] {
    let operatorStack: string[] = []
    let postfixTokens: string[] = [];       
    
    while (tokens.length != 0) {
        const token = tokens.shift() as string

        // 닫는 괄호 처리
        if (token == "(") {
            operatorStack.push(token)
            continue
        }
        if (token == ")") {
            while (operatorStack[operatorStack.length - 1] != "(" && 
                   convertToOpvalue(operatorStack[operatorStack.length - 1]) > convertToOpvalue(token) 
                   ) postfixTokens.push(operatorStack.pop() as string)
                   
            operatorStack.pop()
            continue
        }        

        // 연산자 토큰 처리
        if (isDigit(token)) {
            console.log(`add ${token}`)
            postfixTokens.push(token)
        } else if (operatorStack.length > 0 && token != '(') {
            // 버퍼에 존재하는 연산자 우선순위가 높은경우 결과에 반영하고 새로운 연산자를 추가          

            while (operatorStack.length > 0 &&
                   convertToOpvalue(operatorStack[operatorStack.length - 1]) >= convertToOpvalue(token)                 
            ) {
                console.log(`removed ${operatorStack[operatorStack.length - 1]} add ${token}`)
                postfixTokens.push(operatorStack.pop() as string)     
            }
            operatorStack.push(token)
        } else {
            operatorStack.push(token)
        } 
    }    

    while (operatorStack.length != 0) {
        postfixTokens.push(operatorStack.pop() as string)
    }    

    console.log(`Result: ${postfixTokens}`)
     
    return postfixTokens;
}

function mergeNumberTokens(tokens: string[]): string[] {        
    let mergeTokens: string[] = []
    let cursor = 0
 
    for (let i = 0; i < tokens.length; i++) {        
        if (!isDigit(tokens[i])) {                                     
      if (cursor < i) {
    mergeTokens.push(tokens.slice(cursor, i).join(''))
}
            mergeTokens.push(tokens[i])        
            cursor = i + 1;
         }
    }           

    
    if (cursor < tokens.length) mergeTokens.push(tokens.slice(cursor, tokens.length).join(''))
    
    return mergeTokens
}

function isDigit(token: string): boolean {
    return !isNaN(Number(token));
}

function convertToOpvalue(token: string): number {
    switch (token) {
        case '*':
        case '/':
            return 3;
        case '+':
        case '-':
            return 2;
        case '(':
            return 1;
        default:
            return 0;
    }
}

export const calculatorActions = {
    add: (payload: string) => ({ type: "INPUT", payload: payload}),
    delete: () => ({ type: "DELETE" }),
    reset: () => ({ type: "RESET" }),
    calculate: () => ({ type: "CALCULATE" })
}

export default calculatorReducer;