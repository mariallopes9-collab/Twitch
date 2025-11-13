// Importando o módulo 'express' e criando a aplicação
const express = require('express');
const app = express();

// Importando o módulo 'http' e criando um servidor
const http = require('http').createServer(app);

// Importando o Socket.IO e vinculando ao servidor
const io = require('socket.io')(http);

// ======= SERVIR ARQUIVOS ESTÁTICOS =======
// Todos os arquivos dentro da pasta "public" ficarão acessíveis no navegador
app.use(express.static(__dirname + '/public'));

// ======= ROTA PARA PÁGINA INICIAL =======
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// ======= EVENTOS SOCKET.IO =======
io.on('connection', (socket) => {
  console.log('Usuário conectado');

  // Recebe mensagem do cliente e envia para todos
  socket.on('chat message', (data) => io.emit('chat message', data));

  // Usuário desconectou
  socket.on('disconnect', () => console.log('Usuário desconectado'));
});

// ======= INICIAR SERVIDOR =======
http.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000 - Link http://localhost:3000`);
});


