async function loginSubmit(e) {
	e.preventDefault();

	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;

	if (!email || !password) {
		const toast = document.getElementById('errorToast');
		toast.textContent = 'All fields are mandatory';
		toast.style.display = 'block';

		// Hide the toast after 3 seconds
		return setTimeout(function () {
			toast.style.display = 'none';
		}, 3000);
	}
	try {
		let response = await fetch('/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		const response_obj = await response.json();
		if (response_obj?.error) {
			//some error exists
			const { error } = response_obj;
			const toast = document.getElementById('errorToast');
			toast.textContent = error;
			toast.style.display = 'block';

			// Hide the toast after 3 seconds
			setTimeout(function () {
				toast.style.display = 'none';
			}, 3000);
		} else {
			// Data is saved in DB..successfully registered
			console.log('response object: ', response_obj);
			const { token } = response_obj;
			localStorage.setItem('AcceessToken', JSON.stringify(token));
			const message = 'Successfully LoggedIn!!!';
			const toast = document.getElementById('successToast');
			toast.textContent = message;
			toast.style.display = 'block';

			// Hide the toast after 3 seconds
			setTimeout(function () {
				toast.style.display = 'none';
				window.location.href = '/imagineAi';
			}, 3000);
		}
	} catch (error) {
		console.log('Error in login-client-side: ', error);
	}
}

const login_submit_doc = document.querySelector('.btn-login-submit');
login_submit_doc.addEventListener('click', loginSubmit);
