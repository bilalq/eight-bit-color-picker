---
layout: default
title: Eight Bit Color Picker Docs
---

API
---

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

---

`EightBitColorPicker.detect`

This function finds all elements with the class `eight-bit-color-picker`,
renders them as pickers, and returns a list of picker instances. Note that this
function is not on the prototype chain, and can be invoked statically like so:

```javascript
var pickers = EightBitColorPicker.detect()
```

---

`EightBitColorPicker.prototype.get8bitColor`

Returns an integer from 0-255 that corresponds with the 8bit color index
currently in display by the picker.

---

`EightBitColorPicker.prototype.getHexColor`

Returns the currently selected color of the picker instance as a string in
full hex format with a leading "#".

---

`EightBitColorPicker.prototype.getRGBColor`

Returns the current color as an object with keys "r", "g", and "b". Values are
integers from 0 to 255.

---

`EightBitColorPicker.prototype.getForegroundEscapeSequence`

Returns the terminal escape code sequence to use the current color as a
foreground color.

---

`EightBitColorPicker.prototype.getBackgroundEscapeSequence`

Returns the terminal escape code sequence to use the current color as a
background color.

---

`EightBitColorPicker.prototype.show`

Displays the color picker selection view

---

`EightBitColorPicker.prototype.hide`

Hides the color picker selection view

---

`EightBitColorPicker.prototype.updateColor`

Updates the value of `this.color` and its representations. This takes two
arguments:

* `color`: The color from 0-255 to use
* `previewOnly`: [optional] Only updates preview representation if truthy and
  leaves `this.color` alone

---

`EightBitColorPicker.prototype.restoreColor`

Restores preview color representations to match the value of `this.color`.

---
