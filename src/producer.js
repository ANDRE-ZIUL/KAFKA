import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['107.21.137.193:9092'],
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