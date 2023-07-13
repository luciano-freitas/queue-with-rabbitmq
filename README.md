## 📚 Descrição

Este repositório tem como objetivo exemplificar o conceito de uso de fileiramento utilizando o RabbitMQ, vamos trabalhar simulando 2 microserviços:</br>
- Microserviço de pedido (order)
- Microserviço de armazem (warehouse)</br>

## 🛠️ Instalação

Você precisa ter instalado 
[Docker](https://www.docker.com/)


## 🏃 Rodando as aplicações
1 - Vá na raiz do projeto `./queue-with-rabbitmq` e rode o seguinte comando para levantar o docker com o RabbitMQ:</br>
```bash
# Docker
$ docker-compose up -d
```
</br>

2 - Entre no projeto de `./queue-with-rabbitmq/order` e rode os seguintes comandos: </br>
```bash
# Entra na pasta de order
$ cd order

# Instala as dependencias do projeto
$ npm i

# Inicializa o servidor
$ npm run start
```
</br>

3 - Entre no projeto de `./queue-with-rabbitmq/warehouse` e rode os seguintes comandos: </br>
```bash
# Entra na pasta de warehouse
$ cd warehouse

# Instala as dependencias do projeto
$ npm i

# Inicializa o servidor
$ npm run start
```
</br>

## 💡 Links disponiveis

```bash

# Api de orders
$ http://localhost:9005/

# Api de warehouse
$ http://localhost:9006/

# RabbitMQ
$ http://localhost:15672

# Listagem das filas
$ http://localhost:15672/#/queues
```

## ✅ Acesso ao Rabbitmq
```
Usuário: admin
Senha: admin
```

## 🔦 Como testar?
- [1º] Importe o arquivo insomnia.json na raiz deste projeto dentro do seu software insomnia, caso não tenha instalado baixe [Clicando Aqui](https://insomnia.rest/download)
- [2º] Com os serviços de pé faça uma requisição no endpoint de envio de pedidos:
```
METHOD: POST
URL: http://localhost:9005/orders
BODY: {
	"products":["malbac", "lily", "florata"],
	"price": 100.00
}
```
- [3º] Para visualizar os pedidos que foram enviados para o microserviço de warehouse faça uma requisição no endpoint:
```
METHOD: GET
URL: http://localhost:9006/orders
```