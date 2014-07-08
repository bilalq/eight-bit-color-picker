/**
 * @preserve
 * EightBitColorPicker Library
 *
 * Released under the MIT License
 * https://github.com/bilalq/eight-bit-color-picker/blob/master/LICENSE
 */
;(function (root, factory) {
  /* jshint strict:false */ /* global define:false, module:false*/
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module
    define([], factory)
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    // Register CommonJS-ish module (should work with Component & Browserify)
    module.exports = factory()
  } else {
    // Register as a browser global
    root.EightBitColorPicker = factory()
  }
}(this, function() {
  'use strict';

  /**
   * Class name used for identifying color picker elements
   */
  var className = 'eight-bit-color-picker'

  /**
   * Helper function to check if the argument is a DOM element object
   *
   * @param {Any} el - Object to test
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
   * Default color palette used by the widget
   */
  var defaultPalette = [
    '#400000', '#400000', '#400900', '#234000', '#004000', '#004000', '#004000',
    '#000d40', '#000040', '#000040', '#000040', '#000040', '#280040', '#400003',
    '#400000', '#000000', '#540000', '#540000', '#541d00', '#375400', '#005400',
    '#005400', '#005402', '#002154', '#000054', '#000054', '#000054', '#000054',
    '#3c0054', '#540017', '#540000', '#0d0d0d', '#680000', '#680000', '#683100',
    '#4b6800', '#006800', '#006800', '#006816', '#003568', '#001168', '#000068',
    '#000068', '#000068', '#500068', '#68002b', '#680000', '#212121', '#7c0000',
    '#7c0000', '#7c4500', '#5f7c00', '#0b7c00', '#007c00', '#007c2a', '#00497c',
    '#00257c', '#00007c', '#00007c', '#10007c', '#64007c', '#7c003f', '#7c0000',
    '#353535', '#900000', '#900400', '#905900', '#739000', '#1f9000', '#009000',
    '#00903e', '#005d90', '#003990', '#000090', '#000090', '#240090', '#780090',
    '#900053', '#900000', '#494949', '#a40000', '#a41800', '#a46d00', '#87a400',
    '#33a400', '#00a400', '#00a452', '#0071a4', '#004da4', '#0000a4', '#0000a4',
    '#3800a4', '#8c00a4', '#a40067', '#a40013', '#5d5d5d', '#b80000', '#b82c00',
    '#b88100', '#9bb800', '#47b800', '#00b800', '#00b866', '#0085b8', '#0061b8',
    '#000db8', '#0000b8', '#4c00b8', '#a000b8', '#b8007b', '#b80027', '#717171',
    '#cc0000', '#cc4000', '#cc9500', '#afcc00', '#5bcc00', '#06cc00', '#00cc7a',
    '#0099cc', '#0075cc', '#0021cc', '#0c00cc', '#6000cc', '#b400cc', '#cc008f',
    '#cc003b', '#858585', '#e00000', '#e05400', '#e0a900', '#c3e000', '#6fe000',
    '#1ae000', '#00e08e', '#00ade0', '#0089e0', '#0035e0', '#2000e0', '#7400e0',
    '#c800e0', '#e000a3', '#e0004f', '#999999', '#f41414', '#f46814', '#f4bd14',
    '#d7f414', '#83f414', '#2ef414', '#14f4a2', '#14c1f4', '#149df4', '#1449f4',
    '#3414f4', '#8814f4', '#dc14f4', '#f414b7', '#f41463', '#adadad', '#ff2828',
    '#ff7c28', '#ffd128', '#ebff28', '#97ff28', '#42ff28', '#28ffb6', '#28d5ff',
    '#28b1ff', '#285dff', '#4828ff', '#9c28ff', '#f028ff', '#ff28cb', '#ff2877',
    '#c1c1c1', '#ff3c3c', '#ff903c', '#ffe53c', '#ffff3c', '#abff3c', '#56ff3c',
    '#3cffca', '#3ce9ff', '#3cc5ff', '#3c71ff', '#5c3cff', '#b03cff', '#ff3cff',
    '#ff3cdf', '#ff3c8b', '#d5d5d5', '#ff5050', '#ffa450', '#fff950', '#ffff50',
    '#bfff50', '#6aff50', '#50ffde', '#50fdff', '#50d9ff', '#5085ff', '#7050ff',
    '#c450ff', '#ff50ff', '#ff50f3', '#ff509f', '#e9e9e9', '#ff6464', '#ffb864',
    '#ffff64', '#ffff64', '#d3ff64', '#7eff64', '#64fff2', '#64ffff', '#64edff',
    '#6499ff', '#8464ff', '#d864ff', '#ff64ff', '#ff64ff', '#ff64b3', '#fdfdfd',
    '#ff7878', '#ffcc78', '#ffff78', '#ffff78', '#e7ff78', '#92ff78', '#78ffff',
    '#78ffff', '#78ffff', '#78adff', '#9878ff', '#ec78ff', '#ff78ff', '#ff78ff',
    '#ff78c7', '#ffffff', '#ff8c8c', '#ffe08c', '#ffff8c', '#ffff8c', '#fbff8c',
    '#a6ff8c', '#8cffff', '#8cffff', '#8cffff', '#8cc1ff', '#ac8cff', '#ff8cff',
    '#ff8cff', '#ff8cff', '#ff8cdb', '#ffffff'
  ]

  /**
   * Constructor for Color Picker object
   *
   * Takes in an options hash with various properties
   *
   * @constructor
   * @param {Object} opts - Object containing color picker options
   * @param {DOMElement|String} opts.el - Reference to DOMElement or an id
   * @param {String[]} [opts.palette] - List of 256 hex colors to use as color palette
   * @param {String|Number} [opts.color] - Value from 0-255 to use as initial color value
   */
  function EightBitColorPicker(opts) {
    // Initialize instance variables
    this.el = isDOMElement(opts.el) ? opts.el : document.getElementById(opts.el)
    this.palette = opts.palette || defaultPalette
    this.color = parseInt(opts.color || this.el.dataset.color || randomColor(), 10)

    // Validate own values
    this.validate()

    // Render color-picker UI
    render.call(this)
  }

  // Reference protoype in a variable to improve minification
  var pickerProto = EightBitColorPicker.prototype

  /**
   * Renders color-picker UI and modifies the HTML of the element
   */
  var render = function() {
    // Set class on element
    this.el.classList.add(className)

    // Set inner HTML with subnodes based on a template
    buildSubNodes.call(this)

    // Populates and builds color map for picker
    buildColorPickerUI.call(this)

    // Declare exitListener
    var exitListener

    // Bind listener to show color map on click
    this.el.addEventListener('click', (function() {
      this.show()

      // Bind exit listener to hide map when clicked elsewhere
      if (exitListener) { return }
      exitListener = (function(e) {
        if (this.el.contains(e.target)) { return }
        this.hide()
        window.removeEventListener('click', exitListener)
        exitListener = null
      }).bind(this)
      window.addEventListener('click', exitListener)
    }).bind(this))
  }

  /**
   * Sets innerHTML of an EightBitColorPicker's element with a template
   */
  var buildSubNodes = function() {
    this.el.innerHTML =
      '<div class="ebcp-selection" style="background: ' + this.getHexColor() + ';">' +
        '&nbsp;' +
      '</div>' +
      '<div class="ebcp-selector">' +
        '<div class="ebcp-palette"></div>' +
        '<div class="ebcp-preview-values">' +
          '<div class="ebcp-text-container">' +
            '<input class="ebcp-text ebcp-8bit-color" type="text" value="' +
              this.get8BitColor() +
            '">' +
            '<input readonly type="text" class="ebcp-text ebcp-hex-color" value="' +
              this.getHexColor() +
            '">' +
          '</div>' +
          '<div class="ebcp-color-preview" style="background: ' + this.getHexColor() + ';">' +
            '&nbsp;' +
          '</div>' +
        '</div>' +
      '</div>'
  }

  /**
   * Convenience proxy to picker element's addEventListener function
   */
  pickerProto.addEventListener = function(type, listener, useCapture) {
    this.el.addEventListener(type, listener, useCapture)
  }

  /**
   * Convenience proxy to picker element's removeEventListener function
   */
  pickerProto.removeEventListener = function(type, listener, useCapture) {
    this.el.removeEventListener(type, listener, useCapture)
  }

  /**
   * Updates the value of this.color and its representations
   *
   * @param {Number|String} color - The color from 0-255 to use
   * @param {Boolean} [previewOnly] - Only updates preview representation if truthy
   */
  pickerProto.updateColor = function(color, previewOnly) {
    var eightBitColor = parseInt(color, 10)
      , colorAsString = eightBitColor.toString()
      , elements = this.loadSelectors()
    if (!color || !colorAsString.length || colorAsString.length > 3) { return }
    if (!isColorInRange(eightBitColor)) { return }
    if (eightBitColor === this.color) { return }

    var twentyFourBitColor = this.palette[eightBitColor]

    // If not preview only, then update this.color & dispatch change event
    if (!previewOnly) {
      var event = new CustomEvent('colorChange', { detail: {
        oldColor: this.color,
        newColor: eightBitColor,
        picker: this
      }})
      this.color = eightBitColor
      elements.selectedColor.style.background = twentyFourBitColor
      this.el.dispatchEvent(event)
    }
    elements.eightBitText.value = eightBitColor
    elements.hexText.value = twentyFourBitColor
    elements.previewColor.style.background = twentyFourBitColor
  }

  /**
   * Restores preview color representations to match the value of this.color
   */
  pickerProto.restoreColor = function() {
    var elements = this.loadSelectors()
    elements.previewColor.style.background = this.getHexColor()
    elements.hexText.value = this.getHexColor()
    elements.eightBitText.value = this.get8BitColor()
  }

  /**
   * Updates picker to have a new palette & refreshes color displays
   *
   * @returns {Boolean} Whether or not the update operation was successful
   */
  pickerProto.updatePalette = function(palette) {
    if (!EightBitColorPicker.isValidPalette(palette)) {
      return false
    }

    // Temporarily set color to undefined to prevent a noop from updateColor
    var color = this.color
    this.color = undefined

    // Update the palette to the new value, rebuild the display, & trigger a
    // color update
    this.palette = palette
    buildPalette.call(this)
    this.updateColor(color)

    return true
  }

  /**
   * Loads and caches selectors
   */
  pickerProto.loadSelectors = function() {
    if (this.selectors) { return this.selectors }
    this.selectors = {
      selectionUI: this.el.querySelector('.ebcp-selector'),
      selectedColor: this.el.querySelector('.ebcp-selection'),
      palette: this.el.querySelector('.ebcp-palette'),
      eightBitText: this.el.querySelector('.ebcp-8bit-color'),
      hexText: this.el.querySelector('.ebcp-hex-color'),
      previewColor: this.el.querySelector('.ebcp-color-preview')
    }
    return this.selectors
  }

  /**
   * Builds DOM elements to display the color palette
   */
  var buildPalette = function() {
    // Cache selectors
    var elements = this.loadSelectors()

    // Variables used for generating color map
    var fragment = document.createDocumentFragment()
      , row = document.createElement('div')
      , rowSize = 0

    // Generation of color map
    this.palette.forEach(function(twentyFourBitColor, eightBitColor) {
      var colorEl = document.createElement('div')
      colorEl.dataset.eightBitColor = eightBitColor
      colorEl.style.background = twentyFourBitColor
      row.appendChild(colorEl)
      rowSize += 1
      if (rowSize % 16 === 0) {
        row.classList.add('ebcp-palette-row')
        fragment.appendChild(row)
        row = document.createElement('div')
      }
    })

    // Clear innerHTML of palette and append new fragment
    elements.palette.innerHTML = ''
    elements.palette.appendChild(fragment)
  }

  /**
   * Builds color map in the DOM and attach event listeners
   */
  var buildColorPickerUI = function() {
    // Maintain reference to this
    var picker = this

    // Cache selectors
    var elements = this.loadSelectors()

    // Build the palette
    buildPalette.call(this)

    // Hover handling for color preview
    elements.palette.addEventListener('mouseover', function(e) {
      var eightBitColor = e.target.dataset.eightBitColor
      picker.updateColor(eightBitColor, true)
    })

    // Restore preview to selected color when cursor leaves the color map
    elements.palette.addEventListener('mouseleave', picker.restoreColor.bind(picker))

    // Click handling for color selection
    elements.palette.addEventListener('click', function(e) {
      picker.updateColor(e.target.dataset.eightBitColor)
    })

    // Update color when text input is edited
    elements.eightBitText.addEventListener('keyup', function(e) {
      if (e.keyCode >= 33 && e.keyCode <= 40) {
        // Allow navigation keys
        return true
      }
      picker.updateColor(this.value)
    })

    // Restore & normalize color when leaving focus of text input
    elements.eightBitText.addEventListener('blur', picker.restoreColor.bind(picker))
  }

  /**
   * Returns a clone of the default color palette
   *
   * @returns {String[]}
   */
  EightBitColorPicker.getDefaultPalette = function() {
    return defaultPalette.slice(0)
  }

  /**
   * Function which checks if a given palette is valid
   *
   * @param {String[]} palette
   * @returns {Boolean}
   */
  EightBitColorPicker.isValidPalette = function(palette) {
    var colorCheck = RegExp.prototype.test.bind(/^#[a-f0-9]{6}$/)
    return Array.isArray(palette) && palette.length === 256 &&
      palette.map(colorCheck).reduce(function(a, b) { return a && b }, true)
  }

  /**
   * Function to automatically detect elements with the color picker's class
   * name and instantiate them. The default color can be customized via a
   * "data-color" attribute.
   *
   * @returns {DOMElement[]}
   */
  EightBitColorPicker.detect = function() {
    var elements = document.getElementsByClassName(className)
    return Array.prototype.map.call(elements, function(el) {
      return new EightBitColorPicker({el: el})
    })
  }

  /**
   * Validates that the picker object is instantiated correctly
   *
   * @throws Error
   */
  pickerProto.validate = function() {
    var err
    if (!this.el) { err = 'Element for color picker not found' }
    if (!isColorInRange(this.color)) { err = 'Color outside the range of 0-255' }
    if (!this.palette || this.palette.length !== 256) { err = 'Invalid color map set' }
    if (err) { throw new Error(err) }
  }

  /**
   * Displays the color picker selection view
   */
  pickerProto.show = function() {
    var selectionUI = this.loadSelectors().selectionUI
      , leftOffset = this.el.offsetLeft
      , topOffset = this.el.offsetTop

    selectionUI.style.left = leftOffset + 40 + 'px'
    selectionUI.style.top = topOffset + 40 + 'px'
    selectionUI.classList.add('ebcp-shown-selector')
  }

  /**
   * Hides the color picker selection view
   */
  pickerProto.hide = function() {
    var selectionUI = this.loadSelectors().selectionUI
    selectionUI.classList.remove('ebcp-shown-selector')
  }

  /**
   * Returns the element in which the picker was rendered
   *
   * @returns {DOMElement}
   */
  pickerProto.getElement = function() {
    return this.el
  }

  /**
   * Returns the current color as an integer between 0 and 255
   *
   * @returns {Number}
   */
  pickerProto.get8BitColor = function() {
    return this.color
  }

  /**
   * Returns the current color in hex format with a leading "#"
   *
   * @returns {String}
   */
  pickerProto.getHexColor = function() {
    return this.palette[this.color]
  }

  /**
   * Returns the current color as an object with keys "r", "g", and "b". Values
   * are integers from 0 to 255.
   *
   * @returns {Object}
   */
  pickerProto.getRGBColor = function() {
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
  pickerProto.getForegroundEscapeSequence = function() {
    return '\\x1b[38;5;' + this.get8BitColor() + 'm'
  }

  /**
   * Returns the terminal escape code sequence to use the current color as a
   * background color.
   *
   * @returns {String}
   */
  pickerProto.getBackgroundEscapeSequence = function() {
    return '\\x1b[48;5;' + this.get8BitColor() + 'm'
  }

  /**
   * Expose constructor function as either AMD or global module
   */
  return EightBitColorPicker
}));
