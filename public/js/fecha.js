const contentDiv = $('.content')
const titleH3 = $('.title')
const dateH4 = $('.date')

const date = paramDate()
const apiURL = `${apiDomain()}/someDateContent`

getContent()

console.log('ColaborĂ¡ en github.com/pastoralcopello/menesianosoy !')

async function getContent() {
	const res = await fetch(apiURL, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({date: date}),
	})

	const article = await res.json()

	endLoader()

	contentDiv.innerHTML = article.content
	titleH3.innerText = article.title
	dateH4.innerText = article.dateLongString
}

function paramDate() {
	const querystring = window.location.search
	const params = new URLSearchParams(querystring)
	const date = params.get('date')
	return date
}
