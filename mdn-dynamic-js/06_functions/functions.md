# Functions

## Functions vs Methods

- **Functions**: Standalone callable code blocks
- **Methods**: Functions that are part of objects

Both serve similar purposes but methods belong to specific objects.

## Invoking Functions

To use a function after definition, include its name followed by parentheses:

```js
function myFunction() {
  alert("hello");
}

myFunction(); // calls the function
```

## Function Parameters

Functions can require **parameters** (values passed inside parentheses):

```js
// No parameters
const myNumber = Math.random();

// Two parameters
const myText = "I am a string";
const newString = myText.replace("string", "sausage");
```

### Default Parameters

You can specify default values for parameters:

```js
function hello(name = "Chris") {
  console.log(`Hello ${name}!`);
}

hello("Ari");  // Hello Ari!
hello();       // Hello Chris!
```

## Anonymous Functions and Arrow Functions

### Anonymous Functions

Functions without names, often used as parameters:

Example with event listener:

```js
textBox.addEventListener("keydown", function (event) {
  console.log(`You pressed "${event.key}".`);
});
```

### Arrow Functions

Shorter syntax use `=>` for anonymous functions:

```js
// Standard arrow function
textBox.addEventListener("keydown", (event) => {
  console.log(`You pressed "${event.key}".`);
});

// Single parameter (parentheses optional)
textBox.addEventListener("keydown", event => {
  console.log(`You pressed "${event.key}".`);
});

// Single expression (implicit return)
const doubled = originals.map(item => item * 2);
```

# Function Return Values

## Using the Return Keyword

To return a value from a custom function, use the `return` keyword:

```js
function random(number) {
  return Math.floor(Math.random() * number);
}
```

### Using Return Values in Event Handlers

```js
input.addEventListener("change", () => {
  const num = parseFloat(input.value);
  if (isNaN(num)) {
    para.textContent = "You need to enter a number!";
  } else {
    //each of these methods return a Number object
    para.textContent = `${num} squared is ${squared(num)}. `;
    para.textContent += `${num} cubed is ${cubed(num)}. `;
    para.textContent += `${num} factorial is ${factorial(num)}. `;
  }
});
```

**Key Points:**
- `parseFloat()` converts the input string to a number
- `isNaN()` checks if the value is not a number
- Functions are called within template literals to display results

## Return Value Best Practices

### Error Handling
Always validate parameters and handle edge cases:

```js
function factorial(num) {
  if (num < 0) return undefined; // Handle negative numbers
  if (num === 0) return 1;       // Handle zero case
  // ... rest of function
}
```

# Build Your Own Function

We'll create `displayMessage()` - a custom message box to replace the browser's built-in `alert()` function.

```js
alert("This is a message"); // Built-in alert - limited customization
```

Our custom function will be more flexible, allowing us to vary colors, icons, and styling.

### Creating the Message Box

```js
function displayMessage() {
  // Get body element
  const body = document.body;

  // Create container div
  const panel = document.createElement("div");
  panel.setAttribute("class", "msgBox");
  body.appendChild(panel);

  // Create message paragraph
  const msg = document.createElement("p");
  msg.textContent = "This is a message box";
  panel.appendChild(msg);

  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "x";
  panel.appendChild(closeBtn);

  // Add close functionality
  closeBtn.addEventListener("click", () =>
    panel.parentNode.removeChild(panel)
  );
}
```

This creates the following HTML structure:

```html
<div class="msgBox">
  <p>This is a message box</p>
  <button>x</button>
</div>
```

## Calling the Function

### Direct Call
```js
displayMessage(); // Runs immediately
```

### Event-Driven Call
```js
// Select button and add event listener
const btn = document.querySelector("button");
btn.addEventListener("click", displayMessage); // Note: no parentheses
```

**Important**: `displayMessage` (without parentheses) passes the function reference, while `displayMessage()` (with parentheses) calls the function immediately.

## Adding Parameters

### Single Parameter

Update the function definition:

```js
function displayMessage(msgText) {
  // ... existing code ...
  msg.textContent = msgText; // Use parameter instead of fixed text
}
```

Update the function call:

```js
btn.addEventListener("click", () =>
  displayMessage("Woo, this is a different message!")
);
```

**Note**: When passing parameters, wrap the function call in an anonymous function.

### Multiple Parameters

Add a second parameter for message type:

```js
function displayMessage(msgText, msgType) {
  // ... existing code for creating elements ...

  // Set message text
  msg.textContent = msgText;

  // Handle different message types
  if (msgType === "warning") {
    msg.style.backgroundImage = "url(icons/warning.png)";
    panel.style.backgroundColor = "red";
  } else if (msgType === "chat") {
    msg.style.backgroundImage = "url(icons/chat.png)";
    panel.style.backgroundColor = "aqua";
  } else {
    msg.style.paddingLeft = "20px";
  }
}
```

### Using Multiple Parameters

```js
// Warning message
displayMessage("Your inbox is almost full — delete some mails", "warning");

// Chat message  
displayMessage("Brian: Hi there, how are you today?", "chat");

// Default message (no type specified)
displayMessage("This is a default message");
```

## Required CSS Updates

```css
.msgBox {
  width: 242px; /* Updated width for icons */
}

.msgBox p {
  padding-left: 82px;
  background-position: 25px center;
  background-repeat: no-repeat;
}
```

## Key Concepts

### Function Definition vs. Function Call
- **Definition**: `function displayMessage() { }`
- **Call**: `displayMessage()`

### Parameters vs. Arguments
- **Parameters**: Variables in function definition (`msgText`, `msgType`)
- **Arguments**: Values passed when calling (`"Hello"`, `"warning"`)

### Event Handling
- Use function reference: `addEventListener("click", displayMessage)`
- Use anonymous function for parameters: `addEventListener("click", () => displayMessage("text"))`

### Optional Parameters
The `msgType` parameter is optional - the function provides default behavior when it's not specified.

## Summary

This example demonstrates:
- Creating reusable custom functions
- Adding flexibility through parameters
- Handling events with functions
- Conditional logic based on parameters
- DOM manipulation within functions

The result is a flexible, reusable message system that can display different types of messages with appropriate styling and icons.