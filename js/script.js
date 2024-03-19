import { TOKENS_MAP } from './constants.js';
import { filterPaste, tokenize } from './helpers.js';

const resultElement = document.getElementById('result');
const inputElement = document.getElementById('prompt');
const formElement = document.getElementById('form');
const checkboxElement = document.getElementById('allow_missing');
const copyBtn = document.getElementById('copy');

copyBtn.addEventListener('click', () => {
   navigator.clipboard.writeText(resultElement.innerText);
});
formElement.addEventListener('submit', e => e.preventDefault());
formElement.addEventListener('input', () => {
   const text = checkboxElement.checked
      ? inputElement.value
      : filterPaste(inputElement.value);
   inputElement.value = text;
   generateSequence(text);
});

const generateSequence = text => {
   if (!text) {
      resultElement.innerText = '';
      return;
   }
   const tokens = tokenize(text);
   const translated = tokens.map(token => TOKENS_MAP[token] || `'${token}'`).join('+');
   resultElement.innerText = translated;
};
