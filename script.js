
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
    this.updateDisplay();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '0';
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
      return;
    }
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {

    if (this.currentOperandTextElement.innerText.includes('.') && number === '.') return;

    if (this.resetFlag || this.currentOperand === 0) {
      this.currentOperand = `${number}`;
      this.resetFlag = false;
      return;
    }

    if (this.currentOperand === '0' && number != '.' && this.currentOperand !== '0.') {
      this.currentOperand = `${number}`;
      return;
    } else if ((this.currentOperand == 'NaN' || this.resetFlag) && this.currentOperand !== '0.' && this.currentOperand != 0) {
      this.clear();
      this.currentOperand = `${number}`
      this.resetFlag = false;
      return;
    } else {
      this.currentOperand = `${this.currentOperand}${number}`;
    }
  }

  chooseOperation(operation) {
    debugger;
    if (this.previousOperand !== '' && this.operation != undefined && this.currentOperand == '') {
      this.operation = operation;
      this.updateDisplay();
      return;
    } else if (this.previousOperand !== '') {
      this.compute();
      this.resetFlag = false;
    }

    if (this.currentOperand == '0' && operation == '-') {
      this.currentOperand = '-'
      return;
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';

  }

  compute() {
    let calculation;

    switch(this.operation) {

      case '+':
        calculation = +this.previousOperand + +this.currentOperand;
        break;

      case '-':
        calculation = +this.previousOperand - +this.currentOperand;
        break;

      case '*':
        calculation = +this.previousOperand * +this.currentOperand;
        break;

      case '÷':
        calculation = +this.previousOperand / +this.currentOperand;
        break;

      case '^':
        calculation = (+this.previousOperand) ** +this.currentOperand;
        break;

      default:
        return;
    }
    this.previousOperand = '';
    calculation = Math.round(calculation*1000000)/1000000;
    this.currentOperand = calculation.toString();
    this.operation = undefined;
    this.resetFlag = true;
  }

  plusminus() {
    if (this.currentOperand == '') return;
    this.currentOperand = -this.currentOperand;
  }


  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand}${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }

  updateCurrentDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
  }

  root() {
    if (this.currentOperand < 0) {
      this.currentOperand = 'ERROR'
      return;
    }

    if (this.currentOperand == '') {
      this.currentOperand = NaN;
      this.resetFlag = true;
      return;
    }

    this.currentOperand = Math.sqrt(+this.currentOperand);
    this.resetFlag = true;

  }



}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const plusMinusButton = document.querySelector('[data-plusminus]');
const rootButton = document.querySelector('[data-root]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach( button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateCurrentDisplay();
  })
})

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

operationButtons.forEach( button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

plusMinusButton.addEventListener('click', () => {
  calculator.plusminus();
  calculator.updateCurrentDisplay();
})

rootButton.addEventListener('click', () => {
  calculator.root();
  calculator.updateDisplay();
})



