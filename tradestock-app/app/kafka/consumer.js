const { Kafka } = require('kafkajs');
const db = require("../models");
const Tradestock = db.tradestock;
const http = require('http');
const socketIo = require('socket.io');

// Initialize the server
const server = http.createServer();
const io = socketIo(server);

const kafka = new Kafka({
  clientId: 'client-test-id2',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'stock-group' });
// Function to save data to the database
const saveToDatabase = async (data) => {
  try {
    const stockData = new Tradestock(data);
    await stockData.save();
    // Emit the data to all connected clients
    io.emit('stockData', data);
    console.log(`Data saved with ticker: ${data.ticker}, date: ${data.date}`);
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
};


// Function to run the consumer
const runConsumer = async () => {
  await consumer.connect();
  console.log('Consumer connected');

  // Manually assign the consumer to a specific topic and partition
  await consumer.assign([{ topic: 'stock', partition: 0 }]);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log(`Received data from topic: ${topic}, partition: ${partition}`);
      console.log(`Ticker: ${data.ticker}, Date: ${data.date}`);
      await saveToDatabase(data);
    },
  });
};

// Start the consumer
runConsumer().catch(console.error);

// Clean up on exit
process.on('SIGINT', async () => {
  console.log('Disconnecting consumer...');
  await consumer.disconnect();
  process.exit(0);
});


// Start the WebSocket server
const PORT = 3000; // Choose your preferred port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});