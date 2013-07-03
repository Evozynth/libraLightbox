/**
 * LibraLightbox
 * 
 * Version: 0.0.1
 * Author: Stanley Svensson
 * Updated: 2013-07-01
 *
 * LibraLightbox is an Open Source project. Contribute at GitHub
 * https://github.com/libra3d/libraLightbox
 *
 * Copyright 2013 by Stanley Svensson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 * LibraLightbox is a simple lightbox jQuery plugin.
 * It can be used directly on links or on divs surrounding links to images,
 * in that way grouping them.
 *
 * Examples:
 * <div class="lightbox">
 *   <a href="img1.jpg"><img src="thumb1.jpg" alt="img one"><div>Descriptive text</div></a>
 *   <a href="img2.jpg"><img src="thumb2.jpg" alt="img one"><div>Descriptive text</div></a>
 * </div>
 *
 * <a class="img-box" href="img1.jpg">Link to image</a>
 *
 * $('.lightbox').libraLightbox();
 * $('.img-box').libraLightbox({'overlayOpacity': 0.6});
 *
 * More documentation on github: https://github.com/libra3d/libraLightbox
 *
 */
(function($) {
	$.fn.libraLightbox = function(options) {
		
		var options = $.extend({}, $.fn.libraLightbox.defaults, options);
		
		return this.each(function() {
			
			
			// Check if the plugin is invoked directly on a link
			if ($(this).is('a')) {
				$(this).on('click', function(event) {
						event.preventDefault();
						runLightBox(this);
				});
			} else {
				// Hide the image text (description)
				$(this).find('div').hide();
				
				// Run the lightbox
				$(this).find('a').on('click', function(event) {
						event.preventDefault();
						runLightBox(this);
				});
			}
		});
		
		function runLightBox(img) {
			if (!$('#overlay').length) {
				
				// Display overlay
				$('<div id="overlay"></div>')
					.attr('class', 'loading')
					.css('opacity', '0')
					.animate({'opacity': options.overlayOpacity}, options.lightboxFadeIn)
					.appendTo('body');
				
				invokeImage(img);
				
				// Remove lightbox if clicked on screen
				$('#overlay').on('click', function() {
					removeLightbox();
				});
				
				// Remove lightbox if esc-key is pressed
				$(document).on('keydown', function(e) {
					if (e.keyCode == 27) {
						removeLightbox();
					}
				});
				
				// Go to next image if right arrow key is pressed
				$(document).on('keydown', function(event) {
					if (event.keyCode == 39) {
						if ($('#nextImage').length) {
							$('#nextImage').trigger('click');
						}
					}
				});
				
				// Go to prev image if left arrow key is pressed
				$(document).on('keydown', function(event) {
					if (event.keyCode == 37) {
						if ($('#prevImage').length) {
							$('#prevImage').trigger('click');
						}
					}
				});
				
				$(window).on('resize', function() {
					console.log("Window resized");
					if ($('#lightbox').length) {
						$('#lightbox')
							.css({
								left: (window.innerWidth - $('#lightbox').outerWidth()) / 2,
								top: (window.innerHeight - $('#lightbox').outerHeight()) / 2,
							})
					}
				});
				
			}
		}
			
		function invokeImage(img) {
			
			if ($('#lightbox').length) {
				removeImage(function() {
					displayImage(img);
				});
			} else {
				displayImage(img);
			}
			
		}
		
		function displayImage(img) {
			// Get the dimensions of the window
			var 
			windowHeight = window.innerHeight || $(window).height(),
			windowWidth = window.innerWidth || $(window).widht();
			
			
			// Create the lightbox container
			$('<div id="lightbox"></div>')
				.hide()
				.appendTo('body');
			
			
			// Display the image on load
			$('<img>')
				.attr('src', img.href)
				.load(function() {
					$('#lightbox')
						.css({
							'top': (windowHeight - $('#lightbox').outerHeight()) / 2,
							'left': (windowWidth - $('#lightbox').outerWidth()) / 2
						})
						.fadeIn(options.imageFadeIn);
						
						// Remove loader image from overlay background
						$('#overlay').attr('class', 'loaded');
						
						
						
						// Create buttons for prev and next images
						
						if ($(img).next('a').length) {
							$('<div id="nextImage">')
								.css({
									'height': $('#lightbox').outerHeight(),
									'width': $('#lightbox').outerWidth() / 2,
									'right': 0,
									'top': 0
								})
								.on('mouseenter', function() {
									$('#nextImage div').animate({'opacity': 0.5}, 300);
								})
								.on('mouseleave', function() {
									$('#nextImage div').animate({'opacity': 0}, 300);
								})
								.on('click', function(event) {
									event.stopPropagation();
									invokeImage($(img).next()[0]);
								})
								.appendTo('#lightbox')
								
							$('<div>')
								.css('opacity', 0)
								.appendTo('#nextImage')
						}
						
						if ($(img).prev('a').length) {
							$('<div id="prevImage">')
								.css({
									'height': $('#lightbox').outerHeight(),
									'width': $('#lightbox').outerWidth() / 2,
									'left': 0,
									'top': 0,
								})
								.on('mouseenter', function() {
									$('#prevImage div').animate({'opacity': 0.5}, 300);
								})
								.on('mouseleave', function() {
									$('#prevImage div').animate({'opacity': 0}, 300);
								})
								.on('click', function(event) {
									event.stopPropagation();
									invokeImage($(img).prev()[0]);
								})
								.appendTo('#lightbox')
								
							$('<div>')
								.css('opacity', 0)
								.appendTo('#prevImage')
						}
						
						// Display image description
						$('<div id="imageDesc">')
							.css({
								'width': $('#lightbox').width
							})
							.html($($(img).find('div')[0]).html())
							.appendTo('#lightbox');
						
				})
				.appendTo('#lightbox');
		}
		
		
		function removeLightbox() {
			$('#overlay, #lightbox').fadeOut(options.lightboxFadeOut, function() {
				$(this).remove();
			});
		}
		
		function removeImage(callback) {
			$('#lightbox').fadeOut(options.imageFadeOut, function() {
				$(this).remove();
				$('#overlay').attr('class', 'loading');
				callback();
			});
		}
		
	};
	
	$.fn.libraLightbox.defaults = {
		'lightboxFadeIn': 400,
		'lightboxFadeOut': 300,
		'imageFadeIn': 300,
		'imageFadeOut': 200,
		'overlayOpacity': 0.8
	}
	
}(jQuery));