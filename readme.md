express-m-router可以将项目中指定某个文件夹下的所有模块挂载到路由上。

只可以在基于express的nodejs项目中使用。

### 使用

`require('express-m-router')(expressApp, path.join(__dirname, routesDir))`

### 示例

```
-- app.js
-- routes
  |-- test
  |  |-- !test.js
  |__ index.js
```

```Javascript
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
// routes/test/test.js
exports.get = function(req, res) {
	res.send(req.params.test)
}
```

运行`node app.js`。

浏览器中打开`http://localhost:4000`及`http://localhost:4000/test/hello-world`

### 说明

* 路由地址即文件名。
* 文件名中若有`!`，则被替换为`:`，即表示这是个变量，可从req.params中获取，参考上面的示例。
* 仅支持get，post，模块中也只需要暴露这两个方法，均非必须。

