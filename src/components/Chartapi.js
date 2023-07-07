import { useState, useEffect } from "react";

const useStats2 = (parameters) => {
  const [coinhistory, setCoinhistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errormessage, setErrormessage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const queryString = Object.keys(parameters)
          .map((key) => parameters[key])
          .join("/");
        //console.log(queryString);
        const response = await fetch(
          `https://api.coinranking.com/v2/${queryString}`,
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
        console.log(data); // Check the fetched data

        if (isMounted) {
          setCoinhistory(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error); // Check for any potential errors

        if (isMounted) {
          setErrormessage(error.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  //console.log(coinhistory, loading, errormessage); // Check the state values

  return { coinhistory, loading, errormessage };
};

export default useStats2;
