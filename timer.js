const styleText = `
	:host {
		text-align: center;
	}
`;

class SaturdayTimer extends HTMLElement {
	timerElement;
	headerElement;
	time;

	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		const styleElement = document.createElement('style');

		styleElement.textContent = styleText;
		shadowRoot.appendChild(styleElement);

		const headerElement = document.createElement('h4');
		const timerElement = document.createElement('h1');

		shadowRoot.appendChild(headerElement);
		shadowRoot.appendChild(timerElement);

		this.headerElement = headerElement;
		this.timerElement = timerElement;

		this.headerElement.innerText = 'Nope. Time left:';

		this.itsRainingBurgers = false;

		this.initBurgers();

		this.update();

		setInterval(this.update.bind(this), 1000);
	}

	pad(number) {
		return ('0' + number).slice(-2);
	}

	initBurgers() {
		const burger = document.querySelector('#burger');

		for (let i = 0; i < 10; i++) {
			const clone = burger.cloneNode(true);
			clone.id = `burger-${i}`;
			clone.style.position = 'fixed';
			clone.style.top = '0';
			clone.style.left = (window.innerWidth / 10) * i;
			clone.style.width = `${10 + Math.random() * 10}%`;
			clone.style.height = 'auto';
			clone.style.animationName = 'fall';
			clone.style.animationDuration = `${Math.random() * 10}s`;
			clone.style.animationIterationCount = 'infinite';
			clone.style.animationTimingFunction = 'linear';

			document.body.appendChild(clone);
		}
	}

	update() {
		const now = new Date();

		if (now.getDay() === 6) {
			this.timerElement.innerText = 'YES!';
			this.headerElement.style.display = 'none';

			document.body.classList.add('yes');

			return;
		}

		document.body.classList.remove('yes');
		this.headerElement.style.display = 'initial';

		const timeLeft = ((6 - now.getDay()) * 86400) - ((now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds());
		const d = Math.floor(timeLeft / (3600*24));
		const h = Math.floor(timeLeft % (3600*24) / 3600);
		const m = Math.floor(timeLeft % 3600 / 60);
		const s = Math.floor(timeLeft % 60);

		this.timerElement.innerText = `${this.pad(d)}:${this.pad(h)}:${this.pad(m)}:${this.pad(s)}`;
	}
}

customElements.define('saturday-timer', SaturdayTimer);

export default SaturdayTimer;
