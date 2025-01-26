document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    try {
        let response = await fetch('your-endpoint-url');
        let data = await response.json(); // This is where the error occurs.
        if (!data) {
            throw new Error('Response data is empty');
        }
        console.log(data);
    } catch (error) {
        console.error('Error parsing JSON:', error.message);
    }
});

