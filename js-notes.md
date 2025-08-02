# JavaScript & TypeScript Notes

## Objects and Types

### Primitive Types

Similar to Java, there are primitive types and wrappers around them to make them objects

```js
// Primitive
let strPrim = "hello";
let strPrim = 'hello';
let strPrim = `hello`;

// Object
let strObj = new String("hello");
```

### Objects

Besides these primitive types, *everything* in JS is an object! Objects are the fundamental building blocks and inheritance is done through prototypes rather than classical OOP.

```js
const person = {
    // Data properties
    name: "Alice",
    age: 30,

    // Method properties

    // Regular function, this refers to the person object
    greet: function() {
        // Must use template literals for string variable substitution
        return `Hi my name is ${this.name}`;
    },

    // Arrow function => this comes from the outer global scope and is undefined
    sayHello: () => {
        return `Hello my name is ${this.name}`;
    }
};
```

## OOP in Java/JavaScript/TypeScript/Python

### Class Definition

#### Java
```java
public class Animal {
    private String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void speak() {
        System.out.println("Animal sound");
    }
}
```

#### JavaScript (ES6+)
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log("Animal sound");
    }
}
```

#### TypeScript
```typescript
class Animal {
    private name: string;  // Type annotation + access modifier
    
    constructor(name: string) {
        this.name = name;
    }
    
    speak(): void {  // Return type annotation
        console.log("Animal sound");
    }
    
    getName(): string {
        return this.name;
    }
}
```

#### Python
```python
class Animal:
    def __init__(self, name: str):  # Type hints (optional)
        self.name = name
    
    def speak(self) -> None:
        print("Animal sound")
```

### Inheritance

#### Java
```java
public class Dog extends Animal {
    public Dog(String name) {
        super(name);  // Call parent constructor
    }
    
    // Override parent method, use annotation to explicitly check parent method exists
    @Override
    public void speak() {
        System.out.println("Woof!");
    }
}
```

#### JavaScript
```javascript
class Dog extends Animal {
    constructor(name) {
        super(name);  // Call parent constructor
    }
    
    speak() {
        console.log("Woof!");
    }
}
```

#### TypeScript
```typescript
class Dog extends Animal {
    private breed: string;
    
    constructor(name: string, breed: string) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
    
    speak(): void {  // Override with type safety
        console.log("Woof!");
    }
    
    getBreed(): string {
        return this.breed;
    }
}
```

#### Python
```python
class Dog(Animal):
    def __init__(self, name: str, breed: str = "Unknown"):
        super().__init__(name)  # Call parent constructor
        self.breed = breed
    
    def speak(self) -> None:
        print("Woof!")
```

### Access Modifiers/Encapsulation

#### Java
```java
public class Example {
    public String publicVar;      // Accessible everywhere
    protected String protectedVar; // Package + subclasses
    private String privateVar;     // Only within class
    
    private void privateMethod() { }
    public void publicMethod() { }
}
```

#### JavaScript
```javascript
class Example {
    constructor() {
        this.publicVar = "public";
        this._protectedVar = "convention"; // Convention only
        this.#privateVar = "private";      // Truly private (ES2022)
    }
    
    #privateMethod() { }  // Private method
    publicMethod() { }
}
```

#### TypeScript
```typescript
class Example {
    public publicVar: string;       // Explicit public (DEFAULT)
    protected protectedVar: string; // True protected access
    private privateVar: string;     // True private access
    readonly readonlyVar: string;   // Read-only after initialization
    
    constructor() {
        this.publicVar = "public";
        this.protectedVar = "protected";
        this.privateVar = "private";
        this.readonlyVar = "readonly";
    }
    
    private privateMethod(): void { }
    public publicMethod(): void { }
    protected protectedMethod(): void { }
}
```

#### Python
```python
class Example:
    def __init__(self):
        self.public_var = "public"
        self._protected_var = "convention"  # Convention only
        self.__private_var = "private"      # Name mangling, not true privacy
    
    def __private_method(self) -> None:  # Name mangling
        pass
    
    def public_method(self) -> None:
        pass
```

### Abstract Classes/Interfaces

#### Java
```java
// Abstract class
abstract class Shape {
    abstract void draw();
    
    void display() {  // Concrete method
        System.out.println("Displaying shape");
    }
}

// Interface
interface Drawable {
    void draw();
    default void print() {  // Default method (Java 8+)
        System.out.println("Printing...");
    }
}
```

#### JavaScript
```javascript
// No built-in abstract classes, use conventions
class Shape {
    draw() {
        throw new Error("Must implement draw method");
    }
    
    display() {
        console.log("Displaying shape");
    }
}

// No interfaces, use duck typing or mixins
```

#### TypeScript
```typescript
// Abstract class
abstract class Shape {
    abstract draw(): void;  // Must be implemented by subclasses
    
    display(): void {  // Concrete method
        console.log("Displaying shape");
    }
}

// Interface
interface Drawable {
    draw(): void;
    color?: string;  // Optional property
}

// Interface implementation
class Circle extends Shape implements Drawable {
    color: string;
    
    constructor(color: string) {
        super();
        this.color = color;
    }
    
    draw(): void {
        console.log(`Drawing a ${this.color} circle`);
    }
}
```

#### Python
```python
from abc import ABC, abstractmethod
from typing import Protocol  # For structural typing

# Abstract class
class Shape(ABC):
    @abstractmethod
    def draw(self) -> None:
        pass
    
    def display(self) -> None:  # Concrete method
        print("Displaying shape")

# Protocol (like interface)
class Drawable(Protocol):
    def draw(self) -> None: ...
```

### Static Members

#### Java
```java
public class MathUtils {
    public static final double PI = 3.14159;
    
    public static int add(int a, int b) {
        return a + b;
    }
}

// Usage: MathUtils.add(5, 3)
```

#### JavaScript
```javascript
class MathUtils {
    static PI = 3.14159;
    
    static add(a, b) {
        return a + b;
    }
}

// Usage: MathUtils.add(5, 3)
```

#### TypeScript
```typescript
class MathUtils {
    static readonly PI: number = 3.14159;  // Static readonly
    
    static add(a: number, b: number): number {
        return a + b;
    }
    
    // Static factory method example
    static createCalculator(): Calculator {
        return new Calculator();
    }
}

// Usage: MathUtils.add(5, 3)
```

#### Python
```python
class MathUtils:
    PI: float = 3.14159  # Class variable with type hint
    
    @staticmethod
    def add(a: int, b: int) -> int:
        return a + b
    
    @classmethod
    def from_string(cls, data: str) -> 'MathUtils':
        # Class method example
        return cls()

# Usage: MathUtils.add(5, 3)
```

### TypeScript-Specific Features

#### Generics
```typescript
// Generic class
class Container<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    get(index: number): T | undefined {
        return this.items[index];
    }
}

// Usage
const stringContainer = new Container<string>();
const numberContainer = new Container<number>();
```

#### Type Definitions
```typescript
// Type aliases
type Point = { x: number; y: number };
type Status = "loading" | "success" | "error";  // Union types

// Interface extending
interface Animal {
    name: string;
    speak(): void;
}

interface Dog extends Animal {
    breed: string;
    wagTail(): void;
}
```

## Key Differences Summary

| Feature | Java | JavaScript | TypeScript | Python |
|---------|------|------------|------------|--------|
| **Type System** | Static, strongly typed | Dynamic, weakly typed | Static, strongly typed | Dynamic, strongly typed |
| **Access Control** | True private/protected/public | Convention + private fields | True private/protected/public | Convention + name mangling |
| **Inheritance** | Single inheritance, interfaces | Prototype-based, single | Single + interfaces | Multiple inheritance |
| **Abstract Classes** | Built-in `abstract` keyword | No built-in support | Built-in `abstract` keyword | `ABC` module |
| **Generics** | Yes | No | Yes | No (duck typing) |
| **Method Overloading** | Yes | No (last definition wins) | Limited (function overloads) | No (use default args) |
| **Interfaces** | Yes | No | Yes | Protocols (3.8+) |
| **Compile-time Checks** | Yes | No | Yes | Limited (type hints) |

## Memory Model

- **Java**: Objects on heap, references on stack, garbage collection
- **JavaScript**: Objects on heap, automatic garbage collection, no manual memory management
- **TypeScript**: Same as JavaScript (compiles to JS), adds compile-time type checking
- **Python**: Everything is an object, reference counting + cycle detection

## Static VS Dynamic Typing

**Static Typing** (Compile-time type checking)
Types are determined and checked **before** the program runs (at compile time).

**Dynamic Typing** (Runtime type checking)  
Types are determined and checked **while** the program runs (at runtime).

### Language Breakdown

#### Java - **Static Typing**
```java
// Types must be declared and are checked at compile time
String name = "Alice";
int age = 25;

// This will cause a COMPILE ERROR - won't even run
name = 123;  // Cannot assign int to String variable

// Method signatures enforce types
public int add(int a, int b) {
    return a + b;  // Compiler ensures return type matches
}
```

#### JavaScript - **Dynamic Typing**
```javascript
// No type declarations - types determined at runtime
let name = "Alice";     // name is a string
let age = 25;           // age is a number

// This is perfectly valid - variables can change types
name = 123;             // name is now a number
age = "twenty-five";    // age is now a string

// Functions don't enforce parameter types
function add(a, b) {
    return a + b;  // Could be numbers, strings, anything!
}

add(5, 3);        // Returns 8 (number addition)
add("5", "3");    // Returns "53" (string concatenation)
add(5, "3");      // Returns "53" (coercion to string)
```

#### TypeScript - **Static Typing** (that compiles to dynamic JS)
```typescript
// Types are checked at compile time, then compiled to JS
let name: string = "Alice";
let age: number = 25;

// This will cause a COMPILE ERROR
name = 123;  // Type 'number' is not assignable to type 'string'

// Function with type enforcement
function add(a: number, b: number): number {
    return a + b;
}

// Compile-time error if wrong types passed
add(5, "3");  // Argument of type 'string' not assignable to 'number'
```

#### Python - **Dynamic Typing** (with optional type hints)
```python
# No type enforcement by default
name = "Alice"    # name is a string
age = 25          # age is an int

# Variables can change types freely
name = 123        # name is now an int
age = "twenty-five"  # age is now a string

# Type hints are just suggestions (not enforced at runtime)
def add(a: int, b: int) -> int:
    return a + b

# This runs fine despite type hints
result = add("5", "3")  # No error, returns "53"
```
## Trade-offs

### **Static Typing Advantages:**
- **Early error detection** - catch bugs before deployment
- **Better IDE support** - autocomplete, refactoring
- **Performance** - compiler optimizations
- **Self-documenting** - types serve as documentation
- **Safer refactoring** - compiler ensures consistency

### **Dynamic Typing Advantages:**
- **Faster prototyping** - less boilerplate code
- **More flexible** - duck typing, easier polymorphism
- **Simpler syntax** - no type annotations needed
- **Runtime adaptability** - can handle varied input types