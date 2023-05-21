function onSubmit(e) {
	e.preventDefault();

	//clearing the message from box after submission:
	document.querySelector('.msg').textContent = '';
	document.querySelector('#image').src = '';

	const prompt = document.querySelector('#prompt').value;
	const size = document.querySelector('#size').value;
	const API_KEY = document.querySelector('#api-key').value; //API Key, this value can be passed as paramerter in the function as well...

	if (prompt === '') {
		alert('Please add some text');
		return;
	} else if (API_KEY === '') {
		alert('Please add your API Key'); //if API Key is not added
		return;
	}

	generateImageRequest(prompt, API_KEY, size);
}

async function generateImageRequest(prompt, API_KEY, size) {
	try {
		// showLoading()
		showSpinner();

		const response = await fetch('/openai/generateimage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt,
				API_KEY,
				size,
			}),
		});

		if (!response.ok) {
			// hideLoading();
			removeSpinner();
			throw new Error('The image was not generated');
		}

		const data = await response.json();

		//Displaying Image in the Frontend:
		const imageUrl = data.data;
		document.querySelector('#image').src = imageUrl;
		// hideLoading();
		removeSpinner();
	} catch (error) {
		document.querySelector('.msg').textContent = error;
	}
}

//Spinner Show and Remove:
function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}
document.querySelector('#image-form').addEventListener('submit', onSubmit);
