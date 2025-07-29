# JavaScript Events - Condensed Notes

## What is an Event?

Events are signals fired by the browser when something significant happens. The system provides a mechanism to run code automatically when events occur.

**Common Event Types:**
- User interactions: click, hover, key press
- Browser actions: window resize, page load
- Form events: submit, input change
- Media events: play, pause, end

## Event Handling Basics

To react to an event:
1. Attach an **event listener** that listens for the event
2. Define an **event handler** function to respond
3. Register the handler to run when the event fires

### Basic Click Event Example

```html
<button>Change color</button>
```

```js
const btn = document.querySelector("button");

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

// Event listener with ANONYMOUS handler function
btn.addEventListener("click", () => {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});
```

**Syntax:** `element.addEventListener(eventType, handlerFunction)`

```js
const btn = document.querySelector("button");

// Named function approach
function changeBackground() {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}
//pass in the event handler function
btn.addEventListener("click", changeBackground);
```

### Common Event Types to Try

```js
// Focus/blur - when element gains/loses focus
btn.addEventListener("focus", changeBackground);
btn.addEventListener("blur", changeBackground);
// Double click
btn.addEventListener("dblclick", changeBackground);
// Mouse hover
btn.addEventListener("mouseover", changeBackground);
btn.addEventListener("mouseout", changeBackground);
```

### Removing Event Listeners

```js
// Remove specific event listener
//free up button to do other things
btn.removeEventListener("click", changeBackground);
```

### Multiple Listeners for Same Event

```js
// Both functions will run on click
myElement.addEventListener("click", functionA);
myElement.addEventListener("click", functionB);
```

**Multiple elements:**

```js
const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", bgChange);
}
```

## Event Objects

Event handlers automatically receive an **event object** with extra information and methods.

```js
//this event handler function accepts ONE object - the event object
//you can choose any color for this
function bgChange(e) {  // 'e' is the event object
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  // target property of the event object is always a reference to the element the event occurred upon
  // this is changing the color of the button!
  e.target.style.backgroundColor = rndCol;  // e.target = the clicked element
  console.log(e);  // Inspect the event object
}

btn.addEventListener("click", bgChange);
```

**Key Event Object Properties:**
- `e.target` - the element that triggered the event
- `e.type` - the event type (e.g., "click")
- `e.preventDefault()` - prevent default behavior

### Event-Specific Properties

```html
<input id="textBox" type="text" />
<div id="output"></div>
```

```js
const textBox = document.querySelector("#textBox");
const output = document.querySelector("#output");

// KeyboardEvent has additional properties like 'key'
textBox.addEventListener("keydown", (event) => {
  output.textContent = `You pressed "${event.key}".`;
});
```

## Preventing Default Behavior

Use `preventDefault()` to stop the browser's default action.

### Form Validation Example

```js
const form = document.querySelector("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const para = document.querySelector("p");

form.addEventListener("submit", (e) => {
  // Validate form fields
  if (fname.value === "" || lname.value === "") {
    e.preventDefault();  // Stop form submission
    para.textContent = "You need to fill in both names!";
  }
});
```

# Event Bubbling

Event bubbling occurs when an event listener is added to a parent element and the user interacts with a child element. The event "bubbles up" from the innermost element through its ancestors.

## Basic Event Bubbling

### Parent Element Listener

```html
<div id="container">
  <button>Click me!</button>
</div>
<!-- displays the output text exactly as written -->
<pre id="output"></pre>
```

CSS selector types:
- `#id` - selects by ID (unique)
- `.class` - selects by class name
- `element` - selects by tag name
- `[attribute]` - selects by attribute

```js
// select id as output
const output = document.querySelector("#output");
function handleClick(e) {
    //e.target is the element that was actually clicked (button here)
    //e.currentTarget is the elem with the event listener (the container)
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

//div container holds the actual button
const container = document.querySelector("#container");
container.addEventListener("click", handleClick);
```

**Result:** Clicking the button triggers the parent's click handler. Parent here is the owner of the EventListener.

### Multiple Listeners Example

```js
const output = document.querySelector("#output");
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector("#container");
const button = document.querySelector("button");

//document.body will fire upon clicking anywhere
document.body.addEventListener("click", handleClick);
container.addEventListener("click", handleClick);
button.addEventListener("click", handleClick);
```

**Output when clicking button:**
```
You clicked on a BUTTON element
You clicked on a DIV element  
You clicked on a BODY element
```

Events fire in order: innermost → outermost. BUTTON -> DIV -> BODY

## Using `stopPropagation`

```html
<button>Display video</button>
<!-- div contains the video -->
<div class="hidden">
  <video>
    <source src="video.webm" type="video/webm" />
  </video>
</div>
```

```js
const btn = document.querySelector("button");
const box = document.querySelector("div");
const video = document.querySelector("video");

btn.addEventListener("click", () => box.classList.remove("hidden"));
video.addEventListener("click", () => video.play());
box.addEventListener("click", () => box.classList.add("hidden"));
```

**Problem:** Clicking video triggers both video play AND box hide due to bubbling.

Solution: `stopPropagation()`

```js
const btn = document.querySelector("button");
//box is a div that contains video
const box = document.querySelector("div");
const video = document.querySelector("video");

btn.addEventListener("click", () => box.classList.remove("hidden"));

video.addEventListener("click", (event) => {
  event.stopPropagation();  // Prevents event from bubbling up to the box
  video.play();
});

box.addEventListener("click", () => box.classList.add("hidden"));
```

`stopPropagation()` prevents the event from bubbling to parent elements.

## Event Capture

Alternative to bubbling - events fire from outermost → innermost.

```js
document.body.addEventListener("click", handleClick, { capture: true });
container.addEventListener("click", handleClick, { capture: true });
button.addEventListener("click", handleClick);
```

**Output:**
```
You clicked on a BODY element
You clicked on a DIV element
You clicked on a BUTTON element
```

**Note:** Bubbling is default and more commonly used.

## Event Delegation

Use bubbling to handle events for multiple child elements with a single parent listener. Put event listener on parent; and have events on child bubble up to parent, instead of having to set on every child.

```html
<div id="container">
  <div class="tile"></div>
  <div class="tile"></div>
  <!-- ... 14 more tiles ... -->
</div>
```

```css
#container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 100px;
}
```

```js
function random(number) {
  return Math.floor(Math.random() * number);
}

function bgChange() {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  return rndCol;
}

const container = document.querySelector("#container");

container.addEventListener("click", (event) => {
    //target here references the element that was being clicked
  event.target.style.backgroundColor = bgChange();
});
```

**Advantage:** One listener handles all 16 tiles instead of 16 separate listeners.

## `target` vs `currentTarget`

```js
const output = document.querySelector("#output");
function handleClick(e) {
  const logTarget = `Target: ${e.target.tagName}`;
  const logCurrentTarget = `Current target: ${e.currentTarget.tagName}`;
  output.textContent += `${logTarget}, ${logCurrentTarget}\n`;
}

//container has the video, while button is separate
const container = document.querySelector("#container");
const button = document.querySelector("button");

//fires innermost to outermost
document.body.addEventListener("click", handleClick);
container.addEventListener("click", handleClick);
button.addEventListener("click", handleClick);
```

**Key Difference:**
- `event.target`: Element where event was originally fired (stays constant during bubbling)
- `event.currentTarget`: Element with the current event handler (changes during bubbling)

**Usage:**
- Use `target` for event delegation
- Use `currentTarget` to reference the element with the listener