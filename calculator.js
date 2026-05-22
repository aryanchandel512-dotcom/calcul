const display = document.getElementById('display');
const expression = document.getElementById('expression');
 
function inputType(value) {
    if (display.value === 'Error') clearDisplay();
    display.value += value;
}
 
function clearDisplay() {
    display.value = '';
    expression.textContent = '';
}
 
function deleteLast() {
    if (display.value === 'Error') {
        clearDisplay();
        return;
    }
    display.value = display.value.slice(0, -1);
}
 
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Error" : a / b; }
 
function calculate() {
    let raw = display.value.trim();
    if (!raw || raw === 'Error') return;
 
    let expr = raw
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/−/g, '-')
        .replace(/\s+/g, '');
 
    if (!/^[0-9+\-*/.]+$/.test(expr)) {
        display.value = 'Error';
        return;
    }
 
    expression.textContent = raw + ' =';
 
    try {
        let result = Function('"use strict"; return (' + expr + ')')();
        if (!isFinite(result) || isNaN(result)) {
            display.value = 'Error';
        } else {
            display.value = parseFloat(result.toPrecision(12)).toString();
        }
    } catch {
        display.value = 'Error';
    }
}
 
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') inputType(e.key);
    else if (e.key === '.') inputType('.');
    else if (e.key === '+') inputType('+');
    else if (e.key === '-') inputType('-');
    else if (e.key === '*') inputType('*');
    else if (e.key === '/') { e.preventDefault(); inputType('/'); }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Backspace') deleteLast();
    else if (e.key === 'Escape') clearDisplay();
});
 