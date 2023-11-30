window.onload = function () {
	const authButton = document.createElement('button');
	authButton.innerHTML = 'Authorize';
	authButton.onclick = function () {
		const token = prompt('Enter your API key:');
		const accessLevel = prompt('Enter your access level:');

		if (token && accessLevel) {
			const authHeader = token;
			const accessLevelHeader = accessLevel;

			window.ui.preauthorizeApiKey('authentication', authHeader);
			window.ui.preauthorizeApiKey('access-level', accessLevelHeader);
		}
	};

	const header = document.querySelector('.header');
	if (header) {
		header.appendChild(authButton);
	}
};
