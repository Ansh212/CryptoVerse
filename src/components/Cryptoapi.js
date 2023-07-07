import { useState, useEffect } from "react";

const Usestats = (parameters) => {
  const [cryptoStats, setCryptoStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async() => {
      try {
        const queryString = Object.keys(parameters)
        .map((key) => parameters[key])
        .join("/");
        
        const response = await fetch(`https://api.coinranking.com/v2/${queryString}`, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "8e27678fdamshafcb96be7ab82c0p1a1affjsnf11c886407a1",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCryptoStats(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cryptoStats, isLoading, error };
};

export default Usestats;
