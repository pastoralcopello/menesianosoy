function hide(element) {
	if (!element.className.includes('display-none')) {
		element.classList.add('display-none')
	}
}

function show(element) {
	if (element.className.includes('display-none')) {
		element.classList.remove('display-none')
	}
}

function $(element) {
	return document.querySelector(element)
}

function endLoader() {
	hide($('.loader-container'))
	show($('header'))
	show($('section'))
	show($('footer'))
}

function apiDomain() {
	return `https://menesianosoy.web.app`
	// return `http://localhost:5000`
}
