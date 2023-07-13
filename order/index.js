const amqplib = require('amqplib')
const express = require('express')

const app = express()
app.use(express.json())

const PORT = 9005
const URL_HOST = 'amqp://admin:admin@localhost:5672'
const QUEUE_NAME = 'order'

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

  channel.sendToQueue(
    QUEUE_NAME,
    Buffer.from(
      JSON.stringify({
        ...data,
        orderId: Date.now(),
        date: new Date(),
      }),
    ),
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
