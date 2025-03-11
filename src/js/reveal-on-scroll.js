// 
//Reveal on scroll
// 

// 1. Add reveal.scss to the project
// 2. Write css animations in that file
// 3. Add reveal class to the element you want to animate
// 4. Add data-delay to the element if you want to delay the animation
// 5. Add data-root-margin to the element if you want to change the root margin
// 6. Add anim-trigger class to the parent elemrnt of els that will stagger 
// 7. and reveal-child class to animated element inside the parent
// 9. If you create a new animation class, remember to add it to revealElements below and/or children


const observers = new Map();

const createObserver = (element, rootMargin) => {
	let observer;

	observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {

				let delay = 0;

				delay = parseInt(entry.target.getAttribute('data-delay')) || 0;

				// check if desktop using matchmedia 
				if (window.matchMedia('(min-width: 1180px)').matches) {
					delay = parseInt(entry.target.getAttribute('data-delay-dt')) || parseInt(entry.target.getAttribute('data-delay')) || 0;
				}

				setTimeout(() => {
					entry.target.classList.add('visible');

					const children = entry.target.querySelectorAll('.reveal-child, .grow-child');

					if (children.length != 0) {
						children.forEach((child) => {
							child.classList.add('visible-child');
						});
					}

					observer.unobserve(entry.target);
				}, delay);
			}
		});
	}, {
		rootMargin: `0px 0px -${rootMargin} 0px`, // Use the rootMargin from the 'data-root-margin' attribute
	});

	observers.set(element, observer);

	return observer;
};

const observeElements = () => {
	let revealElements = document.querySelectorAll('.reveal, .fade-up, .anim-trigger, .reveal-grow, .grow, .grow-trigger, .blob-left, .blob-right');
	revealElements.forEach((element) => {

		const rootMarginDivider = element.getAttribute('data-root-margin') || 5;

		let rootMargin = `0px`;

		if (rootMarginDivider != 0) {
			rootMargin = `${window.innerHeight / rootMarginDivider}px`;
		}

		const observer = createObserver(element, rootMargin);
		observer.observe(element);
	});
};

observeElements();

window.resetObservers = () => {
	for (const observer of observers.values()) {
		observer.disconnect();
	}

	observers.clear();

	observeElements();
}

window.addEventListener('resize', () => {
	window.resetObservers();
});


