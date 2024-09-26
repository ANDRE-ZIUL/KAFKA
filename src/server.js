const express = require('express');
const { Kafka } = require('kafkajs');
const { WebSocketServer } = require('ws');

const app = express();
const port = 3000;

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['107.21.137.193:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'my-consumer-group' }); // Removed extra comma

const wss = new WebSocketServer({ port: 8081 });

const sendMessage = async (message) => {
  const payloads = [{ topic: 'test', messages: message }];
  return producer.send(payloads);
};

const createTopic = async () => {
  const admin = kafka.admin();
  await admin.connect();

  const newTopics = await admin.createTopics({
    topics: [{ topic: 'test', numPartitions: 1, replicationFactor: 1 }],
  });

  console.log('Tópico criado com sucesso:', newTopics);
  await admin.disconnect();
};

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: ['test'] });

  consumer.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.value.toString());
      }
    });
  });

  consumer.on('error', (err) => {
    console.error('Erro no consumidor:', err);
  });
};

const start = async () => {
  try {
    await createTopic(); // Create topic before starting consumer
    await consumeMessages();
  } catch (err) {
    console.error('Erro inicializando a aplicação:', err);
    process.exit(1);
  }
};

start();

// Removed unnecessary producer error handler (handled within sendMessage)

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
});

app.get('/:message', async (req, res) => {
  const { message } = req.params;
  try {
    await sendMessage(message);
    res.send('Mensagem enviada com sucesso!');
  } catch (err) {
    console.error('Erro ao enviar mensagem:', err);
    res.status(500).send('Erro ao enviar mensagem');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});