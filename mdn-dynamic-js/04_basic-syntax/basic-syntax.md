# JS Syntax Basics

## Variables

Use `let` keyword ot declare a variable

```js
let varOne
```

Use `=` to initalize variables. You can see you don't need to declare types, as JS is dynamically typed!

```js
varOne = "Chris"
```

Combined:

```js
//prevents redundant redeclaration
let myName = "Chris"
```

Use `camelCase` for variable names.

Constants cannot be reassigned after initialization

```js
const PI = 3.122
//doing PI=2 will no longer work
```

> avoid using `var`, use `let` instead

## Math

JS has only **one** data type for numbers, which is `Number`. This handles integers and decimals the same way!

Casting:
```js
let myNumber = "74";
myNumber += 3;        // "743" (string concatenation!)
typeof myNumber;      // "string"

// Fix with Number() constructor
let myNumber = "74";
myNumber = Number(myNumber) + 3;  // 77 (correct math)
```

Increment:
```js
// post - increment
let num1 = 4;
num1++;    // Returns 4, then increments to 5
num1;      // 5

// pre - increment
let num1 = 4;
++num1;    // Increments to 5, then returns 5

// Post vs pre increment
let i = 5;
console.log(i++); // 5 (then i becomes 6)
console.log(++i); // 7 (i becomes 7 first)
```

### Strict Vs Non-strict inequality

Note that `===` and `!==` are used for strict comparisons

```js
// Use strict equality (===) - compares value AND type
5 === "5";    // false (number vs string)
5 == "5";     // true (converts types - avoid this!)

// Recommended: Always use === and !==
```

## Strings

Use `${}` to embed variables or expressions like

```js
const name = "Chris";
const greeting = `Hello, ${name}`;
console.log(greeting); // "Hello, Chris"
```

Concatenating strings are like
```js
const greeting = "Hello";
const name = "Chris";
console.log(`${greeting}, ${name}`); // "Hello, Chris"
```

Note that JS does autocasting, be careful:
```js
const name = "Front ";
const number = 242;
console.log(name + number); // "Front 242"
```

String Methods:
```js
//length
const browserType = "mozilla";
browserType.length; // 7

//accessing characters
browserType[0]; // "m" (first character)
browserType[browserType.length - 1]; // "a" (last character)

//check if substring exists
const browserType = "mozilla";
browserType.includes("zilla"); // true

//startsWith and endsWith
browserType.startsWith("moz"); // true
browserType.endsWith("zilla"); // true

// finding substrings
const tagline = "MDN - Resources for developers, by developers";
tagline.indexOf("developers"); // 20

//extracting substrings
const browserType = "mozilla";
browserType.slice(1, 4); // "ozi"

//replacement
const browserType = "mozilla";
const updated = browserType.replace("moz", "van"); // "vanilla"
// Original string unchanged: browserType is still "mozilla"
```
> these methods don't modify the original string, only return new strings like in Python. Both JS and Python have immutable strings! use `let` instead of `const` if you need to reassign the variable

## Arrays

```js
const shopping = ["bread", "milk", "cheese", "hummus", "noodles"];
const sequence = [1, 1, 2, 3, 5, 8, 13];
const random = ["tree", 795, [0, 1, 2]]; // Mixed data types

// Multidimensional arrays
const random = ["tree", 795, [0, 1, 2]];
random[2][2]; // Access nested array item

//finding items
const birds = ["Parrot", "Falcon", "Owl"];
console.log(birds.indexOf("Owl")); // 2
console.log(birds.indexOf("Rabbit")); // -1 (not found)
```

Modifying arrays
```js
//appending items
const cities = ["Manchester", "Liverpool"];
// Add to end
cities.push("Cardiff");
cities.push("Bradford", "Brighton"); // Multiple items
// Add to start
cities.unshift("Edinburgh");
// Returns new length, not the array!
const newLength = cities.push("Bristol");

//removing items
// Remove from end
cities.pop(); // Returns removed item
// Remove from start
cities.shift();
// Remove by index
const index = cities.indexOf("Liverpool");
if (index !== -1) {
  cities.splice(index, 1); // Remove 1 item at index
  cities.splice(index, 2); // Remove 2 items starting at index
}
```

Accessing all items
```js
//for loop
const birds = ["Parrot", "Falcon", "Owl"];
for (const bird of birds) {
  console.log(bird);
}

//using map with a function
function double(number) {
  return number * 2;
}
const numbers = [5, 2, 7, 6];
const doubled = numbers.map(double);
console.log(doubled); // [10, 4, 14, 12]

//filter
function isLong(city) {
  return city.length > 8;
}
const cities = ["London", "Liverpool", "Totnes", "Edinburgh"];
const longer = cities.filter(isLong);
console.log(longer); // ["Liverpool", "Edinburgh"]
```

Conversiting between types
```js
//str to array
const cities = data.split(",");

//array to string
// Using join()
const commaSeparated = cities.join(",");
const pipeSeparated = cities.join("|");

// Using toString()
const dogNames = ["Rocket", "Flash", "Bella", "Slugger"];
dogNames.toString(); // "Rocket,Flash,Bella,Slugger"
```