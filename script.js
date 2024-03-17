const SYMBOLS = Array.from(' -0123456789NOabcdefijlnorstu[]');
const TOKENS = {
   undefined: /^undefined/,
   false: /^false/,
   true: /^true/,
   '[object Object]': /^\[object Object\]/,
   NaN: /^NaN/
};
const TOKENS_MAP = {
   '[]': '[]',
   undefined: '[][[]]+[]',
   false: '(![]+[])',
   true: '(!![]+[])',
   '[object Object]': '({}+[])',
   NaN: '([]+ +[!+[]])',
   ' ': '({}+[])[(-~+[]<<-~-~-~+[])-!+[]]',
   '-': '(~+[]+[])[+[]]',
   1: '(+!+[])',
   2: '(-~+!+[])',
   3: '(-~-~+!+[])',
   4: '(+!+[]<<-~-~+[])',
   5: '(-~-~-~-~-~+[])',
   6: '(-~-~-~-~-~-~+[])',
   7: '(-~+[]<<-~-~-~+[])-!+[])',
   8: '(+!+[]+[+[]]-(-~-~+[]))',
   9: '(+!+[]+[+[]]-!+[])',
   0: '(+[])',
   N: '([]+ +[!+[]])[+[]]',
   O: '({}+[])[-~+[]<<-~-~-~+[]]',
   a: '(![]+[])[-~+[]]',
   b: '({}+[])[-~+!+[]]',
   c: '({}+[])[-~-~-~-~-~+[]]',
   d: '([][[]]+[])[+!+[]+[+[]]-(-~-~+[])]',
   e: '(!![]+[])[-~-~+!+[]]',
   f: '(![]+[])[+[]]',
   i: '([][[]]+[])[-~-~-~-~-~+[]]',
   j: '({}+[])[-~-~-~+[]]',
   l: '(![]+[])[-~-~+[]]',
   n: '([][[]]+[])[+!+[]]',
   o: '({}+[])[+!+[]]',
   r: '(!![]+[])[+!+[]]',
   s: '(![]+[])[-~-~-~+[]]',
   t: '(!![]+[])[+[]]',
   u: '([][[]]+[])[+[]]',
   '[': '({}+[])[+[]]',
   ']': '({}+[])[+!+[]+[]+(+!+[]<<-~-~+[])]'
};
const resultElement = document.getElementById('result');
const inputElement = document.getElementById('prompt');
const copyBtn = document.getElementById('copy');
let inputValue = '';

copyBtn.addEventListener('click', () => {
   navigator.clipboard.writeText(resultElement.innerText);
});

inputElement.addEventListener('input', e => {
   if (e.inputType !== 'insertText' || SYMBOLS.includes(e.data)) {
      inputValue = e.target.value;
      generateSequence(inputValue);
      return;
   }
   e.target.value = inputValue;
});

const tokenize = text => {
   const tokens = ['[]'];
   while (text) {
      let wasDetected = false;
      Object.entries(TOKENS).forEach(([name, regex]) => {
         if (text.match(regex) && !wasDetected) {
            tokens.push(name);
            text = text.slice(name.length);
            wasDetected = true;
         }
      });
      if (!wasDetected) {
         tokens.push(text[0]);
         text = text.slice(1);
      }
   }
   return tokens;
};

const generateSequence = text => {
   if (!text) {
      resultElement.innerText = '';
      return;
   }
   const tokens = tokenize(text);
   const translated = tokens.map(token => TOKENS_MAP[token]).join('+');
   resultElement.innerText = translated;
};
