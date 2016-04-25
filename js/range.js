/*  Range.js
 *  A library to resize, reduce, or change ranges of DOM elements.
 *
 *  Author: Kyle Belanger
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
            var numParagraphs = el.children.length - 1;
            var fullText, origText;

            for (var p = 0; p < numParagraphs; p++) {
                origText = el.children[p + 1].innerHTML;
                el.children[p + 1].setAttribute("data-text", origText);
                fullText += origText;
            }

            initilzeInputRange(0, fullText.length, fullText.length, 1);
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
    *   @param range value, number of char to display
    */
    function updateInnerText(el, range) {
        // declare varibales
        var paragraphs = [],
            totalCut;

        // get length of all combined p text
        var fullTextLength = parseInt(fullText.length);
        // calculate amount to cut
        var cut = parseInt(fullTextLength) - parseInt(range);

        // get text and length for each p element
        for (var p = 0; p < numParagraphs; p++) {
            var parObject = {};
            parObject['text'] = el.srcElement.parentNode.children[p + 1].attributes["data-text"].value;
            parObject['length'] = el.srcElement.parentNode.children[p + 1].attributes["data-text"].value.length;
            paragraphs.push(parObject);
        }

        // if less than last paragraph, cut and break
        if (cut < paragraphs[numParagraphs - 1]['length']) {
            el.srcElement.parentNode.children[numParagraphs].innerHTML = paragraphs[numParagraphs - 1]['text'].substring(0, paragraphs[numParagraphs - 1]['length'] - cut);
        }
        // otherwise backwards loop to remove text in each p
        else {
            for (var x = numParagraphs; x > 0; x--) {
                // if less than current p, cut and break
                if (cut < paragraphs[numParagraphs - 1]['length']) {
                    el.srcElement.parentNode.children[x].innerHTML = paragraphs[x - 1]['text'].substring(0, paragraphs[x - 1]['length'] - cut);
                    break;
                }
                else {
                    // remove this p
                    el.srcElement.parentNode.children[x].innerHTML = paragraphs[x - 1]['text'].substring(0, 0);
                    // subtract this p length from cut total
                    cut = cut - paragraphs[x - 1]['length'];
                }
            }
        }
    }

    /*  updateList
    *   @param the event elemenet (input range)
    *   @param range value, number of words to display
    */
    function updateList(el, range) {
        var originalList = el.srcElement.nextSibling.nextElementSibling.getAttribute("data-value");
        var ul = el.srcElement.parentNode.children[1];
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
