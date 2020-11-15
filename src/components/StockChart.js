import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";

const options = {
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "day",
        },
        position: "bottom",
      },
    ],
  },
};

const StockChart = ({ url }) => {
  const [chartData, setChartData] = useState([]);
  const [metaData, setMetaData] = useState({});
  useEffect(() => {
    axios
      .get(url)
      .then((res) => res.data)
      .then((res) => {
        const deltaData = res.data.slice(0, 50);

        // const delta = Math.floor(dailyData.length / 200);
        // let deltaData = [];
        // for (let i = 0; i < dailyData.length; i = i + delta) {
        //   deltaData.push(dailyData[i]);
        // }

        setChartData(deltaData);
        setMetaData(res.meta);
      });
  }, []);
  return (
    <div style={{ width: "50%", display: "inline-block" }}>
      <h3>{metaData.scheme_name}</h3>
      <Line
        data={{
          datasets: [
            {
              label: "nav",
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              data: chartData.map((data) => {
                return {
                  x: moment.utc(data.date, "DD-MM-YYYY"),
                  y: data.nav,
                };
              }),
            },
          ],
        }}
        options={options}
      ></Line>
    </div>
  );
};

export default StockChart;
