function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let expression = expr.match(/[-+*/()]|\d+/g);
  let numStack = [];
  let operatorStack = [];
  let result = 0;
  let priorities = {
    '-': 1,
    '+': 1,
    '/': 2,
    '*': 2,
    '(': 0,
    ')': 0,
  }

  function execOperation(a, operator, b) {
    if (operator === '/' && Number(b) === 0) throw new Error("TypeError: Division by zero.");
    if (operator === '-') return Number(a) - Number(b);
    else if (operator === '+') return Number(a) + Number(b);
    else if (operator === '/') return Number(a) / Number(b);
    else if (operator === '*') return Number(a) * Number(b);
  }

  if (expr.split('(').length != expr.split(')').length) throw new Error('ExpressionError: Brackets must be paired');

  while (expression.length != 0 || operatorStack != 0) {
    let current = expression[0];
    let lastStackedNum = numStack[numStack.length - 1];
    let secondLastStackedNum = numStack[numStack.length - 2];
    let lastStackedOperator = operatorStack[operatorStack.length - 1];

    if (!isNaN(current)) {
      numStack.push(current);
      expression.shift();

    }
    else if (current === ')') {
      while (operatorStack[operatorStack.length - 1] !== '(') {
        result = execOperation(numStack[numStack.length - 2], operatorStack[operatorStack.length - 1], numStack[numStack.length - 1]);
        numStack = numStack.slice(0, -2);
        numStack.push(result);
        operatorStack.pop();
      }

      operatorStack.pop();
      expression.shift();
    }
    else if (operatorStack.length === 0 || current === '(' || priorities[current] > priorities[lastStackedOperator]) {
      operatorStack.push(current);
      expression.shift();
    }

    else {
      result = execOperation(secondLastStackedNum, lastStackedOperator, lastStackedNum);
      numStack = numStack.slice(0, -2);
      numStack.push(result);
      operatorStack.pop();
    }
  }


  return result;
}

module.exports = {
  expressionCalculator
}