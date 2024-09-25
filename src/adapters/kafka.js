import { Kafka } from 'kafkajs';

class KafkaAdapter {
   getProducer() {
    return new Kafka({
      clientId: 'chat-kafka',
      brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    }).producer()
   }

   getConsumer() {
    return new Kafka({
      clientId: 'chat-kafka',
      brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    }).consumer({ groupId: 'chat-group'});
   }
}

export default new KafkaAdapter()