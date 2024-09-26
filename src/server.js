const express = require('express');
const kafka = require('kafka-node');

const app = express();
const port = 3000;

const client = new kafka.KafkaClient({ kafkaHost: '107.21.137.193:9092' });
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

app.get('/:message', (req, res) => {
  const { message } = req.params;
  res.send(message);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});