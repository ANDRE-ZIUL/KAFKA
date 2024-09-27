# Funcionamento do Apache Kafka no Projeto

## Introdução

Este documento tem como objetivo explicar o funcionamento do Apache Kafka dentro do contexto do projeto atual. O Apache Kafka é uma plataforma de streaming distribuída que permite publicar, subscrever, armazenar e processar fluxos de dados em tempo real.

## Arquitetura do Projeto

O projeto é composto por duas partes principais: o backend e o frontend. O backend é responsável por produzir e consumir mensagens no Kafka, enquanto o frontend envia mensagens para o backend, que por sua vez as envia para o Kafka.

### Backend

O backend utiliza a biblioteca `kafkajs` para interagir com o Kafka. Ele possui dois componentes principais: o produtor e o consumidor.

#### Produtor

O produtor é responsável por enviar mensagens para um tópico específico no Kafka. Ele é implementado no arquivo `producer.js`.

#### Consumidor

O consumidor é responsável por ler mensagens de um tópico específico no Kafka. Ele é implementado no arquivo `consumer.js`.

### Frontend

O frontend é uma aplicação Next.js que permite aos usuários enviar mensagens. Essas mensagens são enviadas para o backend, que as publica no Kafka.

#### Envio de Mensagens

O envio de mensagens é gerenciado pelo componente `page.tsx`.

#### Serviço de API

O frontend utiliza um serviço de API para enviar mensagens para o backend.

### Configuração do Kafka

O Kafka e o Zookeeper são configurados usando o `docker-compose.yaml`.

## Fluxo de Dados

1. **Envio de Mensagem pelo Frontend**: O usuário envia uma mensagem através da interface do frontend.
2. **Recepção pelo Backend**: O backend recebe a mensagem e a envia para o Kafka.
3. **Publicação no Kafka**: O produtor no backend publica a mensagem no tópico `meu-topico`.
4. **Consumo pelo Backend**: O consumidor no backend lê a mensagem do tópico `meu-topico` e a processa.

## Conclusão

Este projeto demonstra como o Apache Kafka pode ser utilizado para gerenciar fluxos de dados em tempo real entre um frontend e um backend. A configuração do Kafka é gerenciada pelo Docker, e a comunicação entre o frontend e o backend é feita através de uma API REST.

Para mais detalhes sobre a implementação, consulte os arquivos mencionados acima.
