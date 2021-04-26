const articlesListContainer = $('.articles-list-container')

const apiURL = `${apiDomain()}/futureContent`

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
	const articles = await res.json()

	endLoader()

	const articlesUl = articlesList(articles)
	articlesListContainer.appendChild(articlesUl)
}

function articlesList(articles) {
	const list = document.createElement('ul')
	list.classList.add('list-group')
	list.classList.add('articles-list')
	articles.forEach((article) => {
		list.appendChild(articleLi(article))
	})
	return list
}

function articleLi(article) {
	const li = document.createElement('li')
	li.classList.add('list-group-item')
	const a = document.createElement('a')
	a.href = `https://menesianosoy.web.app/fecha/?date=${article.date}`
	a.target = '_blank'
	a.innerText = article.dateLongString
	li.appendChild(a)
	return li
}
