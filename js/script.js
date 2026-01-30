const header = document.querySelector("header");

window.addEventListener("scroll", () => {
	header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('active');
};

window.addEventListener("scroll", () => {
	menu.classList.remove('bx-x');
	navbar.classList.remove('active');
});

// =======================
// Reveal on Scroll (Stable)
// =======================

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
			observer.unobserve(entry.target); // 👈 يظهر مرة واحدة فقط
		}
	});
}, {
	threshold: 0.2
});

document.querySelectorAll(
	'.home-text, .about, .services, .portfolio, .contact'
).forEach(el => observer.observe(el));





// script.js — FINAL unified version
document.addEventListener('DOMContentLoaded', () => {

	/* ===== header sticky + menu toggle ===== */
	const header = document.querySelector("header");
	window.addEventListener("scroll", () => {
		header && header.classList.toggle("sticky", window.scrollY > 0);
	});

	const menu = document.querySelector('#menu-icon');
	const navbar = document.querySelector('.navbar');
	if (menu) {
		menu.addEventListener('click', () => {
			menu.classList.toggle('bx-x');
			navbar && navbar.classList.toggle('active');
		});
	}

	window.addEventListener("scroll", () => {
		if (menu) menu.classList.remove('bx-x');
		navbar && navbar.classList.remove('active');
	});

	/* ===== IntersectionObserver (reveal once) ===== */
	try {
		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
					obs.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });

		document.querySelectorAll('.home-text, .about, .services, .portfolio, .contact')
			.forEach(el => observer.observe(el));
	} catch (e) {
		// ignore if not supported
	}

	/* ===== Gallery normalizer + slider initializer ===== */

	// helper: create button
	function makeBtn(cls, html) {
		const b = document.createElement('button');
		b.type = 'button';
		b.className = cls + ' gallery-btn';
		b.innerHTML = html;
		return b;
	}

	// initialize all rows: if images are direct children, wrap them into .gallery
	document.querySelectorAll('.portfolio-content .row').forEach(row => {

		// if row already has .gallery, use it
		let gallery = row.querySelector('.gallery');

		// if no gallery but there are one or more img children -> wrap them
		const directImgs = Array.from(row.children).filter(c => c.tagName === 'IMG');
		if (!gallery && directImgs.length > 0) {
			// create gallery element and move imgs into it (preserve order)
			gallery = document.createElement('div');
			gallery.className = 'gallery';
			// insert gallery before the first img
			row.insertBefore(gallery, directImgs[0]);
			directImgs.forEach(imgEl => gallery.appendChild(imgEl));
		}

		// now if still no gallery, skip
		if (!gallery) return;

		// ensure images inside gallery have no inline styles breaking layout
		const imgs = Array.from(gallery.querySelectorAll('img'));
		if (imgs.length === 0) return;

		// add 'active' to first image if none
		if (!gallery.querySelector('img.active')) imgs[0].classList.add('active');

		// if only one image, mark gallery.single to hide buttons
		if (imgs.length === 1) {
			gallery.classList.add('single');
			// remove any existing buttons
			gallery.querySelectorAll('.gallery-btn').forEach(b => b.remove());
			return;
		} else {
			gallery.classList.remove('single');
		}

		// remove any pre-existing buttons to avoid duplicates
		gallery.querySelectorAll('.gallery-btn').forEach(b => b.remove());

		// create prev/next buttons
		const prev = makeBtn('gallery-prev', '&#10094;');
		const next = makeBtn('gallery-next', '&#10095;');

		// append buttons
		gallery.appendChild(prev);
		gallery.appendChild(next);

		// state
		let index = imgs.findIndex(i => i.classList.contains('active'));
		if (index < 0) index = 0;

		// show function
		const show = i => {
			if (i < 0) i = imgs.length - 1;
			if (i >= imgs.length) i = 0;
			index = i;
			imgs.forEach((im, idx) => {
				im.classList.toggle('active', idx === index);
			});
		};

		// attach handlers
		prev.addEventListener('click', e => {
			e.stopPropagation();
			show(index - 1);
		});
		next.addEventListener('click', e => {
			e.stopPropagation();
			show(index + 1);
		});

		// keyboard support when focused
		[prev, next].forEach(btn => {
			btn.addEventListener('keydown', ev => {
				if (ev.key === 'Enter' || ev.key === ' ') ev.preventDefault();
			});
		});

		// swipe support for touch devices (simple)
		let startX = 0, dist = 0;
		gallery.addEventListener('touchstart', (ev) => {
			startX = ev.touches[0].clientX;
		}, { passive: true });
		gallery.addEventListener('touchmove', (ev) => {
			dist = ev.touches[0].clientX - startX;
		}, { passive: true });
		gallery.addEventListener('touchend', () => {
			if (dist > 40) show(index - 1);
			if (dist < -40) show(index + 1);
			startX = 0; dist = 0;
		});
	});

}); // DOMContentLoaded end
