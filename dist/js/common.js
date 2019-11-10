

$("div.hk-menu-toggle-button").click(function () {
	var menu = $("div.hk-mobile-menu");
	menu.addClass("active");
});

$("div.hk-menu-close-button").click(function () {
	$("div.hk-mobile-menu").removeClass("active");
});


// faqs answer toggle
$("div.hk-faq-question").click(function () {
	$(this).next().slideToggle();
});

// scroll to top
$("div.hk-footer-scroll-to-top > div.hk-black-text").click(function () {
	$("html, body").animate({ scrollTop: 0 }, "slow");
});

