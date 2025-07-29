# JavaScript Debugging and Error Handling

## Code Quality Tools

### Linting
- Use **ESLint** for JavaScript validation
- Install linter plugins in your code editor for real-time error detection
- Validate HTML/CSS with W3C validators first

## Common JavaScript Problems

1. **Scope issues**: Variables not defined in correct scope
2. **`this` context confusion**: Save `this` to separate variable when needed
3. **Loop scope problems**: Use `let` instead of `var` in loops
4. **Asynchronous operations**: Use `await` or `.then()` properly

```js
// ❌ Bad - var creates function scope
for (var i = 0; i < 10; i++) {
  button[i].onclick = function() { alert(i); }; // Always alerts 10
}

// ✅ Good - let creates block scope  
for (let i = 0; i < 10; i++) {
  button[i].onclick = function() { alert(i); }; // Alerts correct value
}
```

## Browser Developer Tools

### JavaScript Console
- **View errors**: Check console for error messages and line numbers
- **Error details**: Click expand arrow for call stack information

### Console API Methods

```js
// Basic logging
console.log(`Response value: ${response}`);

// Error logging with call stack
console.error(`Response value: ${response}`);
```

### JavaScript Debugger

**Key features:**
- **Breakpoints**: Click line numbers to pause execution
- **Call Stack**: Shows function call hierarchy
- **Scopes**: Inspect variable values at breakpoint

**Usage:**
1. Set breakpoint on problem line
2. Refresh page to trigger pause
3. Examine variables in Scopes panel
4. Check Call Stack for execution path

## Error Handling Techniques

### Defensive Programming with Conditionals

```js
function inchesToMeters(num) {
  // Validate input
  if (typeof num !== "number" || Number.isNaN(num)) {
    console.log("A number was not provided. Please correct the input.");
    return undefined;
  }
  
  const mVal = (num * 2.54) / 100;
  return mVal.toFixed(2);
}
```

### Custom Error Throwing

```js
function processData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data provided. Expected object.");
  }
  // Process data...
}
```

### Try-Catch Error Handling

```js
try {
  // Code that might throw errors
  const result = processData(userData);
  console.log(result);
} catch (error) {
  // Handle errors gracefully
  console.error("Error processing data:", error.message);
  // Run fallback code or user notification
}
```

### Feature Detection

```js
// Check if feature exists before using
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(handleSuccess);
} else {
  // Provide fallback functionality
  showStaticMap();
}
```

## Modern Async Debugging

```js
// ❌ Common mistake - not waiting for Promise
const response = fetch(url);
console.log(response); // [object Promise]

// ✅ Correct - wait for Promise resolution
try {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error("Fetch failed:", error);
}
```