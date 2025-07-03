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
- export the component with `export default ComponentName`
- import the component with `import ComponentName from 'componentFilePath'`

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

### VSCode snippet

Define abbreviation for reusable code blocks
- code > settings > configure snippets

Example for console.log:
```
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





