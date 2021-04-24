const contentDiv = document.querySelector('.content')
const titleH3 = document.querySelector('.title')

async function loadContent() {
	const today = new Date()
	const timezoneOffset = new Date().getTimezoneOffset()
	const res = await fetch('https://menesianosoy.web.app/content', {
		// const res = await fetch('http://localhost:5000/content', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({date: today, timezoneOffset: timezoneOffset}),
	})

	const data = await res.json()
	contentDiv.innerHTML = data.content
	titleH3.innerText = data.title
}

loadContent()
