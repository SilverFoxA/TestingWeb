$(function() {
        $('.material-card > .mc-btn-action').click(function () {
            var card = $(this).parent('.material-card');
            var icon = $(this).children('i');
            icon.addClass('fa-spin-fast');

            if (card.hasClass('mc-active')) {
                card.removeClass('mc-active');

                window.setTimeout(function() {
                    icon
                        .removeClass('fa-arrow-left')
                        .removeClass('fa-spin-fast')
                        .addClass('fa-bars');

                }, 800);
            } else {
                card.addClass('mc-active');

                window.setTimeout(function() {
                    icon
                        .removeClass('fa-bars')
                        .removeClass('fa-spin-fast')
                        .addClass('fa-arrow-left');

                }, 800);
            }
        });
    });   


//(function($) {
//
////  var container_width = $('.content__wrapper #container').outerWidth;
////  var container_height = $('.container__wrapper #container').outerHeight;
////
////    $('#gallery > li').css('width','150px')
////    .css('height','100px');
//	// Static constructs
//	$.jc = $.jc || {};
//	$.jc.videoGallery = {
//		conf: {
//			cols: 3, // Items per row.
//			ySpace: 100, // Y Space between items (stack state)
//			zSpace: 100, // Z Space between items (stack state)
//			tiltGrid: false,	// Whether the grid should be tilted (grid state)
//			minGridDeg: 0, // Minimum degrees of tilt (grid state)
//			maxGridDeg: 0, // Maximum degrees of tilt (grid state)
//			keyboard: true, // Enable/disabled keyboard controls
//			items: 'li', // Selector used for items
//			stateHolder: 'body', // Element used for state control,
//			controls: '.control', // Class used for controls
//			currentClass: 'current', // Class used for current item
//			backButton: '#back', // Back button selector
//			loadedClass: 'loaded' // Loaded class
//		}
//	};
//
//	function VideoGallery(root, conf) {
//
//		var self = this, // Class reference
//			gallery = root, // Root element
//			fire = root.add(self), // Used for callbacks
//			items = gallery.find(conf.items), // Caches all items
//			zIndex = items.length, // Used for reverse stacking
//			fromGrid = true, // Used for transitiond delays
//			cols = conf.cols, // Number of items per row
//			c = 0, // Column counter
//			r = 0; // Row counter
//
//		$.extend(self, {
//
//			// (getter)
//			getItems: function() {
//				return items;
//			},
//
//			// Grid layout
//			// (This is already done with floats from the start, but we need to match the position of the floated elements with absolutes, ready for future transforms.)
//			gridLayout: function(init) {
//
//				var gridInit = init || false;
//
//				items.each(function(i) {
//
//					var that = $(this),
//						newTop = (that.outerHeight(true) * r ),
//						newLeft = (that.outerWidth(true) * c);
//
//					// Store the position for going back to grid view later
//					if(gridInit) {
//						that.data('top', newTop);
//						that.data('left', newLeft);
//					}
//
//					// Inject an absolute position, based on the current position
//					that.css({
//						position: 'absolute',
//						top: that.data('top'),
//						left: that.data('left'),
//						opacity: 1,
//						zIndex: zIndex
//					});
//
//					// Calculate which column and row the next item is on.
//					if(c == cols-1) {
//						c = 0;
//						r ++;
//					}
//					else {
//						c ++;
//					}
//
//					zIndex--; // Elements need to be 'reverse stacked'
//				});
//
//				$(conf.stateHolder).removeClass('stack').addClass('grid');
//
//			},
//
//			// Stack layout
//			// CSS3 'time machine' effect
//			stackLayout: function(e) {
//
//				e.preventDefault();
//				e.stopPropagation();
//
//				var ySpace = conf.ySpace,
//					zSpace = conf.zSpace,
//					translateY = 0,
//					translateZ = 0,
//					target = $(this),
//					currentIndex = target.index(),
//					totalDelayTime = 0;
//
//				// Add some extra animation delay if it's coming in from the 'grid' state
//				if(fromGrid) {
//					items.each(function(i) {
//						if(i !== currentIndex) {
//							var delay = (i/10)*2;
//							this.style['-webkit-transition-delay'] = delay + 's';
//							totalDelayTime += delay;
//						}
//					});
//
//					// Reset this as soon as possible.
//					setTimeout(function() {
//						items.each(function(i) {
//							this.style['-webkit-transition-delay'] = '0s';
//						});
//					}, totalDelayTime);
//				}
//
//				$(conf.stateHolder).removeClass('grid')
//				.addClass('stack');
//
//				items.each(function(i) {
//					var that = $(this);
//					that.show();
//
//					that.data('translate_y', translateY);
//					that.data('translate_z', translateZ);
//
//					translateY -= ySpace;
//					translateZ -= zSpace;
//				});
//
//				// Animate each of the items separately
//				// Move them a certain value, based on which item was clicked.
//				items.each(function() {
//					self.animateItem(this, (ySpace*currentIndex), (zSpace*currentIndex));
//				});
//
//				var currentItem = items.filter(':nth-child(' + (currentIndex+1) + ')');
//				currentItem.prevAll(conf.items).css('opacity', 0).addClass('disabled');
//				currentItem.nextAll(conf.items).andSelf().css('opacity', 1).removeClass('disabled');
//
//			},
//
//			// This is called for EACH of the items, every time the stack is re-animated.
//			animateItem: function(obj, y, z) {
//
//				var that = $(obj),
//					newY = that.data('translate_y') + y,
//					newZ = that.data('translate_z') + z;
//
//				that.removeClass('current');
//				if(newZ === 0) {
//					that.addClass('current');
//				}
//
//				that[0].style['-webkit-transform'] = 'translate3d(0px, ' + newY + 'px, ' + newZ + 'px)';
//
//				that.data('translate_y', newY)
//					.data('translate_z', newZ);
//
//			},
//
//			move: function(modify) {
//
//				var newIndex;
//
//				// Move items forward
//				items.each(function() {
//					if($(this).hasClass(conf.currentClass)) {
//						newIndex = $(this).index() + modify;
//						return false;
//					}
//				});
//
//				if(newIndex == items.length) {
//					// Reached the end... start again
//					newIndex = 0;
//				}
//				else if(newIndex < 0) {
//					// Reached the beginning .. cycle back
//					newIndex = (items.length - 1);
//				}
//
//				// Trigger custom event
//				items.eq(newIndex).trigger('stack');
//
//				// onStart
//				var e = $.Event("onMove");
//				fire.trigger(e);
//				if (e.isDefaultPrevented()) {
//					return self;
//				}
//
//			},
//
//			toggleVideo: function(item, video) {
//
//				var body = $(conf.stateHolder),
//					that = $(item);
//				if(!body.hasClass('stack')) {
//					return;
//				}
//				if(that.hasClass(conf.currentClass)) {
//					var videoNode = video[0];
//					if(body.hasClass('playing')) {
//						// Stop the video.
//						videoNode.pause();
//						videoNode.currentTime = 0;
//						body.removeClass('playing');
//					}
//					else {
//						// Play the video
//						videoNode.play();
//						body.addClass('playing');
//					}
//				}
//
//			}
//
//		});
//
//		// Callbacks
//		$.each(['onMove', 'onStart'], function(i, name) {
//
//        	// configuration
//        	if ($.isFunction(conf[name])) {
//        		$(self).bind(name, conf[name]);
//        	}
//
//        	self[name] = function(fn) {
//        		if (fn) {
//					$(self).bind(name, fn);
//				}
//        		return self;
//        	};
//
//        });
//
//		// This moves the grid layout in 3D space, based on the cursor position
//		if(conf.tiltGrid) {
//			var leftDeg = conf.minGridDeg,
//				rightDeg = conf.maxGridDeg,
//				windowWidth = $(window).width(),
//				onePerc = (windowWidth / 100);
//
////			$(window).mousemove(function(e) {
////				if($(conf.stateHolder).hasClass('grid')) {
////					var mouseXPerc = parseInt(e.pageX / onePerc, null);
////					var currentDeg = parseInt((20 / 100) * mouseXPerc, null) - 10;
//////					if(currentDeg < -4) { currentDeg = -4; }
//////					if(currentDeg > 4) { currentDeg = 4; }
//////					gallery[0].style['-webkit-transform'] = 'rotate3d(1,0,1,' + currentDeg + 'deg)';
////				}
////			});
//		}
//
//		// Up and down to cycle through videos
//		if(conf.keyboard) {
//			$(window).keyup(function(e) {
//				var newIndex;
//				var modify;
//
//				if(e.keyCode != 38 && e.keyCode != 40) {
//					return false;
//				}
//				else if(e.keyCode == 38) {
//					modify = 1;
//				} else if(e.keyCode == 40) {
//					modify = -1;
//				}
//
//				self.move(modify);
//			});
//		}
//
//		// Click the body to return
//		$(conf.backButton).click(function(e) {
//			var body = $(conf.stateHolder);
//			if(!body.hasClass('grid')) {
//				e.preventDefault();
//				self.gridLayout();
//				fromGrid = true;
//			}
//		});
//
//		// State control
//		setTimeout(function() {
//			items.bind('stack', self.stackLayout)
//			.bind('click', function() {
//				$(this).trigger('stack');
//				fromGrid = false;
//			});
//			$(conf.stateHolder).addClass('init').addClass('grid');
//			// Initiate the grid layout.
//			self.gridLayout(true);
//		}, 600);
//
//		// Add basic video functionality.
//		items.each(function() {
//			var that = $(this);
//			var video = that.find('video');
//			if(video.length) {
//				that.find('section').append('<span class="play"></span>');
//			}
//			that.click(function(e) {
//				self.toggleVideo(this, video);
//			});
//		});
//
//		// Control handler
//		$(conf.controls).click(function() {
//			var body = $(conf.stateHolder),
//				that = $(this);
//
//			// Stop any video that is being played
//			// whenever you use a control.
//			if(body.hasClass('playing')) {
//				items.filter('.'+conf.currentClass).find('.play').trigger('click');
//			}
//
//			// Move the stack if it has a 'modify' property (e.g. prev, next)
//			if(that.data('modify') !== null) {
//				self.move(that.data('modify'));
//			}
//
//		});
//
//		$(window).load(function() {
//
//			$(conf.stateHolder).addClass(conf.loadedClass);
//
//			// onStart
//			var e = $.Event("onStart");
//			fire.trigger(e);
//
//		});
//
//	}
//
//	$.fn.videoGallery = function(userConf) {
//
//		var el = this.data('videoGallery');
//		if(el) {
//			return el;
//		}
//
//		var conf = $.extend({}, $.jc.videoGallery.conf, userConf);
//
//		return this.each(function() {
//			el = new VideoGallery($(this), conf);
//			$(this).data('videoGallery', el);
//		});
//
//	};
//
//})(this.jQuery);
//
//$(function() {
//
//	// Initialise 'videoGallery' jQuery plugin.
//	var gallery = $('#gallery');
//	gallery.videoGallery();
//
//	// Grab the basic API interface
//	var api = gallery.data('videoGallery');
//
//	// Add a delayed effect to the gallery intro...
//	api.onStart(function() {
//		var items = api.getItems();
//		items.each(function(i) {
//			var that = $(this);
//			setTimeout(function() {
//				var section = that.find('section');
//				if(section.length) {
//					section.addClass('entered');
//				}
//			}, (1000) + (i * 200));
//		});
//	});
//
//});

/*
 * Accelero
 * https://github.com/manifestinteractive/accelero
 * Copyright (c) 2013 Peter Schmalfeldt <me@peterschmalfeldt.com>
 * Updates: http://twitter.com/mrmidi
 * Licensed under the MIT, GPL licenses.
 */

(function ($, window, document, undefined) {

	var pluginName = 'accelero';

	var defaults = {

		/** Choose which method you want to control motion. Preference given to orientation and then touch */
		controlMethod: 'auto', // auto, orientation, touch

		/** Whether to use CSS Transform Translate to Move X & Y */
		enableMove: true,

		/** Whether to use CSS Transform Rotation to Rotate X & Y */
		enableRotate: true,

		/** Invert the Layers opposite of how you have them in your HTML */
		invertLayerStack: false,

		/** Whether to Flip the X Axis Movement Calculations. Does nothing if enableMove is false. */
		invertMoveX: false,

		/** Whether to Flip the Y Axis Movement Calculations. Does nothing if enableMove is false. */
		invertMoveY: false,

		/** Whether to Flip the X Axis Rotation Calculations. Does nothing if enableRotate is false. */
		invertRotateX: false,

		/** Whether to Flip the Y Axis Rotation Calculations. Does nothing if enableRotate is false. */
		invertRotateY: false,

		/** How much rotation to use. Setting it above 45 not recommended. Does nothing if enableRotate is false. */
		maxAngle: 3,

		/** Adjust how quickly each layer moves. Does nothing if enableMove is false. */
		speed: 0.2
	};

	function Plugin(element, options) {
		this.element = element;
		this.$element = $(element);

		var dataOptions = {};
		var setData = this.$element.data();

		/** Allow settings to be placed as data attributes on container */
		for(var i in setData)
		{
		    if(defaults.hasOwnProperty(i) && (typeof(defaults[i] === 'string')) || typeof(defaults[i] === 'number') || typeof(defaults[i] === 'boolean'))
		    {
		        dataOptions[i] = setData[i];
		    }
		}

		/** Store Variables for Plugin */
		this.options = $.extend( {}, defaults, dataOptions, options );
		this._defaults = defaults;
		this._name = pluginName;
		this._accelero = {};
		this._motion = {};
		this._supported = {
			motion: (typeof window.DeviceMotionEvent !== 'undefined'),
			orientation: (typeof window.DeviceOrientationEvent !== 'undefined'),
			touch: ('ontouchstart' in window) || (typeof navigator.msMaxTouchPoints !== 'undefined'),
			mouse: ('onmousemove' in window)
		};

		this.init();
	}

	Plugin.prototype = {
		init: function () {

			var $that = this;

			/** Shim for Request Animation */
			window.requestAnimFrame = (function(){
				return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
			})();

			/** Fetch layers we need to work with, and detect if what order to sort them in */
			if(this.options.invertLayerStack)
			{
				/** Use the DIVs as they are in the HTML */
				this._accelero.layers = $('> div:not(.ignore)', this.$element);
			}
			else
			{
				/** Reverse the DIVs so they appear more intuitively */
				this._accelero.layers = $($('> div:not(.ignore)', this.$element).get().reverse());
			}

			/** Store Layer Count */
			this._accelero.layerCount = $('> div:not(.ignore)', this.$element).length;

			/** Write Layer Count as Data Attribute to Container Element */
			$(this.$element).data('layer-count', this._accelero.layerCount);

			/** Initialize Element Sizes */
			this.resize();

			/** Detect Device Motion Support */
			if(this._supported.orientation && (this.options.controlMethod == 'auto' || this.options.controlMethod == 'orientation'))
			{
				window.addEventListener('deviceorientation', function(event){

					$that._motion.ax = event.gamma * 5;
					$that._motion.ay = event.beta * 7;

					window.requestAnimFrame(function(evt){
						$that.move(evt);
					});

				}, false);
			}
			/** Detect Mouse & Touch Support */
			else if((this._supported.touch || this._supported.mouse) && (this.options.controlMethod == 'auto' || this.options.controlMethod == 'touch'))
			{
				$(this.$element).mousemove(function(event){
					$.proxy($that.move(event), $that);
				});

				this.element.addEventListener('touchmove', function(event){
					$.proxy($that.move(event), $that);
					event.preventDefault();
				});
			}

			/** Setup Event Listeners */
			$(window).resize(function() {
				$.proxy($that.resize(), $that);
			});

			window.onorientationchange = function(){
				$.proxy($that.resize(), $that);
			};
		},
		/** We need to calculate the center for each layer when the container changes size */
		resize: function(){
			var $that = this;

			/** Store the size of our Container */
			$that._accelero.centerX = ($that.$element.width() / 2);
			$that._accelero.centerY = ($that.$element.height() / 2);

			/** Loop through each layer */
			$that._accelero.layers.each(function(i, el) {

				var z_index = (i+1),
					left = ($(el).width() - $that.$element.width()) / 2,
					top = ($(el).height() - $that.$element.height()) / 2;

				$(el).css({
					'z-index': z_index,
					'left':  -left + 'px',
					'top':  -top + 'px'
				}).data('layer', z_index);
			});
		},
		/** Figure out how we're going to move and set the data we need */
		track: function(evt, i, el)
		{
			var $that = this,
				landscape_orientation = true,
				reverse = false,
				upside_down = false;

			/** Check Device Orientation since we might need to redo some math */
			if(typeof window.orientation !== 'undefined')
			{
				landscape_orientation = false;

				/** device is in landscape, so X & Y axis need to swap */
				if(window.orientation === 90 || window.orientation === -90)
				{
					landscape_orientation = true;
					reverse = true;
				}
				/** Devise is Upside Down, we'll need to invert our numbers */
				if(window.orientation === -90)
				{
					upside_down = true;
				}
			}

			/** Detect Device Motion Support */
			if($that._supported.orientation && ($that.options.controlMethod == 'auto' || $that.options.controlMethod == 'orientation'))
			{
				if(reverse)
				{
					$that._accelero.centerOffsetX = $that._motion.ay;
					$that._accelero.centerOffsetY = (upside_down) ? -$that._motion.ax : $that._motion.ax;
				}
				else
				{
					$that._accelero.centerOffsetX = $that._motion.ax;
					$that._accelero.centerOffsetY = (upside_down) ? -$that._motion.ay : $that._motion.ay;
				}
			}
			/** Detect Mouse & Touch Support */
			else if(($that._supported.touch || $that._supported.mouse) && ($that.options.controlMethod == 'auto' || $that.options.controlMethod == 'touch'))
			{
				if(typeof $that._accelero.currentX == 'undefined')
				{
					$that._accelero.currentX = evt.pageX;
				}
				if(typeof $that._accelero.currentY == 'undefined')
				{
					$that._accelero.currentY = evt.pageY;
				}

				/** Do Calculations on Mouse / Finger Movement */
				$that._accelero.xdiff = evt.pageX - $that._accelero.currentX;
				$that._accelero.ydiff = evt.pageY - $that._accelero.currentY;

				$that._accelero.currentX = evt.pageX;
				$that._accelero.currentY = evt.pageY;

				$that._accelero.px = ($that._accelero.xdiff * $that.options.speed) * (i + 1);
				$that._accelero.py = ($that._accelero.ydiff * $that.options.speed) * (i + 1);

				$that._accelero.newX = $(el).position().left + $that._accelero.px;
				$that._accelero.newY = $(el).position().top + $that._accelero.py;

				$that._accelero.centerOffsetX = evt.pageX - ($that.$element.offset().left + ($that.$element.width() / 2));
				$that._accelero.centerOffsetY = evt.pageY - ($that.$element.offset().top + ($that.$element.height() / 2));

				/** Write Data Attributes to Container */
				$($that.$element).data('current-x', $that._accelero.currentX);
				$($that.$element).data('current-y', $that._accelero.currentY);
				$($that.$element).data('x-diff', $that._accelero.xdiff);
				$($that.$element).data('y-diff', $that._accelero.ydiff);
			}
		},
		/** Move & Rotate the Layers */
		move: function(evt){
			var $that = this;

			/** Loop through each layer */
			$that._accelero.layers.each(function(i, el) {

				/** Figure out where we are */
				$that.track(evt, i, el);

				/** Calculate Rotation for X */
				if($that.options.invertRotateX)
				{
					/** Check which side of center we are on */
					$that._accelero.rotateX = ($that._accelero.centerOffsetX > 0)
						? -($that.options.maxAngle * (i + 1)) * ($that._accelero.centerOffsetX / $that._accelero.centerX)
						: ($that.options.maxAngle * (i + 1)) * (Math.abs($that._accelero.centerOffsetX) / $that._accelero.centerX);
				}
				else
				{
					/** Check which side of center we are on */
					$that._accelero.rotateX = ($that._accelero.centerOffsetX > 0)
						? ($that.options.maxAngle * (i + 1)) * ($that._accelero.centerOffsetX / $that._accelero.centerX)
						: -($that.options.maxAngle * (i + 1)) * (Math.abs($that._accelero.centerOffsetX) / $that._accelero.centerX);
				}

				/** Calculate Rotation for Y */
				if($that.options.invertRotateY)
				{
					/** Check which side of center we are on */
					$that._accelero.rotateY = ($that._accelero.centerOffsetY > 0)
						? ($that.options.maxAngle * (i + 1)) * ($that._accelero.centerOffsetY / $that._accelero.centerY)
						: -($that.options.maxAngle * (i + 1)) * (Math.abs($that._accelero.centerOffsetY) / $that._accelero.centerY);
				}
				else
				{
					/** Check which side of center we are on */
					$that._accelero.rotateY = ($that._accelero.centerOffsetY > 0)
						? -($that.options.maxAngle * (i + 1)) * ($that._accelero.centerOffsetY / $that._accelero.centerY)
						: ($that.options.maxAngle * (i + 1)) * (Math.abs($that._accelero.centerOffsetY) / $that._accelero.centerY);
				}

				/** Calculate Movement for X */
				if($that.options.invertMoveX)
				{
					$that._accelero.translateX = -(($that._accelero.centerOffsetX / ($that._accelero.layerCount - i )) * $that.options.speed);
				}
				else
				{
					$that._accelero.translateX = (($that._accelero.centerOffsetX / ($that._accelero.layerCount - i )) * $that.options.speed);
				}

				/** Calculate Movement for Y */
				if($that.options.invertMoveY)
				{
					$that._accelero.translateY = -(($that._accelero.centerOffsetY / ($that._accelero.layerCount - i )) * $that.options.speed);
				}
				else
				{
					$that._accelero.translateY = (($that._accelero.centerOffsetY / ($that._accelero.layerCount - i )) * $that.options.speed);
				}

				/**  */
				switch(true)
				{
					/** Transform Both Rotation and Movement */
					case ($that.options.enableMove && $that.options.enableRotate):
						$that._accelero.transform = {
							'transform-origin': '50% 50%',
							'transform': 'perspective( 600px ) rotateX('+$that._accelero.rotateY+'deg) rotateY('+$that._accelero.rotateX+'deg) translateX('+$that._accelero.translateX+'px) translateY('+$that._accelero.translateY+'px)',
							'z-index': (i+1) * 10
						};
						break;

					/** Transform Only Movement */
					case ($that.options.enableMove):
						$that._accelero.transform = {
							'transform': 'translateX('+$that._accelero.translateX+'px) translateY('+$that._accelero.translateY+'px)',
							'z-index': (i+1) * 10
						};
						break;

					/** Transform Only Rotation */
					case ($that.options.enableRotate):
						$that._accelero.transform = {
							'transform-origin': '50% 50%',
							'transform': 'perspective( 600px ) rotateX('+$that._accelero.rotateY+'deg) rotateY('+$that._accelero.rotateX+'deg)',
							'z-index': (i+1) * 10
						};
						break;

					default:
						$that._accelero.transform = { 'z-index': (i+1) * 10 };
				}

				/** Write Data Attributes to each Layer */
				$(el).data('layer', (i+1) * 10);
				$(el).data('rotate-x', $that._accelero.rotateX);
				$(el).data('rotate-y', $that._accelero.rotateY);
				$(el).data('translate-x', $that._accelero.translateX);
				$(el).data('translate-y', $that._accelero.translateY);

				/** Actually move the layer */
				$(el).css($that._accelero.transform);

			});
		}
	};

	/** Setup Plugin */
	$.fn[ pluginName ] = function (options) {
		return this.each(function () {
			if ( !$.data( this, 'plugin_' + pluginName ) ) {
				$.data( this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	};

	/** Self executing plugin if you add the classname accelero to your layers container  */
	$(function(){
		$( '.' + pluginName )[ pluginName ]();
	});

})(jQuery, window, document);





$(function() {
  var $details = $('#section2 #details');
  var $nav = $('nav.greedy');
  var $btn = $('nav.greedy button');
  var $vlinks = $('nav.greedy .links');
  var $hlinks = $('nav.greedy .hidden-links');
  var $team = $('nav.greedy h1');
  var $nav_a = $('nav.greedy ul li a');
  var $nav_active = $('nav.greedy ul li');
  var $btn1 = $('.links li');

  var numOfItems = 0;
  var totalSpace = 0;
  var clickcount = 0;
  var breakWidths = [];

  // Get initial state
  $vlinks.children().outerWidth(function(i, w) {
    totalSpace += w;
    numOfItems += 1;
    breakWidths.push(totalSpace);
  });

  var availableSpace, numOfVisibleItems, requiredSpace;


$($btn).click(function(){
    clickcount++;
		if($(this).next().css('display')=='block' && clickcount==1){
			$(this).next().slideUp();
		}else{
            clickcount=0;
			$(this).next().slideDown();
            $($btn1).click(function(){
                $($btn).next().slideUp();
            return true;
            });
		}
    return false;
	});

  function check() {
    // Get instant state
    availableSpace = $vlinks.width() - 10;
    numOfVisibleItems = $vlinks.children().length;
    requiredSpace = breakWidths[numOfVisibleItems - 1];

    // There is not enought space
    if (requiredSpace > availableSpace) {
      $vlinks.children().last().prependTo($hlinks);
      numOfVisibleItems -= 1;
      check();
      // There is more than enough space
    } else if (availableSpace > breakWidths[numOfVisibleItems]) {
      $hlinks.children().first().appendTo($vlinks);
      numOfVisibleItems += 1;
    }
//      if(screen.width<503){
//       document.getElementById("containerID").style.visibility="hidden";
//      } else{
//       document.getElementById("containerID").style.visibility="visible";
//      }
      if((numOfItems-numOfVisibleItems)>0){
          //this state defines that the screen is not that of a system but mobile or tablet
      $nav.css('background-color','#04a1fb'); //give dark blue color
          $team.css('color','#fff');
          $nav_a.css('color','#fff');
          $btn.css('color','#fff');
       //   document.getElementById("containerID").style.visibility="hidden";
//          $details.remove('right');
//          $details.css('bottom',0);
      } else{
      $nav.css('background-color','transparent');
         //   document.getElementById("containerID").style.visibility="visible";
           $team.css('color','#000');
          $nav_a.css('color','#000');
           $btn.css('color','#000');
////          $details.remove('bottom');
////          $details.css('right',0);
      }
    // Update the button accordingly
    $btn.attr("count", numOfItems - numOfVisibleItems);
    if (numOfVisibleItems === numOfItems) {
      $btn.addClass('hidden');
    } else $btn.removeClass('hidden');
  }
 $($nav_active).on("click", function() {

		// Remove class from active tab
		$($nav_active).removeClass("active");

		// Add class active to clicked tab
		$(this).addClass("active");
    
     
 });
  // Window listeners
  $(window).resize(function() {
    check();
  });

  $btn.on('click', function() {
    $hlinks.toggleClass('hidden');
  });

  check();

    ///////////// Adaptive Tabs////////
    // Variables
	var clickedTab = $(".tabs > .active");
	var tabWrapper = $(".tab__content");
	var activeTab = tabWrapper.find(".active");
	var activeTabHeight = activeTab.outerHeight();

	// Show tab on page load
	activeTab.show();

	// Set height of wrapper on page load
	tabWrapper.height(activeTabHeight);

	$(".tabs > li").on("click", function() {

		// Remove class from active tab
		$(".tabs > li").removeClass("active");

		// Add class active to clicked tab
		$(this).addClass("active");

		// Update clickedTab variable
		clickedTab = $(".tabs .active");

		// fade out active tab
		activeTab.fadeOut(250, function() {

			// Remove active class all tabs
			$(".tab__content > li").removeClass("active");

			// Get index of clicked tab
			var clickedTabIndex = clickedTab.index();

			// Add class active to corresponding tab
			$(".tab__content > li").eq(clickedTabIndex).addClass("active");

			// update new active tab
			activeTab = $(".tab__content > .active");

           // if(clickedTabIndex==1){
            //activeTabHeight=window.outerHeight-200;}
            //else{
			// Update variable
			activeTabHeight = activeTab.outerHeight();
          //  }
			// Animate height of wrapper to new tab height
			tabWrapper.stop().delay(50).animate({
				height: activeTabHeight
			}, 500, function() {

				// Fade in active tab
				activeTab.delay(50).fadeIn(250);

			});
		});
	});

//	// Variables
//	var colorButton = $(".colors li");
//
//	colorButton.on("click", function(){
//
//		// Remove class from currently active button
//		$(".colors > li").removeClass("active-color");
//
//		// Add class active to clicked button
//		$(this).addClass("active-color");
//
//		// Get background color of clicked
//		var newColor = $(this).attr("data-color");
//
//		// Change background of everything with class .bg-color
//		$(".bg-color").css("background-color", newColor);
//
//		// Change color of everything with class .text-color
//		$(".text-color").css("color", newColor);
//	});


});
///////////////



//////////////
//function canvasMap(e)
//{
//    var t=document.getElementById("map");
//    var n=t.getContext("2d");this.options=e||globalOptions;
//    var r=this.options.height;
//    var i=this.options.width;
//    this.options.radius.x=i/2;
//    this.options.radius.y=r/2;
//    t.setAttribute("height",r);
//    t.setAttribute("width",i)
//}
//function setCursorPosition(e,t){
//    var n,r;
//    canoffset=$(e).offset();
//    n=t.clientX+document.body.scrollLeft+document.documentElement.scrollLeft-Math.floor(canoffset.left);
//    r=t.clientY+document.body.scrollTop+document.documentElement.scrollTop-Math.floor(canoffset.top);
//    r=r-globalOptions.height/2;n=n-globalOptions.width/2;
//    var i={x:n,y:r};
//    i.x=Math.round(i.x*10)/10;
//    i.y=Math.round(i.y*10)/10;
//    if(i.x&&i.y)getCountryName(i)
//}
//function getCoordinates(e,t){
//    var n=globalOptions.radius;
//    var r=Math.acos(t/n.y);
//    var i=Math.acos(e/n.x/Math.sin(r));
//    var s={};
//    s.x=i*180/Math.PI-90;s.y=r*180/Math.PI-90;
//    var o=Spinner._totalX;
//    var u=Spinner._totalY;
//    if(o>=180&&o<=360)o=o-360;
//    if(u>=180&&u<=360)u=u-360;
//    s.x=-s.x-o;
//    s.y=s.y-u;
//    return s
//}
//function getCountryName(e){
//    var t=globalOptions.reWrite;
//    var n=countries.data;
//    for(var r=0;r<n.length;r++){
//        var i=[];
//        for(var s=0;s<t.length;s++){
//            if(n[r].screen==t[s].z)i.push({x:t[s].x,y:t[s].y})
//                }if(isPointInPoly(i,e)){
//                    actuateLink(document.getElementById("link-"+n[r].screen))}}
//}
//function isPointInPoly(e,t){
//    for(var n=false,r=-1,i=e.length,s=i-1;++r<i;s=r)(e[r].y<=t.y&&t.y<e[s].y||e[s].y<=t.y&&t.y<e[r].y)&&t.x<(e[s].x-e[r].x)*(t.y-e[r].y)/(e[s].y-e[r].y)+e[r].x&&(n=!n);
//    return n
//}
//function actuateLink(e){
//    console.log(e);
//    var t=document.createEvent("MouseEvents");
//    t.initEvent("click",true,true);
//    allowDefaultAction=e.dispatchEvent(t)
//}
//function touchHandler(e){
//    var t=e.changedTouches,n=t[0],r="";
//    switch(e.type)
//    {case"touchstart":r="mousedown";
//            break;
//        case"touchmove":r="mousemove";
//            break;
//        case"touchend":r="mouseup";
//            break;
//        default:return
//    }
//    var i=document.createEvent("MouseEvent");
//i.initMouseEvent(r,true,false,$("#spinner"),1,n.screenX,n.screenY,n.clientX,n.clientY,false,false,false,false,0,null);
//    n.target.dispatchEvent(i)}function init(){Spinner.init();
//    Spinner.simpleRotate(0,-25);
//    interval=setInterval
//    (function(){
//        Spinner.displayFrame(3,0)},1/30*1e3)
//    }
//
//var geojson={type:"FeatureCollection",
//             features:[{type:"Feature",geometry:{type:"MultiPolygon",coordinates:[[[[0,90],[0,80],[0,70],[0,60],[0,50],[0,40],[0,30],[0,20],[0,10],[0,0],[0,-10],[0,-20],[0,-30],[0,-40],[0,-50],[0,-60],[0,-70],[0,-80],[0,-91],[.5,-91],[.5,-80],[.5,-70],[.5,-60],[.5,-50],[.5,-40],[.5,-30],[.5,-20],[.5,-10],[.5,0],[.5,10],[.5,20],[.5,30],[.5,40],[.5,50],[.5,60],[.5,70],[.5,80],[.5,90]],[[20,90],[20,80],[20,70],[20,60],[20,50],[20,40],[20,30],[20,20],[20,10],[20,0],[20,-10],[20,-20],[20,-30],[20,-40],[20,-50],[20,-60],[20,-70],[20,-80],[20,-91],[20.5,-91],[20.5,-80],[20.5,-70],[20.5,-60],[20.5,-50],[20.5,-40],[20.5,-30],[20.5,-20],[20.5,-10],[20.5,0],[20.5,10],[20.5,20],[20.5,30],[20.5,40],[20.5,50],[20.5,60],[20.5,70],[20.5,80],[20.5,90]],[[40,90],[40,80],[40,70],[40,60],[40,50],[40,40],[40,30],[40,20],[40,10],[40,0],[40,-10],[40,-20],[40,-30],[40,-40],[40,-50],[40,-60],[40,-70],[40,-80],[40,-91],[40.5,-91],[40.5,-80],[40.5,-70],[40.5,-60],[40.5,-50],[40.5,-40],[40.5,-30],[40.5,-20],[40.5,-10],[40.5,0],[40.5,10],[40.5,20],[40.5,30],[40.5,40],[40.5,50],[40.5,60],[40.5,70],[40.5,80],[40.5,90]],[[60,90],[60,80],[60,70],[60,60],[60,50],[60,40],[60,30],[60,20],[60,10],[60,0],[60,-10],[60,-20],[60,-30],[60,-40],[60,-50],[60,-60],[60,-70],[60,-80],[60,-91],[60.5,-91],[60.5,-80],[60.5,-70],[60.5,-60],[60.5,-50],[60.5,-40],[60.5,-30],[60.5,-20],[60.5,-10],[60.5,0],[60.5,10],[60.5,20],[60.5,30],[60.5,40],[60.5,50],[60.5,60],[60.5,70],[60.5,80],[60.5,90]],[[80,90],[80,80],[80,70],[80,60],[80,50],[80,40],[80,30],[80,20],[80,10],[80,0],[80,-10],[80,-20],[80,-30],[80,-40],[80,-50],[80,-60],[80,-70],[80,-80],[80,-91],[80.5,-91],[80.5,-80],[80.5,-70],[80.5,-60],[80.5,-50],[80.5,-40],[80.5,-30],[80.5,-20],[80.5,-10],[80.5,0],[80.5,10],[80.5,20],[80.5,30],[80.5,40],[80.5,50],[80.5,60],[80.5,70],[80.5,80],[80.5,90]],[[100,90],[100,80],[100,70],[100,60],[100,50],[100,40],[100,30],[100,20],[100,10],[100,0],[100,-10],[100,-20],[100,-30],[100,-40],[100,-50],[100,-60],[100,-70],[100,-80],[100,-91],[100.5,-91],[100.5,-80],[100.5,-70],[100.5,-60],[100.5,-50],[100.5,-40],[100.5,-30],[100.5,-20],[100.5,-10],[100.5,0],[100.5,10],[100.5,20],[100.5,30],[100.5,40],[100.5,50],[100.5,60],[100.5,70],[100.5,80],[100.5,90]],[[120,90],[120,80],[120,70],[120,60],[120,50],[120,40],[120,30],[120,20],[120,10],[120,0],[120,-10],[120,-20],[120,-30],[120,-40],[120,-50],[120,-60],[120,-70],[120,-80],[120,-91],[120.5,-91],[120.5,-80],[120.5,-70],[120.5,-60],[120.5,-50],[120.5,-40],[120.5,-30],[120.5,-20],[120.5,-10],[120.5,0],[120.5,10],[120.5,20],[120.5,30],[120.5,40],[120.5,50],[120.5,60],[120.5,70],[120.5,80],[120.5,90]],[[140,90],[140,80],[140,70],[140,60],[140,50],[140,40],[140,30],[140,20],[140,10],[140,0],[140,-10],[140,-20],[140,-30],[140,-40],[140,-50],[140,-60],[140,-70],[140,-80],[140,-91],[140.5,-91],[140.5,-80],[140.5,-70],[140.5,-60],[140.5,-50],[140.5,-40],[140.5,-30],[140.5,-20],[140.5,-10],[140.5,0],[140.5,10],[140.5,20],[140.5,30],[140.5,40],[140.5,50],[140.5,60],[140.5,70],[140.5,80],[140.5,90]],[[160,90],[160,80],[160,70],[160,60],[160,50],[160,40],[160,30],[160,20],[160,10],[160,0],[160,-10],[160,-20],[160,-30],[160,-40],[160,-50],[160,-60],[160,-70],[160,-80],[160,-91],[160.5,-91],[160.5,-80],[160.5,-70],[160.5,-60],[160.5,-50],[160.5,-40],[160.5,-30],[160.5,-20],[160.5,-10],[160.5,0],[160.5,10],[160.5,20],[160.5,30],[160.5,40],[160.5,50],[160.5,60],[160.5,70],[160.5,80],[160.5,90]],[[180,90],[180,80],[180,70],[180,60],[180,50],[180,40],[180,30],[180,20],[180,10],[180,0],[180,-10],[180,-20],[180,-30],[180,-40],[180,-50],[180,-60],[180,-70],[180,-80],[180,-91],[180.5,-91],[180.5,-80],[180.5,-70],[180.5,-60],[180.5,-50],[180.5,-40],[180.5,-30],[180.5,-20],[180.5,-10],[180.5,0],[180.5,10],[180.5,20],[180.5,30],[180.5,40],[180.5,50],[180.5,60],[180.5,70],[180.5,80],[180.5,90]],[[200,90],[200,80],[200,70],[200,60],[200,50],[200,40],[200,30],[200,20],[200,10],[200,0],[200,-10],[200,-20],[200,-30],[200,-40],[200,-50],[200,-60],[200,-70],[200,-80],[200,-91],[200.5,-91],[200.5,-80],[200.5,-70],[200.5,-60],[200.5,-50],[200.5,-40],[200.5,-30],[200.5,-20],[200.5,-10],[200.5,0],[200.5,10],[200.5,20],[200.5,30],[200.5,40],[200.5,50],[200.5,60],[200.5,70],[200.5,80],[200.5,90]],[[220,90],[220,80],[220,70],[220,60],[220,50],[220,40],[220,30],[220,20],[220,10],[220,0],[220,-10],[220,-20],[220,-30],[220,-40],[220,-50],[220,-60],[220,-70],[220,-80],[220,-91],[220.5,-91],[220.5,-80],[220.5,-70],[220.5,-60],[220.5,-50],[220.5,-40],[220.5,-30],[220.5,-20],[220.5,-10],[220.5,0],[220.5,10],[220.5,20],[220.5,30],[220.5,40],[220.5,50],[220.5,60],[220.5,70],[220.5,80],[220.5,90]],[[240,90],[240,80],[240,70],[240,60],[240,50],[240,40],[240,30],[240,20],[240,10],[240,0],[240,-10],[240,-20],[240,-30],[240,-40],[240,-50],[240,-60],[240,-70],[240,-80],[240,-91],[240.5,-91],[240.5,-80],[240.5,-70],[240.5,-60],[240.5,-50],[240.5,-40],[240.5,-30],[240.5,-20],[240.5,-10],[240.5,0],[240.5,10],[240.5,20],[240.5,30],[240.5,40],[240.5,50],[240.5,60],[240.5,70],[240.5,80],[240.5,90]],[[260,90],[260,80],[260,70],[260,60],[260,50],[260,40],[260,30],[260,20],[260,10],[260,0],[260,-10],[260,-20],[260,-30],[260,-40],[260,-50],[260,-60],[260,-70],[260,-80],[260,-91],[260.5,-91],[260.5,-80],[260.5,-70],[260.5,-60],[260.5,-50],[260.5,-40],[260.5,-30],[260.5,-20],[260.5,-10],[260.5,0],[260.5,10],[260.5,20],[260.5,30],[260.5,40],[260.5,50],[260.5,60],[260.5,70],[260.5,80],[260.5,90]],[[280,90],[280,80],[280,70],[280,60],[280,50],[280,40],[280,30],[280,20],[280,10],[280,0],[280,-10],[280,-20],[280,-30],[280,-40],[280,-50],[280,-60],[280,-70],[280,-80],[280,-91],[280.5,-91],[280.5,-80],[280.5,-70],[280.5,-60],[280.5,-50],[280.5,-40],[280.5,-30],[280.5,-20],[280.5,-10],[280.5,0],[280.5,10],[280.5,20],[280.5,30],[280.5,40],[280.5,50],[280.5,60],[280.5,70],[280.5,80],[280.5,90]],[[300,90],[300,80],[300,70],[300,60],[300,50],[300,40],[300,30],[300,20],[300,10],[300,0],[300,-10],[300,-20],[300,-30],[300,-40],[300,-50],[300,-60],[300,-70],[300,-80],[300,-91],[300.5,-91],[300.5,-80],[300.5,-70],[300.5,-60],[300.5,-50],[300.5,-40],[300.5,-30],[300.5,-20],[300.5,-10],[300.5,0],[300.5,10],[300.5,20],[300.5,30],[300.5,40],[300.5,50],[300.5,60],[300.5,70],[300.5,80],[300.5,90]],[[320,90],[320,80],[320,70],[320,60],[320,50],[320,40],[320,30],[320,20],[320,10],[320,0],[320,-10],[320,-20],[320,-30],[320,-40],[320,-50],[320,-60],[320,-70],[320,-80],[320,-91],[320.5,-91],[320.5,-80],[320.5,-70],[320.5,-60],[320.5,-50],[320.5,-40],[320.5,-30],[320.5,-20],[320.5,-10],[320.5,0],[320.5,10],[320.5,20],[320.5,30],[320.5,40],[320.5,50],[320.5,60],[320.5,70],[320.5,80],[320.5,90]],[[340,90],[340,80],[340,70],[340,60],[340,50],[340,40],[340,30],[340,20],[340,10],[340,0],[340,-10],[340,-20],[340,-30],[340,-40],[340,-50],[340,-60],[340,-70],[340,-80],[340,-91],[340.5,-91],[340.5,-80],[340.5,-70],[340.5,-60],[340.5,-50],[340.5,-40],[340.5,-30],[340.5,-20],[340.5,-10],[340.5,0],[340.5,10],[340.5,20],[340.5,30],[340.5,40],[340.5,50],[340.5,60],[340.5,70],[340.5,80],[340.5,90]]]]},properties:{name:"longitude"}},{type:"Feature",geometry:{type:"MultiPolygon",coordinates:[[[[-180,-80],[-170,-80],[-160,-80],[-150,-80],[-140,-80],[-130,-80],[-120,-80],[-110,-80],[-100,-80],[-90,-80],[-90,-79.8],[-100,-79.8],[-110,-79.8],[-120,-79.8],[-130,-79.8],[-140,-79.8],[-150,-79.8],[-160,-79.8],[-170,-79.8],[-180,-79.8],[-180,-80]]],[[[-90,-80],[-80,-80],[-70,-80],[-60,-80],[-50,-80],[-40,-80],[-30,-80],[-20,-80],[-10,-80],[0,-80],[0,-79.8],[-10,-79.8],[-20,-79.8],[-30,-79.8],[-40,-79.8],[-50,-79.8],[-60,-79.8],[-70,-79.8],[-80,-79.8],[-90,-79.8],[-90,-80]]],[[[0,-80],[10,-80],[20,-80],[30,-80],[40,-80],[50,-80],[60,-80],[70,-80],[80,-80],[90,-80],[90,-79.8],[80,-79.8],[70,-79.8],[60,-79.8],[50,-79.8],[40,-79.8],[30,-79.8],[20,-79.8],[10,-79.8],[0,-79.8],[0,-80]]],[[[90,-80],[100,-80],[110,-80],[120,-80],[130,-80],[140,-80],[150,-80],[160,-80],[170,-80],[180,-80],[180,-79.8],[170,-79.8],[160,-79.8],[150,-79.8],[140,-79.8],[130,-79.8],[120,-79.8],[110,-79.8],[100,-79.8],[90,-79.8],[90,-80]]],[[[-180,-60],[-170,-60],[-160,-60],[-150,-60],[-140,-60],[-130,-60],[-120,-60],[-110,-60],[-100,-60],[-90,-60],[-90,-59.8],[-100,-59.8],[-110,-59.8],[-120,-59.8],[-130,-59.8],[-140,-59.8],[-150,-59.8],[-160,-59.8],[-170,-59.8],[-180,-59.8],[-180,-60]]],[[[-90,-60],[-80,-60],[-70,-60],[-60,-60],[-50,-60],[-40,-60],[-30,-60],[-20,-60],[-10,-60],[0,-60],[0,-59.8],[-10,-59.8],[-20,-59.8],[-30,-59.8],[-40,-59.8],[-50,-59.8],[-60,-59.8],[-70,-59.8],[-80,-59.8],[-90,-59.8],[-90,-60]]],[[[0,-60],[10,-60],[20,-60],[30,-60],[40,-60],[50,-60],[60,-60],[70,-60],[80,-60],[90,-60],[90,-59.8],[80,-59.8],[70,-59.8],[60,-59.8],[50,-59.8],[40,-59.8],[30,-59.8],[20,-59.8],[10,-59.8],[0,-59.8],[0,-60]]],[[[90,-60],[100,-60],[110,-60],[120,-60],[130,-60],[140,-60],[150,-60],[160,-60],[170,-60],[180,-60],[180,-59.8],[170,-59.8],[160,-59.8],[150,-59.8],[140,-59.8],[130,-59.8],[120,-59.8],[110,-59.8],[100,-59.8],[90,-59.8],[90,-60]]],[[[-180,-40],[-170,-40],[-160,-40],[-150,-40],[-140,-40],[-130,-40],[-120,-40],[-110,-40],[-100,-40],[-90,-40],[-90,-39.8],[-100,-39.8],[-110,-39.8],[-120,-39.8],[-130,-39.8],[-140,-39.8],[-150,-39.8],[-160,-39.8],[-170,-39.8],[-180,-39.8],[-180,-40]]],[[[-90,-40],[-80,-40],[-70,-40],[-60,-40],[-50,-40],[-40,-40],[-30,-40],[-20,-40],[-10,-40],[0,-40],[0,-39.8],[-10,-39.8],[-20,-39.8],[-30,-39.8],[-40,-39.8],[-50,-39.8],[-60,-39.8],[-70,-39.8],[-80,-39.8],[-90,-39.8],[-90,-40]]],[[[0,-40],[10,-40],[20,-40],[30,-40],[40,-40],[50,-40],[60,-40],[70,-40],[80,-40],[90,-40],[90,-39.8],[80,-39.8],[70,-39.8],[60,-39.8],[50,-39.8],[40,-39.8],[30,-39.8],[20,-39.8],[10,-39.8],[0,-39.8],[0,-40]]],[[[90,-40],[100,-40],[110,-40],[120,-40],[130,-40],[140,-40],[150,-40],[160,-40],[170,-40],[180,-40],[180,-39.8],[170,-39.8],[160,-39.8],[150,-39.8],[140,-39.8],[130,-39.8],[120,-39.8],[110,-39.8],[100,-39.8],[90,-39.8],[90,-40]]],[[[-180,-20],[-170,-20],[-160,-20],[-150,-20],[-140,-20],[-130,-20],[-120,-20],[-110,-20],[-100,-20],[-90,-20],[-90,-19.8],[-100,-19.8]
//             ,[-110,-19.8],[-120,-19.8],[-130,-19.8],[-140,-19.8],[-150,-19.8],[-160,-19.8],[-170,-19.8],[-180,-19.8],[-180,-20]]],[[[-90,-20],[-80,-20],[-70,-20],[-60,-20],[-50,-20],[-40,-20],[-30,-20],[-20,-20],[-10,-20],[0,-20],[0,-19.8],[-10,-19.8],[-20,-19.8],[-30,-19.8],[-40,-19.8],[-50,-19.8],[-60,-19.8],[-70,-19.8],[-80,-19.8],[-90,-19.8],[-90,-20]]],[[[0,-20],[10,-20],[20,-20],[30,-20],[40,-20],[50,-20],[60,-20],[70,-20],[80,-20],[90,-20],[90,-19.8],[80,-19.8],[70,-19.8],[60,-19.8],[50,-19.8],[40,-19.8],[30,-19.8],[20,-19.8],[10,-19.8],[0,-19.8],[0,-20]]],[[[90,-20],[100,-20],[110,-20],[120,-20],[130,-20],[140,-20],[150,-20],[160,-20],[170,-20],[180,-20],[180,-19.8],[170,-19.8],[160,-19.8],[150,-19.8],[140,-19.8],[130,-19.8],[120,-19.8],[110,-19.8],[100,-19.8],[90,-19.8],[90,-20]]],[[[-180,0],[-170,0],[-160,0],[-150,0],[-140,0],[-130,0],[-120,0],[-110,0],[-100,0],[-90,0],[-90,.2],[-100,.2],[-110,.2],[-120,.2],[-130,.2],[-140,.2],[-150,.2],[-160,.2],[-170,.2],[-180,.2],[-180,0]]],[[[-90,0],[-80,0],[-70,0],[-60,0],[-50,0],[-40,0],[-30,0],[-20,0],[-10,0],[0,0],[0,.2],[-10,.2],[-20,.2],[-30,.2],[-40,.2],[-50,.2],[-60,.2],[-70,.2],[-80,.2],[-90,.2],[-90,0]]],[[[0,0],[10,0],[20,0],[30,0],[40,0],[50,0],[60,0],[70,0],[80,0],[90,0],[90,.2],[80,.2],[70,.2],[60,.2],[50,.2],[40,.2],[30,.2],[20,.2],[10,.2],[0,.2],[0,0]]],[[[90,0],[100,0],[110,0],[120,0],[130,0],[140,0],[150,0],[160,0],[170,0],[180,0],[180,.2],[170,.2],[160,.2],[150,.2],[140,.2],[130,.2],[120,.2],[110,.2],[100,.2],[90,.2],[90,0]]],[[[-180,20],[-170,20],[-160,20],[-150,20],[-140,20],[-130,20],[-120,20],[-110,20],[-100,20],[-90,20],[-90,20.2],[-100,20.2],[-110,20.2],[-120,20.2],[-130,20.2],[-140,20.2],[-150,20.2],[-160,20.2],[-170,20.2],[-180,20.2],[-180,20]]],[[[-90,20],[-80,20],[-70,20],[-60,20],[-50,20],[-40,20],[-30,20],[-20,20],[-10,20],[0,20],[0,20.2],[-10,20.2],[-20,20.2],[-30,20.2],[-40,20.2],[-50,20.2],[-60,20.2],[-70,20.2],[-80,20.2],[-90,20.2],[-90,20]]],[[[0,20],[10,20],[20,20],[30,20],[40,20],[50,20],[60,20],[70,20],[80,20],[90,20],[90,20.2],[80,20.2],[70,20.2],[60,20.2],[50,20.2],[40,20.2],[30,20.2],[20,20.2],[10,20.2],[0,20.2],[0,20]]],[[[90,20],[100,20],[110,20],[120,20],[130,20],[140,20],[150,20],[160,20],[170,20],[180,20],[180,20.2],[170,20.2],[160,20.2],[150,20.2],[140,20.2],[130,20.2],[120,20.2],[110,20.2],[100,20.2],[90,20.2],[90,20]]],[[[-180,40],[-170,40],[-160,40],[-150,40],[-140,40],[-130,40],[-120,40],[-110,40],[-100,40],[-90,40],[-90,40.2],[-100,40.2],[-110,40.2],[-120,40.2],[-130,40.2],[-140,40.2],[-150,40.2],[-160,40.2],[-170,40.2],[-180,40.2],[-180,40]]],[[[-90,40],[-80,40],[-70,40],[-60,40],[-50,40],[-40,40],[-30,40],[-20,40],[-10,40],[0,40],[0,40.2],[-10,40.2],[-20,40.2],[-30,40.2],[-40,40.2],[-50,40.2],[-60,40.2],[-70,40.2],[-80,40.2],[-90,40.2],[-90,40]]],[[[0,40],[10,40],[20,40],[30,40],[40,40],[50,40],[60,40],[70,40],[80,40],[90,40],[90,40.2],[80,40.2],[70,40.2],[60,40.2],[50,40.2],[40,40.2],[30,40.2],[20,40.2],[10,40.2],[0,40.2],[0,40]]],[[[90,40],[100,40],[110,40],[120,40],[130,40],[140,40],[150,40],[160,40],[170,40],[180,40],[180,40.2],[170,40.2],[160,40.2],[150,40.2],[140,40.2],[130,40.2],[120,40.2],[110,40.2],[100,40.2],[90,40.2],[90,40]]],[[[-180,60],[-170,60],[-160,60],[-150,60],[-140,60],[-130,60],[-120,60],[-110,60],[-100,60],[-90,60],[-90,60.2],[-100,60.2],[-110,60.2],[-120,60.2],[-130,60.2],[-140,60.2],[-150,60.2],[-160,60.2],[-170,60.2],[-180,60.2],[-180,60]]],[[[-90,60],[-80,60],[-70,60],[-60,60],[-50,60],[-40,60],[-30,60],[-20,60],[-10,60],[0,60],[0,60.2],[-10,60.2],[-20,60.2],[-30,60.2],[-40,60.2],[-50,60.2],[-60,60.2],[-70,60.2],[-80,60.2],[-90,60.2],[-90,60]]],[[[0,60],[10,60],[20,60],[30,60],[40,60],[50,60],[60,60],[70,60],[80,60],[90,60],[90,60.2],[80,60.2],[70,60.2],[60,60.2],[50,60.2],[40,60.2],[30,60.2],[20,60.2],[10,60.2],[0,60.2],[0,60]]],[[[90,60],[100,60],[110,60],[120,60],[130,60],[140,60],[150,60],[160,60],[170,60],[180,60],[180,60.2],[170,60.2],[160,60.2],[150,60.2],[140,60.2],[130,60.2],[120,60.2],[110,60.2],[100,60.2],[90,60.2],[90,60]]],[[[-180,80],[-170,80],[-160,80],[-150,80],[-140,80],[-130,80],[-120,80],[-110,80],[-100,80],[-90,80],[-90,80.2],[-100,80.2],[-110,80.2],[-120,80.2],[-130,80.2],[-140,80.2],[-150,80.2],[-160,80.2],[-170,80.2],[-180,80.2],[-180,80]]],[[[-90,80],[-80,80],[-70,80],[-60,80],[-50,80],[-40,80],[-30,80],[-20,80],[-10,80],[0,80],[0,80.2],[-10,80.2],[-20,80.2],[-30,80.2],[-40,80.2],[-50,80.2],[-60,80.2],[-70,80.2],[-80,80.2],[-90,80.2],[-90,80]]],[[[0,80],[10,80],[20,80],[30,80],[40,80],[50,80],[60,80],[70,80],[80,80],[90,80],[90,80.2],[80,80.2],[70,80.2],[60,80.2],[50,80.2],[40,80.2],[30,80.2],[20,80.2],[10,80.2],[0,80.2],[0,80]]],[[[90,80],[100,80],[110,80],[120,80],[130,80],[140,80],[150,80],[160,80],[170,80],[180,80],[180,80.2],[170,80.2],[160,80.2],[150,80.2],[140,80.2],[130,80.2],[120,80.2],[110,80.2],[100,80.2],[90,80.2],[90,80]]]]},properties:{name:"latitude"}},{type:"Feature",id:792,geometry:{type:"MultiPolygon",coordinates:[[[[-12.5,28.3],[-9.8,30.3],[-9.8,32.2],[-8.4,33.6],[-6.9,34.9],[-5.4,36.3],[-3.5,35.9],[-.9,35.9],[.5,36.2],[2.5,36.5],[6.7,36.9],[9,36.9],[11.4,36.6],[11.4,35.2],[11.4,33.3],[13.2,33.3],[13.7,32.1],[10,31.2],[10.2,28.5],[7.9,25.3],[-12.5,28.3]],[[-.2,8.5],[-1.4,12.6],[-2.5,14.6],[-6.2,21.6],[-9.8,25.8],[-12.2,27.8],[-13.3,26.8],[-12.5,28.1],[-12.1,28.7],[-8.6,28.8],[1.2,27.7],[6.5,25.6],[6.3,20.6],[3.5,17.5],[-.2,8.5]],[[0,7.2],[-1.2,5.8],[-3.2,5.4],[-6.5,5.4],[-7.9,5.4],[-8.1,4.2],[-9.8,4.6],[-13.2,8.1],[-14.9,9.8],[-17.2,13.2],[-17.2,15.6],[-17.1,18.1],[-16.2,21.6],[-16.2,24.4],[-14.2,25.8],[-12.1,27.8],[-8.3,25.5],[-5.8,24.4],[-2.8,21],[-1.4,18],[-.9,15.3],[-.5,11.7],[0,7.2]],[[29.2,2.6],[30.8,.5],[33.6,2.6],[35.7,5.1],[35.7,8.1],[33,10.7],[31.3,13.6],[29,18.5],[28.3,20.6],[23.4,21],[17.2,21.9],[17.9,24.4],[18.1,26.7],[18.1,29.2],[18.1,31.2],[16.3,32.2],[14.6,32.5],[11.1,32.2],[10,31.8],[9.5,30.4],[8.6,28.6],[6,24.8],[3.9,20.8],[.9,15.8],[.4,13.2],[.2,11.7],[-.2,9.1],[-.2,6],[2.8,7],[5.6,6.1],[5.6,4],[8.4,4.2],[13,9.6],[20.2,9.4],[26.7,7],[29.2,2.6]],[[33,30.1],[31.5,31.5],[28.8,31.4],[25.7,31.8],[23.4,32.1],[20.6,33.3],[20,32.1],[20,30.9],[18.1,31.2],[17.9,30.6],[16.9,28.5],[16.7,22.6],[17.6,20.5],[21.4,19.8],[26.5,19.8],[31.3,20.5],[33,22.1],[33.2,24.2],[33.8,27.4],[33,30.1]],[[32.9,27.4],[34.1,26.4],[35,25.3],[35.3,24.5],[35.7,24.5],[35.9,24],[35.7,23.7],[36.7,21.3],[37.8,20],[38.1,18],[39.6,16.3],[41.3,13.9],[43.4,11.7],[45.4,10.7],[48.2,10.8],[50.4,11.2],[49.9,8.2],[48.5,5.3],[46.8,3.3],[43.6,1.1],[41.8,.9],[37.8,2.8],[35.3,5.4],[33,8.1],[30.2,10.7],[28.5,13.9],[28.5,18.1],[28.5,20.5],[32.2,21.5],[32.9,27.4]],[[13.9,-10.8],[12.7,-7.7],[11.4,-5.1],[9.7,-3.2],[9.1,-1.8],[9,-.4],[9,2.1],[9,5.6],[12.8,10.1],[17.1,10.7],[21.4,10.7],[25.1,8.9],[26.7,8.1],[28.7,5.3],[29.5,3.7],[29.5,1.6],[29.5,-.4],[29.5,-4],[29.5,-8.4],[29.4,-10.7],[29.4,-14.6],[25.8,-14.8],[17.6,-11.5],[18.5,-12],[24,-13.7],[22.1,-12.6]],[[43.9,1.6],[42.2,-1.1],[41,-2.5],[39,-5.1],[38.7,-6.8],[39.9,-9.4],[40.1,-12],[40.4,-14.8],[40.4,-16.8],[37.4,-17.6],[35.5,-19.5],[33.9,-20.3],[29.5,-17.6],[28.7,-14.6],[28.7,-10.8],[28.3,-7],[28.3,-4],[28.3,-1.1],[29.1,2.3],[33.4,4],[35.9,6],[37.9,4.3],[41,2.8],[43.9,1.6]],[[35,-20.5],[35.7,-23.9],[34.8,-25.3],[32.5,-26.9],[30.4,-26.6],[30.1,-23.7],[28.3,-23.1],[27.1,-24.7],[25.1,-26.3],[23.6,-27.1],[20.4,-28.5],[19.2,-28.8],[16.5,-28.8],[15.1,-26.6],[14.2,-23.4],[13,-20.6],[12.5,-18.1],[11.8,-16.8],[12.7,-12.4],[14.1,-10.8],[17.1,-10.1],[20.6,-10.5],[24.6,-11.2],[27.8,-12.7],[29.2,-14.1],[32.5,-18.1],[35,-20.5]],[[44.3,-19.5],[44.3,-16.6],[45.9,-15.5],[47.3,-13.6],[48,-12.6],[49.2,-11.9],[50.6,-13.4],[50.1,-15.6],[50.1,-18.8],[48.2,-20.3],[47.8,-22.8],[47.1,-24.8],[45.4,-25.8],[42.7,-23.1],[42.4,-21.3],[44.3,-19.5]]]]},properties:{name:"AFRICA"}},{type:"Feature",id:792,geometry:{type:"MultiPolygon",coordinates:[[[[20.7,54.7],[23.8,48.4],[24.6,41.1],[22.7,40.7],[22.7,39.4],[24.3,39.1],[24.4,37.7],[23.4,36.9],[21.8,36.6],[20.9,37.7],[19.5,39],[19.2,40],[19.2,41.5],[17.2,42.9],[15.3,43.8],[14.2,45.1],[12.3,45.5],[12.3,44.2],[13.4,43.2],[14.8,42.3],[16,42],[17.2,41.2],[17.8,39.8],[16.5,39.6],[15.8,38],[15.3,36.7],[13.2,36.7],[11.8,38.3],[13.7,38.8],[15.1,39.8],[13.7,41.1],[11.6,41.8],[10.5,43.1],[8.4,44.3],[6.3,44.1],[5.3,43.5],[3.3,43.5],[2.8,41.9],[1.6,41.4],[.2,40.4],[-.2,38.8],[-2.1,37.2],[-4.6,36.7],[-5.3,37.1],[-5.6,36.4],[-6.1,37],[-8.2,37.2],[-9.4,38.3],[-9.4,39.5],[-9.3,40.4],[-9.2,41],[-8.4,41.6],[-8.6,42.4],[-8.7,42.9],[-7.8,43.6],[-5.6,43.5],[-2.5,43.3],[-1.2,43.8],[-1.2,45.6],[-1.8,47],[-3.4,47.8],[-2.4,48.4],[-1.2,48.9],[.8,49.6],[2.9,50.7],[3.5,51.5],[5.3,53.2],[6.2,53.4],[8.1,54.1],[7.9,55.5],[7.9,56.4],[8.8,57.3],[10.4,58.2],[11.1,56.5],[12.5,55.2],[14.2,53.8],[17.1,54.8],[18.3,54.8],[20.7,55],[20.7,54.7]],[[33.6,28.1],[35.2,28],[36,25.8],[37.6,24.4],[38.8,23.4],[39.4,21.8],[40.1,20.1],[41.3,19.1],[42.5,17.8],[43.2,15.3],[43.9,12.7],[46.4,12.7],[48.9,13.9],[51.3,14.9],[54,17.1],[56.8,18.1],[58.5,19.1],[60.1,22.1],[59.2,23.9],[56.3,24],[56.3,25.6],[54.1,25.2],[52.4,24],[50.8,25],[51.5,26.4],[50.4,26.7],[49,28.1],[48.3,29.5],[46.1,35.5],[46.8,32.7],[46.1,34.2],[45.4,35.9],[45.6,37.1],[44.5,38.1],[43.6,39.8],[42.4,41.2],[40.8,41.6],[38.5,41],[36.6,41.8],[33.8,42.2],[31.5,41.2],[29.9,41.1],[28.1,41.4],[27.9,42.2],[26.2,42],[25.7,41],[25.8,40],[26.7,37.9],[28.5,37],[30.2,36.5],[31.6,36.6],[34.5,36.7],[36,36.9],[36,35],[35.2,33.6],[34.3,31.2],[31.5,31.2],[33.6,28.1]],[[-5.1,50.1],[-4.4,51.5],[-4.6,52.9],[-4,54.6],[-5.3,55.9],[-6.7,57.4],[-5.8,58.4],[-3.5,58.4],[-2.3,57.9],[-2.1,57],[-2.8,55.9],[-1.6,54.8],[.5,54],[.9,53.2],[1.2,51.5],[-.5,51.1],[-3.3,51.2],[-5.1,50.1]],[[-9.1,54.8],[-8.1,55.5],[-6.2,55.5],[-6.2,54.6],[-6.2,53.4],[-6.3,52.7],[-7.9,52.3],[-9.8,51.6],[-11.1,53.3],[-9.1,54.8]],[[21.1,54.8],[26,54.9],[33.8,55.1],[41.1,55.1],[45.5,53.5],[46.6,50.1],[47.5,47.5],[47.1,45],[47.3,43.5],[48.3,41.5],[49.2,40],[48.9,38.1],[49.7,36.7],[52.9,36.7],[55.5,37.6],[60.3,37],[60.8,35.3],[61.2,33.6],[61.9,29.5],[62.6,26.6],
//             [62.4,25.5],[58.9,25.3],[56.6,26.6],[54.1,26.9],[51.3,27.8],[50,30.1],[47.5,31.7],[45.8,34.4],[45.5,36.6],[44.1,38.8],[42.7,40.7],[41.6,41.8],[40.8,42.6],[39,44],[37.3,45],[33.9,44.2],[32.2,45.6],[29,44.7],[28.5,43.3],[28.1,42.4],[25.1,42],[23.6,47],[21.6,52.3],[21.1,54.8]],[[20.7,54.8],[26,54.9],[33.8,55.1],[41.1,55.1],[45.5,53.5],[46.6,50.1],[47.5,47.5],[47.1,45],[47.3,43.5],[48.3,41.5],[49.2,40],[48.9,38.1],[49.7,36.7],[52.9,36.7],[55.5,37.6],[60.3,37],[60.8,35.3],[61.2,33.6],[61.9,29.5],[62.6,26.6],[62.4,25.5],[58.9,25.3],[56.6,26.6],[54.1,26.9],[51.3,27.8],[48,30],[47.5,31.7],[45.8,34.4],[45,36.5],[43.7,38.7],[41.8,40.5],[41.2,41.6],[40.8,42.6],[39,44],[37.3,45],[33.9,44.2],[32.2,45.6],[29,44.7],[28.5,43.3],[28.1,42.4],[26.1,42],[25.5,41.1],[25,40.9],[24.6,41.2],[24.4,41.9],[23.6,44.5],[23,47],[21.4,52.3],[20.7,54.8]],[[20.7,54.8],[21.4,55.6],[21.4,56.6],[21.6,57.4],[22.5,57.7],[23.6,57.3],[24.4,58.1],[22.9,58.6],[22.8,59.4],[25.2,59.8],[26.2,59.8],[27.2,59.8],[28.8,59.8],[30.6,60.2],[32.2,60.6],[36,61.9],[36.4,62.9],[36,63.9],[37.6,63.9],[37.8,64.5],[36.4,65],[39.2,64.8],[40.5,65],[40.2,66.1],[41.9,66.3],[43.2,66.5],[44.2,67.6],[44.2,68.6],[46.4,68.2],[45.9,67.2],[47.5,66.8],[49,67.8],[51.2,68.3],[53.2,68.9],[54.4,68.4],[55.9,67.3],[56.1,65.8],[55.9,64.8],[54.8,62.2],[52.7,60.8],[50.4,59.4],[47.8,58],[44.5,55.9],[42,55.1],[31.5,55],[20.7,54.8]],[[12.1,55.6],[14.3,55.3],[14.2,56],[15.8,56.2],[16.8,57.3],[16.8,58],[17.2,58.6],[18.5,59.1],[19.5,60.1],[18,60.8],[17.3,61.9],[18.9,63.1],[20.5,64],[21.7,64.2],[21.3,65.2],[23.1,65.8],[25.6,65.3],[23.4,64.1],[21.9,63.5],[21.4,62.7],[21.4,61.8],[21.4,60.8],[22,60.3],[23.3,59.9],[25.8,60.2],[27.9,60.5],[29,60.2],[30.1,60.1],[31,60.3],[29.9,61.2],[31.1,61.7],[32,61.3],[32.9,60.9],[34.3,61.3],[36,61.8],[36.5,62.9],[35.9,64.2],[35,64.9],[34.5,66.1],[32.5,67],[35.6,66.5],[37.2,66.1],[39.9,66.2],[40.9,66.8],[41,67.4],[40,68.1],[38.4,68.4],[36.9,69],[34.9,69.4],[32.6,69.4],[31.1,69.9],[30.7,70.5],[29.4,70.8],[27.4,71.1],[25.4,71],[23.6,70.9],[22,70.6],[20.1,70.3],[18.4,70],[17.1,69.3],[14.7,68.9],[13.6,68.2],[15.2,68.1],[14.7,67.5],[13.3,67.1],[12.4,66.4],[11.7,65.6],[11.3,64.7],[10.2,64.1],[8.7,63.5],[6.9,63],[5.5,62.2],[5,61.5],[5,60.9],[5,59.7],[5.1,59],[6,58.2],[8.1,58.2],[9.2,58.9],[10.3,59.2],[11.1,58.8],[11.7,58],[12.2,57.2],[12.9,56.7],[12.1,55.6]],[[54.3,68.5],[57.5,68.6],[59.4,68.8],[59.6,69.5],[62.2,69.8],[65,69.1],[68.9,68.4],[66.6,70.6],[68,71.7],[69.3,72.8],[70.8,72.9],[73.5,72.6],[75.6,71.9],[78.4,72.6],[81.6,73.5],[85.3,73.8],[87.5,74.4],[89.3,75.3],[95.3,72.5],[97.7,69.5],[93.9,67.5],[87.9,65.4],[79.5,63.3],[70.3,62.8],[64.3,62.8],[59.9,63.8],[55.7,64.8],[55.7,67],[54.3,68.5]],[[64.2,63],[68.4,60.8],[72.2,57.6],[74,53.5],[74.4,49.7],[73.5,46.3],[71.9,42.7],[70,40.4],[67.3,37.9],[64.2,35.7],[61.2,35.6],[60.3,37],[56.8,37.3],[54.5,37.3],[52.9,39],[52.9,40.3],[54.8,41.1],[54.5,42.2],[52.6,42.7],[51.2,43.6],[50.8,44.5],[51.3,45.2],[52.4,45.5],[52.4,47],[50.6,47.2],[48.9,46.4],[47.3,45.7],[46.8,48.1],[46.2,51],[45.5,53.5],[42.4,54.6],[41.5,55.1],[42.4,55.3],[45.5,56.7],[48.7,58.4],[51.7,59.9],[53.6,61.3],[55,62.9],[55.9,64.8],[59.9,63.9],[64.2,63]],[[64.2,63],[68.4,60.8],[72.2,57.6],[74,53.5],[74.4,49.7],[73.5,46.3],[71.9,42.7],[70,40.4],[67.3,37.9],[64.2,35.7],[61.2,35.6],[60.3,37],[56.8,37.3],[54.5,37.3],[52.9,39],[52.9,40.3],[54.8,41.1],[54.5,42.2],[52.6,42.7],[51.2,43.6],[50.8,44.5],[51.3,45.2],[52.4,45.5],[52.4,47],[50.6,47.2],[48.9,46.4],[47.3,45.7],[46.8,48.1],[46.2,51],[45.5,53.5],[42.4,54.6],[41.5,55.1],[42.4,55.3],[45.5,56.7],[48.7,58.4],[51.7,59.9],[53.6,61.3],[55,62.9],[55.9,64.8],[59.9,63.9],[64.2,63]],[[74.4,40.4],[78,41.2],[80.7,42.4],[81.4,44.5],[83,45.5],[85.3,47.2],[87.7,49.3],[86,50.4],[85.6,54.9],[84.4,58.8],[80.2,63.6],[77,63.3],[74,63.1],[67.9,62.9],[64.9,62.8],[67.5,60.9],[71.4,58.4],[73.8,54.9],[74.4,50.7],[73.7,46.6],[71.9,42.6],[70.1,40.3],[74.4,40.4]],[[63.1,24.7],[66.4,25.5],[68.7,23.6],[69.8,21],[73.3,21.1],[73.3,18.3],[74,14.6],[75.4,11.2],[76.3,7.7],[78.9,9.3],[80.2,12.7],[80.9,15.8],[84.4,17.6],[86,20.1],[88.8,21.5],[91.9,21.8],[94.2,19.1],[94.2,17.5],[95.1,15.5],[98.6,17],[99,12.9],[102.8,12],[104.8,9.4],[108.1,10.3],[110.6,14.6],[108.5,17.1],[106.2,18.8],[106.2,21],[105.6,22.9],[99.5,23.1],[97.2,24.5],[98.6,27.2],[95.8,28.9],[90.4,27.8],[85.3,28.8],[82.3,30.3],[79.5,32],[78.8,35.3],[76.3,36.6],[74.9,38.7],[74.4,40.6],[71.4,40.8],[69.1,39.8],[66.3,37.2],[62.9,35.6],[60.5,35.9],[61.7,29.1],[63.1,24.7]],[[87.7,49],[89.6,46.8],[91.1,44.7],[93.5,44],[97.4,42.3],[103.7,41.9],[109.2,41.8],[112.9,42.6],[116.4,44.8],[120.8,46.4],[120.8,48.3],[119.7,51.8],[116,54.7],[112.3,57.2],[108.1,59.3],[104.8,62.4],[103,64.7],[102.1,66.9],[100.2,68.7],[97.6,69.5],[91.4,66.6],[85.6,65.1],[81.9,64.1],[79.5,63.7],[84.2,59.1],[85.3,55.3],[85.8,50.3],[87.7,49]],[[88.9,75.2],[91.6,75.8],[93.9,75.9],[96.9,76.1],[100.2,76.2],[101.6,76.7],[102.8,77.4],[104.6,77.6],[107.2,77],[109.7,76.5],[112.9,76.4],[112.9,75.5],[112.9,74.7],[110.7,74.1],[107.8,73.3],[104.2,72.9],[101.4,71.8],[99.3,70.7],[97.9,69.5],[94.6,72.7],[88.9,75.2]],[[111.1,73.8],[115.8,73.7],[120.2,73.3],[123.9,72.9],[124.1,73.8],[128.1,73.8],[129.6,72.8],[129.6,71.6],[131.5,70.6],[131.8,69.3],[133.8,67.6],[134.8,66.2],[135.4,64.5],[135.7,61.9],[136.4,60.6],[136.2,58.4],[136.2,56.5],[135.9,55.1],[129,55.4],[123.8,55.2],[116.5,53.3],[111.6,56.9],[108.5,59.1],[103.9,61.8],[102,64.8],[100.4,66.8],[98.4,68.4],[97.7,69.4],[99.3,71.1],[102.7,72.6],[107.8,73.7],[111.1,73.8]],[[119.5,51.3],[121.8,52.2],[123.6,52.8],[126,51.5],[128.1,48.9],[130.8,47.3],[133.2,46.8],[131.3,45.2],[129.7,44],[127.4,43.2],[125.2,42.3],[124.1,40.8],[124.3,39.6],[126,37],[126.2,34],[129.2,34.6],[130.8,36.7],[128.8,38.5],[128.1,40],[130.6,41.6],[132.5,42.8],[134.6,42.8],[137.5,44.5],[138,46.2],[139,47.4],[140.4,50],[140.4,51],[140.4,52.8],[139.6,54.2],[136.1,55],[133.1,55.4],[127.3,55.4],[121.6,55.1],[118.8,54.8],[116.5,54.5],[119.5,51.3]],[[133.2,33],[137.1,33.7],[139.9,34.5],[141.2,36.3],[141,37.9],[141.3,39.9],[141,41.2],[142.6,42.6],[145.9,43.7],[144,44.6],[143.6,46.3],[143.6,48.7],[144,50.4],[143.8,52.3],[142.9,54.2],[141.9,52.7],[141.9,50.8],[142,48.8],[142.2,46.6],[139.7,39.4],[139.2,36.9],[136.1,36],[132.5,34.9],[130.1,33.6],[131.1,31.1],[133.2,33]],[[131.1,70.6],[131.5,71.2],[132.4,71.9],[134.3,71.5],[137.5,71.5],[139.4,71.6],[139.7,72.4],[142.2,72.7],[145.9,72.7],[148.7,72.4],[150.5,72],[151.7,71.5],[152.6,71.1],[156.3,71],[160.3,70.8],[160.3,70],[160,68.6],[160.5,66.5],[161.4,65.7],[162.9,62.8],[162.9,61.8],[160.7,60.9],[159.3,62],[155.2,61.1],[154.5,59.8],[154.5,58.8],[150.1,59.2],[145.5,59.6],[141.9,59.4],[141.2,58.5],[139.2,56.8],[135.7,55.5],[136.1,60.1],[135.4,63.5],[134.5,66.2],[132.4,68.7],[131.1,70.6]],[[162.9,62.3],[165.1,62.8],[163.5,61.1],[160,59.9],[157.5,58.3],[155.7,56.8],[155.7,54.5],[155.7,52.6],[156.1,51],[158.2,52.1],[160,53.9],[163.1,55.6],[162.4,58.2],[164.4,60],[169.1,60.4],[173,61.2],[177.4,62.5],[-179.8,62.5],[178.8,64.7],[-179.1,65.4],[-178.2,65.8],[-175.8,64.9],[-173.1,64.2],[-171.4,65.8],[-169.8,66.4],[-174.2,67.2],[-177,68.1],[178.6,69.2],[174,70],[169.6,70],[165.9,69.6],[163.8,69.5],[160.3,69.5],[159.8,67.1],[161.7,64.5],[162.6,62.7],[162.9,62.3]],[[95.6,4.7],[98.1,2.1],[100.4,-2.5],[103.4,-4.7],[104.8,-6],[109.3,-8.4],[115.5,-8.4],[122.5,-10],[129,-8.1],[123.8,-8.2],[118.5,-8.2],[112.1,-7.4],[109.2,-6.1],[104.8,-6],[105.8,-4],[105.8,-1.8],[103.2,.9],[105.1,2.5],[103.2,5.1],[101.6,7.4],[99.3,10],[97.9,10],[99.3,6.7],[100.4,3.7],[97.9,4.4],[95.6,4.7]],[[108.8,1.6],[112.3,2.6],[115.3,5.6],[116.9,6.5],[119.2,4.9],[118.1,.9],[116.4,-3.2],[115.7,-4.4],[111.6,-4],[108.6,-2.3],[108.8,1.6]],[[121.1,11.9],[119.7,14.9],[119.7,17.3],[121.6,18.6],[123.8,16.5],[122,14.8],[124.5,12.6],[126,10.1],[126.4,5.1],[123.8,6.5],[121.1,11.9]],[[129.4,-1.4],[132.5,-4.7],[136.4,-5.3],[138.9,-8.2],[141.9,-9.3],[144.7,-8.6],[147.5,-9.8],[149.8,-9.8],[147.3,-6.5],[144.8,-4],[141.5,-2.6],[139.2,-1.4],[135.7,-3.5],[133.4,.2],[129.4,-1.4]],[[121.8,-17.6],[124.3,-14.8],[127.3,-14.8],[129.9,-11.9],[132.5,-11.4],[135.2,-11.4],[137.1,-12.6],[136.1,-14.6],[138.7,-15.5],[140.1,-17],[141.9,-12.9],[142.4,-10.7],[145.2,-15.3],[146.8,-18.1],[148.4,-20.1],[150.8,-22.3],[153.1,-24.7],[153.8,-27.5],[153.8,-30.9],[152.4,-34.2],[150.5,-35.9],[148.9,-38.5],[145.4,-38.8],[142.2,-38.8],[138.3,-37.9],[138.3,-34.7],[135.2,-33.7],[131.7,-32.8],[128.7,-32.5],[123.8,-33.4],[122.3,-33.9],[117.1,-35.5],[114.6,-33.3],[114.1,-30],[114.1,-27.2],[112.7,-25],[113.2,-21.5],[115.8,-20],[118.8,-20],[121.8,-17.6]],[[-117.2,32.5],[-115,32.8],[-114.1,32.7],[-112.7,32.2],[-111.3,32],[-108.8,32],[-106.8,32],[-104.9,31.6],[-104.1,30.7],[-103.1,29.6],[-101.8,30.1],[-100.5,29.4],[-99.8,28.5],[-99.1,27.1],[-97.8,26.4],[-97.3,24.3],[-97.7,22.3],[-97.1,20.7],[-96.4,19.4],[-95.2,18.1],[-93.1,18.1],[-90.7,19],[-90.3,20.2],[-90.1,21.4],[-88.8,21.4],[-86.9,21.4],[-87.1,20.1],[-87.8,18.2],[-88.2,17.3],[-88.3,16],[-86.7,15.6],[-84,15.2],[-83.1,13.8],[-83.4,11.8],[-83.1,13.8],[-83.4,11.8],[-82.9,10.1],[-81.7,9.2],[-79.7,9.4],[-77.1,8.5],[-77.3,6.8],[-78.7,8.1],[-80.4,7.7],[-81.8,7.7],[-83.7,8.6],[-85.5,9.4],[-86,11.2],[-87.3,12.7],[-89.1,13.1],[-92.6,13.7],[-93,15.4],[-95.5,16],[-97.3,16],[-100.1,16.8],[-103,17.9],[-104.9,18.7],[-106,21],[-106,22.8],[-108.2,25.2],[-109.9,26.5],[-111.3,27.7],[-112.8,29],[-112.1,27],[-110.8,24.5],[-110.1,22.7],[-112.7,24.8],[-114.2,26.8],[-115.1,27.9],[-115.6,29.5],[-116.7,31.3],[-117.2,32.5]],[[-83.5,22.3],[-81.9,23.2],[-80.6,22.4],[-79.1,21.7],[-77.6,21.1],[-77.5,20.6],[-76,20.1],[-74.1,20],[-71.3,17.6],[-69.8,18.1],[-67.5,18.1],[-65.7,18.2],[-67.1,18.9],[-69.5,19.1],[-71.1,19.6],[-73.6,20.1],[-74.6,20.8],[-76.7,21.5],[-78.3,22.2],[-80,22.9],[-82.3,24],[-83.5,22.3]],[[-77.1,8.3],[-75.7,9],[-75.7,10.7],[-74,11.7],[-72.2,12],[-70.9,12.3],[-71.7,10.8],[-71.7,9.1],[-70.9,9.9],[-70.8,11.1],[-68.1,11.3],[-67.6,10.7],[-65,10.7],[-62.8,10.8],[-60.4,10.1],[-60.2,9.3],[-59.9,8.8],[-59.8,6.9],[-60.4,5.2],[-61.2,3.4],[-62.1,2.2],[-63.5,.4],
//             [-65.7,-.9],[-67.9,-2.4],[-70,-3.6],[-71.6,-5.5],[-73.6,-6.2],[-76.2,-7.2],[-78,-7.5],[-79.4,-7.5],[-80.6,-6.6],[-81.2,-5.6],[-81.3,-3.8],[-80.2,-3],[-80.6,-1.1],[-80,1],[-79.2,1.8],[-78,2.6],[-77.3,3.8],[-77.3,5.7],[-77.3,6.8],[-77.1,8.3]],[[-79.5,-7.4],[-78.2,-10.2],[-77.8,-11.3],[-77,-12],[-76.3,-13.1],[-76.3,-14.3],[-75.2,-15.5],[-74.2,-16],[-73.1,-16.4],[-71.9,-16.9],[-70.8,-17.7],[-70.3,-18.3],[-67.5,-18.3],[-60.6,-16.9],[-57.8,-14.9],[-56,-12.7],[-52,-8.9],[-52.1,-6.8],[-51.8,-3.7],[-50.9,-1.2],[-50.9,1.7],[-50.9,3.3],[-51.7,5.1],[-53.5,6],[-54.9,6],[-56.5,6.1],[-58.7,7.6],[-59.7,8.4],[-60.1,5.8],[-61.6,3.5],[-63.8,1.1],[-70.5,-3.5],[-74.2,-6.1],[-77.2,-6.8],[-79.5,-7.4]],[[-51,2.7],[-49.9,1.8],[-49.1,0],[-47,-.5],[-45.4,-1.1],[-42.8,-2],[-40.6,-3.1],[-37.5,-4.1],[-35.2,-5.3],[-34.6,-8],[-35,-10.1],[-37.2,-11.4],[-38.2,-13.7],[-38.7,-16.1],[-39.1,-18.1],[-39.8,-20.3],[-41.3,-22.7],[-42.6,-23.2],[-44.5,-23.6],[-47.2,-24.7],[-49,-26.4],[-49,-27.7],[-49,-29.1],[-50.7,-30.7],[-52,-32.3],[-53.3,-33.3],[-54,-34.7],[-55.4,-35],[-57.4,-34.7],[-58.4,-34.1],[-59.2,-32.9],[-58.8,-31],[-57.5,-29.2],[-57.7,-27.4],[-59.1,-27.1],[-59,-26],[-59.2,-24.5],[-60.7,-24],[-62.1,-22.8],[-63.4,-22.3],[-64.9,-20.3],[-65.3,-18.5],[-64.2,-17.6],[-61.4,-16.9],[-59.4,-15.5],[-57.1,-13.5],[-55.3,-11.4],[-53.3,-9.5],[-52.6,-8.4],[-51.9,-7.4],[-52.2,-4.2],[-51.6,-2.5],[-51.2,0],[-51,2.7]],[[-70.5,-18.1],[-70.2,-19.9],[-70.2,-21.8],[-70.4,-23.6],[-70.8,-25.2],[-71.1,-27.8],[-71.8,-30.2],[-71.8,-31.9],[-71.8,-33.9],[-72.4,-35.7],[-73,-36.9],[-73.7,-38.1],[-73.6,-39.3],[-73.7,-40.9],[-74.4,-43],[-74.4,-44.7],[-75.7,-46.8],[-75.7,-47.8],[-75.6,-49.1],[-75.6,-50.8],[-75.4,-52.3],[-74.6,-52.9],[-73.4,-54.2],[-71.9,-54.6],[-70.5,-55.1],[-69.5,-55.4],[-68.2,-55.4],[-68.2,-54.2],[-68.5,-53.1],[-68.8,-52.1],[-71.1,-51.7],[-71.9,-50.8],[-72.7,-50.1],[-72.7,-49.1],[-72.6,-48.2],[-71.5,-47.2],[-71,-45.5],[-71,-43.5],[-71.8,-42.2],[-71.2,-40.2],[-70.6,-36.2],[-69.5,-33.9],[-69.3,-32],[-69.3,-30.1],[-68.9,-28.7],[-67.9,-26.1],[-67.3,-24.9],[-67,-23.3],[-65.7,-22.5],[-64.2,-22.5],[-62.8,-22.4],[-64.7,-20.4],[-64.7,-18.5],[-64.1,-16.6],[-67.2,-18],[-70.5,-18.1]],[[-53.6,68.4],[-53.8,67.1],[-53.8,65.4],[-52.4,64.8],[-51.3,63.2],[-49.6,61.6],[-48.5,60.8],[-46.2,60.7],[-44.3,59.7],[-43.2,60.3],[-41.8,62.4],[-41.1,63.5],[-41.1,64.2],[-39.9,65.4],[-36.6,65.8],[-33.9,66.6],[-33.9,67.7],[-42.4,68.1],[-47.3,68.3],[-53.6,68.4]],[[-33.9,66.7],[-31.8,68.1],[-30.2,68.3],[-27.9,68.7],[-24.4,69.2],[-22.3,70],[-23.7,70.7],[-25.7,71.3],[-26.4,72.3],[-30.8,72.8],[-35,73],[-40.8,73.2],[-44.1,72.7],[-48.9,72.1],[-52.9,72.3],[-55.4,71.6],[-52.9,71],[-54,70.4],[-54.5,69.8],[-53.1,69.8],[-54,69.4],[-52.2,69.2],[-53.3,68.5],[-45.5,68.2],[-39.7,67.9],[-35.7,67.8],[-33.9,66.7]],[[-54.8,71.5],[-55.4,72.3],[-55.5,73.3],[-55.7,74.1],[-57.1,74.7],[-58.5,75.4],[-59.6,75.8],[-63.5,76.4],[-67,76.4],[-70.1,76.6],[-70.7,77.3],[-67.7,77.9],[-65.2,77.9],[-58.2,77.9],[-51.3,77.9],[-41.1,77.9],[-35.3,77.9],[-30.2,77.5],[-25.1,77.1],[-23.4,76.5],[-21.3,76],[-19.9,75.2],[-19.2,74.2],[-21.1,73.5],[-23.4,73.3],[-22,72.7],[-22,72.1],[-22,71.1],[-21.8,70.3],[-23.6,70.4],[-26.4,71.5],[-28.1,72.4],[-34.3,72.8],[-41,72.8],[-46.9,72.2],[-49.9,72],[-54.8,71.5]],[[-71.4,78.7],[-68.6,79],[-65.7,79.1],[-65.4,79.4],[-65.6,79.9],[-67.5,80.3],[-65,80.8],[-63.5,81.2],[-61.9,81.1],[-61,81.9],[-58.4,82],[-54.8,82.2],[-50.4,82.2],[-48.3,82.5],[-47.5,82.7],[-46.4,83.2],[-41.7,83.2],[-38.7,83.5],[-34.5,83.7],[-30.9,83.7],[-27.9,83.4],[-27.4,83.1],[-26,82.8],[-23.4,82.8],[-22.5,82.4],[-26,82.1],[-32.5,82.1],[-34.3,81.7],[-28.8,81.9],[-26.9,81.8],[-23.7,82],[-21.4,82],[-20.6,81.5],[-21.6,81.1],[-16.9,81.5],[-13.7,81.9],[-11.6,81.6],[-12.3,81.1],[-16.5,80.7],[-17.8,79.9],[-18.5,79.4],[-19.5,79.1],[-20,78.7],[-20.9,77.5],[-18.5,77],[-19.2,74.2],[-20.6,75.3],[-26,77],[-30.8,77.2],[-38.1,77.7],[-48.5,77.5],[-58.7,77.6],[-66.4,77.6],[-70.5,77.6],[-72.4,78.1],[-71.4,78.7]],[[166.3,-45.7],[167.7,-44.3],[169.5,-43.6],[171.6,-41.5],[172.8,-40.5],[174.3,-40.9],[175.5,-40.2],[173.8,-39.4],[174.7,-38.5],[174.7,-37],[173.6,-35.8],[172.5,-34.5],[175.2,-35.7],[175.5,-36.9],[176.1,-37.9],[177.5,-37.9],[178.5,-38.2],[177.7,-39.4],[176.7,-40.3],[176.1,-41.2],[175.3,-41.5],[174.3,-40.9],[173.9,-42.3],[173.1,-43.1],[171.7,-44.2],[171.1,-45.2],[170.2,-46.4],[169.1,-46.9],[167.5,-46.4],[166.3,-45.7]],[[59.2,69.5],[58,70.1],[55.5,70.4],[52.4,70.7],[51.9,71.6],[51.9,72.7],[52.9,73.4],[55.5,74.2],[56.4,75.2],[58.4,75.8],[59.9,76.1],[62.6,76.2],[64.9,76.4],[66.1,76.5],[67.3,77],[68.9,76.9],[68.9,76.4],[68,76.1],[66.1,75.9],[63.1,75.5],[61,75.4],[59.6,74.8],[58.4,74],[57.1,73.2],[55.5,72.4],[55.5,71.9],[56.4,71.2],[57.1,70.7],[59.4,70.1],[59.2,69.5]]]]},properties:{name:"Europe"}},{type:"Feature",id:840,screen:"USA",geometry:{type:"MultiPolygon",coordinates:[[[[-155.01,19.33],[-155.86,19.03],[-155.86,20.27],[-155.16,19.96],[-155.01,19.33]],[[-156.47,20.9],[-155.99,20.75],[-156.42,20.59],[-156.47,20.9]],[[-157.73,21.41],[-158.1,21.3],[-158.27,21.58],[-157.73,21.41]],[[-159.43,21.88],[-159.79,22.06],[-159.35,22.22],[-159.43,21.88]],[[-95.08,49.36],[-94.61,48.72],[-91.42,48.04],[-88.37,48.31],[-84.13,46.53],[-82.54,45.36],[-82.13,43.59],[-83.17,42.05],[-82.7,41.68],[-78.99,42.82],[-79.18,43.47],[-78.72,43.63],[-76.8,43.63],[-74.99,44.99],[-70.88,45.24],[-69.23,47.47],[-67.79,47.07],[-67.8,45.7],[-67.21,45.18],[-67.19,44.66],[-68.8,44.58],[-70.73,43.12],[-70.58,42.65],[-71.04,42.31],[-69.94,41.67],[-71.19,41.47],[-71.39,41.81],[-71.51,41.37],[-74,40.71],[-73.96,41.31],[-74.42,39.36],[-74.96,38.92],[-75.56,39.62],[-75.03,40.01],[-75.59,39.65],[-75.04,38.42],[-75.96,37.15],[-75.64,37.96],[-76.36,38.86],[-75.83,39.58],[-76.62,39.25],[-76.31,38.05],[-77.24,38.4],[-77.06,38.91],[-77.32,38.35],[-76.24,37.9],[-76.35,37.62],[-77.13,38.17],[-76.27,37.08],[-77.23,37.3],[-75.99,36.91],[-75.53,35.8],[-75.94,36.72],[-75.79,36.07],[-76.71,36.26],[-76.73,35.94],[-75.72,35.81],[-76.15,35.34],[-77.05,35.53],[-76.47,35.27],[-76.94,34.98],[-76.34,34.89],[-77.43,34.74],[-77.93,33.93],[-78.83,33.73],[-80.47,32.32],[-80.84,32.52],[-81.5,31.13],[-80.03,26.79],[-80.4,25.18],[-81.09,25.12],[-81.74,25.96],[-81.78,26.71],[-82.06,26.54],[-82.66,27.46],[-82.42,27.92],[-82.85,27.86],[-82.63,28.88],[-83.67,29.91],[-85.35,29.68],[-86.26,30.5],[-88.02,30.22],[-88.02,30.7],[-88.13,30.31],[-90.42,30.2],[-89.4,30.05],[-89.75,29.63],[-89.01,29.18],[-89.4,28.93],[-90.18,29.57],[-90.21,29.09],[-91.25,29.24],[-91.84,29.83],[-92.31,29.54],[-93.85,29.99],[-93.86,29.68],[-94.77,29.36],[-94.48,29.56],[-95.06,29.72],[-95.14,29.06],[-96.21,28.49],[-96.64,28.72],[-96.4,28.44],[-97.52,27.87],[-97.41,27.33],[-97.77,27.46],[-97.14,25.97],[-99.1,26.43],[-99.51,27.57],[-101.41,29.77],[-102.31,29.89],[-103.38,29.02],[-106.4,31.75],[-111.05,31.33],[-113.05,31.97],[-114.72,32.72],[-117.12,32.54],[-118.53,34.05],[-120.62,34.57],[-120.61,35.14],[-122.49,37.52],[-122.39,37.82],[-122.01,37.47],[-122.39,37.96],[-122.24,38.06],[-121.42,38.01],[-122.37,38.16],[-122.49,37.83],[-123,38.01],[-124.33,40.27],[-124.04,41.43],[-124.52,42.87],[-123.95,46.18],[-123.16,46.2],[-124,46.32],[-123.8,46.98],[-124.16,46.94],[-124.72,48.4],[-122.75,48.16],[-123.15,47.37],[-122.45,47.77],[-122.88,47.06],[-122.31,47.4],[-122.76,49],[-95.15,49],[-95.08,49.36]],[[-156.45,71.26],[-155.59,71.16],[-155.97,70.76],[-155.09,71.15],[-152.25,70.84],[-152.5,70.65],[-152.08,70.57],[-152.63,70.56],[-151.97,70.44],[-143.28,70.12],[-141,69.64],[-141,60.31],[-139.07,60.35],[-137.48,58.91],[-135.47,59.8],[-133.43,58.46],[-131.82,56.6],[-130.02,55.91],[-130.17,55.75],[-130.14,55.54],[-129.99,55.28],[-130.36,54.91],[-130.69,54.76],[-131.01,55],[-130.46,55.33],[-131.06,55.12],[-130.61,55.3],[-131.01,56.11],[-132.16,55.58],[-131.77,56.2],[-133.51,57.19],[-133.06,57.35],[-133.64,57.7],[-133,57.51],[-133.56,57.9],[-133.12,57.86],[-134.05,58.07],[-133.77,58.52],[-134.76,58.38],[-135.34,59.47],[-135.09,58.23],[-135.92,58.38],[-135.77,58.9],[-137.06,59.07],[-136.03,58.39],[-136.65,58.22],[-139.71,59.5],[-139.49,59.98],[-139.29,59.57],[-138.89,59.81],[-139.5,60.03],[-140.4,59.7],[-141.39,60.14],[-143.92,59.99],[-144.94,60.3],[-144.61,60.72],[-145.29,60.35],[-146.65,60.7],[-146.12,60.84],[-146.76,60.96],[-146.3,61.13],[-147.87,60.83],[-147.72,61.28],[-148.7,60.79],[-148.2,60.63],[-148.68,60.45],[-147.94,60.46],[-148.44,59.95],[-149.42,60.12],[-150.91,59.24],[-151.98,59.28],[-150.99,59.78],[-151.88,59.75],[-151.41,60.73],[-149.03,60.85],[-150.06,61.15],[-149.42,61.51],[-153.1,60.29],[-152.58,60.06],[-154.26,59.14],[-153.27,58.85],[-156.55,56.98],[-158.42,56.44],[-158.12,56.23],[-158.51,55.99],[-161.25,55.35],[-161.56,55.62],[-161.97,55.1],[-162.63,55.3],[-162.56,54.96],[-163.36,54.81],[-161.8,55.89],[-160.25,55.77],[-160.35,56.29],[-157.4,57.49],[-157.61,58.09],[-157.14,58.16],[-157.55,58.38],[-156.78,59.15],[-158.19,58.61],[-158.49,59],[-157.99,58.9],[-158.54,59.18],[-158.9,58.4],[-160.33,59.06],[-162.17,58.65],[-161.57,59.1],[-161.99,59.14],[-161.71,59.5],[-162.24,60.06],[-162.15,60.25],[-162.37,60.18],[-161.88,60.7],[-162.57,60.32],[-162.52,59.99],[-164.07,59.82],[-165.43,60.56],[-163.55,60.9],[-165.15,60.93],[-164.82,61.11],[-165.12,61.08],[-165.14,61.26],[-165.16,61.17],[-165.37,61.2],[-165.29,61.25],[-165.15,61.42],[-165.06,61.42],[-165,61.47],[-164.85,61.49],[-164.72,61.63],[-164.76,61.63],[-165.02,61.5],[-165.08,61.43],[-165.16,61.43],[-165.29,61.33],[-165.27,61.31],[-165.31,61.26],[-165.41,61.21],[-165.34,61.16],[-165.39,61.07],[-166.2,61.59],[-165.25,62.45],[-164.64,62.42],[-164.48,62.75],[-164.88,62.84],[-164.41,63.21],[-161.15,63.51],[-160.78,63.87],[-161.53,64.42],[-160.78,64.72],[-162.79,64.34],[-166.12,64.57],[-166.96,65.19],[-166.06,65.26],[-168.13,65.67],[-164.35,66.59],[-163.63,66.57],[-164.19,66.2],[-163.66,66.07],[-161,66.2],[-161.91,66.27],[-162.64,66.87],[-162.34,66.96],[-161.6,66.45],[-160.23,66.4],[-161.51,66.53],[-161.9,66.73],[-161.5,66.98],[-162.35,67.16],[-163.73,67.11],[-164.12,67.61],[-166.83,68.35]
//             ,[-166.22,68.88],[-163.65,69.11],[-161.94,70.31],[-159.94,70.59],[-159.84,70.27],[-159.29,70.53],[-160.12,70.62],[-159.67,70.8],[-156.45,71.26]]]]},properties:{name:"UNITED STATES"}},{type:"Feature",id:124,screen:"CAN",geometry:{type:"MultiPolygon",coordinates:[[[[-127.23,50.64],[-125.45,50.32],[-123.29,48.41],[-125.11,48.73],[-124.81,49.24],[-125.48,48.92],[-125.9,49.44],[-126.54,49.37],[-126.09,49.66],[-127.9,50.11],[-127.41,50.59],[-128.42,50.77],[-127.23,50.64]],[[-53.76,48.5],[-52.98,48.6],[-53.95,48.18],[-53.55,47.53],[-52.83,48.1],[-53.27,47.61],[-52.61,47.52],[-53.1,46.64],[-53.62,46.64],[-53.59,47.16],[-54.19,46.82],[-53.87,47.4],[-54.2,47.86],[-55.69,46.86],[-55.98,46.95],[-54.94,47.78],[-55.59,47.4],[-56.17,47.5],[-55.77,47.96],[-56.84,47.52],[-59.41,47.89],[-58.42,48.49],[-59.26,48.48],[-58.4,49.13],[-57.88,48.97],[-58.22,49.39],[-57.7,49.46],[-57.38,50.69],[-55.9,51.63],[-55.41,51.56],[-56.09,51.37],[-55.73,51.08],[-56.85,49.54],[-56.15,50.15],[-55.49,50.01],[-56.13,49.43],[-55.14,49.55],[-55.38,49.04],[-53.78,49.4],[-53.49,49.22],[-54.1,48.81],[-53.76,48.5]],[[-53.76,48.5],[-54.09,48.43],[-54.14,48.36],[-53.76,48.5]],[[-85.48,65.79],[-84.92,65.21],[-84.44,65.46],[-81.76,64.5],[-81.99,63.99],[-80.17,63.77],[-81.08,63.45],[-83.07,64.19],[-85.27,63.12],[-85.72,63.72],[-87.19,63.59],[-86.19,64.1],[-86.1,65.53],[-85.48,65.79]],[[-95.9,66.95],[-95.22,66.97],[-95.71,67.73],[-95.47,68.06],[-93.55,68.59],[-93.67,68.97],[-94.63,68.76],[-94.3,69.3],[-93.36,69.37],[-96.53,70.13],[-95.79,70.54],[-96.61,70.79],[-96.5,71.28],[-94.61,71.86],[-95.22,71.94],[-93.71,71.76],[-92.97,71.34],[-93.03,70.85],[-91.51,70.17],[-92.92,69.67],[-90.31,69.45],[-91.45,69.35],[-90.44,68.87],[-90.27,68.24],[-89.31,69.25],[-88.05,68.82],[-87.79,68.33],[-88.37,67.96],[-87.51,67.11],[-86.52,67.35],[-85.66,68.73],[-84.53,69.02],[-85.47,69.27],[-85.57,69.86],[-82.26,69.64],[-83.23,69.54],[-81.33,69.18],[-82.06,68.87],[-81.27,68.63],[-82.64,68.5],[-81.24,67.47],[-81.5,67],[-83.4,66.35],[-83.92,66.88],[-84.27,66.72],[-84.37,66.97],[-84.92,67.06],[-84.64,66.98],[-85.23,66.88],[-84.6,66.94],[-83.69,66.19],[-86.78,66.53],[-85.9,66.17],[-87.4,65.32],[-91.43,65.95],[-86.93,65.14],[-88.11,64.14],[-90.12,64.13],[-89.81,63.94],[-90.28,64],[-90.21,63.61],[-92.48,63.81],[-90.63,63.06],[-92.42,62.83],[-91.89,62.6],[-93.62,61.94],[-93.24,61.78],[-93.98,61.46],[-94.82,59.64],[-94.23,58.78],[-94.36,58.22],[-94.14,58.76],[-93.15,58.74],[-92.42,57.34],[-92.88,56.91],[-90.82,57.26],[-85.71,55.63],[-85.12,55.34],[-85.42,54.99],[-82.31,55.15],[-82.3,53.02],[-81.55,52.44],[-81.88,52.19],[-80.44,51.46],[-81.02,51.03],[-80.12,51.3],[-79.33,50.72],[-79.75,51.18],[-79.32,51.66],[-78.85,51.17],[-79.04,51.77],[-78.51,52.46],[-79.05,54.18],[-79.76,54.65],[-77.75,55.3],[-76.53,56.32],[-76.86,57.72],[-78.57,58.64],[-77.77,59.71],[-77.31,59.56],[-77.43,59.91],[-76.76,60.16],[-77.59,60.06],[-77.41,60.54],[-77.83,60.64],[-77.51,60.84],[-78.19,60.79],[-77.47,61.54],[-78.16,62.28],[-77.51,62.56],[-74.57,62.1],[-73.68,62.48],[-72.01,61.68],[-72.3,61.57],[-71.58,61.61],[-71.89,61.43],[-71.39,61.14],[-69.52,61.07],[-69.62,60.07],[-70.95,60.06],[-69.6,59.83],[-69.76,59.32],[-69.23,59.23],[-70.15,58.78],[-69.82,58.59],[-68.36,58.78],[-68.34,58.13],[-69.37,57.77],[-68.4,58.04],[-68,58.58],[-68.13,58.07],[-67.72,58.46],[-67.71,57.92],[-66.39,58.85],[-66.06,58.32],[-65.99,58.9],[-65.32,59.04],[-65.56,59.49],[-64.98,59.38],[-65.53,59.72],[-64.47,60.28],[-64.83,59.99],[-64.17,60.02],[-63.72,59.51],[-64.06,59.38],[-63.36,59.2],[-64.04,59.02],[-62.85,58.69],[-63.59,58.3],[-62.56,58.48],[-63.34,57.98],[-62.45,58.18],[-62.67,57.93],[-61.88,57.63],[-62.55,57.5],[-61.36,57.09],[-61.67,56.62],[-62.57,56.79],[-60.67,55.59],[-60.33,55.78],[-60.68,54.99],[-59.78,55.33],[-59.43,55.14],[-59.94,54.75],[-59.16,55.24],[-59.39,54.98],[-57.35,54.58],[-60.13,53.53],[-60.86,53.79],[-60.1,53.5],[-60.42,53.27],[-57.79,54.07],[-58.18,54.24],[-57.38,54.15],[-57.34,53.44],[-56.46,53.78],[-55.81,53.34],[-56.17,53.03],[-55.76,52.61],[-56.5,52.59],[-55.65,52.44],[-56.2,52.44],[-55.7,52.08],[-56.95,51.42],[-58.63,51.28],[-60.01,50.25],[-66.47,50.26],[-67.38,49.33],[-69.06,48.77],[-71.3,46.74],[-68.21,48.64],[-65,49.22],[-64.22,48.9],[-64.55,48.88],[-64.25,48.49],[-66.84,47.99],[-64.8,47.81],[-65.37,47.09],[-64.8,47.08],[-64.5,46.24],[-62.46,45.61],[-61.92,45.89],[-60.96,45.31],[-64.2,44.58],[-65.48,43.46],[-66.17,43.86],[-65.84,44.58],[-66.19,44.42],[-64.49,45.34],[-64.16,44.98],[-63.36,45.36],[-64.94,45.33],[-64.28,45.8],[-64.75,46.09],[-64.78,45.61],[-67.21,45.18],[-67.8,45.7],[-67.79,47.07],[-69.23,47.47],[-70.88,45.24],[-74.99,44.99],[-76.8,43.63],[-78.72,43.63],[-79.18,43.47],[-78.99,42.82],[-82.7,41.68],[-83.17,42.05],[-82.13,43.59],[-82.54,45.36],[-84.13,46.53],[-88.37,48.31],[-91.42,48.04],[-94.61,48.72],[-95.08,49.36],[-95.15,49],[-122.76,49],[-123.21,49.13],[-122.85,49.44],[-123.24,49.34],[-123.16,49.7],[-123.96,49.51],[-123.53,49.7],[-123.83,50.16],[-123.98,49.8],[-124.77,49.99],[-124.35,50.5],[-125.08,50.32],[-124.81,50.92],[-125.71,50.43],[-126.27,50.63],[-125.62,50.75],[-125.63,51.1],[-126.13,50.68],[-126.56,50.84],[-126.18,50.95],[-127.18,50.93],[-127.03,50.82],[-127.54,51.01],[-126.66,51.19],[-127.79,51.17],[-126.62,51.68],[-127.88,51.67],[-127.17,52.31],[-126.67,51.98],[-126.73,52.37],[-127.19,52.38],[-127.02,52.85],[-128.39,52.29],[-128.13,52.88],[-128.97,53.55],[-127.87,53.24],[-128.81,53.62],[-128.6,54.03],[-129.27,53.38],[-130.05,53.89],[-129.47,54.24],[-130.48,54.36],[-129.96,54.32],[-130.37,54.65],[-129.91,54.61],[-130.17,54.85],[-129.47,55.47],[-130.11,55],[-130.16,55.09],[-129.94,55.28],[-130.1,55.56],[-130.13,55.72],[-130.02,55.91],[-131.82,56.6],[-133.43,58.46],[-135.47,59.8],[-137.48,58.91],[-139.07,60.35],[-141,60.31],[-141,69.64],[-134.31,68.68],[-134.55,69.09],[-132.89,69.65],[-129.4,70.12],[-133.49,68.83],[-132.92,68.69],[-133.35,68.83],[-127.52,70.22],[-128,70.59],[-125.43,69.31],[-124.82,69.71],[-125.2,70],[-124.44,70.15],[-124.5,69.73],[-124.04,69.7],[-124.45,69.37],[-121.68,69.79],[-114.07,68.48],[-115.54,67.92],[-115.1,67.8],[-110.08,68.01],[-108.02,67.29],[-108.62,67.15],[-107.25,66.35],[-107.75,66.92],[-107.08,66.82],[-107.89,68.08],[-106.43,68.15],[-106.47,68.34],[-105.74,68.42],[-105.64,68.63],[-106.54,68.51],[-106.54,68.29],[-107.89,68.27],[-107.6,68.17],[-108.82,68.27],[-106.23,68.94],[-105.49,68.73],[-105.54,68.41],[-104.61,68.24],[-104.5,68.03],[-102.25,67.73],[-98.35,67.8],[-98.62,68.07],[-97.51,67.6],[-97.12,67.79],[-98.71,68.37],[-95.98,68.25],[-96.46,67.48],[-95.33,67.03],[-95.9,66.95]],[[-95.9,66.95],[-96.46,67.06],[-95.63,66.68],[-95.9,66.95]],[[-93.52,63.84],[-92.51,63.82],[-93.78,64.19],[-93.52,63.84]],[[-70.78,48.38],[-69.83,48.17],[-71.05,48.45],[-70.78,48.38]],[[-114,72.8],[-114.6,72.6],[-113.03,73.01],[-111.22,72.72],[-111.66,72.28],[-109.78,72.43],[-110.76,72.97],[-109.66,72.92],[-108.62,72.55],[-107.83,71.6],[-107.25,71.9],[-108.29,73.15],[-106.76,73.29],[-105.33,72.75],[-104.36,71.57],[-104.59,71.07],[-101,70.17],[-100.87,69.79],[-103.48,69.69],[-103.02,69.49],[-103.19,69.11],[-102.31,69.5],[-101.75,69.18],[-102.89,68.8],[-105.14,68.9],[-106.6,69.5],[-109.1,68.71],[-113.27,68.45],[-113.52,69.18],[-116.53,69.41],[-117.44,69.99],[-111.49,70.34],[-117.56,70.6],[-118.42,70.99],[-115.06,71.52],[-118.11,71.37],[-117.7,71.67],[-119.13,71.77],[-117.35,72.92],[-114.56,73.38],[-114,72.8]],[[-73.35,68.33],[-74.82,69.08],[-76.66,68.7],[-75.59,69.22],[-77.2,69.65],[-76.98,69.94],[-77.63,69.74],[-77.68,70.19],[-79.01,70.68],[-79.59,70.4],[-78.79,69.89],[-81.76,70.12],[-80.95,69.71],[-82.1,70.11],[-83.01,70.3],[-81.71,69.93],[-81.74,69.87],[-82.02,69.87],[-82.14,69.78],[-83.07,70.01],[-85.82,70],[-86.55,70.23],[-86.37,70.53],[-87.92,70.24],[-89.55,71.09],[-87,70.99],[-89.83,71.33],[-90.05,71.95],[-88.41,73.52],[-85.07,73.8],[-86.73,72.72],[-86.24,72.42],[-86.42,72.01],[-84.83,71.27],[-86.82,70.99],[-84.8,70.92],[-84.63,71.67],[-86.05,72.01],[-84.16,72.02],[-85.69,72.89],[-83.95,72.75],[-85.45,73.12],[-83.63,72.98],[-85.19,73.23],[-81.55,73.72],[-80.25,72.73],[-81.38,72.24],[-80.52,72.5],[-80.97,71.88],[-79.67,72.13],[-80.17,72.32],[-79.8,72.5],[-79.01,72.27],[-79.2,71.96],[-77.79,71.79],[-78.87,72.23],[-77,72.13],[-78.56,72.44],[-77.61,72.75],[-75.19,72.49],[-74.95,72.25],[-76.35,71.89],[-74.12,71.98],[-75.39,71.68],[-74.63,71.66],[-75.08,71.18],[-73.75,71.78],[-74.24,71.2],[-73.62,71.58],[-73.38,71.39],[-73.9,71.06],[-73.05,71.27],[-73.38,70.98],[-72.54,71.66],[-71.12,71.26],[-72.57,70.61],[-70.6,71.05],[-71.8,70.43],[-71.16,70.53],[-71.54,70.02],[-69.9,70.88],[-70.5,70.48],[-68.31,70.56],[-70.47,69.84],[-67.79,70.26],[-67.13,69.73],[-70.03,69.54],[-66.8,69.34],[-69.02,69.35],[-68.08,69.22],[-69.03,68.97],[-68.18,69.15],[-67.71,69.02],[-68.56,68.96],[-67.77,68.78],[-69.4,68.86],[-68.04,68.68],[-68.9,68.6],[-68.47,68.61],[-68.71,68.57],[-67.5,68.54],[-67.61,68.38],[-66.71,68.44],[-67.88,68.27],[-67.23,68.36],[-67.01,68.32],[-67.6,68.16],[-67.01,68.29],[-66.77,68.24],[-66.95,68.01],[-66.18,68.02],[-66.73,67.87],[-66.36,67.82],[-65.91,68.16],[-66.01,67.63],[-64.72,67.99],[-65.2,67.65],[-64.51,67.81],[-63.9,67.31],[-64.8,67.36],[-63.96,67.27],[-64.69,67],[-63.11,67.33],[-63.77,66.81],[-62.1,67.05],[-61.26,66.63],[-62.9,66.33],[-61.95,66.02],[-62.97,66.15],[-62.32,65.81],[-63.72,65.68],[-63.32,65.59],[-63.55,64.89],[-65.51,65.74],[-64.36,66.35],[-65.92,65.95],[-65.47,66.39],[-66.07,66.12],[-67.05,66.64],[-67.74,66.57],[-67.28,66.28],[-67.99,66.51],[-67.19,65.91],[-68.85,66.19],[-64.66,64.03],[-64.99,63.82],[-64.53,63.25],[-65.3,63.81],[-64.63,62.9],[-65.25,62.99],[-65.19,62.56],[-66.64,63.37],[-66.55,62.99],[-67.91,63.76],[-67.69,63.37],[-69,63.75],[-65.99,62.24],[-66.07,61.87],[-71.4,63.05],[-72.15,63.45],[-71.23,63.6],[-72.32,63.68],[-73.38,64.27],[-73.3,64.66],[-74.06,64.33],[-74.64,64.9],[-74.99,64.8],[-74.69,64.37],[-75.82,64.61],[-76.67,64.18],[-78.18,64.57],[-77.42,65.46],[-75.77,65.22],[-75.37,64.71],[-75.19,65.1],[-75.95,65.32],[-73.5,65.47]
//             ,[-74.47,66.15],[-72.26,67.25],[-73.35,68.33]],[[-73.35,68.33],[-73.21,68.38],[-73.32,68.39],[-73.35,68.33]],[[-99.8,73.89],[-96.96,73.74],[-98.45,72.87],[-96.52,72.71],[-96.3,72.42],[-96.87,72.04],[-96.49,71.91],[-98.27,71.9],[-98.04,71.53],[-98.73,71.27],[-102.74,72.72],[-102.14,73.09],[-100.41,72.74],[-100.03,72.93],[-100.58,73.17],[-99.77,73.21],[-101.62,73.49],[-100.43,73.41],[-101.12,73.73],[-99.8,73.89]],[[-92.64,74.1],[-90.19,73.9],[-92.1,72.74],[-94.32,72.76],[-93.46,72.46],[-94.06,71.98],[-95.21,71.99],[-94.75,72.15],[-95.67,72.81],[-95.67,73.72],[-92.64,74.1]],[[-120.15,74.27],[-117.42,74.23],[-115.32,73.48],[-119.14,72.63],[-120.25,72.26],[-120.54,71.52],[-122.78,71.09],[-126,71.97],[-123.77,73.76],[-124.77,74.34],[-120.15,74.27]],[[-94.36,75.59],[-93.49,75.26],[-93.47,74.7],[-96.62,74.99],[-94.36,75.59]],[[-98.42,76.67],[-97.51,76.19],[-97.94,75.74],[-97.28,75.4],[-98.17,75.33],[-97.58,75.14],[-100.15,74.99],[-100.78,75.35],[-98.95,75.71],[-102.88,75.62],[-101.18,75.78],[-101.91,76.08],[-101.39,76.25],[-102.17,76.24],[-101.89,76.44],[-99.89,75.89],[-99.44,75.97],[-100.15,76.13],[-99.41,76.16],[-100.98,76.5],[-98.42,76.67]],[[-108.65,76.81],[-108.08,76.28],[-108.4,76.05],[-107.63,75.99],[-108.02,75.78],[-106.34,76.05],[-105.39,75.64],[-106.01,75.05],[-112.75,74.4],[-114.45,74.67],[-110.91,75.23],[-117.68,75.25],[-115,75.69],[-117.25,75.6],[-114.82,75.88],[-116.73,75.92],[-114.66,76.16],[-115.93,76.29],[-114.9,76.52],[-112.45,76.18],[-111.25,75.52],[-108.9,75.48],[-110.06,75.89],[-109.31,76.11],[-110.39,76.39],[-108.65,76.81]],[[-95.66,77.06],[-93.18,76.74],[-93.55,76.39],[-91.41,76.69],[-89.29,76.3],[-91.61,76.26],[-88.95,75.43],[-81.54,75.81],[-79.57,75.45],[-80.44,75.04],[-79.33,74.89],[-81.81,74.46],[-83.51,74.9],[-83.47,74.58],[-84.29,74.5],[-88.5,74.5],[-88.55,74.91],[-91.54,74.65],[-92.49,75.21],[-92.11,75.86],[-93.08,76.36],[-95.38,76.23],[-94.8,76.32],[-96.96,76.73],[-95.66,77.06]],[[-116.35,77.54],[-115.39,77.31],[-116.28,77.18],[-115.9,76.69],[-117.1,76.3],[-118.06,76.41],[-117.84,76.82],[-118.97,76.51],[-118.57,76.34],[-119.08,76.08],[-119.65,76.3],[-119.48,75.97],[-119.87,75.86],[-123.04,76.08],[-119.15,77.33],[-116.35,77.54]],[[-96.77,78.68],[-94.89,78.1],[-97.1,77.8],[-97.78,78.03],[-96.87,78.13],[-98.41,78.5],[-96.77,78.68]],[[-103.59,79.33],[-99.95,78.73],[-98.95,78.06],[-99.91,77.78],[-104.47,78.27],[-105.05,78.49],[-103.32,78.73],[-105.63,79.16],[-103.59,79.33]],[[-92.73,81.31],[-88.78,80.13],[-87.68,80.41],[-88.07,80.12],[-86.96,79.9],[-87.46,79.53],[-84.9,79.27],[-87.62,78.65],[-88,78.81],[-87.72,79.08],[-88.16,78.99],[-87.91,78.55],[-88.8,78.61],[-88.82,78.15],[-89.98,78.61],[-89.45,78.16],[-92.06,78.21],[-92.99,78.47],[-91.64,78.55],[-94.29,78.99],[-90.36,79.25],[-95.09,79.27],[-95.78,79.43],[-94.28,79.76],[-95.85,79.65],[-96.8,80.09],[-94.38,79.98],[-94.75,80.08],[-94.08,80.18],[-96.68,80.34],[-93.79,80.53],[-95.53,80.82],[-93.09,81.16],[-94.27,81.35],[-92.73,81.31]],[[-70.11,83.11],[-66.3,82.93],[-68.64,82.63],[-64.73,82.9],[-61.08,82.32],[-64.36,81.73],[-69.29,81.72],[-66.61,81.51],[-70.21,81.17],[-64.44,81.48],[-69.43,80.38],[-70.83,80.56],[-70.15,80.19],[-72.42,80.21],[-70.5,80.08],[-71.46,79.9],[-71.18,79.78],[-78.05,79.35],[-74.44,79.06],[-78.89,79.06],[-74.72,78.71],[-76.69,78.51],[-75.06,78.31],[-76.91,78.2],[-75.58,78.11],[-75.92,77.96],[-78.26,78],[-77.72,77.61],[-78.69,77.32],[-81.93,77.68],[-81.17,77.34],[-82.17,77.29],[-81.83,77.16],[-77.78,76.79],[-81.05,76.13],[-80.77,76.42],[-82.73,76.82],[-82.13,76.44],[-89.68,76.57],[-86.74,77.17],[-88.07,77.82],[-84.48,77.29],[-84.61,77.39],[-83.46,77.35],[-83.84,77.46],[-82.32,78.07],[-83.9,77.49],[-84.78,77.52],[-84.43,77.72],[-84.95,77.6],[-85.35,77.73],[-85.05,77.83],[-85.4,77.82],[-84.33,77.9],[-85.68,77.93],[-84.13,78.17],[-84.97,78.2],[-84.64,78.59],[-85.49,78.1],[-87.54,78.14],[-86.86,78.73],[-82.34,78.57],[-83.25,78.83],[-81.48,79.05],[-84.75,79.03],[-83.36,79.05],[-86.49,79.76],[-85.26,79.92],[-86.51,80.3],[-79.9,79.65],[-83.2,80.32],[-78.04,80.57],[-79.96,80.61],[-76.48,80.87],[-78.93,80.88],[-76.75,81.44],[-80.92,80.66],[-85.07,80.51],[-86.74,80.6],[-82.36,81.18],[-87.59,80.63],[-89.47,80.91],[-84.73,81.28],[-89.82,81.01],[-90.35,81.17],[-87.24,81.49],[-91.96,81.66],[-88.08,82.1],[-84.6,81.89],[-86.88,82.2],[-85.05,82.48],[-79.23,81.82],[-82.73,82.4],[-80.58,82.55],[-81.47,82.82],[-78.5,82.68],[-80.43,82.89],[-79.79,82.96],[-75.89,82.59],[-76.23,82.44],[-75.4,82.61],[-77.38,82.99],[-72.63,82.69],[-73.65,82.93],[-70.11,83.11]]]]},properties:{name:"CANADA"}},{type:"Feature",id:32,screen:"ARG",geometry:{type:"MultiPolygon",coordinates:[[[[-68.26,-52.99],[-68.54,-53.23],[-67.36,-54.03],[-65.14,-54.65],[-66.45,-55.05],[-68.64,-54.79],[-68.62,-52.64],[-68.26,-52.99]]],[[[-65.75,-22.11],[-65.19,-22.09],[-64.59,-22.21],[-64.32,-22.87],[-63.94,-22],[-62.64,-22.24],[-61.01,-23.81],[-57.76,-25.18],[-57.58,-25.55],[-58.6,-27.32],[-55.74,-27.44],[-54.7,-26.44],[-54.6,-25.57],[-53.86,-25.68],[-53.81,-27.13],[-55.77,-28.23],[-57.61,-30.18],[-57.81,-30.75],[-58.2,-32.45],[-58.15,-33.05],[-58.43,-33.1],[-58.53,-33.52],[-58.47,-34.54],[-57.19,-35.32],[-57.38,-35.96],[-56.66,-36.9],[-58.3,-38.49],[-62.38,-38.8],[-62.02,-39.38],[-62.39,-40.9],[-65.13,-40.85],[-65.01,-42.09],[-64.45,-42.45],[-63.75,-42.09],[-63.58,-42.62],[-64.96,-42.67],[-64.3,-42.99],[-65.32,-43.65],[-65.6,-45.02],[-66.95,-45.26],[-67.58,-46],[-66.82,-46.99],[-65.78,-47.19],[-66.24,-47.86],[-65.79,-47.96],[-67.58,-49.03],[-67.9,-49.99],[-69.01,-50.01],[-68.37,-50.15],[-69.41,-51.08],[-68.97,-51.57],[-69.61,-51.63],[-68.99,-51.62],[-68.44,-52.38],[-71.91,-52],[-72.4,-51.51],[-72.29,-50.65],[-73.17,-50.75],[-73.58,-49.54],[-72.56,-48.8],[-72.36,-47.47],[-71.67,-46.68],[-71.78,-45.65],[-71.3,-45.29],[-72.08,-44.77],[-71.11,-44.54],[-71.86,-44.37],[-72.13,-42.29],[-71.73,-42.1],[-71.7,-39.58],[-70.82,-38.57],[-71.19,-36.84],[-70.42,-36.14],[-70.57,-35.25],[-69.81,-34.24],[-70.53,-31.19],[-69.83,-30.19],[-69.66,-28.4],[-68.29,-26.92],[-68.57,-24.77],[-67.34,-24.02],[-67.18,-22.82],[-66.22,-21.78],[-65.75,-22.11]]]]},properties:{name:"ARGENTINA"}},{type:"Feature",id:156,screen:"CHN",geometry:{type:"MultiPolygon",coordinates:[[[[110.72,20.06],[111.03,19.64],[110.05,18.38],[108.69,18.51],[108.63,19.28],[109.26,19.9],[110.72,20.06]]],[[[123.38,53.53],[126.1,52.76],[127.53,49.79],[130.67,48.86],[130.99,47.69],[134.74,48.27],[133.12,45.13],[131.86,45.35],[130.95,44.84],[131.31,43.39],[130.41,42.72],[130.6,42.42],[129.91,43.01],[129.71,42.44],[128.06,42],[128.16,41.38],[126.91,41.8],[124.37,40.09],[121.15,38.72],[121.75,39.35],[121.23,39.54],[122.3,40.51],[121.18,40.92],[118.92,39.13],[117.74,39.1],[117.67,38.39],[118.84,38.15],[119.23,37.14],[120.74,37.84],[122.56,37.4],[122.5,36.89],[120.09,36.2],[119.18,34.88],[120.25,34.31],[120.84,32.64],[121.9,31.75],[119.63,32.26],[121.88,30.97],[120.15,30.19],[122.13,29.89],[121.45,29.51],[121.98,29.59],[121.41,29.16],[121.61,28.72],[121.14,28.84],[121.58,28.27],[120.59,28.08],[120.84,27.88],[120.13,26.64],[119.55,26.75],[119.94,26.35],[119.09,26.14],[119.71,25.99],[119.65,25.36],[119.31,25.61],[118.62,24.54],[117.79,24.46],[118.12,24.26],[116.52,23.42],[116.48,22.94],[114.22,22.55],[114.03,22.51],[113.48,23.05],[113.55,22.21],[113.53,22.19],[113.17,22.57],[113.39,22.18],[112.94,21.87],[110.4,21.38],[110.28,20.25],[109.92,20.23],[109.57,21.72],[109.14,21.4],[108.48,21.94],[107.99,21.54],[106.69,22.03],[106.71,22.86],[105.58,23.06],[105.35,23.33],[103.96,22.5],[102.48,22.77],[102.14,22.4],[101.57,22.21],[101.79,21.14],[101.15,21.57],[100.21,21.43],[99.96,22.05],[99.16,22.16],[99.57,22.94],[98.93,23.19],[98.89,24.16],[97.54,23.94],[97.55,24.74],[98.71,25.86],[98.78,26.64],[98.7,27.54],[97.81,28.34],[97.35,28.22],[96.4,28.35],[96.62,28.79],[96.08,29.47],[95.39,29.04],[94.65,29.33],[92.54,27.86],[91.66,27.76],[90.47,28.07],[89.59,28.14],[88.92,27.32],[88.83,28.01],[88.14,27.87],[86.01,27.88],[82.1,30.34],[81.03,30.2],[78.77,31.31],[78.4,32.55],[79.53,32.75],[78.08,35.45],[77.82,35.5],[76.17,35.82],[75.86,36.66],[74.82,37.02],[74.57,37.03],[74.92,37.24],[74.86,38.47],[73.82,38.61],[73.66,39.45],[74.86,40.52],[76.35,40.35],[76.87,41.01],[78.08,41.04],[80.23,42.2],[80.38,43.03],[80.82,43.16],[80.52,44.73],[79.87,44.9],[82.56,45.13],[82.32,45.57],[83.04,47.21],[85.53,47.06],[85.76,48.39],[87.35,49.09],[87.84,49.17],[88.65,48.18],[90.07,47.89],[91.02,46.6],[90.9,45.25],[95.42,44.29],[96.38,42.73],[100.84,42.68],[105.01,41.58],[107.47,42.47],[110.44,42.78],[111.96,43.69],[111.42,44.38],[111.98,45.09],[113.64,44.75],[117.42,46.58],[119.9,46.68],[118.54,47.99],[117.37,47.65],[115.59,47.92],[116.71,49.83],[117.87,49.52],[119.21,50.02],[120.78,52.11],[120.03,52.77],[120.86,53.28],[123.38,53.53]]]]},properties:{name:"CHINA"}},{type:"Feature",id:250,screen:"FRA",geometry:{type:"MultiPolygon",coordinates:[[[[9.45,42.68],[9.18,41.36],[8.58,42.38],[9.35,43],[9.45,42.68]]],[[[2.54,51.09],[4.15,49.98],[4.83,50.17],[5.81,49.55],[6.36,49.46],[8.23,48.96],[7.59,47.58],[6.99,47.5],[5.97,46.21],[6.79,46.43],[7.04,45.93],[7.13,45.26],[6.62,45.11],[6.98,44.28],[7.66,44.17],[7.53,43.79],[7.44,43.76],[7.42,43.77],[7.39,43.73],[6.17,43.05],[3.96,43.54],[3.08,43.07],[3.18,42.44],[1.72,42.51],[1.78,42.57],[1.45,42.6],[-1.78,43.36],[-1.04,44.68],[-1.25,44.66],[-1.08,45.56],[-.54,44.9],[-.78,45.46],[-1.24,45.7],[-1.11,46.32],[-2.13,46.84],[-2.13,47.28],[-1.73,47.21],[-4.37,47.8],[-4.73,48.04],[-4.19,48.3],[-4.78,48.51],[-1.37,48.64],[-1.94,49.72],[.42,49.45],[.07,49.53],[1.46,50.12],[1.63,50.88],[2.54,51.09]]]]},properties:{name:"FRANCE"}},{type:"Feature",id:528,screen:"NED",geometry:{type:"MultiPolygon",coordinates:[[[[3.76,51.35],[3.37,51.37],[4.24,51.35],[3.76,51.35]]],[[[5.76,52.42],[5.43,52.26],[5.14,52.38],[5.64,52.6],[5.86,52.54],[5.76,52.42]]],[[[5.42,52.64],[5.05,52.39],[5.04,52.63],[5.42,52.64]]],[[[6.87,53.42],[7.21,53.24],[6.69,52.55],[7.07,52.39],[6.83,51.97],[5.96,51.81],[6.01,50.76],[5.04,51.49],[4.25,51.38],[3.44,51.54],[4.29,51.45],[3.69,51.71]
//             ,[4.17,51.69],[3.87,51.81],[4.58,52.46],[5.42,52.25],[5.77,52.41],[5.88,52.51],[5.86,52.61],[5.6,52.66],[5.6,52.76],[5.72,52.84],[5.37,52.88],[5.42,52.96],[5.36,53.07],[5.1,52.95],[5.3,52.71],[5.03,52.63],[5.03,52.38],[4.58,52.47],[4.73,52.96],[6.87,53.42]]]]},properties:{name:"NETHERLANDS"}},{type:"Feature",id:620,screen:"POR",geometry:{type:"MultiPolygon",coordinates:[[[[-8.2,41.87],[-6.59,41.95],[-6.19,41.58],[-6.93,41.02],[-7.02,39.67],[-7.53,39.67],[-6.95,39.03],[-7.43,37.25],[-8.99,37.02],[-8.67,38.41],[-9.18,38.42],[-8.98,38.95],[-9.48,38.71],[-8.66,40.69],[-8.75,41.95],[-8.2,41.87]]]]},properties:{name:"PORTUGAL"}},{type:"Feature",id:752,screen:"SWE",geometry:{type:"MultiPolygon",coordinates:[[[[21.81,68.57],[23.67,67.94],[23.43,67.47],[24.01,66.8],[23.66,66.31],[24.17,65.81],[21.77,65.72],[22.2,65.55],[21.26,65.34],[21.62,65.14],[21.04,64.82],[21.58,64.44],[20.78,63.87],[18.21,62.78],[17.7,62.99],[18.05,62.6],[17.33,62.49],[17.65,62.23],[17.15,60.95],[19.08,59.76],[17.94,59.34],[17.59,59.81],[17.73,59.44],[16.02,59.49],[17.38,59.25],[18.65,59.32],[16.19,58.63],[16.94,58.48],[16.41,58.47],[16.82,58.2],[16.42,57.89],[16.69,57.47],[15.87,56.09],[14.7,56.16],[14.19,55.39],[12.98,55.4],[12.45,56.3],[12.89,56.64],[11.7,57.7],[11.8,58.32],[11.2,58.4],[11.11,59],[11.43,58.99],[11.82,59.85],[12.49,60.11],[12.21,61],[12.86,61.36],[12.12,61.73],[12.14,63.58],[13.99,64.02],[14.12,64.47],[13.66,64.58],[14.49,65.31],[14.5,66.13],[15.47,66.28],[16.73,67.9],[17.88,67.95],[18.09,68.51],[19.94,68.34],[20.35,68.79],[20.1,69.04],[20.58,69.06],[21.81,68.57]]]]},properties:{name:"SWEDEN"}},{type:"Feature",id:784,screen:"UAE",geometry:{type:"MultiPolygon",coordinates:[[[[56.18,25.65],[56.27,25.64],[56.37,24.98],[56.04,24.94],[55.2,22.7],[52.58,22.94],[51.58,24.26],[54.12,24.14],[56.08,26.07],[56.18,25.65]]]]},properties:{name:"UNITED ARAB EMIRATES"}},{type:"Feature",id:710,screen:"RSA",geometry:{type:"MultiPolygon",coordinates:[[[[29.89,-22.19],[31.3,-22.41],[32.02,-24.46],[31.97,-25.96],[31.33,-25.75],[30.9,-26.31],[31.16,-27.2],[31.99,-27.32],[32.13,-26.84],[32.89,-26.85],[32.39,-28.54],[27.9,-33.04],[25.7,-34.03],[22.54,-34.01],[20,-34.82],[18.79,-34.09],[18.4,-34.3],[17.85,-32.83],[18.29,-32.62],[18.28,-31.89],[16.49,-28.58],[17.06,-28.03],[17.4,-28.71],[18.18,-28.91],[20,-28.42],[20,-24.77],[20.81,-25.88],[20.64,-26.83],[21.67,-26.86],[23.01,-25.3],[25.51,-25.68],[26.96,-23.75],[29.37,-22.19],[29.89,-22.19]],[[28.57,-28.61],[27.01,-29.63],[27.56,-30.4],[28.08,-30.65],[29.17,-29.91],[29.43,-29.28],[28.57,-28.61]]]]},properties:{name:"SOUTH AFRICA"}}]};var countryjson={type:"FeatureCollection",features:[{type:"Feature",id:840,screen:"USA",geometry:{type:"MultiPolygon",coordinates:[[[[-141,70.1],[-141.3,66.1],[-140.9,58.4],[-160.4,52],[-177.5,57.7],[-170.2,65.3],[-168.9,69.8],[-160.9,72.3],[-146.3,71.7],[-141,70.1]]],[[[-126.1,48.5],[-123.3,49.2],[-114.1,49],[-100.5,49.1],[-94.8,48.9],[-89.2,48],[-83.2,46],[-83.1,42],[-78.3,43.6],[-74.4,45.2],[-70.8,45.3],[-68.7,47.5],[-67.1,44.8],[-62.5,40],[-63.6,35.2],[-67.4,30.1],[-70.2,26.5],[-75.4,23.8],[-84.9,24.2],[-94.7,25.6],[-98.5,26.4],[-105.7,28.5],[-114.3,29.3],[-123.7,32],[-130.5,38.1],[-130.9,45],[-126.1,48.5]]]]},properties:{name:"UNITED STATES"}},{type:"Feature",id:124,screen:"CAN",geometry:{type:"MultiPolygon",coordinates:[[[[-141,70.5],[-131.8,71],[-128,74.9],[-121.3,77.9],[-105.1,80.5],[-90.4,82.4],[-78,83.4],[-64,83.4],[-58.7,82.9],[-60.8,82.3],[-69.3,80.3],[-72.8,78.7],[-75.9,76.3],[-75.2,73.2],[-66.8,70.8],[-62.2,67.2],[-59.8,62.6],[-55.5,55.4],[-52.4,50.5],[-53.8,44.8],[-61.5,43.1],[-68.9,47.3],[-80.5,43.6],[-87.2,48.7],[-107.6,50.1],[-127.3,48.9],[-138.2,57.9],[-142,61.8],[-141,70.5]]]]},properties:{name:"CANADA"}},{type:"Feature",id:32,screen:"ARG",geometry:{type:"MultiPolygon",coordinates:[[[[-60.5,-19.3],[-54.1,-24.5],[-50.6,-32.2],[-50.6,-42.3],[-58,-47.3],[-66.4,-54.4],[-77.3,-54],[-80.9,-39.4],[-77.7,-31.4],[-73.5,-20],[-60.5,-19.3]]]]},properties:{name:"ARGENTINA"}},{type:"Feature",id:156,screen:"CHN",geometry:{type:"MultiPolygon",coordinates:[[[[73.7,42.2],[86.7,51.5],[105.8,46.1],[122.7,55.3],[139,48.6],[128.8,34.7],[117.8,18.3],[90.4,18.3],[72.9,28.8],[73.7,42.2]]]]},properties:{name:"CHINA"}},{type:"Feature",id:250,screen:"FRA",geometry:{type:"MultiPolygon",coordinates:[[[[2.7,50.9],[5.4,50.1],[8.3,49],[7.6,46.9],[7,45.6],[7.7,43.6],[5,42.6],[2.4,41.6],[-1.7,42.5],[-4,44.5],[-4.4,46.9],[-5,48.5],[-1.8,50.2],[2.7,50.9]]]]},properties:{name:"FRANCE"}},{type:"Feature",id:528,screen:"NED",geometry:{type:"MultiPolygon",coordinates:[[[[2.7,51.3],[2.3,52.3],[2.8,53.4],[3.7,54.3],[5.5,54.4],[7.9,54.4],[9,53.9],[9.8,53.1],[9.9,52.3],[9.9,51],[8.7,50.4],[7.8,49.9],[5.9,50.1],[4.9,50.6],[2.7,51.3]]]]},properties:{name:"NETHERLANDS"}},{type:"Feature",id:620,screen:"POR",geometry:{type:"MultiPolygon",coordinates:[[[[-5.4,44.5],[-1.6,40.3],[-2.1,34.6],[-7.6,33.6],[-13.2,34.5],[-14.4,39.8],[-13.5,42.7],[-9.3,44.6],[-5.4,44.5]]]]},properties:{name:"PORTUGAL"}},{type:"Feature",id:752,screen:"SWE",geometry:{type:"MultiPolygon",coordinates:[[[[15.3,68.2],[19.9,69.3],[24.5,68.7],[26.3,67.1],[25.9,65.9],[22.9,64.1],[20,62],[19.4,59.9],[20.3,58.4],[18.6,56.9],[14.5,55.4],[10.7,56.1],[10.1,58.3],[9.5,61.1],[10.6,63.4],[11.3,65.7],[12.5,67.1],[15.3,68.2]]]]},properties:{name:"SWEDEN"}},{type:"Feature",id:784,screen:"UAE",geometry:{type:"MultiPolygon",coordinates:[[[[48.3,21],[53.9,18.4],[60.6,18.5],[65.6,24.6],[63,27.8],[60.3,30.4],[52.8,31.7],[49.4,29.3],[46.9,25.6],[48.3,21]]]]},properties:{name:"UNITED ARAB EMIRATES"}},{type:"Feature",id:710,screen:"RSA",geometry:{type:"MultiPolygon",coordinates:[[[[17.1,-24.6],[21.2,-22.2],[24.3,-21.6],[29.4,-19.8],[32.6,-19.8],[39.4,-21.8],[39.2,-25.2],[36.1,-31.5],[32,-35.4],[25.8,-37.6],[18.5,-36.7],[13.6,-35],[12.5,-29.4],[17.1,-24.6]]]]},properties:{name:"SOUTH AFRICA"}}]};var countries={data:[{id:2971,name:"ARGENTINA",screen:"ARG",color:"rgb(0,172,236)",range:[[0,140],[345,360]],text:"Painting the town<br>red, blue and<br>yellow, too; fine<br>wines; concrete<br>casas; and<br>Patagonian grill techniques"},{id:2975,name:"CANADA",screen:"CAN",color:"rgb(30,113,184)",range:[[20,180]],text:"Skating shelters;<br>art-status paddles;<br>aged cocktails;<br>and post-ironic<br>barroom debates"},{id:2967,name:"CHINA",screen:"CHN",color:"rgb(51,52,142)",range:[[190,315]],text:"Cutting-edge<br>galleries and shops;<br>Zhang Da's<br>conceptual fashion;<br>and the country's<br>first design museum"},{id:2972,name:"FRANCE",screen:"FRA",color:"rgb(125,43,139)",range:[[0,50],[300,360]],text:"Lyon's top tables;<br>enigmatic perfumes;<br>gastronomic<br>collages; and a<br>trio of emerging<br>product designers"},{id:2968,name:"NETHERLANDS",screen:"NED",color:"rgb(202,0,136)",range:[[0,50],[300,360]],text:"Amsterdam's offshore<br>restaurant; sculptural<br>knitwear; Studio Job's<br>new home; the<br> latest gadget in<br> bike security"},{id:2974,name:"PORTUGAL",screen:"POR",color:"rgb(204,34,41)",range:[[0,65],[315,360]],text:"Cork design; sweet<br>cordials; rural<br>retreats; beautiful<br>packaging; and<br>a state-of-the-art<br>Douro winery"},{id:2973,name:"SOUTH AFRICA",screen:"RSA",color:"rgb(224,146,47)",range:[[0,40],[270,360]],text:"A soccer school in<br>Soweto; nostalgic<br>menswear; whimsical<br>hats; hot coffees;<br>and a pulp fiction<br>magazine"},{id:2970,name:"SWEDEN",screen:"SWE",color:"rgb(228,211,56)",range:[[0,40],[300,360]],text:"A first-class design<br>school; a sourdough<br>hotel; the new<br>realtor; electric<br>snowmobiles and<br>sustainable villas"},{id:2969,name:"UNITED ARAB EMIRATES",screen:"UAE",color:"rgb(159,197,77)",range:[[0,10],[240,360]],text:"Dubai's happening<br>arts district; Abu<br>Dhabi's Zaha Hadid<br>bridge; the Saadiyat<br>Island mirage; and<br>a new desert park"},{id:2966,name:"UNITED STATES",screen:"USA",color:"rgb(30,168,156)",range:[[20,180]],text:"Moshe Safdie's new<br>museum in Arkansas;<br>NYC surf boards;<br>Deep South flavours;<br>and chic fruit tarts"}]};(function(){Vec3=function(e,t,n){this.x=e;this.y=t;this.z=n};Vec3.prototype.set=function(e,t,n){this.x=e;this.y=t;this.z=n};Vec3.prototype.addVector=function(e){this.x+=e.x;this.y+=e.y;this.z+=e.z};Vec3.prototype.subVector=function(e){this.x-=e.x;this.y-=e.y;this.z-=e.z};Vec3.prototype.returnAdd=function(e){return new Vec3(this.x+e.x,this.y+e.y,this.z+e.z)};Vec3.prototype.returnSub=function(e){return new Vec3(this.x-e.x,this.y-e.y,this.z-e.z)};Vec3.prototype.clone=function(){return new Vec3(this.x,this.y,this.z)};Vec3.prototype.dot=function(e){return this.x*e.x+this.y*e.y+this.z*e.z};Vec3.prototype.cross=function(e){var t=e.x;var n=e.y;var r=e.z;return new Vec3(this.y*r-this.z*n,this.z*t-this.x*r,this.x*n-this.y*t)};Vec3.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)};Vec3.prototype.unit=function(){var e=1/Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);return new Vec3(this.x*e,this.y*e,this.z*e)}})();Camera=function(){this._oPosition=new Vec3(0,0,0);this._oSideVec=new Vec3(1,0,0);this._oUpVec=new Vec3(0,1,0);this._oOutVec=new Vec3(0,0,1);this._oRotMat=new Matrix3;this._bDirty=false;this._iFocal=1e5;this._iClipNear=1;this._iClipFar=1e7;this._fScale=1;this._xfTheta=0;this._yfTheta=0;this._oLookAt=new Vec3(0,0,0)};Camera.prototype.getDirty=function(){return this._bDirty};Camera.prototype.setDirty=function(e){this._bDirty=e};Camera.prototype.setPosition=function(e){this._oPosition.set(e.x,e.y,e.z)};Camera.prototype.getPosition=function(){return this._oPosition};Camera.prototype.setScale=function(e){this._fScale=e;this._bDirty=true};Camera.prototype.getScale=function(){return this._fScale};Camera.prototype.getSide=function(){return this._oSideVec};Camera.prototype.getUp=function(){return this._oUpVec};Camera.prototype.getOut=function(){return this._oOutVec};Camera.prototype.pitchAroundTarget=function(e,t){this._yfTheta=e;var n=new Matrix3;var r=this.getPosition();t=t||this.getLookAt();r.subVector(t);
//             n.loadRotationAxis(this._oSideVec,Math.sin(e*Math.PI/180),Math.cos(e*Math.PI/180));r=n.multiplyVector(r);r.addVector(t);this.setPosition(r);this.setDirty(true)};Camera.prototype.yawAroundTarget=function(e,t){this._xfTheta=e;var n=new Matrix3;var r=this.getPosition();t=t||this.getLookAt();r.subVector(t);n.loadRotationAxis(this._oUpVec,Math.sin(e*Math.PI/180),Math.cos(e*Math.PI/180));r=n.multiplyVector(r);r.addVector(t);this.setPosition(r);this.setDirty(true)};Camera.prototype.lookAt=function(e,t){t=t||this._oUpVec;this._oOutVec=e.returnSub(this._oPosition).unit();this._oSideVec=this._oOutVec.cross(t).unit();this._oUpVec=this._oSideVec.cross(this._oOutVec).unit();this._vecLookAt=e.clone();this.setDirty(true)};Camera.prototype.getLookAt=function(){return this._vecLookAt};Camera.prototype.updateRotationMatrix=function(){var e=this._oRotMat.e[0];var t=this._oRotMat.e[1];var n=this._oRotMat.e[2];e[0]=this._oSideVec.x;e[1]=this._oSideVec.y;e[2]=this._oSideVec.z;t[0]=this._oUpVec.x;t[1]=this._oUpVec.y;t[2]=this._oUpVec.z;n[0]=this._oOutVec.x;n[1]=this._oOutVec.y;n[2]=this._oOutVec.z};Camera.prototype.transformPoint=function(e){var t=this._oRotMat.e;var n=this._oPosition;var r=t[0];var i=t[1];var s=t[2];var o=e.x-n.x;var u=e.y-n.y;var a=e.z-n.z;return new Vec3(o*r[0]+u*r[1]+a*r[2],o*i[0]+u*i[1]+a*i[2],o*s[0]+u*s[1]+a*s[2])};Camera.prototype.transform2D=function(e){var t=this._iFocal;return{x:-(e.x*t/(e.z+t))*this._fScale,y:-(e.y*t/(e.z+t))*this._fScale}};Camera.prototype.isBehind=function(e){if(e.z>0)return true;return false};Camera.prototype.isOnScreen=function(e){if(e.z>-100)return false;return true};Camera.prototype.getX=function(){return this._xfTheta};Camera.prototype.getY=function(){return this._yfTheta};Matrix3=function(){this.e=[[1,0,0],[0,1,0],[0,0,1]]};Matrix3.prototype.multiplyVector=function(e){var t=new Vec3;var n=this.e[0],r=this.e[1],i=this.e[2];var s=e.x,o=e.y,u=e.z;t.x=s*n[0]+o*n[1]+u*n[2];t.y=s*r[0]+o*r[1]+u*r[2];t.z=s*i[0]+o*i[1]+u*i[2];return t};Matrix3.prototype.multiplyMatrix=function(e){var t=new Matrix3;var n=this.e[0],r=this.e[1],i=this.e[2];var s=e.e[0],o=e.e[1],u=e.e[2];var a=n[0],f=n[1],l=n[2];var c=r[0],h=r[1],p=r[2];var d=i[0],v=i[1],m=i[2];var g=s[0],y=s[1],b=s[2];var w=o[0],E=o[1],S=o[2];var x=u[0],T=u[1],N=u[2];t.e[0][0]=g*a+w*f+x*l;t.e[0][1]=y*a+E*f+T*l;t.e[0][2]=b*a+S*f+N*l;t.e[1][0]=g*c+w*h+x*p;t.e[1][1]=y*c+E*h+T*p;t.e[1][2]=b*c+S*h+N*p;t.e[2][0]=g*d+w*v+x*m;t.e[2][1]=y*d+E*v+T*m;t.e[2][2]=b*d+S*v+N*m;return t};Matrix3.prototype.transpose=function(){var e=new Matrix3;e.e[0][0]=this.e[0][0];e.e[0][1]=this.e[1][0];e.e[0][2]=this.e[2][0];e.e[1][0]=this.e[0][1];e.e[1][1]=this.e[1][1];e.e[1][2]=this.e[2][1];e.e[2][0]=this.e[0][2];e.e[2][1]=this.e[1][2];e.e[2][2]=this.e[2][2];return e};Matrix3.prototype.loadIdentity=function(){var e=this.e[0],t=this.e[1],n=this.e[2];e[0]=1;e[1]=0;e[2]=0;t[0]=0;t[1]=1;t[2]=0;n[0]=0;n[1]=0;n[2]=1};Matrix3.prototype.loadRotationX=function(e,t){var n=this.e[0],r=this.e[1],i=this.e[2];n[0]=1;n[1]=0;n[2]=0;r[0]=0;r[1]=t;r[2]=-e;i[0]=0;i[1]=e;i[2]=t};Matrix3.prototype.loadRotationY=function(e,t){var n=this.e[0],r=this.e[1],i=this.e[2];n[0]=t;n[1]=0;n[2]=e;r[0]=0;r[1]=1;r[2]=0;i[0]=-e;i[1]=0;i[2]=t};Matrix3.prototype.loadRotationZ=function(e,t){var n=this.e[0],r=this.e[1],i=this.e[2];n[0]=t;n[1]=-e;n[2]=0;r[0]=e;r[1]=t;r[2]=0;i[0]=0;i[1]=0;i[2]=1};Matrix3.prototype.loadRotationAxis=function(e,t,n){var r=1-n;var i=r*e.x;var s=r*e.y;var o=i*e.x;var u=i*e.y;var a=i*e.z;var f=s*e.y;var l=s*e.z;var c=r*e.z*e.z;var h=t*e.x;var p=t*e.y;var d=t*e.z;this.e[0][0]=o+n;this.e[0][1]=u-d;this.e[0][2]=a+p;this.e[1][0]=u+d;this.e[1][1]=f+n;this.e[1][2]=l-h;this.e[2][0]=a-p;this.e[2][1]=l+h;this.e[2][2]=c+n};var projections={globe:{name:"globe",fn:function(e,t,n,r){var i=e.options;var s=i.radius;var o={};var u=(t.x+180)*Math.PI/180;var a=(90-t.y)*Math.PI/180;o.x=s.x*Math.sin(a)*Math.cos(u);o.y=s.y*Math.cos(a);o.z=s.x*Math.sin(a)*Math.sin(u);var f={x:o.x,y:-o.y,z:o.z};var l=cam.transformPoint(f);var c=false;if(cam.isOnScreen(l)&&n>3)i.onScreen[n]=r;if(cam.isBehind(l))return false;else{c=cam.transform2D(l)}if(c&&n>3){c.z=r;i.reWrite.push(c)}return c}},normal:{name:"normal",fn:function(e){return e}}};var globalOptions={width:430,height:430,radius:{},seaColor:"rgb(7, 33, 50)",stroke:"#cccccc",fill:"#cfcdc4",lineWidth:"0.8",projection:projections.globe,scale:{x:1,y:1},translate:{x:0,y:0},angle:{x:360,y:0},lineCap:"butt",lineJoin:"round",res:{},angleM:0,onScreen:[],onScreenCounter:0,reWrite:[]};canvasMap.prototype={render:function(){var e=document.getElementById("map");var t=e.getContext("2d");var n=this.options;var r=n.height;var i=n.width;t.lineWidth=n.lineWidth;t.lineCap=n.lineCap;t.lineJoin=n.lineJoin;this.rendergeojson(t,geojson)},rendergeojson:function(e,t){var n=this.options;e.save();e.translate(n.width/2,n.height/2);e.translate(n.translate.x,n.translate.y);e.scale(n.scale.x,n.scale.y);if(n.projection.name=="globe"){e.arc(0,0,n.radius.x,0,Math.PI*2,true);e.fillStyle=n.seaColor;e.fill()}var r=t.features;n.onScreenCounter=0;this.options.onScreen=[];this.options.reWrite=[];for(var i=0;i<r.length;i++){var s=r[i];if(s.type=="Feature"){this.renderFeature(e,s,n.onScreenCounter);n.onScreenCounter++}}e.fill();e.restore()},renderFeature:function(e,t,n){var r=t.geometry;var s=this.options;var o=r.type;var u=t.properties;e.fillStyle=s.fill;e.strokeStyle=s.fill;for(i=0;i<countries.data.length;i++){if(t.properties.name==countries.data[i].name){e.fillStyle=countries.data[i].color;e.strokeStyle=countries.data[i].color}}if(o=="MultiPolygon"){this.renderMultiPolygonFeature(e,t,n)}},renderMultiPolygonFeature:function(e,t,n){var r=t.geometry;var i=this.options.projection;var s=false;if(i){s=i.fn}for(var o=0;o<r.coordinates.length;o++){var u=r.coordinates[o];for(var a=0;a<u.length;a++){var f=u[a];var l=false;e.beginPath();for(var c=0;c<f.length;c++){var h=f[c];var p={x:h[0],y:-h[1]};if(s){var d=s(this,p,n,t.screen);p=d}if(p.x&&p.y){if(!l){l={x:p.x,y:p.y};e.moveTo(p.x,p.y)}else{e.lineTo(p.x,p.y)}}}e.closePath();e.fill();e.stroke()}}}};var isTouchScreen=false;if("ontouchstart"in window){isTouchScreen=true}var Spinner={container:null,fps:60,dragStart:null,dragEnd:null,dragInProgress:false,spinInProgress:false,_totalX:0,_totalY:0,init:function(){document.addEventListener("touchstart",touchHandler,true);document.addEventListener("touchmove",touchHandler,true);document.addEventListener("touchend",touchHandler,true);this.container=$("#main");this.initEvents()},initEvents:function(){this.container.bind("mousedown touchdown",Spinner.mouseDown);this.container.bind("mouseup touchup",Spinner.mouseUp);this.container.bind("mousemove touchmove",Spinner.mouseMove)},mousewheel:function(e){var t=0;if(!e)e=window.event;if(e.wheelDelta){t=e.wheelDelta/60}else if(e.detail){t=-e.detail/2}var n=globalOptions.scale.x;var r=globalOptions.scale.y;n=parseInt(n)-t*10;if(n>0){globalOptions.scale.x=n;globalOptions.scale.y=r;map.render()}},mouseDown:function(e){if(interval){clearInterval(interval)}e.preventDefault();if($("#ins1").is(":visible"))$("#ins1").fadeOut("slow");if($("#ins2").is(":visible"))$("#ins2").fadeOut("slow");Spinner.spinInProgress=false;Spinner.initialSpins=0;Spinner.initialSpinCount=0;Spinner.dragStart={x:e.pageX,y:e.pageY};Spinner.dragLast=Spinner.dragStart;Spinner.dragEnd=Spinner.dragStart;Spinner.dragInProgress=true},mouseMove:function(e){e.preventDefault();if(isTouchScreen){e=e.originalEvent.touches[0]}if(Spinner.dragInProgress){Spinner.dragEnd={x:e.pageX,y:e.pageY};var t=(Spinner.dragEnd.x-Spinner.dragLast.x)/2;var n=-(Spinner.dragEnd.y-Spinner.dragLast.y)/2;Spinner.dragLast=Spinner.dragEnd;Spinner.displayFrame(t,n)}},mouseUp:function(e){setCursorPosition("#map",e);e.preventDefault();Spinner.dragInProgress=false},displayFrame:function(e,t){cam.pitchAroundTarget(t);cam.yawAroundTarget(e);cam.lookAt(cam.getLookAt(),new Vec3(0,1,0));cam.updateRotationMatrix();for(i=0;i<countries.data.length;i++){var n="#"+countries.data[i].screen;var r=false;for(f=0;f<globalOptions.onScreen.length;f++){if(countries.data[i].screen==globalOptions.onScreen[f])r=true}if(r){if($(n).is(":hidden"))$(n).show()}else{if($(n).is(":visible"))$(n).hide()}}map.render()},simpleRotate:function(e,t){if(t)cam.pitchAroundTarget(t);if(e)cam.yawAroundTarget(e);cam.lookAt(cam.getLookAt(),new Vec3(0,1,0));cam.updateRotationMatrix();map.render()}};var map;var cam;var interval;cam=new Camera;cam.setPosition(new Vec3(-1,0,0));cam.lookAt(new Vec3(0,0,0));cam.updateRotationMatrix();cam.lookAt(cam.getLookAt(),new Vec3(0,1,0));cam.updateRotationMatrix();map=new canvasMap;init();for(i=0;i<10;i++){var divId="";var divider="";divId=i<5?"#countries-top":"#countries-bottom";divider=i==4||i==9?"":'<div class="divider"></div>';
//             var styleFix1="",styleFix2="",styleFix3="";if(countries.data[i].screen[1]=="W")styleFix2='style="left: 0.15em;"';if(countries.data[i].screen[0]=="F")styleFix1='style="left: 0.25em;"';if(countries.data[i].screen[1]=="E")styleFix2='style="left: 0.30em;"';if(countries.data[i].screen[2]=="E")styleFix3='style="left: 0.30em;"';if(countries.data[i].screen[0]=="S")styleFix1='style="left: 0.30em;"';if(countries.data[i].screen[1]=="S")styleFix2='style="left: 0.30em;"';$(divId).append('<div class="country">'+'<div id="'+countries.data[i].screen+'">'+'<a href="#" onClick=\'alert("navigate to '+countries.data[i].screen+'")\' id="link-'+countries.data[i].screen+'">'+'<div class="country-top">'+'<div class="country-top pierce">'+'<div class="country-top text" '+styleFix1+">"+countries.data[i].screen[0]+"</div>"+'<div class="country-top top" style="background:'+countries.data[i].color+'"></div>'+'<div class="country-top bottom" style="background:'+countries.data[i].color+'"></div>'+"</div>"+'<div class="country-top pierce">'+'<div class="country-top text" '+styleFix2+">"+countries.data[i].screen[1]+"</div>"+'<div class="country-top top" style="background:'+countries.data[i].color+'"></div>'+'<div class="country-top bottom" style="background:'+countries.data[i].color+'"></div>'+"</div>"+'<div class="country-top pierce" style="margin:0;">'+'<div class="country-top text" '+styleFix3+">"+countries.data[i].screen[2]+"</div>"+'<div class="country-top top" style="background:'+countries.data[i].color+'"></div>'+'<div class="country-top bottom" style="background:'+countries.data[i].color+'"></div>'+"</div>"+"</div>"+'<div class="country-bottom">'+countries.data[i].text+"</div>"+"</a>"+"</div>"+"</div>"+divider)}



