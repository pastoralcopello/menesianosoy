const dateInput = $('#dateInput')

const apiURL = `${apiDomain()}/lastContent`

dateInput.value = today()
getContent()

console.log('Colaborá en github.com/pastoralcopello/menesianosoy !')

async function getContent() {
	const res = await fetch(apiURL, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
	})
	const dateString = await res.json()

	dateInput.max = dateString

	endLoader()
}

function buscar() {
	const a = document.createElement('a')
	a.href = `https://menesianosoy.web.app/fecha/?date=${dateInput.value}`
	a.target = '_blank'
	a.click()
}

function today() {
	return new Date().toISOString().split('T')[0]
}
