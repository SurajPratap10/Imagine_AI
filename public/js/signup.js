async function signup_submit(e) {
	e.preventDefault();
	// console.log('hello: ');
	const name_user = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	if (!name_user || !email || !password) {
		const toast = document.getElementById('errorToast');
		toast.textContent = 'All fields are mandatory';
		toast.style.display = 'block';

		// Hide the toast after 3 seconds
		return setTimeout(function () {
			toast.style.display = 'none';
		}, 3000);
	}
	try {
		let response = await fetch('/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name_user,
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
			const message = 'Successfully Registered!!!';
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
		if (error) {
			console.log('error: ', error);
		}
	}

	// console.log(name_user);
}

const signup_submit_doc = document.querySelector('.btn-signup-submit');
console.log('Hi Authjs ', signup_submit_doc);

signup_submit_doc.addEventListener('click', signup_submit);
