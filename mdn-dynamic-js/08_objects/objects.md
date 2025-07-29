# JavaScript Object

## Object Fundamentals

A JavaScript object is a collection of key-value pairs where: Keys are strings (or Symbols), Values can be any data type (primitives, functions, other objects)

```js
// Empty object
//{} represents object literal syntax
const person = {};

// Object literal with properties and methods
const person = {
  name: ["Bob", "Smith"],
  age: 32,
  //you can add functions to objects too!
  bio() {
    console.log(`${this.name[0]} ${this.name[1]} is ${this.age} years old.`);
  },
  introduceSelf() {
    console.log(`Hi! I'm ${this.name[0]}.`);
  },
};
```

## Accessing Object Members

### Dot Notation

Person is the *namespace* here
```js
person.age;          // 32
person.bio();        // Method call
person.name[0];      // "Bob"
```

### Bracket Notation
```js
person["age"];              // 32
person["name"]["first"];    // Access nested properties

// Dynamic property access (the key to access changes)
function logProperty(propertyName) {
  return person[propertyName];
}
```

**Use bracket notation when**:
- Property name is in a variable
- Property name is dynamic
- Property name contains special characters

## Nested Objects
```js
const person = {
  name: {
    first: "Bob",
    last: "Smith",
  },
  age: 32
};
// Access: person.name.first
```

## Setting Object Members
```js
// Update existing
person.age = 45;
person["name"]["last"] = "Cratchit";

// Add new members, basically just adding KV pairs to a dict
person["eyes"] = "hazel";

// Dynamic member names
const myDataName = "height";
const myDataValue = "1.75m";
person[myDataName] = myDataValue;
```

## The `this` Keyword

`this` refers to the current object the code is being executed in.

```js
const person1 = {
  name: "Chris",
  introduceSelf() {
    console.log(`Hi! I'm ${this.name}.`);  // this = person1
  },
};
```

## Constructors

### Factory Function
```js
// no need use new
function createPerson(name) {
//creates a new object and returns it
  const obj = {};
  obj.name = name;
  obj.introduceSelf = function() {
    console.log(`Hi! I'm ${this.name}.`);
  };
  return obj;
}

const salva = createPerson("Salva");
```

### Constructor Function (Preferred)
```js
//MUST use new to construct the object
//constructors by convention have capital letter
function Person(name) {
    //refers to the new object being created; what `this` refers to depends on how function being called
    //without new, this would just refer to global object
  this.name = name;
  this.introduceSelf = function() {
    console.log(`Hi! I'm ${this.name}.`);
  };
}

// Call with 'new' keyword
const salva = new Person("Salva");
const frankie = new Person("Frankie");
```

**Constructor behavior**:
1. Creates new object
2. Binds `this` to new object
3. Runs constructor code
4. Returns new object

## Built-in Objects

JavaScript features are built using objects:

```js
// String methods
myString.split(",");

// DOM methods
const myDiv = document.createElement("div");
const myVideo = document.querySelector("video");

// API constructors
const myNotification = new Notification("Hello!");
```

## Key Takeaways

- **Object literal**: `{}` syntax for creating single objects
- **Dot notation**: `object.property` - preferred when possible
- **Bracket notation**: `object["property"]` - for dynamic access
- **`this`**: References the object calling the method
- **Constructors**: Use `new` keyword to create multiple similar objects
- **Everything is an object**: Strings, arrays, DOM elements, etc.