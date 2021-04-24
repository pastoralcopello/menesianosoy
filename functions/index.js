const functions = require('firebase-functions')
const fetch = require('node-fetch')

exports.content = functions.https.onRequest(async (request, response) => {
	const body = request.body
	const dateString = body.date
	const timezoneOffset = body.timezoneOffset
	const date = new Date(dateString).normalizeTZ(timezoneOffset)
	await fetch(oneDayAPI(date))
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

function oneDayAPI(date) {
	const origin = date.dayBefore().string()
	const end = date.string()
	return `http://institutosanpablo.com.ar/aplicacion/wp-json/wp/v2/posts?categories=1&orderby=date&order=desc&after=${origin}T23:59:59&before=${end}T23:59:59`
}

function multipleDaysAPI(date, daysBefore, daysAfter) {
	const origin = date.daysBefore(daysBefore).string()
	const end = date.daysAfter(daysAfter).string()
	return `http://institutosanpablo.com.ar/aplicacion/wp-json/wp/v2/posts?categories=1&orderby=date&order=desc&after=${origin}T23:59:59&before=${end}T23:59:59`
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

Date.prototype.daysAfter = function (days) {
	const newDate = new Date(this.getTime())
	newDate.setDate(this.getDate() + days)
	return newDate
}

Date.prototype.string = function () {
	return this.toISOString().split('T')[0]
}

Date.prototype.normalizeTZ = function (timezoneOffset) {
	const newDate = new Date(this.getTime() - timezoneOffset * 60000)
	return newDate
}
