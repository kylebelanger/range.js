/*  Range.js
 *  A circa 2016 light JavaScript library to resize, reduce, or change ranges of DOM elements.
 *
 *  Author: Kyle Scott Belanger
 *  Origin: April 22, 2016
 *  License: MIT
*/

var Range = function() {

    // get all DOM elements with data-range attribute
    var rangeElements = document.querySelectorAll("[data-range]");

    // for each range element on DOM
    for (var i = 0; i < rangeElements.length; i++) {
        // get x DOM element with [data-range] attribute
        var el = rangeElements[i];

        // get inputRange element
        var inputRange = el.children[0];

        // attach event listener
        eventListener(inputRange);

        // Text
        if (el.children[1].nodeName == "P") {
            var origText = el.children[1].innerHTML;
            el.children[1].setAttribute("data-text", origText);
            initilzeInputRange(0, origText.length, origText.length, 1);
        }
        // List
        else if (el.children[1].nodeName == "UL") {
        }
        // Image
        else if (el.children[1].nodeName == "IMG") {
        }
    }

    /*  initilzeInputRange
     *  Setup the default initial values for input range
     *  @param minimum value, maximum value, default value, step
    */
    function initilzeInputRange(min, max, value, step) {
        inputRange.min = min;
        inputRange.max = max;
        inputRange.value = value - 2;
        inputRange.step = step;
    };

    /*  getInnerText
    *   Get inner text of range section
     *  @param nested child <p> element(s) of range section x
     *  @return array of words in the paragraph
    */
    function getInnerText(el) {
        var p  = el;
        var innerText = p.innerText;
        return innerText.split(' ');
    }

    /*  updateInnerText
    *   Update inner text based on range section
    *   @param the event elemenet (input range)
    *   @param range value, number of words to display
    */
    function updateInnerText(el, len) {
        var originalText = el.srcElement.nextSibling.nextElementSibling.getAttribute("data-text");
        el.srcElement.nextSibling.nextElementSibling.innerHTML = originalText.substring(0, len);
    }

    /*  eventListener
     *  @param event object (input range)
    */
    function eventListener(el) {
      el.addEventListener('input', function(e) {
          updateInnerText(e, el.value);
  		});
    };


}
