const express = require('express');
const kafka = require('kafka-node');

const app = express();
const port = 3000;

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
  console.log('Producer está pronto');
  const payloads = [{ topic: 'test', messages: 'Hello Kafka' }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Erro ao enviar mensagem', err);
    } else {
      console.log('Mensagem enviada:', data);
    }
  });
});

producer.on('error', (err) => {
  console.error('Erro no Producer:', err);
});

app.get('/', (req, res) => {
  res.send('Node.js com Kafka e Docker');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});