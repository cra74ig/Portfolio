    (function ($) {
    "use strict"; // Start of use strict
    
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });
})(jQuery); // End of use strict

$(document).ready(function(){
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		// scroll body to 0px on click
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
});
function sendMail(){
    $Name = $("#name").val();
    $Subject = $("#subject").val();
    $email = $("#email").val();
    $message = $("#message").val();
    
    $.ajax({
        url: "PHP/mail.php",
        type: 'POST',
        dataType: 'json',
        data: {
            Email: $email,
            Subject: $Subject,
            Message: $message,
            Name: $Name
        },
        success: function(result) {
            console.log(result.status.description);
            if (result.status.name == "ok") {
                $("#messageStatusSuccess").modal('toggle');             
            }
            if (result.status.name == "Fail") {
                $("#failedMessageReasons").empty();
                $('#failedMessageReasons').append($("<p>" + result.status.description + "</p>"));
                $("#messageStatusFailed").modal('toggle');        
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};