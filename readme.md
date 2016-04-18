# Range.js

A simple and light (<100 lines) vanilla JavaScript library to resize, reduce, or change ranges of DOM elements using the HTML5 `<input type="range">` element.

## Usage:

1. Include range.js in your dependencies.
2. Wrap sections that you want to have input range control over.
3. Simply add a 'data-range='true' attribute to the wrapper element
4. Initialize range.js object within the page
* ```html
  <script>
      range = new Range();
  </script>
  ``` *

You can have multiple sections with `data-range="true"` attributes attached on the same page. The library will automatically detect the type of content within each section.

## Examples

Here are live examples.

1. Text example:
* ```html
  <!-- text example -->
  <section data-range="true">
       <input type="range">
       <p>This is some sample text that you can reduce. User Account Control (UAC) is a feature that can help you stay in control of your computer by informing you when a programs makes a change that requires administrator permissions..</p>
  </section>
  ``` *
2. List example:
* ```html
  <!-- list example -->
  <section data-range="true">
       <input type="range">
       <ul>
         <li>Item one</li>
         <li>Item two</li>
         <li>Item three</li>
         <li>Item four</li>
       </ul>
  </section>
  ``` *

## API

You can set the 'step' of the range through object initialization. The default 'step' is 1. However, setting a decimal (i.e. 0.25) can help make scrolling on the input element smoother for items that have a small amount of content (i.e. text or lists).

## Acknowledgements

Thank you to the following individuals for contributions:
  * Noah Freitas
