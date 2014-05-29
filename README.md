Eight Bit Color Picker
======================

> UI component for picking a color from arbitrary 256 color palettes

<img alt="Screenshot of color picker" src="http://i.imgur.com/NTFkbnT.png?1" width="420" height="290">

This is a simple, flexible color-picker widget. It has no dependencies (not
even on jQuery), so it's easy to just plug in and use. It weighs less than 3kb
of combined JS & CSS once minified and gzipped.

Since it exposes itself via the
[UMD](https://github.com/umdjs/umd/blob/master/returnExports.js) exports format,
it will comply with whatever module loading system you're using. If you're
not using one, it will expose a global called `EightBitColorPicker`.

Install
-------
You can of course go through the old-school copy/pasta routine, but here's the
incantation to pull this in using Bower:

```sh
bower install --save eight-bit-color-picker
```

And for those that prefer component:

```sh
component install bilalq/eight-bit-color-picker
```

Quick Start
-----------
You can pass in either a string of an element ID or a reference to a DOM
element into the constructor of `EightBitColorPicker` like so:

```html
<div id="target"></div>
```

```javascript
// You can do this
var ebcp = new EightBitColorPicker({ el: 'target' })

// Or this
var el = document.getElementById('target')
var ebcp = new EightBitColorPicker({ el: el })
```

Alternatively, you can just run the `detect` function to find all elements with
the class `eight-bit-color-picker` and instantiate them as pickers.

```html
<div class="eight-bit-color-picker"></div>
<div class="eight-bit-color-picker"></div>
```

```javascript
// Renders all color pickers
var pickers = EightBitColorPicker.detect()
```

Custom Palettes
---------------
The documentation goes into this in more detail, but you can easily customize
the color palette on a per picker basis. For those interested in writing web
apps that relate to the CLI, see
[this xterm-256color palette](https://github.com/bilalq/xterm-256color-palette).

```javascript
var customPalette = [ /* Some array of 256 hex color strings */ ]
var picker = new EightBitColorPicker({ el: 'target', palette: customPalette })
```

You can even update the palette of an already instantiated picker by invoking
`EightBitColorPicker.prototype.updatePalette`.

Documentation
-------------
See [this page](http://bilalq.github.io/eight-bit-color-picker/) for documentation.

Browser Requirements
--------------------
This will work in all modern browsers. If you're worried about IE, this should
work fine on IE10 and up.

License
-------
[MIT](https://github.com/bilalq/eight-bit-color-picker/blob/master/LICENSE)
