/*  Range.js
 *  A library to resize, reduce, or change ranges of DOM elements.
 *
 *  Origin: April 22, 2016
 *  License: MIT
 *
 *  @param Integer - step value of input range
*/

var Range = function(step) {

    // set step or default to 1
    this.step = step || 1;

    // get all DOM elements with data-range attribute
    var rangeElements = document.querySelectorAll("[data-range]");

    // for each range element on DOM
    for (var i = 0; i < rangeElements.length; i++) {

        // get x DOM element with [data-range] attribute
        var el = rangeElements[i];

        // set DOM elements corrosponding to this range section
        var inputRange = el.children[0];
        var sectionRange = el.children[1];

        // attach event listener
        eventListener(inputRange);

        // Paragraph
        if (sectionRange.nodeName == "P") {
            var numParagraphs = el.children.length - 1;
            var fullText, origText;

            for (var p = 0; p < numParagraphs; p++) {
                origText = el.children[p + 1].innerHTML;
                el.children[p + 1].setAttribute("data-text", origText);
                fullText += origText;
            }

            initializeInputRange(0, fullText.length, fullText.length, 1);
        }
        // List
        else if (sectionRange.nodeName == "UL" || sectionRange.nodeName == "OL") {
            // set initial children count
            var childrenCount = 0;

            // Count all non-UL elements within the original UL
            searchChildren(sectionRange);

            initializeInputRange(0, childrenCount, childrenCount, this.step);
        }
        // Image
        else if (el.children[1].nodeName == "IMG") {
            // get and bind original data
            var origHtml = el.children[1].width;
            el.children[1].setAttribute("data-value", origHtml);
            initializeInputRange(0, origHtml, origHtml, this.step);
        }
    }

    /*  searchChildren
     *  Recursive function that counts and scans nodes and child nodes
     *  Assigns each non-UL element a data-position for objective tracking of order
     *
     *  @param Object - Element to be counted and searched for children elements
    */
    function searchChildren(el){
        for(var i = 0; i < el.children.length; i++){
            if(el.children[i].nodeName != 'UL'){
                childrenCount++;
                el.children[i].setAttribute('data-position', childrenCount);
            }
            if(el.children[i].children){
                searchChildren(el.children[i]);
            }
        }
    }

    /*  initializeInputRange
     *  Setup the default initial values for input range
     *
     *  @param Integer - minimum value,
     *  @param Integer - maximum value,
     *  @param Integer - default value,
     *  @param Integer - step
    */
    function initializeInputRange(min, max, value, step) {
        inputRange.min = min;
        inputRange.max = max;
        inputRange.value = value;
        inputRange.step = step;
    };

    /*  updateInnerText
     *  Updates the visable range of text on multiple p elements
     *
     *  @param Object - Event object
     *  @param Integer - Range value (i.e. 3)
    */
    function updateInnerText(el, range) {

        // declare varibales
        var paragraphs = [],
            totalCut,
            target = el.srcElement || el.target;

        // get length of all combined p text
        var fullTextLength = parseInt(fullText.length);
        // calculate amount to cut
        var cut = parseInt(fullTextLength) - parseInt(range);

        // get text and length for each p element
        for (var p = 0; p < numParagraphs; p++) {
            var parObject = {};
            parObject['text'] = target.parentNode.children[p + 1].attributes["data-text"].value;
            parObject['length'] = target.parentNode.children[p + 1].attributes["data-text"].value.length;
            paragraphs.push(parObject);
        }

        // if less than last paragraph, cut and break
        if (cut < paragraphs[numParagraphs - 1]['length']) {
            target.parentNode.children[numParagraphs].innerHTML = paragraphs[numParagraphs - 1]['text'].substring(0, paragraphs[numParagraphs - 1]['length'] - cut);
        }
        // otherwise backwards loop to remove text in each p
        else {
            for (var x = numParagraphs; x > 0; x--) {
                // if less than current p, cut and break
                if (cut < paragraphs[numParagraphs - 1]['length']) {
                    target.parentNode.children[x].innerHTML = paragraphs[x - 1]['text'].substring(0, paragraphs[x - 1]['length'] - cut);
                    break;
                }
                else {
                    // remove this p
                    target.parentNode.children[x].innerHTML = paragraphs[x - 1]['text'].substring(0, 0);
                    // subtract this p length from cut total
                    cut = cut - paragraphs[x - 1]['length'];
                }
            }
        }
    }

    /*  updateList
     *
     *  @param Object - Event object
     *  @param Integer - Range value (i.e. 3)
    */
    function updateList(e, range) {
        var target = e.srcElement || e.target;
        var list = target.nextSibling.nextElementSibling;
        var listNumber = list.childElementCount;

        for (var i = 0; i < listNumber; i++) {
            if(list.children[i].children){
                for(var j = 0; j < list.children[i].children.length; j++){
                    list.children[i].children[j].style.display = (list.children[i].children[j].getAttribute('data-position') <= range) ? "":"none";
                }
            }
            if(list.children[i].nodeName != 'UL') list.children[i].style.display = (list.children[i].getAttribute('data-position') <= range) ? "":"none";
        }
    }

    /*  updateImg
     *
     *  @param Object - Event object
     *  @param Integer - Range value (i.e. 3)
    */
    function updateImg(el, range) {
        var target = el.srcElement || el.target;
        var originalImage = target.nextSibling.nextElementSibling.getAttribute("data-value");
        var diff = originalImage - range;
        target.nextSibling.nextElementSibling.style.width = originalImage - diff + "px";
    }

    /*  eventListener
     *  Attach an event listener to this element
     *
     *  @param Object - Event object
    */
    function eventListener(el) {
      el.addEventListener('input', function(e) {
          // Text
          if (el.parentNode.children[1].nodeName == "P") {
              updateInnerText(e, el.value);
          }
          // List
          else if (el.parentNode.children[1].nodeName == "UL" || el.parentNode.children[1].nodeName == "OL") {
              updateList(e, el.value);
          }
          // Image
          else if (el.parentNode.children[1].nodeName == "IMG") {
              updateImg(e, el.value);
          }
  		});
    }

}
