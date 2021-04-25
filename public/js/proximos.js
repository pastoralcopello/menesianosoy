const articlesListContainer = document.querySelector('.articles-list-container')

async function loadContent() {
	const timezoneOffset = new Date().getTimezoneOffset()
	const res = await fetch('https://menesianosoy.web.app/futureContent', {
	// const res = await fetch('http://localhost:5000/futureContent', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({timezoneOffset: timezoneOffset}),
	})

	const articles = await res.json()
    const articlesUl = articlesList(articles)
    articlesListContainer.appendChild(articlesUl)

}

loadContent()

function articlesList(articles) {
    const list = document.createElement('ul')
    list.classList.add('articles-list')
    articles.forEach(article => {
        list.appendChild(articleLi(article))
    })
    return list
}

function articleLi(article) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `https://menesianosoy.web.app/fecha/?date=${article.date}`
    a.target='_blank'
    a.innerText = article.dateLongString
    li.appendChild(a)
    return li
}