# Date detect range
Prints a human readable version of an array of dates.

## Rules
* two dates print with an "and" inbetween
  * `["2000-05-15", "2000-05-16"]` → 2000-05-15 and 2000-05-16
  * `["2000-05-15", "2000-05-17"]` → 2000-05-15 and 2000-05-17
* more than two dates in a row print with a "to" inbetween
  * `["2000-05-15", "2000-05-16", "2000-05-17"]` → 2000-05-15 to 2000-05-17
  * `["2000-05-15", "2000-05-16", "2000-05-17", "2000-05-20"]` → 2000-05-15 to 2000-05-17, 2000-05-20
* if there are not more than two dates in a row output is the output (ordered)
  * `["2000-05-15", "2000-05-16", "2000-05-18", "2000-05-20"]` → 2000-05-15, 2000-05-16, 2000-05-18, 2000-05-20

## Usage
```js

import  DetectRange from 'date-detect-range'
import 'moment/locale/de'; // localise to german

let dates = ["2000-05-15", "2000-05-16", "2000-05-17"];

let range = new DetectRange(dates).format({
    and: " und ",
    to: " bis ",
    format: "dd D. MMMM",
});

console.log(range); // → Sa 15. Mai bis Mo 17. Mai,  

```
