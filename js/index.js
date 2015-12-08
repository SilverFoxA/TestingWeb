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

;(function ($, window, document, undefined) {

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
      if((numOfItems-numOfVisibleItems)>0){
          //this state defines that the screen is not that of a system but mobile or tablet
      $nav.css('background-color','#04a1fb'); //give dark blue color
          $team.css('color','#fff');
          $nav_a.css('color','#fff');
          $btn.css('color','#fff');
//          $details.remove('right');
//          $details.css('bottom',0);
      } else{
      $nav.css('background-color','transparent');
           $team.css('color','#000');
          $nav_a.css('color','#000');
            $btn.css('color','#000');
//          $details.remove('bottom');
//          $details.css('right',0);
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
