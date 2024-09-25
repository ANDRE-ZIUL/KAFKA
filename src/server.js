const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const KafkaAdapter = require('./adapter/kafkaAdapter');

// Inicializa o KafkaAdapter
const kafkaAdapter = new KafkaAdapter('35.172.194.229:9092');

// Configuração do Express e Socket.io
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const KAFKA_TOPIC = 'chat-topic';

// Quando o producer do Kafka estiver pronto
kafkaAdapter.producer.on('ready', () => {
  console.log('Kafka Producer está pronto.');

  // Conectar usuários e enviar mensagens
  io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    // Receber mensagens do cliente e enviar para o Kafka
    socket.on('sendMessage', (message) => {
      kafkaAdapter.sendMessage(KAFKA_TOPIC, message);
    });

    // Desconectar o usuário
    socket.on('disconnect', () => {
      console.log('Usuário desconectado:', socket.id);
    });
  });

  // Consumir mensagens do Kafka e transmitir para os clientes
  kafkaAdapter.consumeMessages(KAFKA_TOPIC, (chatMessage) => {
    io.emit('receiveMessage', chatMessage);
  });
});

// Tratamento de erros no Kafka Producer
kafkaAdapter.producer.on('error', (err) => {
  console.error('Erro no Kafka Producer:', err);
});

// Iniciar servidor
const port = 3000
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
