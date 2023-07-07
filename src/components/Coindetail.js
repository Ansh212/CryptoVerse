import React from "react";
import { useParams } from "react-router-dom";
import Usestats from "./Cryptoapi";
import useStats2 from "./Chartapi";
import { useState } from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import {
  BiBarChartAlt,
  BiDollar,
  BiCheck,
  BiX,
  BiHash,
  BiDollarCircle,
  BiTrophy,
} from "react-icons/bi";
import { AiOutlineTrophy, AiOutlineExclamationCircle } from "react-icons/ai";
import { RiExchangeDollarFill } from "react-icons/ri";
import Linechart from "./Linechart";

function Coindetail() {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { cryptoStats, isLoading, error } = Usestats({
    coin: "coin",
    id: coinId,
  });
  const { coinhistory, loading, errormessage } = useStats2({
    coin: "coin",
    id: coinId,
    hist: `history?timePeriod=${timeperiod}`,
  });

  const coindtata = cryptoStats?.data?.coin;

  if (isLoading || loading) {
    return <p>Loading...</p>;
  }

  if (error || errormessage) {
    return <p>Error: {error || errormessage}</p>;
  }

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coindtata?.price && millify(coindtata?.price)}`,
      icon: <BiDollar />,
    },
    {
      title: "Rank",
      value: coindtata?.rank,
      icon: <BiHash />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        coindtata?.["24hVolume"] && millify(coindtata?.["24hVolume"])
      }`,
      icon: <RiExchangeDollarFill />,
    },
    {
      title: "Market Cap",
      value: `$ ${coindtata?.marketCap && millify(coindtata?.marketCap)}`,
      icon: <BiDollarCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coindtata?.allTimeHigh?.price && millify(coindtata?.allTimeHigh?.price)
      }`,
      icon: <BiTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coindtata?.numberOfMarkets,
      icon: <BiBarChartAlt />,
    },
    {
      title: "Number Of Exchanges",
      value: coindtata?.numberOfExchanges,
      icon: <BiDollar />,
    },
    {
      title: "Approved Supply",
      value: coindtata?.supply?.confirmed ? <BiCheck /> : <BiX />,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        coindtata?.supply?.total && millify(coindtata?.supply?.total)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coindtata?.supply?.circulating &&
        millify(coindtata?.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coindtata?.allTimeHigh?.price && millify(coindtata?.allTimeHigh?.price)
      }`,
      icon: <AiOutlineTrophy />,
    },
  ];

  return (
    <>
      <div className="container">
        <h1 className="text-center my-3">
          {coindtata.name} ({coindtata.symbol})
        </h1>
        <p className="lead text-center">
          {coindtata.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
        <div className="col-md-4 mx-auto mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={timeperiod}
            onChange={(event) => setTimeperiod(event.target.value)}
          >
            {time.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <Linechart
          coinhistory={coinhistory}
          currentPrice={millify(coindtata?.price)}
          timeperiod={timeperiod}
          coinName={coindtata?.name}
        />
        <div className="row my-5">
          <div className="col-md-6 my-3">
            <div className="coin-value-statistics">
              <h3 className="coin-details-heading">
                {coindtata.name} Value Statistics
              </h3>
              <p className="lead">
                An overview showing the statistics of {coindtata.name}.
              </p>
              {stats.map(({ icon, title, value }) => (
                <div className="coin-stats" key={title}>
                  <div className="d-flex justify-content-between">
                    <div className="coin-stats-name">
                      <span>{icon}</span>
                      <span>{title}</span>
                    </div>
                    <div className="stats">
                      <span>{value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 my-3">
            <div className="coin-value-statistics">
              <h3 className="coin-details-heading">Other Stats Info</h3>
              <p className="lead">
                An overview showing the statistics of {coindtata.name}.
              </p>
              {genericStats.map(({ icon, title, value }) => (
                <div className="coin-stats" key={title}>
                  <div className="d-flex justify-content-between">
                    <div className="coin-stats-name">
                      <span>{icon}</span>
                      <span>{title}</span>
                    </div>
                    <div className="stats">
                      <span>{value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="coin-desc-link">
          <div className="coin-desc">
            <h3 className="coin-details-heading">What is {coindtata.name}?</h3>
            {HTMLReactParser(coindtata.description)}
          </div>
          <div className="coin-links my-3">
            <h3 className="coin-details-heading">{coindtata.name} Links</h3>
            <div className="container">
              {coindtata.links?.map((link) => (
                <div
                  className="d-flex justify-content-between coin-link my-3"
                  key={link.name}
                >
                  <h5 className="link-name">{link.type}</h5>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Coindetail;

