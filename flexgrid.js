/* Flexgrid by Jon Paul Miles
** Licensed under a Creative Commons Attribution-ShareAlike 4.0 International License
** http://creativecommons.org/licenses/by-sa/4.0/ 
*/


// Measures widths of objects in either px, em, or %
// object.measure(what to measure, what type of value px, em, % , array of grid sizes to help inconsistent percentages reach for close matches)
(function($) {
    $.fn.measure = function(box, type, gridSizes) {
        var box = box || "total";
        var type = type || 'px';
        var gridSizes = gridSizes || [8.33, 16.666, 25, 33.33, 41.66, 50, 58.33, 66.66, 75, 83.33, 91.66, 100, 20, 40, 60, 80];
        var tolerance = 0.5;

        function getPercentage(element, width) {
            var parentWidth = element.parent().width();
            var percent = ((width / parentWidth) * 100).toFixed(3);

            //Round the percentage to the nearest grid container measurement if it's within 0.5 tolerance
            percent = parseFloat(percent);
            $.each(gridSizes, function(i, gridSize) {
                if(gridSize < (percent + tolerance) && gridSize > (percent - tolerance)) {
                    percent = gridSize;
                    return false;
                }
            });
            return percent;
        }

        function getEm(element, width) {
            var fontSize = parseInt(element.parent().css('font-size'));
            var fontEms = fontSize/16;
            var elementEms = ((width/16)/fontEms).toFixed(3);
            // alert('elementEMs = ' + elementEms);
            return elementEms;
        }

        function getMeasurement(element) {
            var width;
            switch (box) {
                case "margin-box":
                    width = element.outerWidth(true);
                    break;
                case "border-box":
                    width = element.outerWidth();
                    break;
                case "padding-box":
                    width = element.innerWidth();
                    break;
                case "content-box":
                    width = element.width();
                    break;
                case "margins":
                    width = parseInt(element.css('margin-left')) + parseInt(element.css('margin-right'));
                    break;
                case "margin-right":
                    width = parseInt(element.css('margin-right'));
                    break;
                case "margin-left":
                    width = parseInt(element.css('margin-left'));
                    break;
                case "padding":
                    width = parseInt(element.css('padding-left')) + parseInt(element.css('padding-right'));
                    break;
                case "padding-right":
                    width = parseInt(element.css('padding-right'));
                    break;
                case "padding-left":
                    width = parseInt(element.css('padding-left'));
                    break;
                case "borders":
                    width = parseInt(element.css('border-left-width')) + parseInt(element.css('border-right-width'));
                    break;
                case "border-right":
                    width = parseInt(element.css('border-right-width'));
                    break;
                case "border-left":
                    width = parseInt(element.css('border-left-width'));
                    break;
                default:
                    width = element.outerWidth(true);
                    break;
            }
            var value;
            switch (type.toLowerCase()) {
                case "%":
                    value = getPercentage(element, width);
                    break;
                case "em":
                    value = getEm(element, width);
                    break;
                case "px":
                    value = width;
                    break;
                default:
                    value = width;
                    break;
            }
            return value;
        }

        var value = getMeasurement($(this));
        return value;
    };
    
})(jQuery);


(function( $ ) {
// Global Variables
var gridClasses = '.a-1,.a-2,.a-3,.a-4,.a-5,.a-6,.a-7,.a-8,.a-9,.a-10,.a-11,.a-12,.a-20,.a-40,.a-60,.a-80,.d-1,.d-2,.d-3,.d-4,.d-5,.d-6,.d-7,.d-8,.d-9,.d-10,.d-11,.d-12,.d-20,.d-40,.d-60,.d-80,.t-1,.t-2,.t-3,.t-4,.t-5,.t-6,.t-7,.t-8,.t-9,.t-10,.t-11,.t-12,.t-20,.t-40,.t-60,.t-80,.m-1,.m-2,.m-3,.m-4,.m-5,.m-6,.m-7,.m-8,.m-9,.m-10,.m-11,.m-12,.m-20,.m-40,.m-60,.m-80,.c-1,.c-2,.c-3,.c-4,.c-5,.c-6,.c-7,.c-8,.c-9,.c-10,.c-11,.c-12,.c-20,.c-40,.c-60,.c-80,.one,.two,.three,.four,.five,.six,.seven,.eight,.nine,.ten,.eleven,.twelve,.twenty,.fourty,.sixty,.eighty,.fg';
var orderingClasses = '.m-position-0,.m-position-1,.m-position-2,.m-position-3,.m-position-4,.m-position-5,.m-position-6,.m-position-7,.m-position-8,.m-position-9,.m-position-10,.m-position-11,.m-position-12,.m-position-13,.m-position-14,.m-position-15,.m-position-16,.m-position-17,.m-position-18,.m-position-19,.m-position-20,.t-position-0,.t-position-1,.t-position-2,.t-position-3,.t-position-4,.t-position-5,.t-position-6,.t-position-7,.t-position-8,.t-position-9,.t-position-10,.t-position-11,.t-position-12,.t-position-13,.t-position-14,.t-position-15,.t-position-16,.t-position-17,.t-position-18,.t-position-19,.t-position-20,.d-position-0,.d-position-1,.d-position-2,.d-position-3,.d-position-4,.d-position-5,.d-position-6,.d-position-7,.d-position-8,.d-position-9,.d-position-10,.d-position-11,.d-position-12,.d-position-13,.d-position-14,.d-position-15,.d-position-16,.d-position-17,.d-position-18,.d-position-19,.d-position-20';
var videoTypes = 'iframe[src*="youtube"],iframe[src*="vimeo"],object,embed';
var screenSize;

//Adds .parent class to parents of Flexgrid containers in order to cycle through them in a controlled manner later
function addParent(container) {
    var gridParent;
    jQuery(container).each(function() {
        gridParent = jQuery(this).parent();
        if(!gridParent.hasClass('parent')) {
            gridParent.addClass('parent');
        }
    });
}
//Adds .ordering-column class to parent containers that have ordering elements as their children
function addOrderingColumn(containers) {
    var orderingParent;
    jQuery(containers).each(function() {
        orderingParent = jQuery(this).parent();
        if(!orderingParent.hasClass('ordering-column')) {
            orderingParent.addClass('ordering-column');
        }
    });
}

//Adds ordering classes to each element in each parent container to preserve it's origional order and then inserts each one after the one before it to remove white space from inline-block elements
function preserveOrder(parent) {
    var el, parent = jQuery(parent);
    parent.each(function() {
        jQuery(this).children().each(function(i, child) {
            i++;
            jQuery(child).addClass('o' + i);
        });
    });

    parent.each(function() {
        el = jQuery(this);
        el.children().each(function(i) {
            i++;
            el.find('> .o' + (i+1)).insertAfter(el.find('> .o' + i));
        });
    });
}

// Checks screen size and finds the correct element order for that size
function elementOrdering(orderingColumn, screenSize) {
    var el, screenSize = screenSize || 'reset';
    
    function resetOrder() {
        el.children().each(function(i){
            i++;
            el.find('> .o' + (i+1)).insertAfter(el.find('> .o' + i));
        });
    }

    jQuery(orderingColumn).each(function() {
        el = jQuery(this);
        switch(screenSize) {
            case 'mobile':
                resetOrder();
                el.children().each(function(i){
                    i++;
                    el.find('> .m-position-' + (i+1)).insertAfter(el.find('> .m-position-' + i + ':last'));
                });
                break;
            case 'tablet':
                resetOrder();
                el.children().each(function(i){
                    i++;
                    el.find('> .t-position-' + (i+1)).insertAfter(el.find('> .t-position-' + i + ':last'));
                });
                break;
            case 'desktop':
                resetOrder();
                el.children().each(function(i){
                    i++;
                    el.find('> .d-position-' + (i+1)).insertAfter(el.find('> .d-position-' + i + ':last'));
                });
                break;
            default: 
                resetOrder();
                break;
        }
    });
}

//Called each time the screen loads or is resized. Looks for screen size changes and triggers reordering of grid containers
function changeDevices() {
    switch(jQuery('body').css('outline-style')) {
        case 'dashed':
            if (screenSize != 'desktop') {
                elementOrdering('.ordering-column', 'desktop');
                screenSize = 'desktop';
            };
            break;
        case 'solid':
            if (screenSize != 'tablet') {
                elementOrdering('.ordering-column', 'tablet');
                screenSize = 'tablet';
            };
            break;
        case 'dotted':
            if (screenSize != 'mobile') {
                elementOrdering('.ordering-column', 'mobile');
                screenSize = 'mobile';
            };
            break;
        default: 
            if (screenSize != 'desktop') {
                elementOrdering('.ordering-column', 'desktop');
                screenSize = 'desktop';
            };
            break;
    }   
}

// Sets grid containers on the same row to equal heights dynamically and responsively
function equalheights(equal){
    var el, current, height, contentHeight, outerHeight, extraHeight, marginTop, marginBottom, verticalMargins, tallest = -1, onSameRow = new Array(), combinedWidth = 0;

    function setHeights() {
        $.each(onSameRow, function(current, element) {
            element.outerHeight(tallest); //For every container on the same row, set the height to the tallest column
            if(element.children().hasClass('inner')) {
                marginTop = parseFloat(element.children('.inner').css('margin-top'));
                marginBottom = parseFloat(element.children('.inner').css('margin-bottom'));
                verticalMargins = marginTop + marginBottom;
                element.children('.inner').outerHeight(element.height() - verticalMargins);
            }
        });
        tallest = -1; //Reset Height for next row
        onSameRow.length = 0; //Empty array of containers on same row to begin a new row
        combinedWidth = 0;
    }

    function addToSameRow() {
        onSameRow.push(el); //Add it to the array of containers on the same row
        height = el.outerHeight(); // Find current element's height
        tallest = Math.max(tallest, height); //Compare to previous element's height and return the 
    }

    jQuery(equal).each(function() {
        jQuery(this).children().each(function(){
            el = jQuery(this);
            if(el.is(gridClasses)) {
                el.height(''); //Reset inline-styles
                if(el.children().hasClass('inner')) {
                    el.find('> .inner').height('');
                }
                // alert(el.find('> .inner').height());
                combinedWidth = combinedWidth + el.measure('margin-box', '%'); // Find out if grid element is still on the same row. If this + the previous columns add up to 100% then start a new row
                if(combinedWidth > 98 && combinedWidth < 102) { //New Row
                    addToSameRow();
                    setHeights();
                } else if (combinedWidth >= 102) { //For instance if you had 7 columns + 9 columns
                    setHeights();
                    addToSameRow();
                    combinedWidth = el.measure('margin-box', '%');
                } else {
                    addToSameRow();
                }
            }
        });
        setHeights(); // In case the row was unfinished and no more containers need to be measured, setHeights anyways
    });
}

//Wraps videos in a responsive wrapper to video's scale evenly
function wrapVideo(container) {
    jQuery(container).each(function() {
        jQuery(this).wrap('<div class="responsive-container"></div>');
    });
}

// Dynamically sets the responsive wrapper to the proportion of the video it contains using the width and height video attributes
function responsiveVideo(container) {
    var height, width, aspectRatio, el;
    jQuery(container).each(function() {
        el = jQuery(this);
        height = el.children().attr('height');
        width = el.children().attr('width');
        aspectRatio = (height/width)*100;
        aspectRatio = Math.round(aspectRatio*1000)/1000;
        el.css('padding-bottom', aspectRatio + '%');
    });
}

//Slow down page resize function calls
function throttle (func, wait) {
    var throttling = false;
    return function(){
        if ( !throttling ){
            func.apply(this, arguments);
            throttling = true;
            setTimeout(function(){
                throttling = false;
            }, wait);            
        }
    };
}


jQuery( '<style text="text/css" id="margin-remove-412">' + gridClasses + ' { margin-right: 0;}</style>' ).appendTo( "head" );
// Run Functions
jQuery(document).ready(function() {    
    addParent(gridClasses);
    wrapVideo(videoTypes);
    responsiveVideo('.responsive-container');
    preserveOrder('.parent');
    addOrderingColumn(orderingClasses);
    changeDevices();
    equalheights('.equal');

    //Enables raw html to go inside pre tags with special characters
    jQuery('pre.show-html').each(function() {
        var preHTML = jQuery(this).html();
        jQuery(this).text(preHTML);
    });
});

jQuery(window).load(function() {
    setTimeout(function() {
        equalheights('.equal');
    }, 60);
});

window.onresize = throttle(function() {
    changeDevices();
    equalheights('.equal');
}, 20);


})( jQuery );
