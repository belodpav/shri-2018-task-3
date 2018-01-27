/**
 * This function activates shortcut titles of rooms and floors
 * for horizontal scrolling on mobile devices
 */
const shortCutFollowActivate = function() {
	var app = document.querySelector('.home');
	var appAside = document.querySelector('.home__aside');
	var items = document.querySelectorAll('.shortcut-item');
	var asideWidth = appAside.offsetWidth;
	var delta = (asideWidth === 181) ? 41 : 0;
	function prepearItems() {
		[].forEach.call(items, function(item) {
				item.style.opacity = '0';
		});
	}
	function moveItems() {
		if (app.scrollLeft >= asideWidth) {
			[].forEach.call(items, function(item) {
				item.style.left = app.scrollLeft - asideWidth - delta + 'px';
				item.style.opacity = '1';
			});
		} else {
			[].forEach.call(items, function(item) {
				item.style.left = '0';
				item.style.opacity = '0';
			});
		}
	}
	var isScrolling;
	app.addEventListener('scroll', function() {
		prepearItems();
		clearTimeout(isScrolling);
		isScrolling = setTimeout(function() {
			moveItems();
		}, 66); 
	});
};

export default shortCutFollowActivate;