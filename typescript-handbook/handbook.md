# TypeScript Handbook

## Basics

TypeScript provides **static type checking** for JavaScript, catching errors before runtime and improving developer tooling.

> Typescript never changes the runtime behaviour of your program, compared to its JS equivalent

```javascript
// JavaScript - runtime error
const message = "Hello World!";
message(); // TypeError: message is not a function
```

```typescript
// TypeScript - compile-time error
const message = "hello!";
message(); // Error: This expression is not callable
```

### Static Type-Checking Benefits

TypeScript catches common errors:

**Typos**
```typescript
const announcement = "Hello World!";
announcement.toLocaleLowercase(); // Error: Property doesn't exist
announcement.toLocalLowerCase();  // Correct
```

**Uncalled Functions**
```typescript
function flipCoin() {
  return Math.random < 0.5; // Error: Operator '<' cannot be applied
  // Should be: Math.random()
}
```

**Logic Errors**
```typescript
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") { // Error: Unreachable code
  // This will never execute
}
```

### TypeScript Compiler (tsc)
```bash
# Compile TypeScript file
tsc hello.ts
```

### Type Annotations

#### Explicit Types
```typescript
// Function parameters with type annotations
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// Common mistake - Date() returns string, new Date() returns Date object
greet("Maddison", Date());     // Error
greet("Maddison", new Date()); // Correct
```

#### Type Inference
```typescript
// TypeScript automatically infers types when possible
let msg = "hello there!"; // Inferred as string
// Equivalent to: let msg: string = "hello there!";
```

>  best not to add annotations when the type system would end up inferring the same type anywa

### Compilation Process

**Type Erasure**
TypeScript removes all type annotations during compilation:

```typescript
// Input (TypeScript)
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

```javascript
// Output (JavaScript)
function greet(person, date) {
  console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
```

### Strictness Configuration

Can us the `strict` flag in the CLI or set it to be true in config json file

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true  // Enables all strict type-checking options
  }
}
```

#### `noImplicitAny`
false by default, variables can have `any` type
```typescript
// Error when TypeScript can't infer type
function fn(s) { // Error: Parameter 's' implicitly has 'any' type
  console.log(s.subtr(3));
}
```

Turning on the `noImplicitAny` flag will issue an error on any variables whose type is implicitly inferred as `any`

#### `strictNullChecks`
false by default, so `null` and `undefined` are assignable to all types
```typescript
// Without strictNullChecks - potential runtime error
function getLength(s: string) {
  return s.length; // s could be null/undefined
}

// With strictNullChecks - compile-time safety
function getLength(s: string | null) {
  if (s === null) return 0;
  return s.length; // Safe access
}
```

The  `strictNullChecks` flag makes handling `null` and `undefined` more explicit, and spares us from worrying about whether we forgot to handle `null` and `undefined`

Both options are set to true when you enable `"strict":true` in our `tsconfig.json`

## Types

### Common Types

**Primitives**

TypeScript has three main primitive types:

```typescript
string    // "Hello, world"
number    // 42 (no separate int/float)
boolean   // true or false
```

**Note:** Use lowercase `string`, `number`, `boolean` (not `String`, `Number`, `Boolean` which are the object wrappers)

**Arrays**

```typescript
number[]           // Array of numbers
string[]           // Array of strings
Array<number>      // Alternative syntax (same as number[])
```

### Type Annotations

```typescript
// Explicit type annotation
let myName: string = "Alice";

// Type inference (preferred when possible)
let myName = "Alice";  // TypeScript infers 'string'
```

### Functions

#### Parameter and Return Types

```typescript
// Parameter type annotation
function greet(name: string): void {
  console.log("Hello, " + name.toUpperCase());
}

// Return type annotation
function getFavoriteNumber(): number {
  return 26;
}

// Promise return type
async function getNumber(): Promise<number> {
  return 26;
}

//anonymous functions (contextual typing)
const names = ["Alice", "Bob", "Eve"];

// Parameter 's' automatically inferred as string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Arrow function version
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

### Object Types

```typescript
// Inline object type
function printCoord(pt: { x: number; y: number }) {
  console.log(`x: ${pt.x}, y: ${pt.y}`);
}

// Optional properties, use ? operator
function printName(obj: { first: string; last?: string }) {
  if (obj.last !== undefined) {
    console.log(obj.last.toUpperCase());
  }
  // Safe alternative
  console.log(obj.last?.toUpperCase());
}
```

### Union Types

```typescript
// Basic union
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

// Working with unions (narrowing)
function printId(id: number | string) {
  //different branches for different members of a union type
  if (typeof id === "string") {
    console.log(id.toUpperCase());  // id is string here
  } else {
    console.log(id);                // id is number here
  }
}

// Array checking
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    console.log("Hello, " + x.join(" and "));  // x is string[]
  } else {
    console.log("Welcome " + x);                // x is string
  }
}
```

### Aliases and Interfaces

#### Type Aliases

```typescript
// Object type alias
type Point = {
  x: number;
  y: number;
};

// Union type alias
type ID = number | string;

// Usage
function printCoord(pt: Point) {
  console.log(`x: ${pt.x}, y: ${pt.y}`);
}
```

#### Interfaces

```typescript
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log(`x: ${pt.x}, y: ${pt.y}`);
}
```

#### Type Aliases vs Interfaces

| Feature | Type Alias | Interface |
|---------|------------|-----------|
| **Extending** | `type Bear = Animal & { honey: boolean }` | `interface Bear extends Animal { honey: boolean }` |
| **Reopening** | ❌ Cannot add new fields | ✅ Can merge declarations |
| **Primitives** | ✅ Can alias primitives | ❌ Objects only |

**Rule of thumb:** Use `interface` by default, use `type` when you need unions or other advanced features.

### Type Assertions

use the `as` keyword

```typescript
// As syntax (preferred)
const myCanvas = document.getElementById("canvas") as HTMLCanvasElement;

// TypeScript only allows type assertions which convert to a more specific or less specific version of a type
// so we may need double assertion for a completely different type
// Double assertion for complex cases
const a = (expr as any) as TargetType;
```

### Literal Types

```typescript
// String literals
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}

// Numeric literals
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// Boolean literals
type SuccessResponse = { success: true; data: any };
type ErrorResponse = { success: false; error: string };
```

#### Literal Inference Solutions

```typescript
declare function handleRequest(url: string, method: "GET" | "POST"): void;

// Problem: req.method inferred as string, not "GET"
// this is because some modification may have occured to change req.method
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method); // Error!

// Solution 1: Type assertion, just for method
const req = { url: "https://example.com", method: "GET" as "GET" };
// or this works too, assertion at the calling point
handleRequest(req.url, req.method as "GET");

// Solution 2: as const to fix the entire req
const req = { url: "https://example.com", method: "GET" } as const;
```

### Null and Undefined

#### With `strictNullChecks: true` (recommended)

```typescript
function doSomething(x: string | null) {
  //need to do narrowing for null type
  if (x === null) {
    //do nothing
    return;
  }
  // x is string here
  console.log("Hello, " + x.toUpperCase());
}

// Non-null assertion operator ! (use carefully)
function liveDangerously(x?: number | null) {
  console.log(x!.toFixed()); // Assert x is not null/undefined
}
```

### Any Type

avoid using this `any` type where possible!

```typescript
let obj: any = { x: 0 };
obj.foo();           // No type checking
obj();
obj.bar = 100;
obj = "hello";

// Avoid any when possible
// Use noImplicitAny compiler flag to catch implicit any types
```

### Best Practices

- **Enable strict mode** in `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```

- **Prefer type inference** over explicit annotations when TypeScript can infer correctly

- **Use `interface` for object shapes**, `type` for unions and computed types

- **Favor `as const`** for literal types over type assertions

- **Use union types** instead of `any` when you know the possible types

- **Enable and respect `strictNullChecks`** to catch null/undefined errors early

## Narrowing

TypeScript can narrow union types to more specific types through type guards and control flow analysis. So different behaviour for different types

###  `typeof` Type Guards

TypeScript understands `typeof` checks and narrows types accordingly:

```typescript
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    // narrowed to number
    return " ".repeat(padding) + input;
  }
  return padding + input;  // padding is now narrowed to string
}
```

TypeScript recognizes these `typeof` return values:
- `"string"`, `"number"`, `"bigint"`, `"boolean"`
- `"symbol"`, `"undefined"`, `"object"`, `"function"`

Note that TS uses `object` for all object types, including class instances. Use `instanceof` for class instances instead

**Note:** `typeof null === "object"` in JavaScript, so be careful when checking for arrays:

```typescript
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    // strs could still be null!
    for (const s of strs) {  // Error: 'strs' is possibly 'null'
      console.log(s);
    }
  }
}
```

### Truthiness Narrowing

Use truthiness checks (variables that evaluate to a boolean when if operator applied) to eliminate `null` and `undefined`:

```typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {  // strs is now string[]
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

Values that coerce to `false`: `0`, `NaN`, `""`, `0n`, `null`, `undefined`

### Equality Narrowing

TypeScript narrows types using `===`, `!==`, `==`, and `!=`:

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // Both must be string (the only common type)
    x.toUpperCase();  // ✓
    y.toLowerCase();  // ✓
  }
}
```

**Null/undefined checks:**
```typescript
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  if (container.value != null) {  // Removes both null and undefined
    container.value *= factor;   // value is now number
  }
}
```

### The `in` Operator Narrowing

Check for property existence to narrow union types (applicable to methods too)

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();  // animal is Fish
  }
  return animal.fly();     // animal is Bird
}
```

**With optional properties:**
```typescript
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    // animal: Fish | Human
  } else {
    // animal: Bird | Human
  }
}
```

### `instanceof` Narrowing

for classes

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());  // x is Date
  } else {
    console.log(x.toUpperCase());  // x is string
  }
}
```

### Discriminated Unions

We could use a single interface which causes problems:

```ts
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
//'shape.radius' is possibly 'undefined'.
  }
}
```

Use a common discriminant property with 2 interfaces to enable narrowing:

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;  // shape is Circle
    case "square":
      return shape.sideLength ** 2;        // shape is Square
  }
}
```

## Functions

### Function Types

```typescript
// Function type expression
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
```

TypeScript call signatures define the parameter types and return types for function-like objects, enabling the creation of callable entities with additional properties.
```ts
// Call signature (when functions have properties)
type DescribableFunction = {
  description: string;
  //note the : syntax here
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

### Generic Functions

```typescript
// Generic function
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// Usage - type inferred automatically
const s = firstElement(["a", "b", "c"]);  // string | undefined
const n = firstElement([1, 2, 3]);        // number | undefined

// Multiple type parameters
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

// Constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

### Optional Parameters

```typescript
// Optional parameter with ?
function f(x?: number) {
  // x has type number | undefined
}

// Default parameters
function f(x = 10) {
  // x has type number (default removes undefined)
}

// Optional in callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

### Function Overloads

```typescript
// Overload signatures
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;

// Implementation signature (not directly callable)
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); // Error: this function uses 2 arguments
```
### Return Type Annotations

```typescript
// Explicit return type
function getFavoriteNumber(): number {
  return 26;
}

// Promise return type
async function getFavoriteNumber(): Promise<number> {
  return 26;
}

// Contextual typing for anonymous functions
const names = ["Alice", "Bob", "Eve"];
names.forEach((s) => {
  console.log(s.toUpperCase()); // s inferred as string
});
```

### Best Practices

- **Use generic functions** for reusable type-safe operations
- **Prefer function overloads** over union parameters when possible
- **Use rest parameters** instead of the `arguments` object
- **Leverage contextual typing** in callbacks to avoid redundant annotations
- **Be explicit about return types** for public APIs
- **Use constraints on generics** to ensure type safety