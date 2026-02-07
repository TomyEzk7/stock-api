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

async function handleRegister() {
    try {
        const username = document.getElementById('user').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert('Missing fields');
            return;
        }

        const userData = {
            username, 
            password
        };

        const response = await fetch('/auth/register', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert ('User registered!');
            form.reset();
        } else {
            alert ('Error:' + (data.error || 'Register error'));
        }
    } catch (err) {
        console.log('Register error:' + err);
    }
}

async function handleLogin() {
    try {
        const username = document.getElementById('user').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert('Missing fields');
            return;
        }

        const credentials = {
            username, 
            password
        };

        const response = await fetch('/auth/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); 

            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = '/index.html'
        } else {
            alert('Login error:', data.error);
        }
    } catch (err) {
        console.log('Login error:', err);
    }
}