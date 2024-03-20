import {
   COMPLEX_TOKENS_FILTER,
   DISALLOWED_REGEX,
   FILTER_REGEX,
   SYMBOLS
} from './constants.js';
import { tabBtns, tabs } from './elements.js';

export const tokenize = text => {
   const tokens = ['[]'];
   while (text) {
      let wasDetected = false;
      COMPLEX_TOKENS_FILTER.forEach(regex => {
         const match = text.match(regex)?.[0];
         if (match && !wasDetected) {
            tokens.push(match);
            text = text.slice(match.length);
            wasDetected = true;
         }
      });
      if (wasDetected) {
         continue;
      }
      const disallowed = text.match(DISALLOWED_REGEX)?.[0];
      if (disallowed) {
         tokens.push(disallowed);
         text = text.slice(disallowed.length);
      } else {
         tokens.push(text[0]);
         text = text.slice(1);
      }
   }
   return tokens;
};
export const escaped = string => {
   return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
};
export const filterPaste = text => text.replace(FILTER_REGEX, '');
export const debounce = (fn, ms) => {
   let timeout;
   return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, arguments), ms);
   };
};
export const openTab = e => {
   const tabID = e.target.dataset.tab;
   for (let i = 0; i < tabs.length; i++) {
      tabs[i].setAttribute('hidden', true);
      tabBtns[i].classList.remove('active');
   }

   document.getElementById(tabID).removeAttribute('hidden');
   e.target.classList.add('active');
};
