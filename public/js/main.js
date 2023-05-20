function onSubmit(e) {
  e.preventDefault();


  //clearing the message from box after submission:
  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showLoading()
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      hideLoading();
      removeSpinner();
      throw new Error('The image was not generated');
    }

    const data = await response.json();


    //Displaying Image in the Frontend:
    const imageUrl = data.data;
    document.querySelector('#image').src = imageUrl;
    hideLoading();
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
