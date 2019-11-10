

// var throttled = _.throttle(hk_scroll_event, 2000, {
// 	leading: true,
// 	trailing: false
// });

//$(window).scroll(hk_scroll_event);

var HK_SLIDE_INDEX = {
	"banner": 0,
	"services": 1,
	"hackathons": 2,
	"team": 3,
	"footer": 4
};

var HK_ELEMENTS = [
	$("div.hk-banner"),
	$("div.hk-services"),
	$("div.hk-hackathons"),
	$("div.hk-team"),
	$("div.hk-footer")
];

var hk_did_scroll = false;
var hk_last_scroll_top = 0;
var hk_current_slide_index = 0;

$(window).on('mousewheel', function(event) {
	if (hk_did_scroll) {
		//
	} else {
		hk_did_scroll = true;
		hk_scroll_event(event);
		setTimeout(function () {
			hk_did_scroll = false;
		}, 3000);
	}
	//console.log(event.deltaX, event.deltaY, event.deltaFactor);
});

function hk_scroll_event (event) {
	//console.log(event.deltaX, event.deltaY, event.deltaFactor);
	var hk_scroll_up = (event.deltaY > 0);
	var hk_scroll_down = !hk_scroll_up;

	// do things
	if (hk_scroll_up) {
		//console.log("Scroll up");
		$("div.hk-scroller").addClass("hk-wait-a-sec");
		if (hk_current_slide_index > 0) {
			HK_ELEMENTS[hk_current_slide_index].addClass("hidden-down");
			HK_ELEMENTS[hk_current_slide_index-1].removeClass("hidden-up");
			hk_current_slide_index -= 1;
		}
	} else {
		//console.log("Scroll down");
		$("div.hk-scroller").removeClass("hk-wait-a-sec");
		if (hk_current_slide_index < 4) {
			HK_ELEMENTS[hk_current_slide_index].addClass("hidden-up");
			HK_ELEMENTS[hk_current_slide_index+1].removeClass("hidden-down");
			hk_current_slide_index += 1;
		}
	}

	if (hk_current_slide_index % 2 == 0) {
		$("div.hk-scroller").removeClass("hk-dark-on-light");
	} else {
		$("div.hk-scroller").addClass("hk-dark-on-light");
	}
	$("div.hk-scroller > div.hk-inner > div.hk-dots > div.hk-circle").css({
		"top": (hk_current_slide_index * 40) + "px"
	});

	//console.log("Done");
}

HK_ELEMENTS[0].removeClass("hidden-down");




var hackathons_current_slide_index = 0;
var hackathons_progress_bar_progress = 0;
var hackathons_progress_bar_update_duration = 50;
var hackathons_slide_duration = 10000;

function hackathon_slideshow (next) {
	// true = next
	// false = prev
	var slideshow = $("div.hk-hackathons div.hk-slideshow");
	var slideshow_inner = $("div.hk-hackathons div.hk-slideshow div.hk-inner");
	var slideshow_length = slideshow_inner.children().length;
	var slideshow_width = slideshow.width();

	if (next) {
		hackathons_current_slide_index += 1;
		//console.log("Next");
	} else {
		hackathons_current_slide_index -= 1;
		//console.log("Previous");
	}

	var new_position = hackathons_current_slide_index * slideshow_width;
	slideshow_inner.css({
		right: new_position
	});

	var prev_button = $("div.hk-hackathons div.hk-slideshow-controls div.hk-button.hk-prev-button");
	var next_button = $("div.hk-hackathons div.hk-slideshow-controls div.hk-button.hk-next-button");

	prev_button.removeClass("hk-disabled");
	next_button.removeClass("hk-disabled");
	if (hackathons_current_slide_index == 0) {
		prev_button.addClass("hk-disabled");
	}

	if (hackathons_current_slide_index == (slideshow_length - 1)) {
		next_button.addClass("hk-disabled");
	}

	hackathons_progress_bar_progress = (hackathons_current_slide_index + 1) * 100 / slideshow_length;
	$("div.hk-slideshow-progress-bar").css({
		width: hackathons_progress_bar_progress + "%"
	});
}

$("div.hk-hackathons div.hk-slideshow-controls div.hk-button.hk-prev-button").click(function () {
	if ($(this).hasClass("hk-disabled")) {
		//
	} else {
		hackathon_slideshow(false);
	}
});

$("div.hk-hackathons div.hk-slideshow-controls div.hk-button.hk-next-button").click(function () {
	if ($(this).hasClass("hk-disabled")) {
		//
	} else {
		hackathon_slideshow(true);
	}
});

// setInterval(function () {
// 	if (hackathons_progress_bar_progress < 100) {
// 		var increment = (100 * hackathons_progress_bar_update_duration)/hackathons_slide_duration;
// 		hackathons_progress_bar_progress += increment;
// 	} else {
// 		hackathons_progress_bar_progress = 0;
// 	}

	// $("div.hk-slideshow-progress-bar").css({
	// 	width: hackathons_progress_bar_progress + "%"
	// });
// 	console.log(hackathons_progress_bar_progress);
// }, hackathons_progress_bar_update_duration);



// start team.js

function team_slideshow (slide_index) {
	var slideshow = $("div.hk-team-slideshow");
	var slideshow_inner = $("div.hk-team-slideshow > div.hk-inner");

	var width = slideshow.width();
	var new_position = slide_index * width;

	slideshow_inner.css({
		right: new_position
	});

	$("div.hk-team-slideshow-button-container").each(function (index) {
		if (index == slide_index) {
			$(this).children(0).addClass("hk-active");
		} else {
			$(this).children(0).removeClass("hk-active");
		}
	});
}

$("div.hk-team-slideshow-button-container").click(function (event) {
	var slide_index = $(this).index();
	team_slideshow(slide_index);
});

// Initialize to slide zero
team_slideshow(0);

// end team.js
