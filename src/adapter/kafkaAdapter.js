import kafka from 'kafka-node';
import MessagingService from '../interface/messagingService';

class KafkaAdapter extends MessagingService {
  constructor(kafkaHost) {
    super();
    this.kafkaClient = new kafka.KafkaClient({ kafkaHost });
    this.producer = new kafka.Producer(this.kafkaClient);
    this.consumer = null;
  }

  // Envia mensagens para um tópico no Kafka
  sendMessage(topic, message) {
    const payload = [
      {
        topic: topic,
        messages: JSON.stringify(message),
        partition: 0,
      },
    ];
    this.producer.send(payload, (err, data) => {
      if (err) {
        console.error('Erro ao enviar mensagem para o Kafka:', err);
      } else {
        console.log('Mensagem enviada:', data);
      }
    });
  }

  // Consome mensagens de um tópico Kafka
  consumeMessages(topic, onMessageCallback) {
    this.consumer = new kafka.Consumer(
      this.kafkaClient,
      [{ topic: topic, partition: 0 }],
      { autoCommit: true }
    );

    this.consumer.on('message', (message) => {
      const chatMessage = JSON.parse(message.value);
      onMessageCallback(chatMessage);
    });

    this.consumer.on('error', (err) => {
      console.error('Erro no Kafka Consumer:', err);
    });
  }
}

module.exports = KafkaAdapter;
