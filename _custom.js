$(document).ready(function(){
	function restartAnimation(){
		var cards_box = $('.cards_box').html();	
		if(cards_box){
			switch(i) {
			    case 2:
			        cards_box = cards_box.replace(/card_lane1/g,'card_lane' + i);
			        break;
			    case 3:
			        cards_box = cards_box.replace(/card_lane2/g,'card_lane' + i);
			        break;
			    case 4:
			        cards_box = cards_box.replace(/card_lane3/g,'card_lane' + i);
			        break;
			    default:
			        i = 1;
			        cards_box = cards_box.replace(/card_lane4/g,'card_lane' + i);
			}
			i++;
			$('.cards_box').removeClass('started');
			$('.cards_box').html(cards_box);		
			clearTimeout(t);
			$('.cards_box .card_position1 .card_before img').load(function(){	
				$('.cards_box').addClass('started');		
				t = setTimeout(restartAnimation, 13000);
			});		
		}	
	}	
	var i = 2;
	var t = false;
	//$('.cards_box .card_position1 .card_before img').load(function(){
	$(window).on('load', function(){
		$('.cards_box').addClass('started');
		t = setTimeout(restartAnimation, 13000);
	});
	
	//popup order now
	if($('#accept-order').length){
		if($('#accept-order').is(':checked')){
			$('#payment').removeClass('disabled');
		}else{
			$('#payment').addClass('disabled');
		}
	}
	$('#accept-order').change(function(){
		if($(this).is(':checked')){
			$('.payment-dis').removeClass('disabled');
		}else{
			$('.payment-dis').addClass('disabled');
		}
	});

	$('.content-popup-order #order-qty').change(function(){
		var data_price = $(this).find(':selected').data('price');
		if(data_price == 'contact-us'){
			var first_data_price = $(this).find('option:first').data('price');
			$(this).parents('.content-popup-order').find('#order-price').text(first_data_price);
			$(this).find('option:first').prop('selected', true);
			$(this).parents('.modal-dialog').find('.close').trigger('click');
			$(this).next().trigger('click');
		}else{
			$(this).parents('.content-popup-order').find('#order-price').text(data_price);
		}
	});
	//submit payment order
	$('#payment').click(function(e){
	      var token = function(res){
	        var $id = $('<input type=hidden name=stripeToken />').val(res.id);
	        var $email = $('<input type=hidden name=stripeEmail />').val(res.email);
	        $('form').append($id).append($email).submit();
	      };

	      var amount = $(this).parents('#order-now').find('#order-price').text();
	      amount = amount * 100;
	      StripeCheckout.open({
	        key:         'pk_test_cRj8waq7Xh1RUfQj27khOtsN',
	        amount:      amount,
	        name:        'UX Cards',
	        image:       'images/Stripe-h-icon.png',
	        description: 'Payment',
	        panelLabel:  'Pay',
	        currency: 	 'usd',
	        token:       token
	      });
	      return false;
	});
	$(window).on("load", function() {
		if($('.collapse-menu-scroll').length){
			
			var $sections = $('.collapse-content .scrolltrack');  // all content sections
		    var $navs = $('.collapse-menu a').not('.toggle-submenu');  // all nav sections

		    var topsArray = $sections.map(function() {
		        return $(this).position().top + $('.header').height();  // make array of the tops of content
		    }).get(); 

		    var bottomsArray = $sections.map(function() {
		        return $(this).position().top + $('.header').height() + $(this).height() + 200;  // make array of the tops of content
		    }).get();                                 //   sections, with some padding to
		                                              //   change the class a little sooner
		    var len = topsArray.length;  // quantity of total sections
		    var currentIndex = 0;        // current section selected	    
		    var getCurrent = function( top ) {   // take the current top position, and see which
		    	var new_top = top + $( window ).height();		    	
		        for( var i = 0; i < len; i++ ) {  // index should be displayed		            
		            if( new_top > topsArray[i] && new_top < bottomsArray[i] ) {
		                return i;
		            }		            
		        }
		        if(i >= len){
	            	return i - 1;
	            }
		    };

			$(window).scroll(function(e) {
		        var scrollTop = $(this).scrollTop();
		        var checkIndex = getCurrent( scrollTop );             
		        if( checkIndex !== currentIndex ) {
		            currentIndex = checkIndex;
		            $navs.removeClass("active");
		            $navs.eq( currentIndex ).addClass("active");
		        }
		        if(checkIndex < 3){
		        	$('.sub-active2').removeClass('active');
		        	$('.sub-active1').addClass('active');
		        }
		        else if(checkIndex >= 3){
		        	$('.sub-active1').removeClass('active');
		        	$('.sub-active2').addClass('active');
		        }
		    });

			$(window).scroll(function(){
				var scrollTop     = $(window).scrollTop(),
			    	topMenuOffset = $('.collapse-menu-scroll').offset().top,
			    	topMenuUlOffset = $('.collapse-menu').offset().top,
			    	bottomMenuOffset = $('.check-bottom-menu-stick').offset().top,
			    	space_conten_top = $('.collapse-content').offset().top,
			    	bottomCollapseOffset = $('.bottom-collapse').offset().top,
			    	space_to_top  = (topMenuOffset - scrollTop),
			    	space_bottom_to_top  = (bottomMenuOffset - scrollTop),
			    	space_bottom_collapse_to_top  = (bottomCollapseOffset - scrollTop), 
			    	space_menu_to_top  = (bottomCollapseOffset - bottomMenuOffset);  
				if((space_to_top <= 0)){
					$('.wrap-collapse-menu').addClass('stick_top');
					
				}else{
					$('.wrap-collapse-menu').removeClass('stick_top');
				}
				if((space_menu_to_top <= 0)){
					$('.wrap-collapse-menu').addClass('menu-stop');
				}
				if((scrollTop <= 10904)){
					$('.wrap-collapse-menu').removeClass('menu-stop');
				}

			});		

		  	$('.collapse-menu-scroll .collapse-menu a[href*="#"]').click(function(e) {
		  		e.preventDefault();
		  		if($(this).hasClass('toggle-submenu')){
		  			$(this).toggleClass('active');
		  		}else{
		  			$(this).parents('.collapse-menu').find('a:not(".toggle-submenu")').removeClass('active');
		  			$(this).addClass('active');
		  			if($(this).attr('href') !== '#'){
					    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					      	var target = $(this.hash);
					      	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
					      	if (target.length) {				      		
					        	$('html, body').animate({
					          		scrollTop: target.offset().top
				        		}, 500);
					        	return false;
					      	}
					    }
					}
		  		}	  		
		  	});
		}
	});

	//check validate form
	$('form.form-submit').change(function(e){
		var validate = true;
		$(this).find('.required').each(function(){
			if($(this).val() == ''){
				validate = false;
			}
		});
		if(validate == true){
			$(this).find('button[type="submit"]').removeClass('disabled');
		}else{
			$(this).find('button[type="submit"]').addClass('disabled');
		}
		
	});

	$('form.form-submit').submit(function(){
		$(this).find('button[type="submit"]').addClass('success');
	});
    $('#mc-embedded-subscribe-form').submit(function(e) {
	    var email = $(this).children('mce-EMAIL').val();
	    var formURL = $(this).attr('action');
	    var form = $(this);
	    console.log(formURL);
	    $.ajax(
	    {
	        type: form.attr('method'),
	        url: formURL,
	        data: form.serialize(),
	        cache       : false,
	        dataType    : 'json',
	      	success: function(response) {	      		
	        	//form.find('#thanks').html(response.msg);
	        	form.find('#thanks').html('Almost done! We just need to confirm your email address. Please check the confirmation email we sent.');
	        	var postData = form.serialize();
		    	$.ajax({
				  	type: "POST",
				  	url: "https://uxdcards.com/inc/submit-forms.php",
				  	data: postData,
				  	dataType: "json",
				  	success: function(data) {
				      	console.log(data.status);
				      	if(data.status == 'success'){
							//$(this_form).parents('.modal').find('button.close').trigger('click');
							form.find('button[type="submit"]').addClass('success');
				      	}else{
				      		form.find('button[type="submit"]').addClass('error');
				      	}
			      		setTimeout(function(){ 
			      			form.parents('.modal').find('button.close').trigger('click');
						}, 5000);
				 	},
				    error: function (xhr, ajaxOptions, thrownError) {
				        console.log(xhr.status);
				        console.log(thrownError);
			      	}
				});
	      	}
	    });

	    e.preventDefault();
  	});

    //submit forms
    $('form.form-submit').submit(function(e){
    	e.preventDefault();
    	var this_form = $(this); 
    	var postData = $(this).serialize();
    	$.ajax({
		  	type: "POST",
		  	url: "https://uxdcards.com/inc/submit-forms.php",
		  	data: postData,
		  	dataType: "json",
		  	success: function(data) {
		      	console.log(data.status);
		      	if(data.status == 'success'){
					$(this_form).parents('.modal').find('button.close').trigger('click');
		      	}
		 	},
		    error: function (xhr, ajaxOptions, thrownError) {
		        console.log(xhr.status);
		        console.log(thrownError);
	      	}
		});
    	console.log(postData);
    });
    $('#content-select a').click(function(e){
    	e.preventDefault();
    	var value = $(this).attr('data-value');
    	$(this).parents('li').addClass('checked').siblings().removeClass('checked');
    	$('#label-select').html(value);
    	$('#category-suggest').val(value);
    })
    $('#content-select1 a').click(function(e){
    	e.preventDefault();
    	var value = $(this).attr('data-value');
    	$(this).parents('li').addClass('checked').siblings().removeClass('checked');
    	$('#label-select1').html(value);
    	$('#category-notify').val(value);
    })
    $(document).ready(function(){
        $('.testimonial .comment').matchHeight();
        $.stellar();

        function setup_slider_testimonial(){
            /*var viewportWidth = $(window).width();
            if( viewportWidth <= 480 ){
                var Rows = 2;
            } else{
                var Rows = 1;
            }*/

            $('.testimonial-slider').slick({
                dots: false,
                arrows:false,
                infinite: false,
                speed: 300,                    
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,                       
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }

        setup_slider_testimonial();
    });
    new WOW().init();
    /* slider index
    $('.thumbnailSlider').matchHeight();
    function setup_slider_cards_action(){
        $('.sliderCardAction').slick({
          dots: false,
          arrows:true,
          infinite: true,                   
          slidesToShow: 3,
          slidesToScroll: 3,
          responsive: [
                    {
                        breakpoint: 750,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
        });
    }
    setup_slider_cards_action();
    */
    /*slide in uses page*/
    /*
    if($('.block-collapse') && $('.uses-slider')){
	    $('.block-collapse').matchHeight();
	    function setup_slider_uses(){
	        $('.uses-slider').slick({
	          dots: true,
	          arrows:true,
	          infinite: true,                   
	          slidesToShow: 2,
	          slidesToScroll: 2,
	          responsive: [
	                    {
	                        breakpoint: 480,
	                        settings: {
	                            slidesToShow: 1,
	                            slidesToScroll: 1
	                        }
	                    }
	                ]
	        });
	    }
	    setup_slider_uses();
	}
	*/

});
$(document).ready(function(){
    $('.testimonial .comment').matchHeight();
    setTimeout("flip('.card1');","1500");
    setTimeout("flip('.card2');","2000");
    setTimeout("flip('.card3');","2500");
});

function flip(a){
    $(a).addClass('flipped');
    $(a).removeClass('animated');
    $(a).children('.front').fadeOut("fast");
}
