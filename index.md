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

