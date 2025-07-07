

// Hardcoded editor credentials
const VALID_EDITOR_USERNAME = 'amantharu';
const VALID_EDITOR_PASSWORD = '123@321!!aman';


// Editor Authentication (Hardcoded)
document.getElementById('editor-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('editor-username').value;
    const password = document.getElementById('editor-password').value;

    if (username === VALID_EDITOR_USERNAME && password === VALID_EDITOR_PASSWORD) {
        const mockToken = 'editor-token-udaytharu';
        localStorage.setItem('token', mockToken);
        localStorage.setItem('role', 'editor');
        window.location.href = 'adminfiles/file.html';
    } else {
        showError('editor-error', 'Invalid username or password');
    }
});

