// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('psw');

            if (!usernameInput || !passwordInput) {
                console.error("Campos de usuário ou senha não encontrados no HTML.");
                loginMessage.textContent = 'Erro: Problema ao carregar os campos de login.';
                loginMessage.className = 'message incorrect-feedback';
                loginMessage.style.display = 'block';
                return;
            }

            const username = usernameInput.value.trim().toLowerCase();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                loginMessage.textContent = 'Preencha todos os campos.';
                loginMessage.className = 'message incorrect-feedback';
                loginMessage.style.display = 'block';
                return;
            }

            const storedUser = JSON.parse(localStorage.getItem(username));
            if (storedUser && storedUser.password === password) {
                loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
                loginMessage.className = 'message correct-feedback';
                loginMessage.style.display = 'block';
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                loginMessage.textContent = 'Usuário ou senha inválidos.';
                loginMessage.className = 'message incorrect-feedback';
                loginMessage.style.display = 'block';
                passwordInput.value = '';
            }
        });
    } else {
        console.error("Formulário de login não encontrado.");
    }
});

function registerUser(username, password) {
    username = username.trim().toLowerCase();
    if (localStorage.getItem(username)) {
        console.warn('Este nome de usuário já está registrado.');
        return false;
    }

    localStorage.setItem(username, JSON.stringify({ username: username, password: password }));
    console.log(`Usuário "${username}" registrado com sucesso.`);
    return true;
}
