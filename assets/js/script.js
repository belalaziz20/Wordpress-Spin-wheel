(function($){
	//$('#spin-wheel-canvas-wrap').css( 'margin-top', $('.ast-main-header-wrap').height() );
	setInterval(function(){
		$('.footer-text img').toggle();
		
	}, 3000);
	$('.footer-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: false,
		responsive: [ {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		} ]
	});
	setTimeout(function() {
		$('#spin-wheel-canvas-wrap').removeClass('not-visible').addClass('animate__fadeIn animate__animated');
		//$('.valueContainer').addClass('animate__rotateIn animate__animated animate__infinite')
		$('.welcome-image').addClass('hidden');
		setTimeout(function() {
			$('.start-message').show();
		}, 1000);
	}, 3000);

	var entry_id = false;
	$( document ).on('click', '.wheel-start.enabled', function(event) {
		event.preventDefault();
		$('.start-message').hide();
		$('.wheel-bouncing').removeClass('wheel-bouncing')
		$('.wheel-pointer').removeClass('win-pointer')

		/*
		$.fancybox.open({
			src  : '#wheel-spin-result',
			type : 'inline',
			openEffect: 'elastic'
		});
		return;
		*/

		//$( '.___wheel-start' ).trigger('click');
		//return;
		if( readCookie( 'wheel-spinned' ) ) {
			$.fancybox.open({
				src  : '#wheel-spinned',
				type : 'inline',
				openEffect: 'elastic'
			});
			return;
		}
		$.fancybox.open({
			src  : '#wheel-popup',
			type : 'inline',
			openEffect: 'elastic'
		});
	});
	$( document ).on('submit', '#wheel-popup-form', function(event) {
		event.preventDefault();
		$( '.wheel-popup-form-error' ).empty();

		if( readCookie( 'wheel-spinned' ) ) {
			$.fancybox.open({
				src  : '#wheel-spinned',
				type : 'inline',
				openEffect: 'elastic'
			});
			return;
		}
		if( !check_required( $( this ) ) )
			return;

		$.ajax({
			url: ___wheel_js._ajax_url,
			type: 'POST',
			data: $( this ).serialize(),
		})
		.done(function( res ) {
			$( '#wheel-popup-form' ).trigger('reset');
			$.fancybox.close();
			entry_id = res.entry_id;
			$( '.___wheel-start' ).trigger('click');
			$('.wheel-start').removeClass('enabled');
		})
		.fail(function( res ) {
			//console.log( res );
			//console.log( $( '.wheel-popup-form-error' ) );
			$( '.wheel-popup-form-error' ).html( res.responseJSON.message );
		})
		.always(function() {
			$('.wheel-bouncing').removeClass('wheel-bouncing')
		});
		
	});
	function submit_spin_result( e ) {
		if( readCookie( 'wheel-spinned' ) )
			return;
		createCookie( 'wheel-spinned', true, 30 );
		$.ajax({
			url: ___wheel_js._ajax_url,
			type: 'POST',
			data: { action: 'submit-spin-result', 'win': e.win, 'message': e.msg, 'entry_id': entry_id },
		})
		.done(function( res ) {
			if( e.win || !e.win ) {
				$('.wheel-pointer').addClass('win-pointer')
				$( '.win-amount span' ).text( e.msg )
				$( '.reference_key' ).text( res.token )
				setTimeout(function() {
					$.fancybox.open({
						src  : '#wheel-spin-result',
						type : 'inline',
						openEffect: 'elastic'
					});
				}, 1000);
			} else {
				$.fancybox.open({
					src  : '#wheel-spin-result-failed',
					type : 'inline',
					openEffect: 'elastic'
				});
			}
			
		})
		.fail(function() {
			//console.log("error");
		})
		.always(function( res ) {
			$('.wheel-start').addClass('enabled');
		});
		
	}
	function createCookie(name, value, days) {
	    var expires;

	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        expires = "; expires=" + date.toGMTString();
	    } else {
	        expires = "";
	    }
	    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
	}

	function readCookie(name) {
		return false;
	    var nameEQ = encodeURIComponent(name) + "=";
	    var ca = document.cookie.split(';');
	    for (var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) === ' ')
	            c = c.substring(1, c.length);
	        if (c.indexOf(nameEQ) === 0)
	            return decodeURIComponent(c.substring(nameEQ.length, c.length));
	    }
	    return null;
	}

	function eraseCookie(name) {
	    createCookie(name, "", -1);
	}
	function check_required( element ) {
		var validate = true;
		$( element ).find('.validate-required:visible').each(function(index, el) {
			var thisEle = $( el ).find('input:visible, textarea:visible, select:visible');
			var thisValue = $( thisEle ).val();
			if( thisEle.attr('type') == 'checkbox' && !thisEle.is(':checked') ) {
				validate = false;
				$( el ).find('label').first().css('color', 'red');
			} else if( !thisValue || thisValue == 0 ) {
				validate = false;
				$( thisEle ).css('border-color', 'red');
				$( thisEle ).closest('.select').css('border-color', 'red');
				$( el ).find('label').first().css('color', 'red');
			} else {
				$( thisEle ).css('border-color', 'inherit');
				$( thisEle ).closest('.select').css('border-color', 'inherit');
				$( el ).find('label').css('color', 'inherit');
			}
		});
		if( validate ) {
			$( element ).removeClass('shakeit')
		} else {
			$( element ).removeClass('shakeit')
			setTimeout(function() {
				$( element ).addClass('shakeit')
			}, 100);
		}
		return validate;
	}
	function loadJSON(callback) {

	  var xobj = new XMLHttpRequest();
	  xobj.overrideMimeType("application/json");
	  xobj.open('GET', ___wheel_js._plugin_url + '/assets/js/data.json', true); 
	  xobj.onreadystatechange = function() {
	    if (xobj.readyState == 4 && xobj.status == "200") {
	      //Call the anonymous function (callback) passing in the response
	      callback(xobj.responseText);
	    }
	  };
	  xobj.send(null);
	}
	function myResult(e) {
	    //console.log('Spin Count: ' + e.spinCount + ' - ' + 'Win: ' + e.win + ' - ' + 'Message: ' +  e.msg);
	    //console.log( e );
	    submit_spin_result( e );
	}

	//your own function to capture any errors
	function myError(e) {
	  //e is error object
	  //console.log('Spin Count: ' + e.spinCount + ' - ' + 'Message: ' +  e.msg);

	}

	function myGameEnd(e) {
	  //e is gameResultsArray
	  //console.log(e);
	}

	function init() {
	  loadJSON(function(response) {
	    // Parse JSON string to an object
	    var jsonData = JSON.parse(response);
	    //if you want to spin it using your own button, then create a reference and pass it in as spinTrigger
	    var mySpinBtn = document.querySelector('.___wheel-start');
	    //create a new instance of Spin2Win Wheel and pass in the vars object
	    var myWheel = new Spin2WinWheel();
	    
	    //WITH your own button
	    //myWheel.init({data:jsonData, onResult:myResult, onGameEnd:myGameEnd, onError:myError, spinTrigger:mySpinBtn});
	    
	    //WITHOUT your own button
	    myWheel.init({data:jsonData, onResult:myResult, onGameEnd:myGameEnd, onError:myError, spinTrigger:mySpinBtn});
	  });
	}
	init();
	$( document ).on('change', '.select-country', function(event) {
		event.preventDefault();
		if( $(this).val() == 'United States' ) {
			$('.states').removeAttr('name').hide();
			$('.us-states, .states-wrap').attr('name', 'state').show();
		} else if( $(this).val() == 'Canada' ) {
			$('.states').removeAttr('name').hide();
			$('.ca-states, .states-wrap').attr('name', 'state').show();
		} else {
			$('.states, .states-wrap').hide();

			//$('.other-states').show();
		}
	});	
})(jQuery);