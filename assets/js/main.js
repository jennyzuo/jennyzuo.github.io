

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

//contact form

    // var $form = $('form#contact-me'),
    //     url = 'https://script.google.com/macros/s/AKfycbxgGpHGuWv7YoLXj_Tu1qL7XtoCQSA4R_oh-lV7BJVk1-Zsf_6u/exec'
	//
    // $('#submit-form').on('click', function(e) {
    //     e.preventDefault();
    //     var jqxhr = $.ajax({
    //         url: url,
    //         method: "GET",
    //         dataType: "json",
    //         data: $form.serializeArray(),
    //         success: function() {
    //         console.log($form.serializeArray())
    //         }
    //     });
    // })

})(jQuery);

//Skills-Canvas
window.onload = function() {
	$('#tags ul').css('visibility', 'visible');
    var textCol = '#567B12';

    if($('body').hasClass('white')){

        textCol = '#00000' ;

    }

    try {
        TagCanvas.Start('myCanvas','tags',{
            textColour: textCol,
            zoom:1.2,
            outlineColour : '#fff',
               outlineThickness : 0.5,
               // outlineColour : '#fe0853',
                maxSpeed : 0.06,
                freezeActive:true,
                shuffleTags:true,
                shape:'sphere',
                noSelect:true,
                textFont:null,
                pinchZoom:true,
                freezeDecel:true,
                fadeIn:3000,
                initial: [0.3,-0.1],
            reverse: true,
            depth: 0.8
        });
    } catch(e) {
        // something went wrong, hide the canvas container
        document.getElementById('myCanvasContainer').style.display = 'none';
    }
};