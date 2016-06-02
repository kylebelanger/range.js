# Range.js

A simple and light vanilla JavaScript library to resize, reduce, or change ranges of DOM elements using the HTML5 `<input type="range">` element.

## Usage:

1. Include range.js in your dependencies
2. Wrap sections that you want to have input range control over
3. Add a `data-range="true"` attribute to the wrapper element

  ```html
  <section data-range="true">
       <input type="range">
       <p>This is some sample text that you can reduce.</p>
  </section>
  ```

4. Initialize a Range object within the page

  ```html
  <script>
      range = new Range();
  </script>
  ```

You can have multiple sections with `data-range="true"` attributes attached on the same page. The library will automatically detect the type of content within each section.


## Examples

Here are live [examples](http://kylesb.github.io/range.js/).

1. Text example:

  ```html
  <!-- text example -->
  <section data-range="true">
       <input type="range">
       <p>This is some sample text that you can reduce.</p>
       <p>Also works with multiple p elements within the wrapper.</p>
  </section>
  ```
2. List example:

  ```html
  <!-- list example -->
  <section data-range="true">
       <input type="range">
       <ul>
         <li>Item one</li>
         <li>Item two</li>
         <li>Item three</li>
         <ul>
            <li>three-one</li>
            <li>three-two</li>
         </ul>
         <li>Item four</li>
       </ul>
  </section>
  ```

3. Image example:

  ```html
  <!-- image example -->
  <section data-range="true">
       <input type="range">
       <img src="ok.png" width="250">
  </section>
  ```


## API

You can set the `step` of the range through object initialization. The default `step` is 1. However, setting a decimal (i.e. 0.25) can help make scrolling on the input element smoother for items that have a small amount of content (i.e. text or lists).

To set the `step`, pass an interget or decimal on object initialization.

```html
<script>
    // set step with .25
    range = new Range(0.25);
</script>
```


## Contributing

This is a small, open-source project, and contributions are encouraged. Check the  [Issues](https://github.com/kylesb/range.js/issues) section to view the project roadmap and future goals.

  1. Fork the repository
  2. Create a branch for your patch or feature
  3. Make your changes
  4. Push to your Fork
  5. Open a pull request and describe your changes


## Acknowledgements

Thank you to the following individuals for help and contributions:
  * Noah Freitas
  * James Quinlan
