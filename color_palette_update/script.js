document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Button clicked!'); // Example action on button click
        // Add your download logic here
    });
});

// Example functions for loading states (if needed)
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading'; // Add a loading class with CSS styles
    loadingDiv.innerText = 'Loading...';
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Example usage: show loading on button click
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        showLoading();
        setTimeout(hideLoading, 2000); // Simulate a loading time
    });
});
