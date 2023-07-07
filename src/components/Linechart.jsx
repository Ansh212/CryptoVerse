import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Linechart = ({ coinhistory, timeperiod, currentPrice, coinName }) => {
  const [coinPrice, setCoinPrice] = useState([]);
  const [coinTimestamp, setCoinTimestamp] = useState([]);

  useEffect(() => {
    const fetchCoinHistory = async () => {
      try {
        const response = await fetch(
          `https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history?timePeriod=${timeperiod}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "8e27678fdamshafcb96be7ab82c0p1a1affjsnf11c886407a1",
              "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const prices = data?.data?.history?.map((item) => item.price);
        const timestamps = data?.data?.history?.map((item) =>
          new Date(item.timestamp).toLocaleDateString()
        );

        setCoinPrice(prices);
        setCoinTimestamp(timestamps);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoinHistory();
  }, [timeperiod]);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <div className="row chart-header">
        <div className="col">
          <h2 className="chart-title">{coinName} Price Chart</h2>
        </div>
        <div className="col price-container">
          <h5 className="price-change">Change: {coinhistory?.data?.change}%</h5>
          <h5 className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </h5>
        </div>
      </div>

      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default Linechart;
