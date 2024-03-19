import {
   COMPLEX_TOKENS_FILTER,
   DISALLOWED_REGEX,
   FILTER_REGEX,
   SYMBOLS
} from './constants.js';

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
