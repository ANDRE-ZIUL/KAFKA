const { Kafka } = require('kafkajs');

// Criando uma instância do Kafka
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Olá Kafka!' },
    ],
  });

  console.log('Mensagem enviada!');
  
  await producer.disconnect();
};

runProducer().catch(console.error);