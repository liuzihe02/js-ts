# What is JavaScript?

Content available from [here](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript)

JavaScript is a **scripting/programming language** that enables dynamic, interactive web features. It's the third layer of web technologies:

- **HTML**: Structure and content
- **CSS**: Styling and layout  
- **JavaScript**: Dynamic behavior and interactivity

## Core Capabilities

### Basic Programming Features

- Store values in variables
- String manipulation and operations
- Event-driven programming
- DOM manipulation

#### Interpreted vs Compiled

Interpreted languages are where code is run from top to bottom, result of running each line is immediately returned. In compiled languages, we may need to compile to machine code which can then be run by the computer. JS is a lightweight interpreted language - web browser receives raw JS and runs script immediately.

#### Server-side vs client-side code

Client-side code is code that is run on the user's computer — when a web page is viewed, the page's client-side code is downloaded, then run and displayed by the browser. 

> In this module we are explicitly talking about client-side JavaScript.

Server-side code on the other hand is run on the server, then its results are downloaded and displayed in the browser. Examples of popular server-side web languages include PHP, Python, Ruby, C#, and even JavaScript! JavaScript can also be used as a server-side language, for example in the popular Node.js environment

### APIs (Application Programming Interfaces)

**Browser APIs** (built-in):
- **DOM API**: Manipulate HTML/CSS dynamically
- **Geolocation API**: Access location data
- **Canvas/WebGL**: 2D/3D graphics
- **Audio/Video APIs**: Multimedia control


## Adding JavaScript to Web Pages

Refer to `internal-js.html` for when js is added to html (bad practice) and `external-js.html` for when the js code is separated.

### Script Loading

All the HTML on a page is loaded in the order in which it appears. Make sure your JavaScript only runs after the HTML is parsed:

- In the internal JavaScript example above, the script element is placed at the bottom of the body of the document, and therefore only run after the rest of the HTML body is parsed.
- because we're using `<script type="module">`, the code is treated as a module and the browser waits for all HTML to be processed before executing JavaScript modules

### Comments

Single line comments
```js
// I am a comment
```

multi line comments
```js
/*
  I am also
  a comment
*/
```

## Key Characteristics

- **Interpreted**: Runs directly from source code
- **Client-side**: Executes in user's browser
- **Dynamic**: Can modify content in real-time
- **Event-driven**: Responds to user interactions
- **Case-sensitive**: Syntax must be exact