const contentDiv = document.querySelector('.content')
const titleH3 = document.querySelector('.title')
const dateH4 = document.querySelector('.date')

async function loadContent() {
	const timezoneOffset = new Date().getTimezoneOffset()
	const res = await fetch('https://menesianosoy.web.app/todayContent', {
	// const res = await fetch('http://localhost:5000/todayContent', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({timezoneOffset: timezoneOffset}),
	})

	const article = await res.json()
	contentDiv.innerHTML = article.content
	titleH3.innerText = article.title
	dateH4.innerText = article.dateLongString
}

loadContent()

console.log('Colaborá en github.com/pastoralcopello/menesianosoy !')
