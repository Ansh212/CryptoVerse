import React from "react";
import crypto from './../crypto.jpg';

function News({ simplified, newsStats }) {
  const newsdata = newsStats?.value;
  const displayeddata = simplified ? newsdata.slice(0, 10) : newsdata;

  return (
    <>
      <div className="container my-3">
        <div className="row">
          {displayeddata &&
            displayeddata.map((news) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={news.url}>
                <div className="card my-2">
                  <img
                    src={news?.image?.thumbnail?.contentUrl || crypto}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">{news.name}</h5>
                    <p className="card-text">{news.description}</p>
                    <a href={news.url} className="btn btn-dark">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default News;
