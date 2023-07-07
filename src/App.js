import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import News from "./components/News";
import Cryptocurrencies from "./components/Cryptocurrencies";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usestats from "./components/Cryptoapi";
import Newsdata from "./components/Newsapi";
import Coindetail from "./components/Coindetail";


function App() {
  
  const { cryptoStats, isLoading, error } = Usestats({coin:"coins"});
  
  const {newsStats, loading,errorMessage}=Newsdata();
  if(loading){
    return <p>Loading...</p>
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if(errorMessage){
    return <p>Error: {errorMessage}</p>
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home cryptoStats={cryptoStats} newsStats={newsStats} />} />
      <Route path="/Home" element={<Home  cryptoStats={cryptoStats} newsStats={newsStats} />} />
      <Route path="/Cryptocurrencies" element={<Cryptocurrencies cryptoStats={cryptoStats}/>}/>
      <Route path="/News" element={<News newsStats={newsStats}/>}/>
      <Route path="/Coindetail/:coinId" element={<Coindetail />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
