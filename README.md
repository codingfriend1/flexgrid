flexgrid
========

A css grid system and simple framework with some powerful jQuery helper functions

Description: Flexgrid is a 12 column & 5 column responsive fluid grid system with a few extra jQuery functions that are helpful in creating layouts. Columns can be infinitely nested.


Grid
	Grid elements are classes defined by certain screen sizes
	Ex: d-4, a-2, m-5, h-6, seven...
	
	d = desktop 
	t = tablet 
	h = handheld
	m = mobile 
	c = cell
	a = all
	
	written numbers ex: "seven", "four", "twelve" apply to both tablet and desktop screen sizes
	
	h = handheld
	c = cell
	
	H and C are override classes. If the jump in layout between tablet and mobile or mobile and smaller mobile (c) is too 	great, H and C are inbetween classes that help smooth the transition.
	
	For instance, tablets apply to the screen sizes between 640 and 960px. Handhelds apply to 640 to 768px. So whatever 	rules are in the handhelds class will override the tablet rules during that fraction of a screen size
	Mobile is from 640 below, while cell is from 480px and below.
	
	Grid classes can override other grid classes.
	a-4 will make the column 1/3rd width for all screen sizes. But if you also apply a t-6 class, then it will be 1/3rd 	width for all screen sizes except for tablet in which it would be 50%.
	
	Ex: "three t-4 m-6 c-12" 
	This will result in desktop being 25%, tablet being 33.33%, mobile being 50%, and cell being 100%


Basic jQuery helper functions:
	equalHeights()
	measure()
	elementOrdering()
	responsiveMargins()
	responsiveVideo()

equalHeights()
	equalHeights() is called by adding the .equal class to parents of grid containers. Every grid container on the same row that is a child of .equal will be set to the height of the tallest container on that row

measure()
	measure() returns the width of a portion of any element in either px, ems, or %. You can measure margin-box (the full width including margins), border-box, padding-box, content-box, margins (both right and left), borders, padding, margin-right, margin-left, padding-right, border-left, etc... This function is called like so

	$(element).measure('border-box', %);
	returns a number without the string type added on

	Percentage measurements are not always very accurate, so measure() rounds the percentage returns to the nearest column width if within 0.5% tolerance as defined by an array that can be passed into the third argument.

	$(element).measure('border-box', %, [33.33, 50, 66.66]);

	If an percentage measurement turns out to be 33.29 it will round to 33.33% instead. If the % was instead to far away such as 30.25% then it will not round.

elementOrdering()
	Reorders elements in the page at certain screen sizes. This is achieved by adding classes to the elements.
	Ex:
		&lt;div class="a-6 m-position-2"&gt;1&lt;/div&gt;
		&lt;div class="a-6 m-position-1"&gt;2&lt;/div&gt;
	At mobile sizes the m-position-2 will be inserted after m-position-1. Elements are only reordered within the same parent. t-position-... and d-position-... may also be specified.

responsiveMargins()
	Retrieves the right and left margins set in the style sheet for any grid element and subtracts their width from the overall percentage width of the grid element using calc().
	For instance, you have a grid element that is 33.33% (four) width and in your stylesheet you've added 1em of right and left margin. responsiveMargins() will add calc(33.33% - 2em) to that element.

	This just means that you can set any grid element to any margin you want in your stylesheet and not have to worry about collapsing the grid. However, marigins must be set in either px or em. If you try to set margins in %, the grid will collapse.

	Also grid elements are measured in border-box so you may add padding and borders without breaking the grid too.

responsiveVideo()
	Wraps video in a container that allows you to scale video in responsive layouts


Other Helpful classes

	Flexgrid allows you to toggle display of elements based on screen size by adding classes such as:
		desktop-only
		mobile-only 
		tablet-hide 

	Since Flexgrid is defined in inline-block, you may change the alignment of the grid items.
		.center 		{text-align: center;}
		.right			{text-align: right}
		.left			{text-align: left;}
		.justify 		{text-align: justify;}
		.top 			{vertical-align: top;}
		.middle 		{vertical-align: middle;}
		.bottom 		{vertical-align: bottom;}
		.float-right	{float: right;}
		.float-left 	{float: left;}

		These classes only affect CHILDREN of the element that has the class. So if you wanted a grid element inside of it's parent to be moved to the right, you would add .right to the parent element. For .middle to work, at least two columns on the same row have to both be set to .middle
		These can be attached only to certain screen sizes if you specify one of the screen sizes...

		.d-center 		{text-align: center;}
		.d-right		{text-align: right}
		.d-left			{text-align: left;}
		.d-justify 		{text-align: justify;}
		.d-top 			{vertical-align: top;}
		.d-middle 		{vertical-align: middle;}
		.d-bottom 		{vertical-align: bottom;}
		.d-float-right	{float: right;}
		.d-float-left 	{float: left;}
