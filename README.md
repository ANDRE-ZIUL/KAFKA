# Introdução ao Apache Kafka

## O que é Apache Kafka?

O **Apache Kafka** é uma plataforma de streaming distribuída que permite publicar, subscrever, armazenar e processar fluxos de dados em tempo real. Ele foi desenvolvido pela **LinkedIn** e doado para a **Apache Software Foundation**, onde se tornou um projeto de código aberto. O Kafka é amplamente utilizado para lidar com grandes volumes de dados e aplicações que exigem processamento de dados em tempo real.

## Principais Conceitos

- **Produtores (Producers)**: São responsáveis por enviar mensagens para o Kafka, publicando os dados em **tópicos** específicos.
- **Consumidores (Consumers)**: Lêem as mensagens dos tópicos do Kafka e processam os dados. Cada consumidor se inscreve em um ou mais tópicos.
- **Tópicos (Topics)**: Categorias onde as mensagens são enviadas pelos produtores. Os consumidores podem lê-las diretamente dos tópicos.
- **Partições (Partitions)**: Tópicos são divididos em partições, permitindo escalabilidade e desempenho ao distribuir as mensagens.
- **Brokers**: São os servidores que compõem o cluster Kafka e gerenciam o armazenamento e replicação das mensagens.
- **Clusters**: Um conjunto de brokers que trabalham juntos para oferecer alta escalabilidade e tolerância a falhas.
- **Zookeeper**: Utilizado para coordenar o estado do cluster Kafka, auxiliando na sincronização de brokers e no gerenciamento dos consumidores.

## Funcionamento no Projeto

O projeto é composto por um backend que utiliza a biblioteca `kafkajs` para interagir com o Kafka e um frontend (usando **Next.js**) que envia mensagens ao backend. O Kafka e o **Zookeeper** são configurados com `docker-compose.yaml`.

### Arquitetura

- **Backend**: Responsável por produzir e consumir mensagens no Kafka.
  - **Produtor**: Envia mensagens para o Kafka (implementado em `producer.js`).
  - **Consumidor**: Lê mensagens do Kafka (implementado em `consumer.js`).
  
- **Frontend**: Permite que os usuários enviem mensagens, que são recebidas pelo backend e publicadas no Kafka.
  - **Envio de Mensagens**: Gerenciado pelo componente `page.tsx`.
  - **Serviço de API**: O frontend usa uma API REST para enviar mensagens ao backend.

### Fluxo de Dados

1. O usuário envia uma mensagem via frontend.
2. O backend recebe a mensagem e a envia para o Kafka.
3. O produtor publica a mensagem no tópico `meu-topico`.
4. O consumidor lê e processa a mensagem do mesmo tópico.

## Casos de Uso e Vantagens

Kafka é amplamente utilizado para:
- **Monitoramento em tempo real** (logs, transações financeiras).
- **Processamento de dados contínuos** (dados de IoT, sensores).
- **Integração de sistemas** em tempo real.

As principais vantagens incluem:
- **Alto throughput**, processando milhões de mensagens por segundo.
- **Baixa latência**, com entrega em milissegundos.
- **Escalabilidade horizontal** e **tolerância a falhas**, facilitando a expansão do sistema.
- **Durabilidade** dos dados, que podem ser persistidos por longos períodos.

## Exemplo de Código com Node.js

A implementação de um **produtor** e **consumidor** em **Node.js** pode ser feita utilizando a biblioteca `kafkajs`:

### Instalação

```bash
npm install kafkajs
```

Este exemplo básico de uso do Kafka com Node.js mostra como integrar o envio e o consumo de mensagens dentro de um cluster Kafka.

## Conclusão

Este projeto exemplifica como o **Apache Kafka** pode ser utilizado para gerenciar fluxos de dados em tempo real, integrando um frontend e um backend via API REST e utilizando Docker para configurar o Kafka.
