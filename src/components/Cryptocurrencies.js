import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

function Cryptocurrencies({ simplified, cryptoStats }) {
  const coinstats = cryptoStats?.data?.coins;
  const displayedCoins = simplified ? coinstats.slice(0, 10) : coinstats;
  const [coins, setCoins] = useState(displayedCoins);
  const [searchCoin, setSearchCoin] = useState("");

  useEffect(() => {
    if (!simplified) {
      const filteredData = displayedCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchCoin.toLowerCase())
      );
      setCoins(filteredData);
    }
  }, [displayedCoins, searchCoin, simplified]);

  return (
    <>
      {!simplified && (
        <div className="row mb-3 my-3">
          <div className="col-12 col-md-6 offset-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search Cryptocurrency"
              value={searchCoin}
              onChange={(e) => setSearchCoin(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="container my-3">
        <div className="row">
          {coins &&
            coins.map((currency) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={currency.uuid}>
                <div className="card my-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title">
                        {currency.rank}. {currency.name}
                      </h5>
                      <img
                        src={currency.iconUrl}
                        className="card-image"
                        style={{ width: "30px", height: "30px" }}
                        alt=""
                      />
                    </div>
                  </div>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Price: {millify(currency.price)}
                    </li>
                    <li className="list-group-item">
                      Market Cap: {millify(currency.marketCap)}
                    </li>
                    <li className="list-group-item">
                      Daily Change: {millify(currency.change)}
                    </li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={`/Coindetail/${currency.uuid}`}
                      className="card-link"
                    >
                      More About it
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Cryptocurrencies;
