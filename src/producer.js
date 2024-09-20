const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['54.234.172.231:9092'],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Ta ai nessa tchaianagem ein candango!!!' },
    ],
  });

  console.log('Mensagem enviada!');
  
  await producer.disconnect();
};

runProducer().catch(console.error);