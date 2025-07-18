function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Tenta pegar o usuário do localStorage
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.senha === senha) {
        alert('Login realizado com sucesso!');
        window.location = 'home.html';
    } else {
        // Se o usuário não existir ou a senha estiver errada
        alert('Email ou senha inválidos. Tente novamente.');
        // Opcional: Limpar os campos ou focar no campo de email/senha
        document.getElementById('senha').value = '';
    }
}

// Certifique-se de que esta função está vinculada a um botão de login no seu HTML:
// <button onclick="login()">Entrar</button>