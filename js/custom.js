$(document).ready(function () {
	let activeIndex = 0;
	let menuItems = [
		"home",
		"services",
		"gallery",
		"clients",
		"contact",
		"about-us",
	];

	function animateShapes() {
		$(".menu-item img.right").addClass("right-text-is-hidden");
		$(".menu-item img.left").addClass("left-text-is-hidden");
		$(".menu-item img.right").removeClass("right-text-is-hidden-removed");
		$(".menu-item img.left").removeClass("left-text-is-hidden-removed");
	}
	function unAnimateShapes() {
		$(".menu-item img.right").addClass("right-text-is-hidden-removed");
		$(".menu-item img.left").addClass("left-text-is-hidden-removed");
		$(".menu-item img.right").removeClass("right-text-is-hidden");
		$(".menu-item img.left").removeClass("left-text-is-hidden");
	}
	function animatTexts() {
		$(".menu-label.left").removeClass("hidden-left");
		$(".menu-label.right").removeClass("hidden-right");
	}
	function unAnimateTexts() {
		$(".menu-label.left").addClass("hidden-left");
		$(".menu-label.right").addClass("hidden-right");
	}
	function animateAll() {
		animateShapes();
		animatTexts();
	}
	function unAnimateAll() {
		unAnimateShapes();
		unAnimateTexts();
	}
	function animateLogo() {
		$(".conpany-image").addClass("animateLogo");
		$(".conpany-image").removeClass("unAnimateLogo");
	}
	function unAnimateLogo() {
		$(".conpany-image").removeClass("animateLogo");
		$(".conpany-image").addClass("unAnimateLogo");
	}
	$(".main-menu  , .menu-item-link").hover(
		function () {
			// over
			animateLogo();
			animateAll();
		},
		function () {
			// out
			unAnimateLogo();
			unAnimateAll();
		}
	);

	//handle menu items clicking
	$(".menu-item").click(function (e) {
		e.preventDefault();
		let target = $(this).attr("data-toggle");
		setNewActiveIndex(target);
		menuItemClicked(target, this);
	});

	function setNewActiveIndex(target) {
		activeIndex = menuItems.indexOf(target);
	}

	function menuItemClicked(target, item) {
		$(".section").hide();
		setTimeout(() => {
			showTarget(target);
		});
		unAnimateShapes();
		unAnimateTexts();

		let menuLabel = $(`.menu-item[data-toggle=${target}] menu-label`);
		$(".menu-item").removeClass("activeItemRight");
		$(".menu-item").removeClass("activeItemLeft");
		if (target == "home") {
			return;
		}
		if ($(menuLabel).hasClass("right")) {
			$(item).addClass("activeItemRight");
		} else {
			$(item).addClass("activeItemLeft");
		}
	}

	function showTarget(target) {
		$(`#${target}`).fadeIn(500);
	}
	$(".menu-item-link").click(function (e) {
		e.preventDefault();
	});
	/* trigering the slick */
	$(".gallery-carousel").owlCarousel({
		stagePadding: 50,
		loop: true,
		margin: 10,
		nav: true,
		navSpeed: 1000,
		navText: ["<", ">"],
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 1,
			},
			1000: {
				items: 1,
			},
		},
	});
	$(".submit-btn").click(function (e) {
		e.preventDefault();
		$(".error-message").hide();
		if ($("#message").val() && $("#email").val() && $("#email").val()) {
			$(".error-message").slideUp();
			$(".thanks-message").slideDown();
			$("form").css("opacity", "0");
		} else {
			$(".error-message").slideDown();
		}
	});
	/* scrolling functionality */
	$("document , body").scroll(function () {
		console.log("object");
	});

	let allowScroll = true;
	$("body").bind("mousewheel", function (e) {
		if (!allowScroll) return;
		if (e.originalEvent.wheelDelta > 10) {
			if (activeIndex <= menuItems.length - 1 && activeIndex > 0) {
				activeIndex--;
				handleScroll(activeIndex);
			}
		} else if (e.originalEvent.wheelDelta < -10) {
			if (activeIndex < menuItems.length - 1 && activeIndex >= 0) {
				activeIndex++;
				handleScroll(activeIndex);
			}
		}
		allowScroll = false;
		setTimeout(() => {
			allowScroll = true;
		}, 600);
	});
	function handleScroll(activeIndex) {
		let target = menuItems[activeIndex];
		let item = $(`.menu-item[data-toggle=${target}]`);
		menuItemClicked(target, item);
	}
	$(".discor-link").click(function (e) {
		e.preventDefault();
	});
});
