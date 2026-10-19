class Calculator {
  constructor(prevEl, currEl) {
    this.previousOperandElement = prevEl;
    this.currentOperandElement = currEl;
    this.clear();
  }
  clear() { this.currentOperand = ''; this.previousOperand = ''; this.operation = undefined; }
  delete() { this.currentOperand = this.currentOperand.toString().slice(0,-1); }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '+': computation = prev + curr; break;
      case '-': computation = prev - curr; break;
      case '×': computation = prev * curr; break;
      case '÷': computation = prev / curr; break;
      default: return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }
  computeFunction(action) {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    let result;
    switch(action) {
      case 'sqrt': result = Math.sqrt(current); this.previousOperand = `√(${current})`; break;
      case 'pow': result = Math.pow(current, 2); this.previousOperand = `(${current})²`; break;
      case 'percent': result = current / 100; this.previousOperand = `${current}%`; break;
      default: return;
    }
    this.currentOperand = Math.round(result * 1e12) / 1e12;
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) { integerDisplay = ''; } else { integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0}); }
    if (decimalDigits != null) { return `${integerDisplay}.${decimalDigits}`; } else { return integerDisplay; }
  }
  updateDisplay() {
    this.currentOperandElement.innerText = this.currentOperand === '' ? '0' : this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else if (this.previousOperand !== '') {
      this.previousOperandElement.innerText = this.previousOperand;
    } else { this.previousOperandElement.innerText = ''; }
  }
}
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('pressed'); setTimeout(()=>button.classList.remove('pressed'),100);
    if (button.dataset.number) { calculator.appendNumber(button.dataset.number); }
    else if (button.dataset.operation) { calculator.chooseOperation(button.dataset.operation); }
    else if (button.dataset.action) {
      const act = button.dataset.action;
      if (act === 'clear') calculator.clear();
      else if (act === 'delete') calculator.delete();
      else if (act === 'calculate') calculator.compute();
      else calculator.computeFunction(act);
    }
    calculator.updateDisplay();
  });
});
