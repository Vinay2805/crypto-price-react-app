import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
function App() {
  const [coins, setcoins] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setcoins(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        alert("404 Error ");
        console.log(err);
      });
  }, []);

  const Handlechange = (e) => {
    setsearch(e.target.value);
    console.log(e.target.value);
  };
  const filitercions = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Crypto coins currency </h1>
        <form>
          <input
            type="text"
            placeholder="search "
            className="coin-input"
            onChange={Handlechange}
          />
        </form>
      </div>
      {filitercions.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            pricechange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
