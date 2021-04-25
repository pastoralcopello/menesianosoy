const contentDiv = document.querySelector('.content')
const titleH3 = document.querySelector('.title')
const dateH4 = document.querySelector('.date')

const querystring = window.location.search
const params = new URLSearchParams(querystring)
const date = params.get('date')

async function loadContent() {
	const timezoneOffset = new Date().getTimezoneOffset()
	const res = await fetch('https://menesianosoy.web.app/someDateContent', {
	// const res = await fetch('http://localhost:5000/someDateContent', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({date: date}),
	})

	const article = await res.json()
	contentDiv.innerHTML = article.content
	titleH3.innerText = article.title
	dateH4.innerText = article.dateLongString
}

loadContent()

console.log('Colaborá en github.com/pastoralcopello/menesianosoy !')
