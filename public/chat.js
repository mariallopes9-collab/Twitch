// chat.js

// Conecta ao servidor Socket.IO (ajuste se o servidor estiver em outra URL)
const socket = io();

// Elementos do DOM
const formChat = document.getElementById('form-chat');
const inputNome = document.getElementById('nome');
const inputMensagem = document.getElementById('mensagem');
const mensagensList = document.getElementById('mensagens');

// Event listener para o formulário de chat
formChat.addEventListener('submit', (e) => {
  e.preventDefault(); // Impede o reload da página

  const nome = inputNome.value.trim();
  const mensagem = inputMensagem.value.trim();

  if (nome && mensagem) {
    // Emite a mensagem para o servidor via Socket.IO (usando 'chat message' como no server.js)
    socket.emit('chat message', { nome, mensagem });

    // Limpa o campo de mensagem (opcional: mantenha o nome)
    inputMensagem.value = '';
  }
});

// Recebe mensagens do servidor e adiciona à lista
socket.on('chat message', (data) => {
  const { nome, mensagem } = data;

  // Cria um novo item de lista para a mensagem
  const li = document.createElement('li');
  li.innerHTML = `<span class="nome">${nome}:</span> ${mensagem}`;

  // Adiciona à lista de mensagens
  mensagensList.appendChild(li);

  // Rolagem automática para o final do chat
  mensagensList.scrollTop = mensagensList.scrollHeight;
});