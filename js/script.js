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











document.querySelectorAll('.gallery').forEach(gallery => {

	let images = gallery.querySelectorAll('img');
	let index = 0;

	const showImage = (i) => {
		images.forEach(img => img.classList.remove('active'));
		images[i].classList.add('active');
	};

	// افتراض أول صورة ظاهرة
	showImage(index);

	const nextBtn = gallery.querySelector('.next');
	const prevBtn = gallery.querySelector('.prev');

	if(nextBtn){
		nextBtn.addEventListener('click', () => {
			index = (index + 1) % images.length;
			showImage(index);
		});
	}

	if(prevBtn){
		prevBtn.addEventListener('click', () => {
			index = (index - 1 + images.length) % images.length;
			showImage(index);
		});
	}

});
