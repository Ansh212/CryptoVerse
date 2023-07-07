import { useState, useEffect } from "react";

const   NewsData = () => {
  const [newsStats, setNewsStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=100", {
          method: "GET",
          headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '8e27678fdamshafcb96be7ab82c0p1a1affjsnf11c886407a1',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setNewsStats(data);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
      
    };
    fetchData();
  }, []);
  return { newsStats, loading, errorMessage };
}

export default NewsData;
