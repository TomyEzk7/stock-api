const form = document.querySelector('.login-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

const registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', async (e) => {
    e.preventDefault(); 
    await handleRegister();
});
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await handleLogin();
});

// funcion para recuperar jwt de localStorage y pasarlo en cada req
// en las llamadas definir METHOD (a menos que sea GET que viene por defecto)
async function authFetch(url, options = {}) {
    const token = localStorage.getItem('token');

    return fetch(url, {
        ...options, 
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`,
            ...options.headers
        }
    });
}

// funcion para mostrar el mensaje que devuelva el servidor 
function showMessage(message) {
    const messageContainer = document.getElementById('message');
    
    messageContainer.textContent = message;

    setTimeout(() => {
        messageContainer.textContent = '';
    }, 2000);
}

async function handleRegister() {
    try {
        const username = document.getElementById('user').value.trim();
        const password = document.getElementById('password').value;


        if (!username || !password) {
            showMessage('Please enter both username and password', 'error');
            return;
        }

        const userData = {
            username, 
            password
        };

        const response = await authFetch('/auth/register', {
            method: 'POST', 
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Registration successful!', 'success');
            form.reset();
                
        } else {
            showMessage(data.error || 'Registration failed', 'error');
        }
    } catch (err) {
        console.log('Register error:' + err);
        showMessage('An error occurred during registration', 'error');
    }
}

async function handleLogin() {
    try {
        const username = document.getElementById('user').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showMessage(`Please enter both username and password`,'error');
            return;
        }

        const credentials = {
            username, 
            password
        };

        const response = await authFetch('/auth/login', {
            method: 'POST', 
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            window.location.href = '/index.html'
        } else {
            showMessage(data.error || 'Login failed', 'error');
        }
    } catch (err) {
        console.log('Login error:', err);
        showMessage('An error occurred during login', 'error');
    }
}

