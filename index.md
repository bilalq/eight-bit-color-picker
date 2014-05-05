---
layout: default
title: Eight Bit Color Picker
---

<div class="showcase">
  <div class="eight-bit-color-picker"></div>
  <div class="eight-bit-color-picker"></div>
  <div class="eight-bit-color-picker"></div>
  <div class="eight-bit-color-picker"></div>
</div>

> A UI component for picking a color from arbitrary 256 color palettes



This is a simple, flexible color-picker widget. It has no dependencies (not
even on Jquery), so it's easy to just plug in and use. It weighs 2.2kb for JS
& 518 bytes for CSS once minified and gzipped.

If you're using an AMD loader, this will register as an AMD module. If not,
it'll expose a global called `EightBitColorPicker`.

Installation
------------
You can of course go through the old-school copy/pasta routine, but here's the
command to pull this in using Bower:

```sh
bower install --save eight-bit-color-picker
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
EightBitColorPicker.detect()
```

Browser Requirements
--------------------
This will work in all modern browsers. If you're worried about IE, this should
work fine on IE10 and up.

License
-------
[MIT](https://github.com/bilalq/eight-bit-color-picker/blob/master/LICENSE)
