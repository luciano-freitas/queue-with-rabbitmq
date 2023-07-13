const amqplib = require('amqplib')
const express = require('express')

const app = express()
app.use(express.json())

const PORT = 9006
const URL_HOST = 'amqp://admin:admin@localhost:5672'
const QUEUE_NAME = 'order'
const DATA_BASE = []

let channel, connection

connect()

async function connect() {
  try {
    connection = await amqplib.connect(URL_HOST)
    channel = await connection.createChannel()
    await channel.consume(QUEUE_NAME, (data) => {
      const result = JSON.parse(data.content.toString());
      DATA_BASE.push(result)
      console.log(`Received:`, result)
      channel.ack(data);
    })
  } catch (error) {
    console.log(error)
  }
}

app.get('/orders', (req, res) => {
  res.status(200).json(DATA_BASE)
})
app.get('*', (req, res) => {
  res.status(200).send('Microservice of warehouse')
})
app.listen(PORT, () => {
  console.log(`[WAREHOUSE] Server running on ${PORT}`)
}) 
