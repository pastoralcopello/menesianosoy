const contentDiv = $('.content')
const titleH3 = $('.title')
const dateH4 = $('.date')

const apiURL = `${apiDomain()}/todayContent`

getContent()

console.log('Colaborá en github.com/pastoralcopello/menesianosoy !')

async function getContent() {
	const timezoneOffset = new Date().getTimezoneOffset()
	const res = await fetch(apiURL, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({timezoneOffset: timezoneOffset}),
	})
	const article = await res.json()

	endLoader()

	contentDiv.innerHTML = article.content
	titleH3.innerText = article.title
	dateH4.innerText = article.dateLongString
}
