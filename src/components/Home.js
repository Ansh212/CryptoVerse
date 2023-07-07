import React from "react";
import millify from "millify";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { Link } from "react-router-dom";

function Home({ cryptoStats, newsStats }) {
  const Globalstats = cryptoStats?.data?.stats;

  return (
    <>
      <div className="container">
        <h1 className="my-3">Global Crypto Stats</h1>
        {cryptoStats && (
          <>
            <div className="row">
              <div className="col-12 col-md-4">
                <h5>Total Cryptocurrencies</h5>
                <h6>{millify(Globalstats.total)}</h6>
                <br />
              </div>
              <div className="col-12 col-md-4">
                <h5>Total Exchanges</h5>
                <h6>{millify(Globalstats.totalExchanges)}</h6>
                <br />
              </div>
              <div className="col-12 col-md-4">
                <h5>Total Market Cap</h5>
                <h6>{millify(Globalstats.totalMarketCap)}</h6>
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4">
                <h5>Total 24h Value</h5>
                <h6>{millify(Globalstats.total24hVolume)}</h6>
                <br />
              </div>
              <div className="col-12 col-md-4">
                <h5>Total Markets</h5>
                <h6>{millify(Globalstats.totalMarkets)}</h6>
                <br />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-10">
                <h1>Top 10 Cryptocurrencies In The World</h1>
              </div>
              <div className="col-2">
                <Link
                  className="link"
                  to="/Cryptocurrencies"
                  style={{ textDecoration: "none" }}
                >
                  <h4>Show More</h4>
                </Link>
              </div>
            </div>
            <Cryptocurrencies simplified={true} cryptoStats={cryptoStats} />
            <div className="row align-items-center">
              <div className="col-10">
                <h1>Latest Crypto News</h1>
              </div>
              <div className="col-2">
                <Link
                  className="link"
                  to="/News"
                  style={{ textDecoration: "none" }}
                >
                  <h4>Show More</h4>
                </Link>
              </div>
            </div>
            <News simplified={true} newsStats={newsStats} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
