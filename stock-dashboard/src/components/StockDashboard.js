import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const generateRandomStockData = () => {
  const now = new Date();
  return {
    id: Math.random().toString(36).substr(2, 9),
    close: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)),
    date: now.toISOString().split('T')[0],
    high: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)),
    low: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)),
    open: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)),
    ticker: 'SYM',
    vol: Math.floor(Math.random() * 5000)
  };
};

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = () => {
      try {
        setStocks((prevStocks) => {
          const newStock = generateRandomStockData();
          // Keep the most recent 10 entries
          const updatedStocks = [newStock, ...prevStocks].slice(0, 10);
          return updatedStocks;
        });
        setLoading(false);
      } catch (error) {
        console.error("Error generating stock data:", error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 5000); 

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Prepare data for the chart


  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Stock Dashboard</h1>
        <p className="text-center text-lg text-gray-600">Real-time stock data updates every 10 seconds</p>
      </header>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h5 className="text-2xl font-semibold text-gray-800 mb-4">Stock Prices Over Time</h5>
        <div style={{ height: 300 }}>
   
          </div>
      </div>
    </div>
  );
};

export default StockDashboard;
