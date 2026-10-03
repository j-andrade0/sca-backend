window.onload = function () {
	const authButton = document.createElement('button');
	authButton.innerHTML = 'Authorize';
	authButton.onclick = function () {
		const token = prompt('Enter your JWT (the jwtToken returned by the login endpoints):');

		if (token) {
			window.ui.preauthorizeApiKey('apiKey', token);
		}
	};

	const header = document.querySelector('.header');
	if (header) {
		header.appendChild(authButton);
	}
};
