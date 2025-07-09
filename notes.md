# Full Stack cursus by Open university of Helsinki

goal: learn to build single page applications

exercises are submitted via github, and by marking the exercises as done in the "my submission"

The exercises are submitted one part at a time.

## Part 0: Fundamentals of Web Apps

requirements: install node 

- DOM-API and three like structure
- callback and api calls
- css
- chrome developer tools, cmd + option + i to open the console
- AJAX: asynchronous javascript and xml
- single page app: one html page modified by the js app

"vanilla javascript"

JQuery, a library that makes it easier to interact with the DOM.

Facebook React, the most popular tool for implementing the browse side logic. some alternatives include:
- angular js
- vueJS

Full stack = we focus on all parts of the application: the frontend (browser), the back end (server) and the database

## Part 1: Introduction to React

build tool:
- `create react app`, created by facebook, marked as deprecated
- `vite.js`, build on top of esbuild (created with go)

bootstrap the app with Vite
```sh
npm create vite@latest
```

install the dependencies:
```sh
npm install
```

run the server:
```sh
npm run dev
```

The app should be accessible on [localhost:5173](http://localhost:5173)

The dev server stitches together (assemble) JavaScript from different files into one file. We'll discuss the dev-server in more detail in part 7 of the course.

React
- React Component as a javascript function, export the module so that it can be imported by other js files
- - tips: compose components to keep the app maintainable, use methods from functional programming
- - react component first letter must be capitalized
- - convention: root component called App at the top of the component tree of the application
- brackets `{}` content is evaluated as js and the result is embedded in the resulting html
- JSX: markup like HTML + dynamic js content
- - compiled to javascript code by Babel
- - same rule as XML that every tag must be closed
- the returned value
- - the component can only have one root element, fragments `<> content... </>` can be used as a wrapper of the content without appearing in the DOM
- - an array of component is also a valid return

```js
function App() {
    return (
        <>
            <h1>Welcome</h1>
            { 
                // some js expression
            }
        </>
    )
}
```

React Props
- pass data to components 
- props are passed as an object with fields corresponding to all the props the user entered

```js
function Component(props) {
    return (
        <>
            {props.key}
        </>
    )
}

function App() {
    return (
        <Component props_name="value" />
    )
}
```

### Classes and This

official name of JS: ECMAScript
- browsers do not yet support all JS newest features => a lot of code is transpiled to older version of Js, can be done with Babel
- transpilation is automatically in React apps created with Vite
- node.js is a js runtime based on google V8 js engine
- - script ends with `.js`
- - run the script with `node script_name.js`
- - open the console by typing `node`

the pointer this
- the value of this is defined based on how the method is called
- when holding a reference of an object method, we loose the knowled of what the original this was
- fix1: use function expression that evaluate at their declaration time the value of this
- fix2: use function.bind(object), returns a new function with this bound to the argument object 

class synthax, still based on prototypal inheritance
```js
class ClassName {
    constructor(parameters) {

    }

    method() {

    }
}

const instance = new ClassName(arguments)
```

Never implement complements within components (makes it impossible for React to optimize the component).

### Destructuring

Destructure values from objects and arrays (especially useful for props):
```js
{key1, key2, ..., keyK} = props
```

The variables will be assigned the value of the corresponding key of the props

### State

The state hook
```js
import { useState } from 'react' // import the hook

function App() {
    const [ stateVariable, stateModifier ] = useState(initialValue)
}
```

When the state changes, React re-renders the component, the component function body gets re-executed. `useState` initializes the value of a state variable at first run, otherwise it returns the latest state of the variable.

React best practice: lift the state up in the component hierarchy.

Complex state: 
- option1: call useState multiple times
- option2: one single object as the whole state

Object spread synthax 
```js
{...allKey, keyToChangeValue: newValue}
```

It is forbidden to mutate the state directly.

State update happens asynchronously, at some point before the component is rendered again.

Prior to hooks, components that required state had to be defined as class components.

### Event handlers

add handlers to JSX elements
- `onClick={functionRef}`

## Part 2: Communicating with server

### Collection rendering

Items generated from a list, with for example map must have a unique value set to their attribute `key`.
- Don't use array index as keys!!!

Declare each component in its own file as an ES6-module. Import them where needed.
- export one symbol with default export `export default symbol`, only one default per module
- - import as `import renamedModule from module` and use as `module.symbol`
- export multiple symbols with named export for every symbol `export symbol1 ... export symbol2`
- - import as `import { symbol } from module `
- it is possible to mix named and default export
- to have symbols accessible as key of the module (accessible as moduleName.symbol), wrap the symbols within an object exported as default
```js
export default {
    key1: symbol,
    key2: symbol,
    ...,
    keyN: symbol,
}
```

Conditional operator
```js
const result = (condition)? val1 : val2
```

String formats
```js
`${expression evaluation} some text`
```

### Forms

add a form submit handler with `onSubmit`

controlled component
- create a state for the user input
- connect the input with the state, `value={state}`
- provide a onChange handler for value change
- the new value is in `event.target.value`

### Getting data from the server

JS runtime follows an asynchronous model, all IO operations are executed as non-blocking.

Currently JS engines are single threaded.
- for the browser to remain responsive it is important 
- - to keep computation short
- - have non blocking IO

library for network IO
- `fetch`, built in
- `axios`, a npm library 

axios in use:
```js
import axios from 'axios'

axios
    .get("url")
    .then(result => {
        // do something
    })

axios
    .post("url", object)
    .then(response => {
        // do something
    })
```

axios autoamatically parses json responses when the response has the header app/json

three states of promises
- pending, async operation is not finished yet
- fulfilled, the operation has been completed and the value is available
- rejected, an error happened

`.then` always return a new promise

handle errors:
```js
.catch(error => handle)
```

It is possible to chain multiple then, that will create a promise chain.

### Effect-hooks

Effects let a component connect to and synchronize with external systems. 

Import useEffect hook:
```js
import { useEffect } from 'react'
```

Define a use effect every time the component is instantiated:
```js
useEffect(() => {
    
}, [])
```

The effect is executed immediately after rendering.

By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
- the second parameter is used to specify how often the effect is run
- - if the second parameter is an empty array [], the effect runs only with the first render 
- - the second parameter could also be an array of state to observe. change on those would trigger a rerender.

=> single responsibity principle: extract the communication into its own module (src/services)

### REST

REST: representational state transfer (architectural style to build scalable web apps)

REST, we refer to individual data objects as resources.
- every resource has a unique address associated with it, resource unique address
- - all resource list: resource in plural form
- - specific resource item resource in singular form followed by unique identifier
- Resources are fetched with HTTP GET requests: /resources or /resource/id
- Resources are inserted with HTTP request to the general URL: /resources

can be used to create CRUD apps.

### Adding style to React

import the css file
```js
import './index.css'
```

Give class to elements
- `className=""`

Reacts also supports inline styles
- provide a set of css properties as a JS object through the style attribute
- kebab-case CSS properties are written in camelCase

Since the separation of CSS, HTML, and JavaScript into separate files did not seem to scale well in larger applications, React bases the division of the application along the lines of its logical functional entities.

## Part 3: NodeJs server and Express

build a REST api with node.js + express library, data stored in mongoDB.

NodeJs: js runtime based on google chrome V8

node version:
```sh
node -v
```

init a node project:
```sh
npm init
```

Add a new script in `package.json`:
```json
"scripts" : {
    "start": "node index.js"
}
```

Run the app:
- directly: `node index.js`
- with the package.json script alias: `npm run start`

The app main resides in `index.js`.

### Http Web server

Web server based on the built in http server module
```js
const http = require('http')

const app = http.createServer((request, response) => {          // event handler called every 
  response.writeHead(200, { 'Content-Type': 'text/plain' })     // time a HTTP request is made
  response.end('Hello World')                                   // to the server
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

Nodes.js uses CommonJs modules, and not ES6 modules import/export.
- now ES6 synthax is also supported
- the reason, node.js neaded modules long before ES6

Stringify the response, to send JSON
- `JSON.stringify(object)`

### Express

Libraries developed to ease server-side development with Node.

install:
```sh
npm install express
```

app blueprint
```js
const express = require('express')
const app = express()

// for each route (replace method with the associated method)
app.method('/targeted_route/', (request, response) => {
    // handler code
})


const PORT = process.env.PORT || 3001       // get the port from env variable or default as 3001
app.listen(PORT, () => {
    // server successful start callback
})
```

With the method being
- get
- post
- delete
- put

Structure of the handler, same as for http:
- request, contains all information of the http request
- response, used to define how the request is responded to

Response methods
- `response.json(object)` to return a json object, higher level HTTP (sets header and stringifies)
- `response.send(text)` to send text format response, higher level HTTP
- `response.set('Content-Type', 'text/plain')` to set header values, must be called before send or json
- `response.status(status_code)`, set the status code
- `response.end()`, respond to the request without sending any data
- finish the handler execution with `return response.send()`

Request params
- get all headers with `req.headers`
- get a header with `req.get("value")`
- get path params "/resource/SOMETHING"
- - by writing the route as `/resource/:variable`
- - retrieve the value with `request.params.variable`
- `req.method`, returns the HTTP method
- `req.path`, returns the path of the targeted resource

Parse input json data with express
- add the json parser middleware, `app.use(express.json())` prior to any other processing
- the parsed body can be accessed with `req.body`
- without the json-parser, the body property would be undefined

The spread operator ... transforms an array into individual elements.

### HTTP request types

HTTP requests should (as recommendations) have the safety and idempotence properties.
- safety: executing request must not cause side effects on the server (data changes)
- - GET and HEAD (returns status code and header) ought to be safe
- idempotence, the side-effects of N > 0 identical requests is the same as for a single request 
- - all except POST should be

### Middleware

express json-parser is a middleware

function that can be used for handling request and response objects.
- you can use several middlewares at once, executed one by one in their order of definition
- receives 3 parameters, (req, res, next), next() function call yields control to the next middleware

### GDPR

> logging data even in the console can be dangerous since it can contain sensitive data and may violate local privacy law


### Same origin policy and CORS

same origin policy, a url's origin is defined by the combination of protocol + hostname + port
- when the browser issues requests from one website to other origin resources (api, images, files) it has to the `Access-Control-Allow-origin` response header.
- it the header contains * the browser will process the response, otherwise it will refuse to process it
- it is a security mechanism

CORS: cross origin resource sharing, allows restricted resources to be request from another domain

Allow request from other origins with node's cors middleware:
```sh
npm install cors
```

use the middleware:
```js
const cors = require('cors')

app.use(cors())
```

Make sure to configure the number of allowed cross origin by CORS to the least (only the frontend, ...).

### Host the app

Free plan PaaS (platfrom as a service):
- render > new > web service

### Build the Frontend

We must move from dev server to production build to deploy the React app.

Create a production build:
```sh
npm run build
```

The result can be found in `dist/`
- with index.html the only html file of the app
- minified version of the JS code in one single file

One option to deploy this:
- serve the content of `dist/` by the backend

Serve static content with `express.static` middleware
```js
app.use(express.static('dist'))
```

When a GET request arrives, Express first check if the dist directory contains a file corresponding to the request's address.

## Part 7: React router

- old school web app, page change => http get request
- SPA => we are always on the same page, the code creates the illusion of different pages

library: react router
- each view is implemented as its own component
- each view should have its own address, to make bookmarking possible + the ability to use the backbutton + ...

install react router:
```sh
npm install react-router-dom
```

the app component holds the navigation structure:
```js
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/path1" element={<Component1 />}>
                <Route path="/path2" element={<Component2 />}>
                <Route path="/path3" element={<Component3 />}>
            </Routes>
        </Router>
    )
}
```

The router can also hold components that will be the same for any pages, like a header.

Links:
```js
<Link to="path">visible link content</Link>
```

Parametrized routes
- in the routes it is possible to extract portion of the url with `/url_start/:parameter`

retrieve the parameters from the view:
```js
import {useParams} from 'react-router-dom'

let parameter = userParams().parameterName
```

## Tools

### VSCode 

Code snippet, define abbreviation for reusable code blocks
- code > settings > configure snippets

Example for console.log:
```json
{
  "console.log": {
    "prefix": "clog",
    "body": [
      "console.log('$1')",
    ],
    "description": "Log output to console"
  }
}
```

### Chrome dev tools

pause the execution of the app with the following command
```
debugger
```

addition to chrome: React developer tool, to view the components state 

### Json Server

Fake a REST API with `JSON Server` by providing a json file as the fake db
```
npx json-server --port 3001 db.json
```

- GET resource_name/ to get the list of resources
- POST resource_name/ to insert a new resource
- GET resource_name/id to get a specific resource
- PUT resource_name/id to replace a specific resource
- PATCH resource_name/id to replace some key value of the specific resource
- DELETE resource_name/id to delete the specific resource

### npm

npm: node packet manager

package.json

install a package
```sh
npm install package-name
```

install development dependency
```sh
npm install package-name --save-dev
```

add an action to script:
```json
"scripts": {
    "command": "command content"
}
```

run the command:
```sh
npm run command
```

update project dependencies:
```sh
npm update
```

dependency format (when updated, the two last versio can be updated to a new version, but the main version has to be the same to prevent disruptive updates):
```json
"express": "^4.21.2"
```

instead of stop + restart the app at every change, start the app with
```sh
node --watch index.js
```

### Vite

Prevent hardcoding credentials in the code
- idea: define the valuable information as environment variable
- step1: when launching the server start, also set env var `export VITE_SOME_KEY=value && npm run dev`
- step2: access the valuable information from the env in the code `const api_key = import.meta.env.VITE_SOME_KEY`
- step3: when Vite builds your app, it replaces this line with the actual value at build time

to prevent leaking env var to clients, only var prefixed with VITE_ are exposed to Vite.

Vite include a proxy mechanism (any request made to the proxy route, will be forwarded to the target), add the following declaration in `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/route': {
        target: 'redirect',
        changeOrigin: true,
      },
    }
  },
})
```

### REPL

get an interactive command line with ndoe:
```sh
node
```

### HTTP interaction

- curl, command line tool
- postman
- - GUI app
- - vscode extension
- vscode rest client plugin
- - make a directory at the project root of the app called requests
- - save all the REST requests in the directory as files with the .rest extension
- - ++: request are available directly in the repository
- - multiple request per file, separated with `###`