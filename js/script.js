import {
   DEBOUNCE_DELAY,
   EASTER_EGG_TEXT,
   FORBIDDEN_WORDS,
   TOKENS_MAP
} from './constants.js';
import {
   checkboxElement,
   copyBtns,
   decodeFormEl,
   decodeInputEl,
   decodeResultEl,
   encodeFormEl,
   encodeInputEl,
   encodeResultEl,
   tabBtns,
   tooltipBoxes
} from './elements.js';
import { debounce, filterPaste, openTab, toggleTooltip, tokenize } from './helpers.js';

tabBtns.forEach(btn => {
   btn.addEventListener('click', openTab);
});

copyBtns.forEach(btn => {
   btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.previousElementSibling.innerText);
   });
});

tooltipBoxes.forEach(box => {
   box.addEventListener('mouseenter', e => toggleTooltip(true, e));
   box.addEventListener('mouseleave', e => toggleTooltip(false, e));
});

encodeFormEl.addEventListener('submit', e => e.preventDefault());
encodeFormEl.addEventListener('input', () => {
   const text = checkboxElement.checked
      ? encodeInputEl.value
      : filterPaste(encodeInputEl.value);
   encodeInputEl.value = text;
   if (EASTER_EGG_TEXT.includes(text)) {
      encodeResultEl.classList.add('rainbow');
   } else {
      encodeResultEl.classList.remove('rainbow');
   }
   generateSequence(text);
});

decodeFormEl.addEventListener('submit', e => e.preventDefault());
decodeFormEl.addEventListener('input', () => {
   evaluateSequence(decodeInputEl.value.trim());
});

const generateSequence = debounce(text => {
   if (!text) {
      encodeResultEl.innerText = '';
      return;
   }
   const tokens = tokenize(text);
   const translated = tokens.map(token => TOKENS_MAP[token] || `'${token}'`).join('+');
   encodeResultEl.innerText = translated;
}, DEBOUNCE_DELAY);
const evaluateSequence = debounce(text => {
   if (!text) {
      decodeResultEl.innerText = '';
      return;
   }
   for (const word of FORBIDDEN_WORDS) {
      if (text.toLowerCase().includes(word.toLowerCase())) {
         decodeResultEl.innerHTML = `<span class="wtf">Wtf, dude...</span>`;
         return;
      }
   }
   try {
      decodeResultEl.innerText = eval(text);
   } catch (error) {
      decodeResultEl.innerHTML = `<span class="error">${error.message}</span>`;
   }
}, DEBOUNCE_DELAY);
