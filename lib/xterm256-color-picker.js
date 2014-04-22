/*!
 * XTerm256ColorPicker Library
 *
 * Released under the MIT License
 * https://github.com/bilalq/xterm256-color-picker/blob/master/LICENSE
 */
(function (root, factory) {
  /* jshint strict:false */ /* global define: false */
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module
    define([], factory)
  } else {
    // Register as a browser global
    root.XTerm256ColorPicker = factory()
  }
}(this, function() {
  'use strict';

  /**
   * Class name used for identifying color picker elements
   */
  var className = 'xterm256-color-picker'

  /**
   * Helper function to check if the argument is a DOM element object
   *
   * @param {Any} el Object to test
   * @returns {Mixed} Truthy or false value
   */
  var isDOMElement = function(el) {
    return el && el.nodeType && el.tagName
  }

  /**
   * Generates a random color from 0-255
   *
   * @returns {Number}
   */
  var randomColor = function() {
    return Math.floor(Math.random() * 256)
  }

  /**
   * Checks if color is an integer in the range of 0-255
   *
   * @param {Number} color
   * @returns {Boolean}
   */
  var isColorInRange = function(color) {
    return (
      typeof color === 'number' &&
      Math.floor(color) === color &&
      color >= 0 &&
      color <= 255
    )
  }

  /**
   * Converts decimal number to two-character hex representation
   *
   * @param {String|Number} dec
   * @returns {String}
   */
  var decToHex = function(dec) {
    var hex = parseInt(dec, 10).toString(16)
    return hex.length > 1 ? hex : '0' + hex
  }

  /**
   * Converts an RGB value to Hex
   *
   * @param {String|Object} rgb String in the format of "rgb(xxx, xxx, xxx)"
   * or an object with keys for "r", "g", and "b".
   * @returns {String} Hex format string with a leading "#"
   */
  var rgbToHex = function(rgb) {
    var colors
    if (Object.prototype.toString.call(rgb) === '[object String]') {
      colors = rgb.slice(4, rgb.length - 1).split(', ')
    } else {
      colors = [rgb.r, rgb.g, rgb.b]
    }
    return '#' + colors.map(decToHex).join('')
  }

  /**
   * Converts a hex value to RGB
   *
   * @param {String} hex String in the format "#xxxxxx" or "#xxx"
   * @returns {Object} Object with keys "r", "g", and "b" that map to integers
   */
  var hexToRGB = function(hex) {
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    }
  }

  /**
   * Default color map used by the widget
   *
   * If the browser supports it, the list is frozen as well
   */
  var defaultColorMap = [
    '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080',
    '#c0c0c0', '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff',
    '#00ffff', '#ffffff', '#000000', '#00005f', '#000087', '#0000af', '#0000d7',
    '#0000ff', '#005f00', '#005f5f', '#005f87', '#005faf', '#005fd7', '#005fff',
    '#008700', '#00875f', '#008787', '#0087af', '#0087d7', '#0087ff', '#00af00',
    '#00af5f', '#00af87', '#00afaf', '#00afd7', '#00afff', '#00d700', '#00d75f',
    '#00d787', '#00d7af', '#00d7d7', '#00d7ff', '#00ff00', '#00ff5f', '#00ff87',
    '#00ffaf', '#00ffd7', '#00ffff', '#5f0000', '#5f005f', '#5f0087', '#5f00af',
    '#5f00d7', '#5f00ff', '#5f5f00', '#5f5f5f', '#5f5f87', '#5f5faf', '#5f5fd7',
    '#5f5fff', '#5f8700', '#5f875f', '#5f8787', '#5f87af', '#5f87d7', '#5f87ff',
    '#5faf00', '#5faf5f', '#5faf87', '#5fafaf', '#5fafd7', '#5fafff', '#5fd700',
    '#5fd75f', '#5fd787', '#5fd7af', '#5fd7d7', '#5fd7ff', '#5fff00', '#5fff5f',
    '#5fff87', '#5fffaf', '#5fffd7', '#5fffff', '#870000', '#87005f', '#870087',
    '#8700af', '#8700d7', '#8700ff', '#875f00', '#875f5f', '#875f87', '#875faf',
    '#875fd7', '#875fff', '#878700', '#87875f', '#878787', '#8787af', '#8787d7',
    '#8787ff', '#87af00', '#87af5f', '#87af87', '#87afaf', '#87afd7', '#87afff',
    '#87d700', '#87d75f', '#87d787', '#87d7af', '#87d7d7', '#87d7ff', '#87ff00',
    '#87ff5f', '#87ff87', '#87ffaf', '#87ffd7', '#87ffff', '#af0000', '#af005f',
    '#af0087', '#af00af', '#af00d7', '#af00ff', '#af5f00', '#af5f5f', '#af5f87',
    '#af5faf', '#af5fd7', '#af5fff', '#af8700', '#af875f', '#af8787', '#af87af',
    '#af87d7', '#af87ff', '#afaf00', '#afaf5f', '#afaf87', '#afafaf', '#afafd7',
    '#afafff', '#afd700', '#afd75f', '#afd787', '#afd7af', '#afd7d7', '#afd7ff',
    '#afff00', '#afff5f', '#afff87', '#afffaf', '#afffd7', '#afffff', '#d70000',
    '#d7005f', '#d70087', '#d700af', '#d700d7', '#d700ff', '#d75f00', '#d75f5f',
    '#d75f87', '#d75faf', '#d75fd7', '#d75fff', '#d78700', '#d7875f', '#d78787',
    '#d787af', '#d787d7', '#d787ff', '#d7af00', '#d7af5f', '#d7af87', '#d7afaf',
    '#d7afd7', '#d7afff', '#d7d700', '#d7d75f', '#d7d787', '#d7d7af', '#d7d7d7',
    '#d7d7ff', '#d7ff00', '#d7ff5f', '#d7ff87', '#d7ffaf', '#d7ffd7', '#d7ffff',
    '#ff0000', '#ff005f', '#ff0087', '#ff00af', '#ff00d7', '#ff00ff', '#ff5f00',
    '#ff5f5f', '#ff5f87', '#ff5faf', '#ff5fd7', '#ff5fff', '#ff8700', '#ff875f',
    '#ff8787', '#ff87af', '#ff87d7', '#ff87ff', '#ffaf00', '#ffaf5f', '#ffaf87',
    '#ffafaf', '#ffafd7', '#ffafff', '#ffd700', '#ffd75f', '#ffd787', '#ffd7af',
    '#ffd7d7', '#ffd7ff', '#ffff00', '#ffff5f', '#ffff87', '#ffffaf', '#ffffd7',
    '#ffffff', '#080808', '#121212', '#1c1c1c', '#262626', '#303030', '#3a3a3a',
    '#444444', '#4e4e4e', '#585858', '#626262', '#6c6c6c', '#767676', '#808080',
    '#8a8a8a', '#949494', '#9e9e9e', '#a8a8a8', '#b2b2b2', '#bcbcbc', '#c6c6c6',
    '#d0d0d0', '#dadada', '#e4e4e4', '#eeeeee'
  ]
  if (Object.freeze) { Object.freeze(defaultColorMap) }

  /**
   * Constructor for Color Picker object
   *
   * Takes in an options hash with various properties
   */
  function XTerm256ColorPicker(opts) {
    // Initialize instance variables
    this.el = isDOMElement(opts.el) ? opts.el : document.getElementById(opts.el)
    this.colorMap = opts.colorMap || defaultColorMap
    this.color = parseInt(opts.color || this.el.dataset.color || randomColor(), 10)

    // Validate own values
    this.validate()

    // Render color-picker UI
    this.render()
  }

  /**
   * Renders color-picker UI and modifies the HTML of the element
   */
  XTerm256ColorPicker.prototype.render = function() {
    // Set class on element
    this.el.classList.add(className)

    // Set inner HTML with subnodes based on a template
    this.buildSubNodes()

    // Populates and builds color map for picker
    this.buildColorMapUI()
  }

  /**
   * Sets innerHTML of an XTerm256ColorPicker's element with a template
   */
  XTerm256ColorPicker.prototype.buildSubNodes = function() {
    this.el.innerHTML = String.prototype.concat.call(
      '<div class="xt256cp-selection" style="background: ', this.getHexColor(),';">',
        '&nbsp;',
      '</div>',
      '<div class="xt256cp-selector">',
        '<div class="xt256cp-colormap"></div>',
        '<div class="xt256cp-text xt256cp-8bit-color">',
          this.get8BitColor(),
        '</div>',
        '<div class="xt256cp-text xt256cp-hex-color">',
          this.getHexColor(),
        '</div>',
      '</div>'
    )
  }

  /**
   * Build color map in the DOM and attaches a listener for click events on a
   * color
   */
  XTerm256ColorPicker.prototype.buildColorMapUI = function() {
    // Cached selectors
    var selectedColorEl = this.el.querySelector('.xt256cp-selection')
      , colorMapEl = this.el.querySelector('.xt256cp-colormap')
      , eightBitTextEl = this.el.querySelector('.xt256cp-8bit-color')
      , hexTextEl = this.el.querySelector('.xt256cp-hex-color')

    // Variables used for generating color map
    var fragment = document.createDocumentFragment()
      , row = document.createElement('div')
      , rowSize = 0

    this.colorMap.forEach(function(twentyFourBitColor, eightBitColor) {
      var colorEl = document.createElement('div')
      colorEl.dataset.eightBitColor = eightBitColor
      colorEl.dataset.twentyFourBitColor = twentyFourBitColor
      colorEl.style.background = twentyFourBitColor
      row.appendChild(colorEl)
      rowSize += 1

      if (rowSize % 16 === 0) {
        row.classList.add('xt256cp-colormap-row')
        fragment.appendChild(row)
        row = document.createElement('div')
      }
    })

    colorMapEl.appendChild(fragment)

    colorMapEl.addEventListener('click', function(e) {
      var eightBitColor = e.target.dataset.eightBitColor
        , twentyFourBitColor = e.target.dataset.twentyFourBitColor

      // Do nothing if the colors aren't set
      if (eightBitColor == null) { return false }

      // Update the selected color, as well as the text fields for eight bit
      // & hex colors
      selectedColorEl.style.background = twentyFourBitColor
      eightBitTextEl.textContent = eightBitColor
      hexTextEl.textContent = twentyFourBitColor

      // Prevent event propagation
      return false
    })
  }

  /**
   * Function to automatically detect elements with the color picker's class
   * name and instantiate them. The default color can be customized via a
   * "data-color" attribute.
   *
   * @returns {DOMElement[]}
   */
  XTerm256ColorPicker.detect = function() {
    var elements = document.getElementsByClassName(className)

    return Array.prototype.map.call(elements, function(el) {
      return new XTerm256ColorPicker({el: el})
    })
  }

  /**
   * Validates that the picker object is instantiated correctly
   *
   * @throws Error
   */
  XTerm256ColorPicker.prototype.validate = function() {
    var err
    if (!this.el) { err = 'Element for color picker not found' }
    if (!isColorInRange(this.color)) { err = 'Color outside the range of 0-255' }
    if (!this.colorMap || this.colorMap.length !== 256) { err = 'Invalid color map set' }
    if (err) { throw new Error(err) }
  }

  /**
   * Renders the color picker selection view
   */
  XTerm256ColorPicker.prototype.show = function() {
    // TODO
  }

  /**
   * Returns the current color as an integer between 0 and 255
   *
   * @returns {Number}
   */
  XTerm256ColorPicker.prototype.get8BitColor = function() {
    return this.color
  }

  /**
   * Returns the current color in hex format with a leading "#"
   *
   * @returns {String}
   */
  XTerm256ColorPicker.prototype.getHexColor = function() {
    return this.colorMap[this.color]
  }

  /**
   * Returns the current color as an object with keys "r", "g", and "b". Values
   * are integers from 0 to 255.
   *
   * @returns {Object}
   */
  XTerm256ColorPicker.prototype.getRGBColor = function() {
    var hex = this.getHexColor()
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    }
  }

  /**
   * Returns the terminal escape code sequence to use the current color as a
   * foreground color.
   *
   * @returns {String}
   */
  XTerm256ColorPicker.prototype.getForegroundEscapeSequence = function() {
    return '\x1b[38;5;' + this.get8BitColor() + 'm'
  }

  /**
   * Returns the terminal escape code sequence to use the current color as a
   * background color.
   *
   * @returns {String}
   */
  XTerm256ColorPicker.prototype.getBackgroundEscapeSequence = function() {
    return '\x1b[48;5;' + this.get8BitColor() + 'm'
  }

  /**
   * Expose constructor function as either AMD or global module
   */
  return XTerm256ColorPicker
}))
