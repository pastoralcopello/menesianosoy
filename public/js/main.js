const contentDiv = document.querySelector('.content')
const titleH3 = document.querySelector('.title')

async function loadContent() {
	const res = await fetch('https://menesianosoy.web.app/todayHTTP')

	const data = await res.json()

	console.log('httpRequest todayHTTP')
	console.log(data)
	contentDiv.innerHTML = data.content
	titleH3.innerText = data.title
}

loadContent()
