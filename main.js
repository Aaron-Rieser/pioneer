document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        neighbourhood: document.getElementById('neighbourhood').value,
        username: document.getElementById('username').value,
        post: document.getElementById('post').value
    };

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Post created successfully!');
            document.getElementById('postForm').reset();
        } else {
            alert('Error creating post');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating post');
    }
});