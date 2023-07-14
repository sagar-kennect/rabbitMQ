const express = require("express")
const amqp = require('amqplib');
const app = express()
const PORT = 4002



async function consumeQueue() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();
    const queue = 'messages_queue';

    await channel.assertQueue(queue);
    await channel.consume(queue, (message) => {
      console.log(`Received message: ${message.content.toString()}`);
      channel.ack(message);
    });

    console.log('Waiting for messages...');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

consumeQueue();












app.get("/", (req, res) => {
  res.send("this is server 2 done 2 h using docker compose all running good")
})

app.listen(PORT, () => {
  console.log(`Hello!, Server is running on PORT  ${PORT}`)
})


