const functions = require('firebase-functions')
const fetch = require('node-fetch')

exports.todayHTTP = functions.https.onRequest(async (request, response) => {
	await fetch(apiURL())
		.then((res) => res.json())
		.then((json) => {
			const data = contentData(json)
			response.status(200).send(JSON.stringify(data))
		})
})

function contentData(response) {
	const object = response[0]
	return {
		content: object.content.rendered,
		title: object.title.rendered,
		url: object.link,
	}
}

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
