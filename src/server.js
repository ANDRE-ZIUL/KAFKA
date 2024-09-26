const express = require('express');
const kafka = require('kafka-node');
const { WebSocketServer } = require('ws');

const app = express();
const port = 3000;

const client = new kafka.KafkaClient({ kafkaHost: '107.21.137.193:9092' });
const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(client, [{ topic: 'test' }], { autoCommit: true });

const wss = new WebSocketServer({ port: 8081 });

const sendMessage = async (message) => {
  const payloads = [{ topic: 'test', messages: message }];
  return new Promise((resolve, reject) => {
    producer.send(payloads, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const consumeMessages = () => {
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

producer.on('ready', async () => {
  try {
    await sendMessage('Hello Kafka from producer!');
  } catch (err) {
    console.error('Erro ao enviar mensagem:', err);
  }
});

producer.on('error', (err) => {
  console.error('Erro no Producer:', err);
});

client.connect();
consumeMessages();

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