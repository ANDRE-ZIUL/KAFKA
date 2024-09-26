const { Kafka } = require('kafkajs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka?.producer();
const app = express();

app.use(bodyParser?.json());
app.use(cors());

const runProducer = async (message) => {
  await producer?.connect();
  await producer?.send({
    topic: 'meu-topico',
    messages: [
      { value: message },
    ],
  });
  await producer?.disconnect();
};


app.post('/send', async (req, res) => {
  const { message } = req?.body;

  if (!message) {
    return res?.status(400)?.json('Por favor, envie uma mensagem no body.');
  }

  try {
    await runProducer(message);
    res?.status(200)?.json('Mensagem enviada para o Kafka!');
  } catch (error) {
    console.error('Erro ao enviar mensagem para Kafka:', error);
    res?.status(500)?.json('Erro ao enviar mensagem para Kafka.');
  }
});

app?.listen(3001, () => {
  console?.log('Server running on port 3001');
});
