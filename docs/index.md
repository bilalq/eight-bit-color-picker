---
layout: default
title: Eight Bit Color Picker Docs
---

---

Rendering
---------

Rendering of color pickers can be done either by instantiating via a
constuctor, or by using the `detect` function.

---

`EightBitColorPicker` constructor


The constructor takes in an object with the following properties:

* `el`: Either a string of an element ID or a DOMElement object *(required)*
* `colorMap`: An array of 256 strings in full hex format (e.g: `#ffffff`)
* `color`: Initial color to set picker instance at (valid values are between 0-255)

If no `colorMap` is specified, the xterm-256color palette is used by default. If
`color` is not specified in the argument, it will first check if the targeted
element has a `data-color` attribute and use that if so. Otherwise, a random
color from the palette will be chosen.

```javascript
var picker = new EightBitColorPicker({el: 'example', color: 6})
```

 <div id="example" class="eight-bit-color-picker" data-color="6"></div>

---

`EightBitColorPicker.detect`


This function finds all elements with the class `eight-bit-color-picker`,
renders them as pickers, and returns a list of picker instances. Note that this
function is not on the prototype chain, and can be invoked statically like so:

```javascript
var pickers = EightBitColorPicker.detect()
```

---

Getters
-------

`EightBitColorPicker` objects expose several getters with useful values.

---

`EightBitColorPicker.prototype.get8bitColor`


Returns an integer from 0-255 that corresponds with the 8bit color index
currently in display by the picker.


```javascript
picker.get8bitColor()  // 6
```

---

`EightBitColorPicker.prototype.getHexColor`


Returns the currently selected color of the picker instance as a string in
full hex format with a leading "#".

```javascript
picker.getHexColor()  // "#008080"
```

---

`EightBitColorPicker.prototype.getRGBColor`

Returns the current color as an object with keys "r", "g", and "b". Values are
integers from 0 to 255.

```javascript
picker.getRGBColor()  // {r: 0, g: 128, b: 128}
```

---

`EightBitColorPicker.prototype.getForegroundEscapeSequence`

Returns the terminal escape code sequence to use the current color as a
foreground color.

```javascript
picker.getForegroundEscapeSequence() // "\x1b[38;5;6m"
```

---

`EightBitColorPicker.prototype.getBackgroundEscapeSequence`

Returns the terminal escape code sequence to use the current color as a
background color.

```javascript
picker.getBackgroundEscapeSequence() // "\x1b[48;5;6m"
```

---

Behavior Functions
------------------

Several functions are exposed that allow users to interact with picker objects
programatically

---

`EightBitColorPicker.prototype.show`

Displays the color picker selection view

```javascript
picker.show()
```

---

`EightBitColorPicker.prototype.hide`

Hides the color picker selection view

```javascript
picker.hide()
```

---

`EightBitColorPicker.prototype.updateColor`

Updates the value of `this.color` and its representations. This takes two
arguments:

* `color`: The color from 0-255 to use
* `previewOnly`: [optional] Only updates preview representation if truthy and
  leaves `this.color` alone

```javascript
picker.updateColor(9)
```

---

`EightBitColorPicker.prototype.restoreColor`

Restores preview color representations to match the value of `this.color`.
Useful if you've invoked `updateColor` with `previewOnly` set to true.

```javascript
picker.restoreColor()
```

---

Browser Requirements
--------------------
This will work in all modern browsers. If you're worried about IE, this should
work fine on IE10 and up.

