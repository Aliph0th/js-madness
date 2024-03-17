const SYMBOLS = Array.from(' -0123456789NOabcdefijlnorstu[]');

const resultElement = document.getElementById('result');
const inputElement = document.getElementById('prompt');
let inputValue = '';

inputElement.addEventListener('input', e => {
   if (e.inputType !== 'insertText' || SYMBOLS.includes(e.data)) {
      inputValue = e.target.value;
      generateSequence(inputValue);
      return;
   }
   e.target.value = inputValue;
});

const generateSequence = text => {
   // TODO:
};
