# Introdução ao Apache Kafka

## O que é Apache Kafka?

O **Apache Kafka** é uma plataforma de streaming distribuída que permite publicar, subscrever, armazenar e processar fluxos de dados em tempo real. Ele foi inicialmente desenvolvido pela **LinkedIn** e doado para a **Apache Software Foundation**, onde se tornou um projeto de código aberto.

Kafka é projetado para lidar com grandes volumes de dados de maneira eficiente e é amplamente utilizado em aplicações que exigem processamento de dados em tempo real.

## Principais Conceitos

### Produtores (Producers)
Os produtores são os responsáveis por enviar (produzir) mensagens para o Kafka. Eles publicam os dados em **tópicos** específicos.

### Consumidores (Consumers)
Os consumidores lêem (consomem) as mensagens dos tópicos do Kafka. Cada consumidor se inscreve em um ou mais tópicos e processa os dados.

### Tópicos (Topics)
Um tópico é uma categoria ou nome de feed ao qual as mensagens são enviadas pelos produtores. O Kafka armazena e categoriza os dados dentro dos tópicos para que os consumidores possam lê-los.

### Partições (Partitions)
Os tópicos são divididos em partições, que permitem distribuir as mensagens para diferentes consumidores, aumentando a escalabilidade e a performance.

### Brokers
Os brokers são os servidores que compõem o cluster Kafka. Cada broker gerencia o armazenamento e a replicação dos dados.

### Clusters
Um cluster Kafka é composto por vários brokers que trabalham juntos para fornecer escalabilidade e tolerância a falhas.

### Zookeeper
O **Zookeeper** é utilizado pelo Kafka para coordenar e gerenciar o estado do cluster. Ele ajuda na escolha do líder para partições, na sincronização entre os brokers e no gerenciamento de consumidores.

## Casos de Uso

- **Monitoramento em tempo real**: Empresas podem utilizar Kafka para monitorar sistemas em tempo real, como logs de servidores, transações financeiras e interações de usuários.
- **Processamento de dados**: O Kafka é usado para processar grandes quantidades de dados que chegam continuamente, como eventos de IoT, dados de sensores e cliques de usuários.
- **Integração de sistemas**: Por ser uma plataforma altamente escalável e confiável, o Kafka é ideal para integrar sistemas que precisam compartilhar dados em tempo real.

## Vantagens do Apache Kafka

- **Alto throughput**: O Kafka é capaz de processar milhões de mensagens por segundo.
- **Baixa latência**: Ele é projetado para entregar mensagens em milissegundos.
- **Escalabilidade horizontal**: Adicionar mais brokers permite aumentar o throughput sem interrupções no sistema.
- **Tolerância a falhas**: Kafka replica dados entre múltiplos brokers, garantindo alta disponibilidade.
- **Durabilidade**: Os dados podem ser persistidos por longos períodos, conforme as necessidades da aplicação.

## Exemplo de Código com Node.js

Abaixo está um exemplo simples de como implementar um **produtor** e um **consumidor** usando a biblioteca `kafkajs` em Node.js.

### Instalação da Biblioteca

```bash
npm install kafkajs


Esse exemplo básico de **produtor** e **consumidor** em **Node.js** utilizando `kafkajs` demonstra como o Kafka pode ser integrado para enviar e consumir mensagens em um cluster Kafka.
