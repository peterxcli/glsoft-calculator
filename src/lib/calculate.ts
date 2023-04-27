import Big from "big.js";

export const isNumber = (token: string): boolean => /^\d*\.?\d*$/.test(token);

const getPrecedence = (operator: string): number => {
    switch (operator) {
        case "+":
        case "-":
            return 1;
        case "*":
        case "/":
        case "%":
            return 2;
        default:
            return 0;
    }
};

const infixToPostfix = (infixExpression: string): string[] => {
    const output: string[] = [];
    const operators: string[] = [];

    const tokens = infixExpression.match(/\d+(\.\d+)?|[-+*/%]/g) || [];

    tokens.forEach((token) => {
        if (isNumber(token)) {
            output.push(token);
        } else {
            while (
                operators.length &&
                getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)
            ) {
                output.push(operators.pop() as string);
            }
            operators.push(token);
        }
    });

    while (operators.length) {
        output.push(operators.pop() as string);
    }

    return output;
};

const evaluatePostfix = (postfixExpression: string[]): Big => {
    const stack: Big[] = [];

    postfixExpression.forEach((token) => {
        if (isNumber(token)) {
            stack.push(new Big(token));
        } else {
            const b = stack.pop() as Big;
            const a = stack.pop() as Big;

            switch (token) {
                case "+":
                    stack.push(a.plus(b));
                    break;
                case "-":
                    stack.push(a.minus(b));
                    break;
                case "*":
                    stack.push(a.times(b));
                    break;
                case "/":
                    stack.push(a.div(b));
                    break;
                case "%":
                    stack.push(a.mod(b));
                    break;
            }
        }
    });

    return stack.pop() as Big;
};

const calculateInfixExpression = (infixExpression: string): Big => {
    const postfixExpression = infixToPostfix(infixExpression);
    return evaluatePostfix(postfixExpression);
};

export default calculateInfixExpression;
