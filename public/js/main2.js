// const {f} = require('../../functions')

var functions = firebase.functions()
var f = functions.httpsCallable('f')
var today = functions.httpsCallable('today')
// functions.useEmulator('localhost', 5001)

async function todayHTTP() {
	const res = await fetch('https://menesianosoy.web.app/todayHTTP')

	const json = await res.json()

	const data = json.data

	console.log('httpRequest todayHTTP')
	console.log(json)
	console.log(data)
}

todayHTTP()
