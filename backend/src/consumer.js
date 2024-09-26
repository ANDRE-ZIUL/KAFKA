const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka?.consumer({ groupId: 'test-group' });

const runConsumer = async () => {
  await consumer?.connect();
  await consumer?.subscribe({ topic: 'meu-topico', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log('Mensagem recebida: ', message?.value?.toString());
    },
  });
};

runConsumer()?.catch(console?.error);
