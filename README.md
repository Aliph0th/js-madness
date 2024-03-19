# JavaScript Madness

![Project Screenshot](https://i.imgur.com/czqefLe.png)

This repository contains a generator for JavaScript code sequences similar to the following expression: `({}+[])[+!+[]+(-~-~-~-~+[])]` (this expression equals `c`). Unfortunately, the generator currently supports only a subset of characters, namely: ` -0123456789ABEFINORSabcdefgijlmnoprstuvxy{}()[]`. I hope someone will help me and add to this list.

Each code sequence represents a specific character or value when evaluated in JavaScript.
The generator utilizes a combination of mathematical operation, type conversions, and array indexing to produce the desired code sequences.
