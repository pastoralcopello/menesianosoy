const functions = require('firebase-functions')
const fetch = require('node-fetch')

exports.lastContent = functions.https.onRequest(async (request, response) => {
	await fetch(lastContentAPI())
		.then((res) => res.json())
		.then((json) => {
			const dateString = json[0].date.split('T')[0]
			response.status(200).send(JSON.stringify(dateString))
		})
})

exports.todayContent = functions.https.onRequest(async (request, response) => {
	const body = request.body
	const timezoneOffset = body.timezoneOffset
	await fetch(todayAPI(timezoneOffset))
		.then((res) => res.json())
		.then((json) => {
			const data = oneDateContent(json)
			response.status(200).send(JSON.stringify(data))
		})
})

exports.futureContent = functions.https.onRequest(async (request, response) => {
	const body = request.body
	const timezoneOffset = body.timezoneOffset
	await fetch(futureContentAPI(timezoneOffset))
		.then((res) => res.json())
		.then((json) => {
			const articles = json.map((article) => itemData(article))
			sortArticles(articles)
			response.status(200).send(JSON.stringify(articles))
		})
})

// exports.previousContent = functions.https.onRequest(
// 	async (request, response) => {
// 		const body = request.body
// 		const timezoneOffset = body.timezoneOffset
// 		await fetch(previousContentAPI(timezoneOffset))
// 			.then((res) => res.json())
// 			.then((json) => {
// 				const articles = json.map((article) => itemData(article))
// 				sortArticles(articles)
// 				response.status(200).send(JSON.stringify(articles))
// 			})
// 	}
// )

exports.someDateContent = functions.https.onRequest(
	async (request, response) => {
		const body = request.body
		const dateString = body.date
		const date = new Date(dateString)
		await fetch(someDateAPI(date))
			.then((res) => res.json())
			.then((json) => {
				const data = oneDateContent(json)
				response.status(200).send(JSON.stringify(data))
			})
	}
)

function oneDateContent(articles) {
	const article = articles[0]
	return articleData(article)
}

function articleData(article) {
	return {
		content: article.content.rendered,
		title: article.title.rendered.replaceDash(),
		url: article.link,
		date: article.date.split('T')[0],
		dateLongString: dateLongString(article.date),
	}
}

function itemData(article) {
	return {
		date: article.date.split('T')[0],
		dateLongString: dateLongString(article.date),
	}
}

function dateLongString(dateString) {
	const date = new Date(dateString)
	const gmtDate = date.normalizeTZ(180)
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return gmtDate.toLocaleDateString('es-AR', options).firstLetterUpperCase()
}

String.prototype.firstLetterUpperCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

function todayAPI(timezoneOffset) {
	const today = todayDate(timezoneOffset)
	const origin = today.dayBefore().string()
	const end = today.string()
	return `http://institutosanpablo.com.ar/aplicacion/wp-json/wp/v2/posts?categories=1&orderby=date&order=desc&after=${origin}T23:59:59&before=${end}T23:59:59`
}

function futureContentAPI(timezoneOffset) {
	const today = todayDate(timezoneOffset)
	const todayString = today.string()
	return `http://institutosanpablo.com.ar/aplicacion/wp-json/wp/v2/posts?categories=1&orderby=date&order=desc&after=${todayString}T23:59:59`
}

function someDateAPI(date) {
	const origin = date.dayBefore().string()
	const end = date.string()
	return `http://institutosanpablo.com.ar/aplicacion/wp-json/wp/v2/posts?categories=1&orderby=date&order=desc&after=${origin}T23:59:59&before=${end}T23:59:59`
}

function lastContentAPI(date) {
	return `http://institutosanpablo.com.ar/aplicacion/wp-json/wp/v2/posts?categories=1&orderby=date&order=desc`
}

// function previousContentAPI(timezoneOffset) {
// 	const yesterday = todayDate(timezoneOffset).dayBefore()
// 	const yesterdayString = yesterday.string()
// 	return `http://institutosanpablo.com.ar/aplicacion/wp-json/wp/v2/posts?categories=1&orderby=date&order=desc&before=${yesterdayString}T23:59:59`
// }

function todayDate(timezoneOffset) {
	return new Date().normalizeTZ(timezoneOffset)
}

Date.prototype.dayBefore = function () {
	const newDate = new Date(this.getTime())
	newDate.setDate(this.getDate() - 1)
	return newDate
}

Date.prototype.daysBefore = function (days) {
	const newDate = new Date(this.getTime())
	newDate.setDate(this.getDate() - days)
	return newDate
}

Date.prototype.string = function () {
	return this.toISOString().split('T')[0]
}

Date.prototype.normalizeTZ = function (timezoneOffset) {
	const newDate = new Date(this.getTime() - timezoneOffset * 60000)
	return newDate
}

String.prototype.replaceDash = function () {
	return this.replace('&#8211;', '–')
}

function sortArticles(articles) {
	articles.sort(function (a, b) {
		return a.date.localeCompare(b.date)
	})
}
