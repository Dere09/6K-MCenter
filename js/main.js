(function ($) {
    "use strict";

    function initMenu() {
        // Initiate superfish on nav menu
        $('.nav-menu').superfish({
            animation: { opacity: 'show' },
            speed: 400
        });

        // Set active menu item based on current URL
        var currentUrl = window.location.pathname.split("/").pop();
        if (currentUrl === '') currentUrl = 'index.html';
        $('.nav-menu li').removeClass('menu-active');
        $('.nav-menu a[href="' + currentUrl + '"]').parent().addClass('menu-active');

        // Mobile Navigation
        if ($('#nav-menu-container').length) {
            var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav' });
            $mobile_nav.find('> ul').attr({ 'class': '', 'id': '' });
            $('body').append($mobile_nav);
            if (!$('#mobile-nav-toggle').length) {
                $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
            }
            if (!$('#mobile-body-overly').length) {
                $('body').append('<div id="mobile-body-overly"></div>');
            }
            $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

            $(document).off('click', '.menu-has-children i').on('click', '.menu-has-children i', function (e) {
                $(this).next().toggleClass('menu-item-active');
                $(this).nextAll('ul').eq(0).slideToggle();
                $(this).toggleClass("fa-chevron-up fa-chevron-down");
            });

            $(document).off('click', '#mobile-nav-toggle').on('click', '#mobile-nav-toggle', function (e) {
                $('body').toggleClass('mobile-nav-active');
                $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                $('#mobile-body-overly').toggle();
            });

            $(document).off('click.mobileNav').on('click.mobileNav', function (e) {
                var container = $("#mobile-nav, #mobile-nav-toggle");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    if ($('body').hasClass('mobile-nav-active')) {
                        $('body').removeClass('mobile-nav-active');
                        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                        $('#mobile-body-overly').fadeOut();
                    }
                }
            });
        } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
            $("#mobile-nav, #mobile-nav-toggle").hide();
        }
    }

    var currentPage = window.location.pathname.split("/").pop();
    if (currentPage !== "" && currentPage !== "index.html") {
        $('#header').load('index.html #header > *', function() {
            initMenu();
        });
    } else {
        initMenu();
    }

    // Stick the header at top on scroll
    $("#header").sticky({ topSpacing: 0, zIndex: '50' });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Header scroll class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

    // About section image carousel
    $(".about-carousel").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        items: 1
    });

    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });
    
    // Read More logic for service cards
    $('.single-service p').each(function() {
        var text = $(this).text();
        if(text.length > 90) {
            var shortText = text.substring(0, 90) + '...';
            $(this).data('fulltext', text);
            $(this).html(shortText + '<br><a href="javascript:void(0);" class="read-more" style="color:#0D47A1;font-size:13px;font-weight:600;text-decoration:none;margin-top:5px;display:inline-block;">Read More</a>');
        }
    });
    $(document).on('click', '.read-more', function(e) {
        e.preventDefault();
        var p = $(this).parent();
        p.html(p.data('fulltext') + '<br><a href="javascript:void(0);" class="read-less" style="color:#0D47A1;font-size:13px;font-weight:600;text-decoration:none;margin-top:5px;display:inline-block;">Read Less</a>');
    });
    $(document).on('click', '.read-less', function(e) {
        e.preventDefault();
        var p = $(this).parent();
        var text = p.data('fulltext');
        var shortText = text.substring(0, 90) + '...';
        p.html(shortText + '<br><a href="javascript:void(0);" class="read-more" style="color:#0D47A1;font-size:13px;font-weight:600;text-decoration:none;margin-top:5px;display:inline-block;">Read More</a>');
    });

})(jQuery);
