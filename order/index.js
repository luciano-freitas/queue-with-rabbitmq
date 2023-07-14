const amqplib = require('amqplib')
const express = require('express')

const app = express()
app.use(express.json())

const PORT = 9005
const URL_HOST = 'amqp://admin:admin@localhost:5672'
const QUEUE_NAME = 'order'
let count = 1;

let channel
connect()

async function connect() {
  try {
    connection = await amqplib.connect(URL_HOST)
    channel = await connection.createChannel()
    await channel.assertQueue(QUEUE_NAME)
  } catch (error) {
    console.log(error)
  }
}

app.post('/orders', (req, res) => {
  const data = req.body
  const send = JSON.stringify({
    ...data,
    count: count++,
    orderId: Date.now(),
    date: new Date(),
  })

  console.log('PEDIDO ENVIADO:', send)
  channel.sendToQueue(
    QUEUE_NAME,
    Buffer.from(send),
  )

  res.json({
    message: 'order submitted'
  })
})

app.get('*', (req, res) => {
  res.status(200).send('Microservice of orders')
})
app.listen(PORT, () => {
  console.log(`[ORDER] Server running on ${PORT}`)
})
