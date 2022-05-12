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

		this.update();

		setInterval(this.update.bind(this), 1000);
	}

	pad(number) {
		return ('0' + number).slice(-2);
	}

	update() {
		const now = new Date();

		if (now.getDay() === 6) {
			this.timerElement.innerText = 'YES!';
			this.headerElement.style.display = 'none';
			document.querySelector('svg').style.display = 'block';

			return;
		}

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
