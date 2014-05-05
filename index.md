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

Install
-------
You can of course go through the old-school copy/pasta routine, but here's the
command to pull this in using Bower:

```sh
bower install --save eight-bit-color-picker
```

Use
---
```html
<div class="eight-bit-color-picker"></div>
```

```javascript
EightBitColorPicker.detect()
```

<div class="demo">
  And voila: <div class="eight-bit-color-picker"></div>
</div>

Customize
---------
This widget is easy to customize and extend.


<div class="demo">
  You can set default colors (like these blue and green ones):

  <div data-color="81" class="eight-bit-color-picker"></div>
  <div data-color="82" class="eight-bit-color-picker"></div>
</div>

<div class="demo">
  Or even change the color palette entirely:

  <div class="eight-bit-color-picker blue-palette"></div>
</div>

Check out [the docs]({{ site.baseurl}}/docs) for more details.

