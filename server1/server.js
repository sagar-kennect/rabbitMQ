const express = require("express")
const amqp = require('amqplib');
const app = express()
const PORT = 4001


async function sendToQueue(message) {
  try {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();
    const queue = 'messages_queue';

    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Message sent: ${message}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Example usage
sendToQueue('Hello from Server 1! sagar');




app.get("/", (req, res) => {
  res.send("this is server 1 done using Docker Compose all running good now hiii")
})

app.listen(PORT, () => {
  console.log(`Hello!, Server is running on PORT ${PORT}`)
})


