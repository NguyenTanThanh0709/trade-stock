const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: "client-test-id1",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

// Function to generate random stock data
const generateRandomData = () => {
  const tickers = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSLA'];
  const ticker = tickers[Math.floor(Math.random() * tickers.length)];
  const open = Math.random() * 1000 + 100;  // giá mở cửa từ 100 đến 1100
  const close = open + (Math.random() * 20 - 10);  // giá đóng cửa xê dịch +/- 10
  const high = Math.max(open, close) + Math.random() * 10;  // giá cao nhất
  const low = Math.min(open, close) - Math.random() * 10;  // giá thấp nhất
  const vol = Math.floor(Math.random() * 10000 + 1000);  // khối lượng giao dịch từ 1000 đến 11000
  const date = new Date().toISOString();

  return {
    ticker,
    open,
    close,
    high,
    low,
    vol,
    date
  };
};

// Function to send data to the 'stock' topic
const sendData = async (data) => {
  try {
    await producer.send({
      topic: "stock",
      messages: [{ value: JSON.stringify(data) }],
    });
    console.log(`Data sent with ticker: ${data.ticker}, date: ${data.date}`);
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

// Function to start the producer and send random data every 5 seconds
const run = async () => {
  await producer.connect();
  console.log("Producer connected");

  setInterval(async () => {
    const data = generateRandomData();
    await sendData(data);
  }, 5000);
};

// Start the producer
run().catch(console.error);

// Clean up on exit
process.on("SIGINT", async () => {
  console.log("Disconnecting producer...");
  await producer.disconnect();
  process.exit(0);
});

module.exports = { sendData };
