if (!process.env.JWT_SECRET_KEY) {
	console.error('JWT_SECRET_KEY is not set. Copy backend/.env.example to backend/.env and fill it in.');
	process.exit(1);
}

const { default: app } = await import('../src/app.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening: http://localhost:${port}`);
});
