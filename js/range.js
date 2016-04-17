/*  Range.js
 *  A circa 2016 light JavaScript library to resize, reduce, or change ranges of DOM elements.
 *
 *  Author: Kyle Scott Belanger
 *  Origin: April 22, 2016
 *  License: MIT
*/

var Range = function(step) {

    // declare step
    this.step = step || 1;
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
            // get and bind original data
            var origHtml = el.children[1].innerHTML;
            el.children[1].setAttribute("data-value", origHtml);
            initilzeInputRange(0, origHtml.length, origHtml.length, this.step);
        }
        // List
        else if (el.children[1].nodeName == "UL") {
            // get and bind original data
            var origHtml = el.children[1].childElementCount;
            el.children[1].setAttribute("data-value", origHtml);
            initilzeInputRange(0, origHtml, origHtml, this.step);
        }
        // Image
        else if (el.children[1].nodeName == "IMG") {
            // get and bind original data
            var origHtml = el.children[1].width;
            el.children[1].setAttribute("data-value", origHtml);
            initilzeInputRange(0, origHtml, origHtml, this.step);
        }
    }

    /*  initilzeInputRange
     *  Setup the default initial values for input range
     *  @param minimum value, maximum value, default value, step
    */
    function initilzeInputRange(min, max, value, step) {
        inputRange.min = min;
        inputRange.max = max;
        inputRange.value = value;
        inputRange.step = step;
    };

    /*  updateInnerText
    *   @param the event elemenet (input range)
    *   @param range value, number of words to display
    */
    function updateInnerText(el, range) {
        var originalText = el.srcElement.nextSibling.nextElementSibling.getAttribute("data-value");
        // update on DOM
        el.srcElement.nextSibling.nextElementSibling.innerHTML = originalText.substring(0, range);
    }

    /*  updateList
    *   @param the event elemenet (input range)
    *   @param range value, number of words to display
    */
    function updateList(el, range) {
        var originalList = el.srcElement.nextSibling.nextElementSibling.getAttribute("data-value");
        var ul = el.srcElement.parentNode.children[1];
        // for each li, check diff
        for (var i = 0; i < originalList; i++) {
            ul.children[i].style.display = (i < range) ? "":"none";
        }
    }

    /*  updateImg
    *   @param the event elemenet (input range)
    *   @param range value, number of words to display
    */
    function updateImg(el, range) {
        var originalImage = el.srcElement.nextSibling.nextElementSibling.getAttribute("data-value");
        var diff = originalImage - range;
        // update on DOM
        el.srcElement.nextSibling.nextElementSibling.width = originalImage - diff;
    }

    /*  eventListener
     *  @param event object (input range)
    */
    function eventListener(el) {
      el.addEventListener('input', function(e) {
          // Text
          if (el.parentNode.children[1].nodeName == "P") {
              updateInnerText(e, el.value);
          }
          // List
          else if (el.parentNode.children[1].nodeName == "UL") {
              updateList(e, el.value);
          }
          // Image
          else if (el.parentNode.children[1].nodeName == "IMG") {
              updateImg(e, el.value);
          }
  		});
    }


}
