class MessagingService {
  sendMessage(topic, message) {
    throw new Error('Method not implemented');
  }

  consumeMessages(topic, onMessageCallback) {
    throw new Error('Method not implemented');
  }
}

module.exports = MessagingService;
