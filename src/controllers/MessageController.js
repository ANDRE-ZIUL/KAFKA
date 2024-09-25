import { Kafka } from 'kafkajs';

class MessageController {
  constructor() {
    this.kafka = new Kafka({
      clientId: 'chat-kafka',
      brokers: [`34.202.166.249:9092`],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'chat-group' });

    // Conectar o produtor e consumidor na inicialização
    this.connectProducer();
    this.connectConsumer();

    // Fazendo o bind dos métodos para garantir que o `this` funcione
    this.producerHandler = this.producerHandler.bind(this);
    this.consumerHandler = this.consumerHandler.bind(this);
  }

  async connectProducer() {
    try {
      await this.producer.connect();
    } catch (error) {
      console.error("Erro ao conectar o produtor Kafka", error);
    }
  }

  async connectConsumer() {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: 'chat-message', fromBeginning: true });
    } catch (error) {
      console.error("Erro ao conectar o consumidor Kafka", error);
    }
  }

  async producerHandler(req, res) {
    try {
      const { message } = req.body;

      await this.producer.send({
        topic: 'chat-message',
        messages: [{ value: message }],
      });

      return res.json({ message: "Message send"});
    } catch (e) {
      return res.status(500).json({ error: 'Failed to send message', details: e.message });
    }
  }

  async consumerHandler(req, res) {
    try {
      const messages = [];

      const response = await this.consumer.run({
        eachMessage: async ({ partition, message }) => {
          const msg = {
            partition,
            offset: message.offset,
            value: message.value.toString(),
          };
          messages.push(msg);
          return msg;
        },
      });

      console.log(response);

      return res.json({ messages });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to consume messages', details: e.message });
    }
  }
}

export default new MessageController();
