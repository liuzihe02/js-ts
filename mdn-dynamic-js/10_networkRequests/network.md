# JavaScript Network Requests

## Overview

Network requests allow updating webpage sections without full page reloads. This improves performance and user experience by fetching only necessary data.

**Traditional Model**: Browser requests entire page for each navigation
**Modern Model**: JavaScript APIs request specific data and update page content dynamically

## Fetch API Solution

The **Fetch API** enables JavaScript to make HTTP requests and update page content without page reloads.

## Fetching Text Content Example

### Basic Setup
```js
const verseChoose = document.querySelector("select");
const poemDisplay = document.querySelector("pre");

verseChoose.addEventListener("change", () => {
  const verse = verseChoose.value;
  updateDisplay(verse);
});
```

### Core Fetch Implementation
```js
function updateDisplay(verse) {
  // Construct URL
  verse = verse.replace(" ", "").toLowerCase();
  const url = `${verse}.txt`;
  
  // Fetch data
  fetch(url)
    .then((response) => {
      // Check if request succeeded
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // Return response as text
      return response.text();
    })
    .then((text) => {
      // Update DOM with fetched text
      poemDisplay.textContent = text;
    })
    .catch((error) => {
      // Handle errors
      poemDisplay.textContent = `Could not fetch verse: ${error}`;
    });
}
```

### Key Fetch Concepts

1. **`fetch()`** returns a Promise
2. **First `.then()`**: Handle HTTP response, check for errors
3. **Second `.then()`**: Process the actual data
4. **`.catch()`**: Handle any errors in the chain


## JSON Data Example

### Fetching JSON
```js
fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json(); // Parse as JSON
  })
  .then((json) => initialize(json))
  .catch((err) => console.error(`Fetch problem: ${err.message}`));
```

### Fetching Binary Data (Blobs)
```js
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.blob(); // For images/binary files
  })
  .then((blob) => showProduct(blob, product))
  .catch((err) => console.error(`Fetch problem: ${err.message}`));
```

## XMLHttpRequest (Legacy API)

For comparison, the older XMLHttpRequest API:

```js
const request = new XMLHttpRequest();

try {
  request.open("GET", "products.json");
  request.responseType = "json";
  
  request.addEventListener("load", () => initialize(request.response));
  request.addEventListener("error", () => console.error("XHR error"));
  
  request.send();
} catch (error) {
  console.error(`XHR error ${request.status}`);
}
```

## Key Takeaways

- **Fetch API** is the modern standard for network requests
- Always check `response.ok` before processing data
- Use appropriate response methods: `.text()`, `.json()`, `.blob()`
- Handle errors with `.catch()`
- Fetch returns Promises - understand async JavaScript
- Modern browsers require HTTPS/local server for fetch requests

## Common Response Methods

- `response.text()` - Plain text
- `response.json()` - JSON data  
- `response.blob()` - Binary data (images, files)
- `response.arrayBuffer()` - Raw binary data