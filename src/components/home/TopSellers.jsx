import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from 'axios';

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);


async function getSellers() {
  const { data } = await axios.get(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
  );

  await setTopSellers(data);
  setLoading(false);
}

useEffect(() => {
  getSellers();
}, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading 
                ? new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                      <div className="author__img--loading-skeleton loading-state"></div>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <div className="top-seller__author-name--skeleton loading-state"></div>
                    <div className="top-seller__price--skeleton loading-state"></div>
                  </div>
                </li>))
                
                : topSellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
