import amqp from "amqplib";

let connection: amqp.Connection;
let channel: amqp.Channel;

export async function connectToRabbitMQ() {
  connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
}

export async function closeRabbitMQ() {
  if (channel) {
    await channel.close();
  }
  if (connection) {
    await connection.close();
  }
}
