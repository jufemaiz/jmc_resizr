/*
 * Pagery (jmc_resizr) - a jQuery plugin for binding image sizes to a parent element
 * Examples and documentation at: http://code.euphemize.net/jQuery/jmc_resizr/
 * Version: 0.1 (2010-03-04)
 * Copyright (c) 2010 Joel Courtney
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 * Requires: jQuery v1.3.2 or later
*/
(function($) {
    $.fn.jmc_resizr = function(settings) {

		var win = $(window);

        var defaults = {
            cropType : 'full',
			binding : {
				vertical : 'center',
				horizontal : 'center'
			},
            followBrowserSize :  true,
			parentElement : $('body')
        };

		var opts = {
			settings: $.extend({}, defaults, settings)
		};

		var resizeNode = function(el) {
			el = $(el);
			ratio = el.height() / el.width();

			var win_h = win.height(), win_w = win.width();
			// TODO: Update with binding to a parent element
			// if(defaults.parentElement != $('body')) {
			// 	win_h = win.height(), win_w = win.width();
			// }

			var settings = $.extend({},opts.settings);
			
			switch(settings.cropType) {
				case 'fit':
					h = win_h;
					w = win_w;
					break;
				case 'height':
					h = win_h;
					w = win_h / ratio;
					break;
				case 'width':
					h = win_w * ratio;
					w = win_w;
					break;
				case 'fill_outer':
					if(win_h/win_w <= ratio) {
						// Go by width
						h = win_w * ratio;
						w = win_w;
					} else {
						// Go by height
						h = win_h;
						w = win_h / ratio;
					}
					break;
				case 'full':
				default:
					if(win_h/win_w >= ratio) {
						// Go by width
						h = win_w * ratio;
						w = win_w;
					} else {
						// Go by height
						h = win_h;
						w = win_h / ratio;
					}
			}
			h = Math.ceil(h);
			w = Math.ceil(w);
			switch(settings.binding.vertical) {
				case 'top':
					t = 0;
					break;
				case 'bottom':
					t = (win_h - h);
					break;
				case 'center':
				default:
					t = (win_h - h)/2;
					break;
			}
			switch(settings.binding.horizontal) {
				case 'left':
					l = 0;
					break;
				case 'right':
					l = (win_w - w);
					break;
				case 'center':
				default:
					l = (win_w - w)/2;
					break;
			}
			el.css({'height':h, 'width':w, 'position': 'absolute', 'top': t, 'left': l});					
		};

        var followBrowserResize = function(el) {
			if ($(el) == null) {
				return;
			}
			resizeNode(el);
        };

	    return this.each(function() { 
			// Check that it is an image
			if (this.nodeName === 'IMG') {
				// Undertake check load state
				$(this).load(function () {
					resizeNode(this);
					var settings = $.extend({},opts.settings);
			        if (settings.followBrowserSize) {
						el = this;
			            $(window).bind('resize', function() {
							followBrowserResize(el);
			            });
			        }
				}).error(function () {
	            // notify the user that the asset could not be loaded
					alert("Could not load!"+$(this).attr('src'));
		        }).attr('src', $(this).attr('src'));
	        } else {
				resizeNode(this);
				var settings = $.extend({},opts.settings);
		        if (settings.followBrowserSize) {
					el = this;
		            $(window).bind('resize', function() {
						followBrowserResize(el);
		            });
		        }
			}
	    });
	};
})(jQuery);