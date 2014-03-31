flexgrid
========

A css grid system and simple framework with some powerful jQuery helper functions

<h4>Flexgrid by Jon Paul Miles</h4>

<p>I am preparing this framework for production and I was hoping some of you would help me test it and see if everything is working properly. If you do test it and provide feedback you are free to use this software under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.</p>

<p><strong>Description:</strong> Flexgrid is a 12 column & 5 column responsive fluid grid system with a few extra jQuery functions that are helpful in creating layouts. Columns can be infinitely nested.</p>


<h3>Grid</h3>

	<ul>
		<li>a-1</li>
		<li>a-2</li>
		<li>a-3</li>
		<li>a-4</li>
		<li>a-5</li>
		<li>a-6</li>
		<li>a-7</li>
		<li>a-8</li>
		<li>a-9</li>
		<li>a-10</li>
		<li>a-11</li>
		<li>a-12</li>
		<li>a-20</li>
		<li>a-40</li>
		<li>a-60</li>
		<li>a-80</li>
	</ul>
	Grid elements are classes defined by certain screen sizes
	<p>Ex: d-4, a-2, m-5, h-6, seven...</p>
	
	<ul>
		<li>d = desktop</li>
		<li>t = tablet</li>
		<li>h = handheld</li>
		<li>m = mobile </li>
		<li>c = cell</li>
		<li>a = all</li>
	</ul>
	
	<p>written numbers ex: "seven", "four", "twelve" apply to both tablet and desktop screen sizes</p>
	
	<ul>
		<li>h = handheld</li>
		<li>c = cell</li>
	</ul>
	
	<p>H and C are override classes. If the jump in layout between tablet and mobile or mobile and smaller mobile (c) is too great, H and C are inbetween classes that help smooth the transition.</p>
	
	<p>For instance, tablets apply to the screen sizes between 640 and 960px. Handhelds apply to 640 to 768px. So whatever rules are in the handhelds class will override the tablet rules during that fraction of a screen size.Mobile is from 640 below, while cell is from 480px and below.</p>
	
	<p>Grid classes can override other grid classes.
		a-4 will make the column 1/3rd width for all screen sizes. But if you also apply a t-6 class, then it will be 1/3rd 	width for all screen sizes except for tablet in which it would be 50%.</p>
	
	<p>Ex: "three t-4 m-6 c-12" </p>
	<p>This will result in desktop being 25%, tablet being 33.33%, mobile being 50%, and cell being 100%</p>


<h3>Basic jQuery helper functions:</h3>
	<ul>
		<li>equalHeights()</li>
		<li>measure()</li>
		<li>elementOrdering()</li>
		<li>responsiveMargins()</li>
		<li>responsiveVideo()</li>
	</ul>

<dl>
<dt>equalHeights()</dt>
	<dd>equalHeights() is called by adding the .equal class to parents of grid containers. Every grid container on the same row that is a child of .equal will be set to the height of the tallest container on that row</dd>

<dt>measure()</dt>
	<dd>measure() returns the width of a portion of any element in either px, ems, or %. You can measure margin-box (the full width including margins), border-box, padding-box, content-box, margins (both right and left), borders, padding, margin-right, margin-left, padding-right, border-left, etc... This function is called like so
		
		<p>$(element).measure('border-box', %);</p>
			<p>returns a number without the string type added on</p>
		
		<p>Percentage measurements are not always very accurate, so measure() rounds the percentage returns to the nearest column width if within 0.5% tolerance as defined by an array that can be passed into the third argument.</p>
		
		<p>$(element).measure('border-box', %, [33.33, 50, 66.66]);</p>
		
		<p>
			If an percentage measurement turns out to be 33.29 it will round to 33.33% instead. If the % was instead to far away such as 30.25% then it will not round.</dd>
		</p>

<dt>elementOrdering()</dt>
	<dd>Reorders elements in the page at certain screen sizes. This is achieved by adding classes to the elements.
		Ex:
			<p>&lt;div class="a-6 m-position-2"&gt;1&lt;/div&gt; <br>
				&lt;div class="a-6 m-position-1"&gt;2&lt;/div&gt;</p>
		At mobile sizes the m-position-2 will be inserted after m-position-1. Elements are only reordered within the same parent. t-position-... and d-position-... may also be specified.</dd>

<dt>responsiveMargins()</dt>
	<dd>Retrieves the right and left margins set in the style sheet for any grid element and subtracts their width from the overall percentage width of the grid element using calc().
		<p>For instance, you have a grid element that is 33.33% (four) width and in your stylesheet you've added 1em of right and left margin. responsiveMargins() will add calc(33.33% - 2em) to that element.</p>
		
		<p>This just means that you can set any grid element to any margin you want in your stylesheet and not have to worry about collapsing the grid. However, marigins must be set in either px or em. If you try to set margins in %, the grid will collapse. Also grid elements are measured in border-box so you may add padding and borders without breaking the grid too.</p>
		</dd>

<dt>responsiveVideo()</dt>
	<dd>Wraps video in a container that allows you to scale video in responsive layouts</dd>
</dl>

<h3>Other Helpful classes</h3>

	Flexgrid allows you to toggle display of elements based on screen size by adding classes such as:
		<ul>
			<li>desktop-only</li>
			<li>mobile-only</li>
			<li>tablet-hide</li>
		</ul>

	Since Flexgrid is defined in inline-block, you may change the alignment of the grid items.
		<ul>
			<li>.center 		{text-align: center;}</li>
			<li>.right			{text-align: right}</li>
			<li>.left			{text-align: left;}</li>
			<li>.justify 		{text-align: justify;}</li>
			<li>.top 			{vertical-align: top;}</li>
			<li>.middle 		{vertical-align: middle;}</li>
			<li>.bottom 		{vertical-align: bottom;}</li>
			<li>.float-right	{float: right;}</li>
			<li>.float-left 	{float: left;}</li>
		</ul>

		These classes only affect CHILDREN of the element that has the class. So if you wanted a grid element inside of it's parent to be moved to the right, you would add .right to the parent element. For .middle to work, at least two columns on the same row have to both be set to .middle
		These can be attached only to certain screen sizes if you specify one of the screen sizes...

		<ul>
			<li>.d-center 		{text-align: center;}</li>
			<li>.d-right		{text-align: right}</li>
			<li>.d-left			{text-align: left;}</li>
			<li>.d-justify 		{text-align: justify;}</li>
			<li>.d-top 			{vertical-align: top;}</li>
			<li>.d-middle 		{vertical-align: middle;}</li>
			<li>.d-bottom 		{vertical-align: bottom;}</li>
			<li>.d-float-right	{float: right;}</li>
			<li>.d-float-left 	{float: left;}</li>
		</ul>
