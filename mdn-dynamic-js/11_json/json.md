# JSON - Condensed Notes

## What is JSON?

**JSON (JavaScript Object Notation)** is a text-based data format for representing structured data. It's language-independent and commonly used for data transmission in web applications.

- **Serialization**: Converting object → string for network transmission
- **Deserialization**: Converting string → native object for use
- File extension: `.json`
- MIME type: `application/json`

## JSON Structure

### Basic Object

Resemble JS object literal format - all JSON is JS object literal with restrictions
```json
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"]
    }
  ]
}
```

### Accessing Data (after parsing)
```js
// Dot notation
superHeroes.homeTown;              // "Metro City"
superHeroes.members[0].name;       // "Molecule Man"

// Bracket notation  
superHeroes["homeTown"];
superHeroes.members[1].powers[2];  // Third power of second member
```

### Arrays as JSON
```json
[
  {
    "name": "Molecule Man",
    "age": 29,
    "powers": ["Radiation resistance", "Turning tiny"]
  },
  {
    "name": "Madame Uppercut", 
    "age": 39,
    "powers": ["Million tonne punch", "Damage resistance"]
  }
]
```

Access: `superHeroes[0].powers[0]`

## JSON Syntax Restrictions

Not all JS objects are valid JSON. JSON can only contain *serializable* data types

- **Strings**: Must use double quotes (`"string"`, not `'string'`)
- **Numbers**: Decimal notation only
- **Primitives**: `string`, `number`, `true`, `false`, `null` (no `undefined`, `NaN`, `Infinity`)
- **Objects/Arrays**: Only contain valid JSON data types (no functions, `Date`, `Set`, `Map`)
- **Properties**: Must be `"key": value` format with quoted keys
- **No trailing commas** in objects/arrays
- **No comments** allowed

## Working with JSON in JavaScript

### Fetching and Parsing JSON (Modern Approach)
```js
async function fetchData() {
  const requestURL = "https://api.example.com/data.json";
  const request = new Request(requestURL);
  
  const response = await fetch(request);
  const data = await response.json();  // Parses JSON automatically
  
  return data;
}
```

### Manual JSON Operations

#### JSON.parse() - String to Object
```js
const jsonString = '{"name": "Chris", "age": 38}';
const jsObject = JSON.parse(jsonString);
console.log(jsObject.name); // "Chris"
```

#### JSON.stringify() - Object to String
```js
const jsObject = { name: "Chris", age: 38 };
const jsonString = JSON.stringify(jsObject);
console.log(jsonString); // '{"name":"Chris","age":38}'
```

### Alternative: Manual Parsing
```js
async function fetchDataManually() {
  const response = await fetch(requestURL);
  const textData = await response.text();      // Get as text
  const parsedData = JSON.parse(textData);    // Parse manually
  
  return parsedData;
}
```

## Practical Example: DOM Manipulation with JSON

```js
async function populateData() {
  // Fetch data
  const response = await fetch("data.json");
  const data = await response.json();
  
  // Populate header
  const header = document.querySelector("header");
  const h1 = document.createElement("h1");
  h1.textContent = data.squadName;
  header.appendChild(h1);
  
  // Populate members
  const section = document.querySelector("section");
  for (const member of data.members) {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = member.name;
    
    const p = document.createElement("p");
    p.textContent = `Age: ${member.age}`;
    
    // Create powers list
    const ul = document.createElement("ul");
    for (const power of member.powers) {
      const li = document.createElement("li");
      li.textContent = power;
      ul.appendChild(li);
    }
    
    article.appendChild(h2);
    article.appendChild(p);
    article.appendChild(ul);
    section.appendChild(article);
  }
}

// Call the function
populateData();
```

## Key Methods Summary

| Method | Purpose | Example |
|--------|---------|---------|
| `fetch(url)` | Network request | `await fetch("api.json")` |
| `response.json()` | Parse response as JSON | `await response.json()` |
| `response.text()` | Get response as text | `await response.text()` |
| `JSON.parse()` | String → Object | `JSON.parse(jsonString)` |
| `JSON.stringify()` | Object → String | `JSON.stringify(object)` |

## Common Patterns

### Error Handling
```js
try {
  const data = JSON.parse(jsonString);
  // Use data
} catch (error) {
  console.error("Invalid JSON:", error);
}
```

### Validation
Use tools like [JSONLint](https://jsonlint.com/) or [JSON-validate](https://www.json-validate.com/) for validation.