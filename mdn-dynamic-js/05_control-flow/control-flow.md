# Control Flow

## Conditionals

if else same as java

```js
if (condition) {
  /* code to run if condition is true */
} else {
  /* run some other code instead */
}
```

Note taht we can evaluate certain objects as `false` in `if (object){...}`. These values are `false`, `undefined`, `null`, `0`, `NaN`, `''` (empty string)

```js
//compact syntax for simple conditionals
condition ? run this code : run this code instead

// Function calls
select.addEventListener("change", () =>
  select.value === "black"
    ? update("black", "white")
    : update("white", "black")
);
```

Logical operators `&&` for AND, `||` for OR, and `!` for NOT

`switch` and `break` same as in Java

## Loops

Loops execute repetitive code efficiently without duplication. Essential for processing collections and running similar operations multiple times.

## Loop Types Overview

1. `for...of` Loop (Collection Iteration)

Iterating through arrays, sets, maps when you don't need index access.

```js
const cats = ["Leopard", "Serval", "Jaguar", "Tiger", "Caracal", "Lion"];

for (const cat of cats) {
  console.log(cat);
}
```

2. Array Methods: `map()` and `filter()`

**`map()`** - Transform each element, return new array:
```js
const cats = ["Leopard", "Serval", "Jaguar", "Tiger", "Caracal", "Lion"];
const upperCats = cats.map(cat => cat.toUpperCase());
// Result: ["LEOPARD", "SERVAL", "JAGUAR", "TIGER", "CARACAL", "LION"]
```

**`filter()`** - Select elements based on condition:
```js
const filtered = cats.filter(cat => cat.startsWith("L"));
// Result: ["Leopard", "Lion"]
```

3. Standard `for` Loop

**Best for:** When you need a counter, specific number of iterations, or index access.

```js
// Syntax
for (initializer; condition; final-expression) {
  // code to run
}

// Example: Calculate squares
for (let i = 1; i < 10; i++) {
  console.log(`${i} x ${i} = ${i * i}`);
}
```

**Looping through arrays with index:**
```js
const cats = ["Pete", "Biggles", "Jasmine"];
let myFavoriteCats = "My cats are called ";

for (let i = 0; i < cats.length; i++) {
  if (i === cats.length - 1) {
    myFavoriteCats += `and ${cats[i]}.`;
  } else {
    myFavoriteCats += `${cats[i]}, `;
  }
}
// Result: "My cats are called Pete, Biggles, and Jasmine."
```

4. `while` Loop
**Best for:** When iteration count is unknown, condition-based loops.

```js
// Syntax
initializer
while (condition) {
  // code to run
  final-expression
}

// Example
let i = 0;
while (i < cats.length) {
  console.log(cats[i]);
  i++;
}
```

5. `do...while` Loop
**Key difference:** Code executes at least once before condition check.

```js
// Syntax
initializer
do {
  // code to run
  final-expression
} while (condition)

// Example
let i = 0;
do {
  console.log(cats[i]);
  i++;
} while (i < cats.length);
```

### Loop Control Statements

#### `break` - Exit Loop Early
```js
// Search example
for (const contact of contacts) {
  const splitContact = contact.split(":");
  if (splitContact[0].toLowerCase() === searchName) {
    para.textContent = `${splitContact[0]}'s number is ${splitContact[1]}.`;
    break; // Exit loop when found
  }
}
```

#### `continue` - Skip Current Iteration
```js
// Find perfect squares
for (let i = 1; i <= num; i++) {
  let sqRoot = Math.sqrt(i);
  if (Math.floor(sqRoot) !== sqRoot) {
    continue; // Skip non-perfect squares
  }
  console.log(i); // Only perfect squares printed
}
```

1. **Avoid infinite loops:** Always ensure the condition will eventually become false
2. **`for...of` vs `for`:** Use `for...of` when possible to avoid index errors
3. **Performance:** `for...of` and array methods are generally more readable
4. **Index access:** Use standard `for` loop when you need to know the current position

### Common Patterns

**Canvas drawing (fixed iterations):**
```js
for (let i = 0; i < 100; i++) {
  // Draw circle at random position
  ctx.arc(random(canvas.width), random(canvas.height), random(50), 0, 2 * Math.PI);
}
```

**Search pattern with break:**
```js
for (const item of collection) {
  if (item.matches(criteria)) {
    // Found it!
    result = item;
    break;
  }
}
```

**Processing with continue:**
```js
for (const item of collection) {
  if (!item.isValid()) {
    continue; // Skip invalid items
  }
  // if invalid, then skip this code block
  // Process valid item
}
```
