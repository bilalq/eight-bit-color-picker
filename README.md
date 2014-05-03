Eight Bit Color Picker
======================

> UI component for picking a color from arbitrary 256 color palettes

This is a simple, flexible color-picker widget. It has no dependencies (not
even on Jquery), so it's easy to just plug in and use. It weighs 2.2kb for JS
& 518 bytes for CSS once minified and gzipped.

If you're using an AMD loader, this will register as an AMD module. If not,
it'll expose a global called `EightBitColorPicker`.

Installation
------------
You can of course go through the old-school copy/pasta routine, but here's the
command to pull this in using Bower:

    bower install --save eight-bit-color-picker

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

Alternatively, you can just run the `detect` function to instantiate all color
pickers.

```javascript
// Renders all color pickers
EightBitColorPicker.detect()
```

API
---

`EightBitColorPicker` constructor
The constructor takes in an object with the following properties:

* `el`: Either a string of an element ID or a DOMElement object *(required)*
* `colorMap`: An array of 256 strings in full hex format (e.g: `#ffffff`)
* `color`: Initial color to set picker instance at (valid values are between 0-255)

If no `colorMap` is specified, a default palette is used. If color is not
specified in the argument, it will first check if the targeted element has a
`data-color` attribute and use that if so. Otherwise, a random color from the
palette will be chosen.

### `EightBitColorPicker.detect`
This function finds all color pickers in the DOM, renders them, and returns a
list of picker instances. Note that this function is not on the prototype chain,
and can be invoked statically like so:

```javascript
var pickers = EightBitColorPicker.detect()
```

`EightBitColorPicker.prototype.get8bitColor`
Returns an integer from 0-255 that corresponds with the 8bit color index
currently in display by the picker.

`EightBitColorPicker.prototype.getHexColor`
Returns the currently selected color of the picker instance as a string in
full hex format with a leading "#".

`EightBitColorPicker.prototype.getRGBColor`
Returns the current color as an object with keys "r", "g", and "b". Values are
integers from 0 to 255.

`EightBitColorPicker.prototype.getForegroundEscapeSequence`
Returns the terminal escape code sequence to use the current color as a
foreground color.

`EightBitColorPicker.prototype.getBackgroundEscapeSequence`
Returns the terminal escape code sequence to use the current color as a
background color.

`EightBitColorPicker.prototype.show`
Displays the color picker selection view

`EightBitColorPicker.prototype.hide`
Hides the color picker selection view

`EightBitColorPicker.prototype.updateColor`
Updates the value of `this.color` and its representations. This takes two
arguments:

* `color`: The color from 0-255 to use
* `previewOnly`: [optional] Only updates preview representation if truthy and
  leaves `this.color` alone

`EightBitColorPicker.prototype.restoreColor`
Restores preview color representations to match the value of `this.color`.

Browser Requirements
--------------------
This will work in all modern browsers. If you're worried about IE, this should
work fine on IE10 and up.

License
-------
[MIT][https://github.com/bilalq/eight-bit-color-picker/blob/master/LICENSE]
