// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    // Verifica se o formulário existe antes de adicionar o event listener
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento padrão da página

            // Pega os valores dos campos de usuário e senha
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('psw');

            // Verifica se os inputs existem para evitar erros
            if (!usernameInput || !passwordInput) {
                console.error("Campos de usuário ou senha não encontrados no HTML.");
                loginMessage.textContent = 'Erro: Problema ao carregar os campos de login.';
                loginMessage.className = 'message incorrect-feedback';
                loginMessage.style.display = 'block';
                return; // Sai da função se os inputs não forem encontrados
            }

            const username = usernameInput.value;
            const password = passwordInput.value; // Renomeei para 'password' para consistência

            // --- Lógica de Validação de Login (Simulada com localStorage) ---
            // Em um cenário real, esta parte se comunicaria com um servidor/backend.
            const storedUser = JSON.parse(localStorage.getItem(username));

            if (storedUser && storedUser.password === password) { // 'password' é a chave que usamos no localStorage para a senha
                // Login bem-sucedido
                loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
                loginMessage.className = 'message correct-feedback';
                loginMessage.style.display = 'block';
                setTimeout(() => {
                    window.location.href = 'home.html'; // Redireciona para sua página principal
                }, 1500); // Espera 1.5 segundos
            } else {
                // Login falhou
                loginMessage.textContent = 'Usuário ou senha inválidos. Tente novamente.';
                loginMessage.className = 'message incorrect-feedback';
                loginMessage.style.display = 'block';
                passwordInput.value = ''; // Limpa o campo da senha
            }
        });
    } else {
        console.error("Formulário de login (ID 'loginForm') não encontrado no HTML.");
    }
});

function registerUser(username, password) {
    if (localStorage.getItem(username)) {
        console.warn('Este nome de usuário já está registrado.');
        return false;
    }
    // Armazena o usuário com a senha (ATENÇÃO: Em produção, senhas devem ser hashadas! NUNCA armazene senhas em texto puro.)
    localStorage.setItem(username, JSON.stringify({ username: username, password: password }));
    console.log('Usuário "' + username + '" registrado com sucesso no localStorage!');
    return true;
}