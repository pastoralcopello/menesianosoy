const contentDiv = document.querySelector('.content')
const titleH3 = document.querySelector('.title')

function today() {
	const today = new Date()
	return today.toISOString().split('T')[0]
}

function yesterday() {
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	return yesterday.toISOString().split('T')[0]
}

function apiURL() {
	return `http://institutosanpablo.com.ar/aplicacion/wp-json/wp/v2/posts?categories=1&orderby=date&order=desc&after=${yesterday()}T23:59:59&before=${today()}T23:59:59`
}

console.log(apiURL())

fetch(apiURL())
	.then((response) => response.json())
	.then((data) => {
		console.log('data')
		console.log(data)
		const contentHTML = data[0].content.rendered
		const title = data[0].title.rendered
		contentDiv.innerHTML = contentHTML
		titleH3.innerText = title
	})
