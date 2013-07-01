LibraLightbox
=============

LibraLightbox is a simple lightbox jQuery plugin. It's minimalistic, easy to
use and setup. The plugin can be used multiple times on the same page and its possible to
'group' images. LibraLightbox features previous/next buttons for easy browsing of images
in a group and the option to add descriptive text to each image.

Navigation between images is done by clicking on arrows that shows up to the left and right
of the image, or by pressing left/right on the keyboard. Closing the lightbox is done by clicking outside the
image on the darkened background or the keyboard shortcut 'Esc'.

Installation
------------

Download the plugin from: http://github/libra3d/libraLightbox  
Or clone the repository from github: `git clone git://github/libra3d/libraSlider.git`

The plugin consists of five files: libraLightbox.js, libraLightbox.css, libraLightbox-loader.gif,
libraLightbox-prev.png and libraLightbox-next.png. 
If you want to place the files in different folders you need to edit the url's to the images 
in the css-file. Include the files inside the head tag. It should look something like this:

	<head>
		<link rel="stylesheet" href="libraLightbox/libraLightbox.css">
		<script src="js/jQuery.js"></script>
		<script src="libraLightbox/libraLightbox.js"></script>
	</head>
	
LibraLightbox is now installed and ready, the next section explains how to use the plugin.

*Note: Don't forget to include jQuery before libraSlider.js*


Usage
-----

LibraLightbox is very simple to use and doesn't require much to set up.

### HTML ###

The structure of the html markup looks like this:

	<div class="lightbox">
		<a href="../img/1.jpg"><img src="../img/thumbs/1.jpg" alt="image1"><div><span class="desc">This is image 1</span></div></a>
		<a href="../img/2.jpg"><img src="../img/thumbs/2.jpg" alt="image2"><div><span class="desc">This is image 2</span></div></a>
		<a href="../img/3.jpg"><img src="../img/thumbs/3.jpg" alt="image3"><div><span class="desc">This is image 3</span></div></a>
		<a href="../img/4.jpg"><img src="../img/thumbs/4.jpg" alt="image4"><div><span class="desc">This is image 4</span></div></a>
	</div>

LibraLightbox uses links to the images that will show up in the lightbox. This has the advantage that the images can be seen
even if JavaScript is turned off in the browser. Inside each link tag there is an image with a thumbnail 
and a div with some descriptive text. It's important that the text is inside a div because the plugin will look for the 
first div inside the anchor tag and hide it from the page.

The surrounding div is mandatory (for grouping). It has a class called lightbox, but this could be anything, though it shouldn't be left out.
The div can also be thought of as a group, as the lightbox only sees the images in the current div.
So to create another group you only need to add a new div with the same class assigned. If another class name is used, the plugin
must be invoked on that specific jQuery div selector.

It's also possible to add the plugin directly on a link to an image.
	
	<a class="light-box" href="someImage.jpg">Click to see image</a>
	
This is as simple as it gets, but remember to add a class for the anchor tags as it's used for the jQuery selector.
You probably don't want the plugin to run on every link on the page.


### JavaScript ###

Add the following JavaScript in a script tag or a separate .js file at the bottom of the page, right before the closing body tag.
	
	$(document).ready(function() {
		$('.lightbox').libraLightbox();
	});

The first line makes sure the page is fully loaded before activating the plugin. 
Since this code is placed at the bottom of the page it's not really necessary because the content of the page is already loaded,
but is used as a precaution. The second line uses the jQuery selector to grab the divs with a class of lightbox and is 
followed by the method libraLightbox() that runs the plugin. 


Options
-------

LibraLightbox comes with some options to customize the behavior of the lightbox. Those are defined in an object passed to 
the libraLightbox method.

### overlayOpacity (number) ###
Sets the opacity of the background overlay (from 0 - 1.0).  
*Default value: 0.8*  
Example:

	$('.lightbox').libraLightbox({
		'overlayOpacity': 0.6
	})

- - - - - - - -  

### lightboxFadeIn (number) ###
Sets the speed of the background overlay fade in effect.  
*Default value: 400*
Example: 

	$('.lightbox').libraLightbox({
		'lightboxFadeIn': 600
	})

- - - - - - - -  

### lightboxFadeOut (number) ###
Sets the speed of the background overlay fade out effect.
*Default value: 300*  
Example: 

	$('.lightbox').libraLightbox({
		'lightboxFadeOut': 500
	})

- - - - - - - -  

### imageFadeIn (number) ###
Sets the speed of the image fade in effect.  
*Default value: 300*  
Example: 

	$('.lightbox').libraLightbox({
		'imageFadeIn': 500
	})

- - - - - - - -  

### imageFadeOut (number) ### 
Sets the speed of the image fade out effect.  
*Default value: 200*  
Example:

	$('.lightbox').libraLightbox({
		'imageFadeOut': 100
	})

- - - - - - - -  


Current limitations
-------------------

Can only display images.


License
-------

Copyright 2013 by Stanley Svensson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.