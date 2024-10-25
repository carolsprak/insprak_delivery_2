// Função para enviar os dados do formulário para o servidor
function cadastrarUsuario(event) {
    event.preventDefault(); // Evita que o formulário seja enviado antes do processamento

    // Seleciona o formulário pelo ID
    const form = document.getElementById('registerForm');

    // Cria um objeto FormData para coletar os dados do formulário
    const formData = new FormData(form);

    // Converte o FormData para um objeto JSON
    const userData = {};
    formData.forEach((value, key) => {
        if (key.includes('.')) {
            const nestedKeys = key.split('.');
            if (!userData[nestedKeys[0]]) {
                userData[nestedKeys[0]] = {};
            }
            userData[nestedKeys[0]][nestedKeys[1]] = value;
        } else {
            userData[key] = value;
        }
    });

    // Exemplo de como imprimir os dados para verificação
    console.log(userData);

    // Simulação de requisição AJAX (substitua pelo método adequado)
    fetch('http://localhost:4589/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuário cadastrado com sucesso:', data);

        // Exibe mensagem de sucesso
        alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');

        // Redireciona para a página de login
        window.location.replace('../../index.html');
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error.message);
        // Trate o erro de acordo com sua lógica de aplicação
    });
}

// Adiciona um event listener para o evento de submit do formulário
document.getElementById('registerForm').addEventListener('submit', cadastrarUsuario);
