# VEXT

Velocity for express.js

## Usage

First of all, install it with npm.

```bash
npm install --save-dev vext
```

Then write some codes in the entry file of express.js, such as `app.js`.

```js
var vext = require("vext");

// Set Velocity as the view engine
app.set("view engine", "vm");
// Use VEXT to render files
app.engine("vm", vext.__express);
```

You can view [examples](./examples) for detail. ;-)

## APIs

There is only one API now. :-(

### .set(key, value)

To rewrite the default settings of VEXT.

```js
// The default layout is `template/layouts/default.vm`,
// to change it to `template/layouts/admin.vm`.
vext.set("layout", "template/layouts/admin.vm");
```
