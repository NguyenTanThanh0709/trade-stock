import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // The URL should match your Node.js server

const LineChart = () => {
    const [chartData, setChartData] = useState({
        labels: [], // Dates for X-axis
        datasets: [
            {
                label: "Stock Price",
                data: [], // Stock prices for Y-axis
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    });

    useEffect(() => {
        // Listen for 'stockData' events from the server
        socket.on('stockData', (data) => {
            setChartData((prevData) => {
                const newLabels = [...prevData.labels, data.date];
                const newDatasetData = [...prevData.datasets[0].data, data.close];

                // Keep only the last 10 entries to prevent overcrowding
                if (newLabels.length > 10) {
                    newLabels.shift();
                    newDatasetData.shift();
                }

                return {
                    labels: newLabels,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: newDatasetData,
                        },
                    ],
                };
            });
        });

        // Clean up on unmount
        return () => {
            socket.off('stockData');
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Real-Time Stock Data</h2>
            <div className="bg-white p-4 w-96 rounded-lg shadow-md">
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default LineChart;
