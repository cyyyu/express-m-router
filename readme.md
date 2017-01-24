express-m-router mounts all modules in a specify folder as routes to your express project.

### Installation

Using npm

`npm install --save express-m-router` 

Using yarn

`yarn add express-m-router`

### Simple usage

```
require('express-m-router')(expressApp, path.join(__dirname, routesDir))

// or

require('express-m-router')(expressApp, {
  path: path.join(__dirname, routesDir), // required
  ignores: /\.swp$/g // optional
})
``

### Example

Create a project following the below architecture.

```
-- app.js
-- routes
  |-- test
  |  |-- !test.js
  |__ index.js
```

And create these files.

​```Javascript
// app.js
'use strict'

let app = require('express')();
let mRouter = require('express-m-router');
let path = require('path');

mRouter(app, path.join(__dirname,'./routes'))

app.listen(4000, console.log.bind(console, `App start... port: 4000`))
```

```Javascript
// routes/index.js
exports.get = function(req, res) {
	res.send('hello world')
}
```

```Javascript
// routes/test/!test.js
exports.get = function(req, res) {
	res.send(req.params.test)
}
```

Do `npm install express express-m-router` and `node app.js`.

See [http://localhost:4000](http://localhost:[4000) ，[http://localhost:4000/test/hello-world](http://localhost:4000/test/hello-world)

* Routes name represent files name.
* If a file name includes '!' , it will be replace with ':'. That means it's a variable which you can get with `req.params`.
* Support http **get** and **post** only, optionaly exports them in your route module as exampled above.

